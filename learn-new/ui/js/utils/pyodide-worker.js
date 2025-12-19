// This worker is responsible for loading Pyodide and running Python code.
// It lives in a separate thread from the main UI, preventing the UI from freezing.

// Pyodide is loaded using `importScripts` in a worker context.
// The path is relative to the worker script itself.
importScripts('../pyodide/pyodide.js');

let pyodide = null;

// Simple debug flag; flip to false to silence logs.
const DEBUG = true;

function debugLog(...args) {
  if (!DEBUG) return;
  // Prefix so we can filter worker logs easily.
  console.log('[pyodide-worker]', ...args);
}

function getIndexURL() {
  // Build an absolute URL to the /js/pyodide/ directory based on the worker URL
  // Note: self.location.href in a worker is the worker script URL, not the page URL
  const workerUrl = new URL(self.location.href);
  // Remove any query parameters from the worker URL first
  workerUrl.search = '';
  // Replace the worker path /js/utils/pyodide-worker.js with /js/pyodide/
  workerUrl.pathname = workerUrl.pathname.replace(/\/js\/utils\/[^/]*$/, '/js/pyodide/');
  if (!workerUrl.pathname.endsWith('/')) {
    workerUrl.pathname += '/';
  }
  const indexURL = workerUrl.toString();
  debugLog('Using indexURL:', indexURL);
  return indexURL;
}

// Declare outputBuffer before loading Pyodide so it's available to the stdout/stderr handlers
let outputBuffer = '';

async function loadPyodideInstance() {
  const indexURL = getIndexURL();
  debugLog('Starting loadPyodide with indexURL');
  try {
    pyodide = await loadPyodide({ indexURL });
    debugLog('Pyodide loaded successfully. Version:', pyodide.version);

    // Expose JS callbacks that Python will use to write to stdout/stderr.
    // Both streams are merged into outputBuffer, matching the existing worker contract
    // where only `stdout` is returned to the main thread.
    function handlePyStdout(chunk) {
      try {
        // Normalize to string and append. Python will always send str here.
        outputBuffer += String(chunk ?? '');
      } catch (e) {
        // Swallow to avoid breaking Python execution if logging fails.
      }
    }

    function handlePyStderr(chunk) {
      try {
        // For now, also merge stderr into the same buffer.
        outputBuffer += String(chunk ?? '');
      } catch (e) {
        // Swallow to avoid breaking Python execution if logging fails.
      }
    }

    try {
      pyodide.globals.set('JS_STDOUT_WRITE', handlePyStdout);
      pyodide.globals.set('JS_STDERR_WRITE', handlePyStderr);
    } catch (e) {
      debugLog('Failed to register JS stdout/stderr callbacks in Pyodide globals:', e);
    }

    // Install a Python-level stdout/stderr redirection that forwards writes back to JS.
    // This works on Pyodide 0.26.1 where `pyodide.setStandardStream` is not available.
    const pythonPrelude = `\
import sys

_JS_STDOUT_WRITE = JS_STDOUT_WRITE
_JS_STDERR_WRITE = JS_STDERR_WRITE

class _JsStdout:
    def write(self, s):
        try:
            if not isinstance(s, str):
                s = str(s)
            _JS_STDOUT_WRITE(s)
            return len(s)
        except Exception:
            # Never let logging failures break user code execution.
            return 0

    def flush(self):
        # No-op; included for compatibility.
        pass

    def writelines(self, lines):
        try:
            for line in lines:
                self.write(line)
        except Exception:
            pass

class _JsStderr:
    def write(self, s):
        try:
            if not isinstance(s, str):
                s = str(s)
            _JS_STDERR_WRITE(s)
            return len(s)
        except Exception:
            return 0

    def flush(self):
        pass

    def writelines(self, lines):
        try:
            for line in lines:
                self.write(line)
        except Exception:
            pass

# Preserve originals in case we ever want to introspect or restore.
_ORIG_STDOUT = getattr(sys, 'stdout', None)
_ORIG_STDERR = getattr(sys, 'stderr', None)

sys.stdout = _JsStdout()
sys.stderr = _JsStderr()
`;

    try {
      await pyodide.runPythonAsync(pythonPrelude);
      debugLog('Python stdout/stderr redirection prelude installed');
    } catch (e) {
      debugLog('Failed to install Python stdout/stderr prelude:', e);
    }

    // Notify the main thread that the worker is ready to receive code.
    try {
      self.postMessage({ type: 'ready' });
    } catch (e) {
      debugLog('Failed to post ready message:', e);
    }
  } catch (e) {
    debugLog('Failed to load Pyodide:', e);
    throw e;
  }
}

// We start loading Pyodide as soon as the worker is created.
// The `pyodideReadyPromise` will resolve when Pyodide is ready.
const pyodideReadyPromise = loadPyodideInstance();

self.onmessage = async (event) => {
  // Wait for Pyodide to be fully loaded.
  await pyodideReadyPromise;

  const { id, code } = event.data;
  debugLog('Received message', { id, codeSnippet: String(code).slice(0, 200) });

  if (!pyodide) {
    debugLog('Pyodide not initialized when handling message');
    self.postMessage({
      id,
      stdout: '',
      stderr: '',
      error: 'Pyodide is not loaded yet.',
    });
    return;
  }

  try {
    // Clear live buffer for this run so we only include output produced during execution.
    outputBuffer = '';

    // Expose the user code as a global variable in Python.
    pyodide.globals.set('USER_CODE', code);
    debugLog('About to execute USER_CODE in Pyodide');

    const pythonToRun = `\
import traceback, sys
error_message = None
try:
    # Execute the user's code in the global context
    exec(USER_CODE, globals(), globals())
except Exception:
    tb = traceback.format_exc()
    # Write full traceback to stderr so it flows to the worker's stderr handler
    sys.stderr.write(tb)
    error_message = tb.splitlines()[-1] if tb else 'Unknown Python error.'

# Return only the error message (stdout is streamed live into outputBuffer)
result = {
    'error': error_message,
}
result
`;

    // Run the Python code. stdout/stderr are streamed live into `outputBuffer`.
    let rawResult = await pyodide.runPythonAsync(pythonToRun);
    debugLog('Execution finished. Raw result type:', typeof rawResult);

    // Convert result proxy to JS object
    let jsResult = {};
    if (rawResult && typeof rawResult.toJs === 'function') {
      try {
        jsResult = rawResult.toJs({ dict: true });
      } finally {
        try { rawResult.destroy(); } catch (e) {}
      }
    } else {
      jsResult = rawResult || {};
    }

    const safeResult = {
      stdout: String(outputBuffer || ''),
      stderr: '',
      error: jsResult.error != null ? String(jsResult.error) : null,
    };

    debugLog('Sending result back to main thread:', {
      id,
      stdoutPreview: safeResult.stdout.slice(0, 200),
      stderrPreview: safeResult.stderr.slice(0, 200),
      error: safeResult.error,
    });

    self.postMessage({
      id,
      stdout: safeResult.stdout,
      stderr: safeResult.stderr,
      error: safeResult.error,
    });
  } catch (err) {
    debugLog('Unexpected error during execution:', err);
    self.postMessage({
      id,
      stdout: '',
      stderr: '',
      error: err && err.message ? err.message : String(err),
    });
  }
};
