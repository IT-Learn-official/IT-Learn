//author: https://github.com/nhermab
//licence: MIT
import { getRunnerForLanguage } from '../../runners/index.js';
import { formatSqlOutput, formatPythonOutput, getSqlStatusMessage } from './outputFormatter.js';

/**
 * Create and attach run button event handler.
 *
 * @param {Object} params
 * @param {Object} params.practiceEditor - The Ace editor instance
 * @param {Object} params.activeTemplate - Current template with language info
 * @param {HTMLElement} params.consoleEl - Console output element
 * @param {HTMLElement} params.runStatus - Status text element
 * @param {HTMLElement} params.runButton - Run button element
 * @returns {Object} Object with lastRunResult for external access
 */
export function createRunHandler({
  practiceEditor,
  activeTemplate,
  consoleEl,
  runStatus,
  runButton
}) {
  let lastRunResult = null;

  const handler = async () => {
    if (!practiceEditor) return;

    const code = practiceEditor.getValue();
    const editorLanguage = activeTemplate?.language || 'python';

    runButton.disabled = true;
    consoleEl.textContent = 'Running code...';

    try {
      const runner = getRunnerForLanguage(editorLanguage);
      runStatus.textContent = `Running ${editorLanguage}...`;

      const result = await runner.run(code);
      lastRunResult = result;

      if (editorLanguage === 'sql') {
        consoleEl.textContent = formatSqlOutput(result);
        runStatus.textContent = getSqlStatusMessage(result);
      } else {
        const { text, verdict } = formatPythonOutput(result);
        consoleEl.textContent = text;
        runStatus.textContent = verdict;
      }
    } catch (err) {
      console.error(`${editorLanguage} runner invocation failed:`, err);
      const errorMessage = `Failed to execute ${editorLanguage} code. ${err.message || err}`;
      consoleEl.textContent = errorMessage;
      runStatus.textContent = 'Run failed';
    }

    runButton.disabled = false;
  };

  return {
    handler,
    getLastRunResult: () => lastRunResult,
  };
}

