//author: https://github.com/nhermab
//licence: MIT
import { BaseRunner } from './baseRunner.js';

class PythonRunner extends BaseRunner {
  constructor() {
    super();
    this.worker = null;
    this.ready = false;
    this.messageId = 0;
    this.pendingCallbacks = new Map();
  }

  getLanguage() {
    return 'python';
  }

  async initialize() {
    if (this.worker) return; // Already initialized

    this.worker = new Worker('./ui/js/utils/pyodide-worker.js');

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Pyodide worker initialization timeout'));
      }, 30000);

      this.worker.onmessage = (e) => {
        const { type, id, stdout, stderr, error } = e.data;

        if (type === 'ready') {
          clearTimeout(timeoutId);
          this.ready = true;
          resolve();
          return;
        }


        const callback = this.pendingCallbacks.get(id);
        if (callback) {
          this.pendingCallbacks.delete(id);
          callback({ stdout, stderr, error });
        }
      };

      this.worker.onerror = (err) => {
        clearTimeout(timeoutId);
        reject(err);
      };
    });
  }

  isReady() {
    return this.ready && this.worker !== null;
  }

  async run(code, options = {}) {
    if (!this.isReady()) {
      await this.initialize();
    }

    return new Promise((resolve) => {
      const id = ++this.messageId;
      this.pendingCallbacks.set(id, resolve);

      this.worker.postMessage({
        id,
        code,
        ...options
      });
    });
  }

  async reset() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.ready = false;
      this.pendingCallbacks.clear();
    }
    // Re-initialize if needed
    await this.initialize();
  }
}

// Singleton instance
let pythonRunnerInstance = null;

export function getPythonRunner() {
  if (!pythonRunnerInstance) {
    pythonRunnerInstance = new PythonRunner();
  }
  return pythonRunnerInstance;
}

// Legacy API compatibility
export async function runPython(code) {
  const runner = getPythonRunner();
  return runner.run(code);
}
