//author: https://github.com/nhermab
//licence: MIT
/**
 * Language-specific editor configurations
 */
const languageConfigs = {
  python: {
    aceMode: 'ace/mode/python',
    tabSize: 4,
    fileExtension: '.py',
    displayName: 'Python'
  },
  sql: {
    aceMode: 'ace/mode/sql',
    tabSize: 2,
    fileExtension: '.sql',
    displayName: 'SQL'
  },
  java: {
    aceMode: 'ace/mode/java',
    tabSize: 4,
    fileExtension: '.java',
    displayName: 'Java'
  },
  javascript: {
    aceMode: 'ace/mode/javascript',
    tabSize: 2,
    fileExtension: '.js',
    displayName: 'JavaScript'
  },
  // Add more languages as needed
};

/**
 * Get configuration for a specific language
 * @param {string} language - Language identifier
 * @returns {Object} Language configuration
 */
export function getLanguageConfig(language) {
  const normalizedLanguage = language ? language.toLowerCase().trim() : 'python';
  return languageConfigs[normalizedLanguage] || languageConfigs.python;
}

/**
 * Get Ace editor mode for a language
 * @param {string} language - Language identifier
 * @returns {string} Ace mode string
 */
export function getAceModeForLanguage(language) {
  return getLanguageConfig(language).aceMode;
}

/**
 * Get tab size for a language
 * @param {string} language - Language identifier
 * @returns {number} Tab size
 */
export function getTabSizeForLanguage(language) {
  return getLanguageConfig(language).tabSize;
}

/**
 * Get file extension for a language
 * @param {string} language - Language identifier
 * @returns {string} File extension with dot
 */
export function getFileExtensionForLanguage(language) {
  return getLanguageConfig(language).fileExtension;
}

/**
 * Get display name for a language
 * @param {string} language - Language identifier
 * @returns {string} Display name
 */
export function getDisplayNameForLanguage(language) {
  return getLanguageConfig(language).displayName;
}

