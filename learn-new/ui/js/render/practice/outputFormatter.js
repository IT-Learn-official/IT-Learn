//author: https://github.com/nhermab
//licence: MIT

/**
 * Format SQL execution results for console display.
 *
 * @param {Object} result - The result from SQL runner
 * @returns {string} Formatted output text
 */
export function formatSqlOutput(result) {
  if (result.error) {
    return `❌ SQL Error:\n${result.error}`;
  }

  const outputLines = [];

  result.results.forEach((queryResult) => {
    if (queryResult.type === 'error') {
      outputLines.push(`❌ Error in statement: ${queryResult.statement}`);
      outputLines.push(`   ${queryResult.message}`);
      outputLines.push('');
    } else if (queryResult.type === 'success') {
      outputLines.push(`✅ ${queryResult.message}`);
      if (queryResult.statement) {
        outputLines.push(`   ${queryResult.statement}`);
      }
      outputLines.push('');
    } else if (queryResult.type === 'empty') {
      outputLines.push(`ℹ️ ${queryResult.message}`);
      if (queryResult.statement) {
        outputLines.push(`   ${queryResult.statement}`);
      }
      outputLines.push('');
    } else if (queryResult.type === 'result') {
      outputLines.push(`📊 Query Result (${queryResult.rows} row${queryResult.rows !== 1 ? 's' : ''}):`);
      outputLines.push('');

      // Create a simple table format
      if (queryResult.columns && queryResult.columns.length > 0) {
        // Header
        outputLines.push('  ' + queryResult.columns.join(' | '));
        outputLines.push('  ' + queryResult.columns.map(col => '-'.repeat(col.length)).join('-+-'));

        // Rows
        if (queryResult.values && queryResult.values.length > 0) {
          queryResult.values.forEach(row => {
            outputLines.push('  ' + row.map(val => {
              const str = val === null ? 'NULL' : String(val);
              return str;
            }).join(' | '));
          });
        }
        outputLines.push('');
      }
    }
  });

  return outputLines.join('\n') || 'No output generated.';
}

/**
 * Format Python (or other language) execution results for console display.
 *
 * @param {Object} result - The result from Python runner
 * @returns {{ text: string, verdict: string }} Formatted output text and verdict
 */
export function formatPythonOutput(result) {
  let verdict;
  if (result.error) {
    verdict = '⚠️ An error occurred during execution.';
  } else {
    verdict = '✅ Program executed successfully.';
  }

  const parts = [
    verdict,
    '',
    '--- stdout ---',
    result.stdout || '(none)',
  ];

  if (result.stderr) {
    parts.push('', '--- stderr ---', result.stderr);
  }

  if (result.error) {
    parts.push('', '--- error ---', result.error);
  }

  return {
    text: parts.join('\n'),
    verdict,
  };
}

/**
 * Get SQL status message based on result.
 *
 * @param {Object} result - The result from SQL runner
 * @returns {string} Status message
 */
export function getSqlStatusMessage(result) {
  if (result.error) {
    return '⚠️ SQL execution failed';
  }
  return '✅ SQL executed successfully';
}

