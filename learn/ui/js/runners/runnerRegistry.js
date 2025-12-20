//author: https://github.com/nhermab
//licence: MIT

import { getPythonRunner } from './pythonRunner.js';
import { getSQLRunner } from './sqlRunner.js';

/**
 * Registry of all available language runners
 */
const runnerRegistry = {
  python: getPythonRunner,
  sql: getSQLRunner,
  // Future languages can be added here:
  // java: getJavaRunner,
  // javascript: getJavaScriptRunner,
};

/**
 * Get a runner instance for a specific language
 * @param {string} language - Language identifier (e.g., 'python', 'sql', 'java')
 * @returns {BaseRunner} Runner instance for the language
 * @throws {Error} If language is not supported
 */
export function getRunnerForLanguage(language) {
  const normalizedLanguage = language ? language.toLowerCase().trim() : '';

  const runnerFactory = runnerRegistry[normalizedLanguage];
  if (!runnerFactory) {
    throw new Error(`Unsupported language: ${language}. Available: ${Object.keys(runnerRegistry).join(', ')}`);
  }

  return runnerFactory();
}

/**
 * Check if a language is supported
 * @param {string} language - Language identifier
 * @returns {boolean}
 */
export function isLanguageSupported(language) {
  const normalizedLanguage = language ? language.toLowerCase().trim() : '';
  return normalizedLanguage in runnerRegistry;
}

/**
 * Get list of all supported languages
 * @returns {string[]}
 */
export function getSupportedLanguages() {
  return Object.keys(runnerRegistry);
}

/**
 * Register a new language runner
 * Useful for plugins or extensions
 * @param {string} language - Language identifier
 * @param {Function} runnerFactory - Factory function that returns a runner instance
 */
export function registerLanguageRunner(language, runnerFactory) {
  const normalizedLanguage = language.toLowerCase().trim();
  if (runnerRegistry[normalizedLanguage]) {
    console.warn(`Language runner for '${language}' is being overridden`);
  }
  runnerRegistry[normalizedLanguage] = runnerFactory;
}

/**
 * Get runner for a course based on course object
 * @param {Object} course - Course object with language field
 * @returns {BaseRunner|null} Runner instance or null if course has no language
 */
export function getRunnerForCourse(course) {
  if (!course || !course.language) {
    return null;
  }
  return getRunnerForLanguage(course.language);
}

