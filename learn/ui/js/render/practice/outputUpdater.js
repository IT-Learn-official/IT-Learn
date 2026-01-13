//author: https://github.com/nhermab
//licence: MIT
import { formatSqlOutput, formatPythonOutput, getSqlStatusMessage } from './outputFormatter.js';

export function updateConsoleOutput({ result, editorLanguage, consoleEl, runStatus }) {
  try {
    if (!consoleEl || !runStatus) {
      // Nothing to update, avoid exceptions
      return;
    }

    if (editorLanguage === 'sql') {
      consoleEl.textContent = formatSqlOutput(result);
      runStatus.textContent = getSqlStatusMessage(result);
    } else {
      const { text, verdict } = formatPythonOutput(result);
      consoleEl.textContent = text;
      runStatus.textContent = verdict;
    }
  } catch (err) {
    console.error('updateConsoleOutput failed:', err);
    if (consoleEl) consoleEl.textContent = 'Failed to format output for display.';
    if (runStatus) runStatus.textContent = 'Output format error';
  }
}

