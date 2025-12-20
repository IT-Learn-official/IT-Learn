//author: https://github.com/nhermab
//licence: MIT
/**
 * Base runner interface that all language runners should implement
 */
export class BaseRunner {
  /**
   * Execute code in the language runtime
   * @param {string} code - The code to execute
   * @param {Object} options - Additional options for execution
   * @returns {Promise<Object>} Result object with stdout, stderr, error, etc.
   */
  async run(code, options = {}) {
    throw new Error('run() must be implemented by subclass');
  }

  /**
   * Reset the runtime environment (clear state, databases, etc.)
   * @returns {Promise<void>}
   */
  async reset() {
    throw new Error('reset() must be implemented by subclass');
  }

  /**
   * Initialize the runner (load runtime, setup environment)
   * @returns {Promise<void>}
   */
  async initialize() {
    throw new Error('initialize() must be implemented by subclass');
  }

  /**
   * Check if the runner is ready to execute code
   * @returns {boolean}
   */
  isReady() {
    return false;
  }

  /**
   * Get the language name/identifier
   * @returns {string}
   */
  getLanguage() {
    throw new Error('getLanguage() must be implemented by subclass');
  }
}

