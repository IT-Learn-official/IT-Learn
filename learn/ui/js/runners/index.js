//author: https://github.com/nhermab
//licence: MIT
// Base runner interface
export { BaseRunner } from './baseRunner.js';

// Language-specific runners
export { getPythonRunner } from './pythonRunner.js';
export { getSQLRunner } from './sqlRunner.js';

// Runner registry
export {
  getRunnerForLanguage,
  isLanguageSupported,
  getSupportedLanguages,
  registerLanguageRunner,
  getRunnerForCourse
} from './runnerRegistry.js';

// Language configuration
export {
  getLanguageConfig,
  getAceModeForLanguage,
  getTabSizeForLanguage,
  getFileExtensionForLanguage,
  getDisplayNameForLanguage
} from './languageConfig.js';

// Legacy API exports for backward compatibility
export { runPython } from './pythonRunner.js';
export { runSQL, resetSQL } from './sqlRunner.js';

