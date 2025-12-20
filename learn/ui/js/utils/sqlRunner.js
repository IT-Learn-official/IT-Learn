// This module manages a singleton SQL.js web worker.
// It provides a simple interface to run SQL code off the main UI thread.

let worker = null;
const pendingRequests = new Map();
let nextRequestId = 0;

function getWorker() {
  if (!worker) {
    worker = new Worker('./ui/js/utils/sql-worker.js');

    worker.onmessage = (event) => {
      const { id, results, error } = event.data;
      const request = pendingRequests.get(id);
      if (request) {
        pendingRequests.delete(id);
        // Always resolve with a structured result; let callers interpret error.
        request.resolve({
          results: results || [],
          error: error || null,
        });
      }
    };

    worker.onerror = (err) => {
      console.error('An error occurred in the SQL worker:', err);
      // Reject all pending requests because the worker is in a bad state.
      for (const [id, request] of pendingRequests.entries()) {
        request.reject(new Error('SQL worker failed.'));
        pendingRequests.delete(id);
      }
      // Terminate the broken worker. A new one will be created on the next `runSQL` call.
      worker.terminate();
      worker = null;
    };
  }
  return worker;
}

/**
 * Runs a string of SQL code in a web worker and returns the result.
 * @param {string} code The SQL code to execute.
 * @returns {Promise<{results: Array, error: string|null}>}
 */
export function runSQL(code) {
  return new Promise((resolve, reject) => {
    const id = nextRequestId++;
    pendingRequests.set(id, { resolve, reject });
    try {
      getWorker().postMessage({ id, code });
    } catch (err) {
      // This can happen if the worker fails to initialize.
      pendingRequests.delete(id);
      reject(err);
    }
  });
}

/**
 * Resets the SQL database, clearing all tables and data.
 * @returns {Promise<void>}
 */
export function resetSQL() {
  return new Promise((resolve, reject) => {
    const id = nextRequestId++;
    pendingRequests.set(id, {
      resolve: () => resolve(),
      reject
    });
    try {
      getWorker().postMessage({ id, reset: true });
    } catch (err) {
      pendingRequests.delete(id);
      reject(err);
    }
  });
}

