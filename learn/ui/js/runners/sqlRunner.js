//author: https://github.com/nhermab
//licence: MIT
import { BaseRunner } from './baseRunner.js';

class SQLRunner extends BaseRunner {
  constructor() {
    super();
    this.worker = null;
    this.ready = false;
    this.messageId = 0;
    this.pendingCallbacks = new Map();
  }

  getLanguage() {
    return 'sql';
  }

  async initialize() {
    if (this.worker) return; // Already initialized

    this.worker = new Worker('./ui/js/utils/sql-worker.js');

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('SQL worker initialization timeout'));
      }, 15000);

      this.worker.onmessage = (e) => {
        const { type, id, results, error, rowsAffected } = e.data;

        if (type === 'ready') {
          clearTimeout(timeoutId);
          this.ready = true;
          resolve();
          return;
        }

        const callback = this.pendingCallbacks.get(id);
        if (callback) {
          this.pendingCallbacks.delete(id);
          callback({ results, error, rowsAffected });
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
        type: 'exec',
        id,
        sql: code,
        ...options
      });
    });
  }

  async reset() {
    if (!this.isReady()) {
      await this.initialize();
    }

    return new Promise((resolve) => {
      const id = ++this.messageId;
      this.pendingCallbacks.set(id, resolve);

      this.worker.postMessage({
        type: 'reset',
        id
      });
    });
  }
}

// Singleton instance
let sqlRunnerInstance = null;

export function getSQLRunner() {
  if (!sqlRunnerInstance) {
    sqlRunnerInstance = new SQLRunner();
  }
  return sqlRunnerInstance;
}

// Legacy API compatibility
export async function runSQL(sql) {
  const runner = getSQLRunner();
  return runner.run(sql);
}

export async function resetSQL() {
  const runner = getSQLRunner();
  return runner.reset();
}

