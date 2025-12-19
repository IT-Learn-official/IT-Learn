// Web worker for running SQL queries using sql.js (SQLite WASM).
// It receives SQL code from the main thread and returns query results.

let SQL = null;
let db = null;
let isInitialized = false;

// Import sql.js - path is relative to the worker file location (ui/js/utils/)
importScripts('../sqlite/sql-wasm.js');

async function initializeSQL() {
  if (!SQL) {
    // Initialize SQL.js with the WASM file - relative to worker location
    SQL = await initSqlJs({
      locateFile: file => `../sqlite/${file}`
    });
    isInitialized = true;

    // Notify that the worker is ready
    self.postMessage({ type: 'ready' });
  }
}

function getOrCreateDatabase() {
  // Create database if it doesn't exist, otherwise reuse it
  // This maintains state across multiple query executions
  if (!db) {
    db = new SQL.Database();
  }
  return db;
}

function formatResults(results) {
  // Format query results for display
  if (!results || results.length === 0) {
    return [];
  }

  return results.map(result => {
    if (!result.columns || result.columns.length === 0) {
      return { type: 'success', message: 'Query executed successfully', rows: 0 };
    }

    return {
      type: 'result',
      columns: result.columns,
      values: result.values,
      rows: result.values.length
    };
  });
}

self.onmessage = async (event) => {
  const { id, type, sql, code, reset } = event.data;

  // Handle reset request (supports both old 'reset: true' and new 'type: reset' format)
  if (reset || type === 'reset') {
    if (db) {
      db.close();
      db = null;
    }
    self.postMessage({
      id,
      type: 'reset',
      results: [],
      error: null
    });
    return;
  }

  // Get the SQL code (supports both 'sql' and 'code' field names)
  const sqlCode = sql || code;

  try {
    // Initialize SQL.js if not already done
    await initializeSQL();

    // Get or create the database (maintains state)
    const database = getOrCreateDatabase();

    // Split the code into individual statements
    const statements = sqlCode
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    const allResults = [];

    for (const statement of statements) {
      try {
        // Execute the statement
        const results = database.exec(statement + ';');

        // Detect statement type
        const upperStatement = statement.toUpperCase().trim();
        const isModifying = upperStatement.startsWith('CREATE') ||
                           upperStatement.startsWith('INSERT') ||
                           upperStatement.startsWith('UPDATE') ||
                           upperStatement.startsWith('DELETE') ||
                           upperStatement.startsWith('DROP') ||
                           upperStatement.startsWith('ALTER');

        if (isModifying) {
          // Acknowledge DDL/DML statements
          let message = 'Statement executed successfully';
          if (upperStatement.startsWith('CREATE TABLE')) {
            message = 'Table created successfully';
          } else if (upperStatement.startsWith('INSERT')) {
            message = 'Data inserted successfully';
          } else if (upperStatement.startsWith('UPDATE')) {
            message = 'Data updated successfully';
          } else if (upperStatement.startsWith('DELETE')) {
            message = 'Data deleted successfully';
          }

          allResults.push({
            type: 'success',
            message: message,
            statement: statement.substring(0, 50) + (statement.length > 50 ? '...' : '')
          });
        } else {
          // This is likely a SELECT statement
          const formatted = formatResults(results);
          if (formatted.length > 0) {
            allResults.push(...formatted);
          } else {
            allResults.push({
              type: 'empty',
              message: 'Query returned no results',
              statement: statement.substring(0, 50) + (statement.length > 50 ? '...' : '')
            });
          }
        }
      } catch (err) {
        allResults.push({
          type: 'error',
          message: err.message || String(err),
          statement: statement.substring(0, 50) + (statement.length > 50 ? '...' : '')
        });
      }
    }

    self.postMessage({
      id,
      results: allResults,
      error: null
    });

  } catch (err) {
    self.postMessage({
      id,
      results: [],
      error: err.message || String(err)
    });
  }
};

