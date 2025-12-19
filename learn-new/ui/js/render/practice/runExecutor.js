//author: https://github.com/nhermab
//licence: MIT
import { getRunnerForLanguage } from '../../runners/index.js';

export async function runCode(code, language) {
  if (!language) language = 'python';
  const runner = getRunnerForLanguage(language);
  if (!runner || typeof runner.run !== 'function') {
    throw new Error(`No runner available for language: ${language}`);
  }

  // runner.run is expected to return a promise resolving to a result object
  const result = await runner.run(code);
  return result;
}

export function prepareLastRun({ getLastRunResult, lastRunResultFromRun, runStatusEl, consoleEl }) {
  const lastRunFromProvider = getLastRunResult ? getLastRunResult() : null;
  const source = lastRunResultFromRun || lastRunFromProvider || null;

  const lastRun = {
    status: source ? 'completed' : 'not_run',
    stdout: (source && (source.stdout || '')) || '',
    stderr: (source && (source.stderr || '')) || '',
    error: (source && (source.error || '')) || '',
    summary: (runStatusEl && runStatusEl.textContent) || '',
    consoleDisplay: (consoleEl && consoleEl.textContent) || '',
  };

  return lastRun;
}

