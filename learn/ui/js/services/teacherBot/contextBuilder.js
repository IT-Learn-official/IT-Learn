//author: https://github.com/nhermab
//licence: MIT
// Context building utilities for TeacherBot

/**
 * Truncate text to approximate token limit.
 *
 * @param {string} text - Text to truncate
 * @param {number} maxTokens - Maximum tokens
 * @returns {string} Truncated text
 */
export function truncateToTokens(text, maxTokens) {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars) + '\n... (truncated)';
}

/**
 * Detect if the question is about errors/debugging.
 *
 * @param {string} question - User's question
 * @param {Object} lastRun - Last run results
 * @returns {boolean} True if error-focused
 */
export function isErrorFocusedQuestion(question, lastRun) {
  const errorKeywords = ['error', 'bug', 'wrong', 'fail', 'issue', 'problem', 'fix', 'debug', 'crash', 'exception'];
  const questionLower = question.toLowerCase();
  const hasErrorKeyword = errorKeywords.some(kw => questionLower.includes(kw));
  const hasError = lastRun && (lastRun.error || lastRun.stderr);
  return hasErrorKeyword || hasError;
}

/**
 * Build context for asking a question.
 *
 * @param {Object} request - Question request object
 * @returns {{ contextText: string, hasError: boolean }}
 */
export function buildQuestionContext(request) {
  const lastRun = request.environment?.lastRun;
  const hasError = lastRun && (lastRun.error || lastRun.stderr);
  const isErrorQuestion = isErrorFocusedQuestion(request.userQuestion, lastRun);

  const contextParts = [];

  // PRIORITY 1: Errors (always include if present)
  if (hasError && lastRun.status !== 'not_run') {
    contextParts.push('=== CONSOLE ERROR ===');
    if (lastRun.error) {
      // sanitize runner noise and truncate
      const errorText = truncateToTokens(sanitizeOutput(lastRun.error), 800);
      contextParts.push('Error Message:');
      contextParts.push(errorText);
    }
    if (lastRun.stderr) {
      const stderrText = truncateToTokens(sanitizeOutput(lastRun.stderr), 600);
      contextParts.push('');
      contextParts.push('Standard Error (stderr):');
      contextParts.push(stderrText);
    }
    contextParts.push('');
    contextParts.push('[Instruction: Carefully analyze the error above and the code below to identify the exact problem]');
    contextParts.push('');
  }

  // PRIORITY 2: Student code
  if (request.codeFiles && request.codeFiles.length > 0) {
    contextParts.push('=== STUDENT CODE ===');
    request.codeFiles.forEach(file => {
      const codeText = truncateToTokens(file.source || '', 1500);
      contextParts.push(`File: ${file.path}`);
      contextParts.push('```' + (file.languageId || ''));
      contextParts.push(codeText);
      contextParts.push('```');
    });
    contextParts.push('');
  } else if (request.userCode) {
    const codeText = truncateToTokens(request.userCode, 1500);
    contextParts.push('=== STUDENT CODE ===');
    contextParts.push('```');
    contextParts.push(codeText);
    contextParts.push('```');
    contextParts.push('');
  }

  // PRIORITY 3: Success output
  if (!hasError && lastRun && lastRun.stdout && lastRun.status !== 'not_run') {
    const outputText = truncateToTokens(sanitizeOutput(lastRun.stdout), 600);
    if (outputText) {
      contextParts.push('=== OUTPUT ===');
      contextParts.push(outputText);
      contextParts.push('');
    }
  }

  // PRIORITY 4: Assignment
  let assignmentText = request.assignment?.descriptionMarkdown || request.assignmentText;
  const shouldIncludeAssignment = assignmentText && !isErrorQuestion;

  if (shouldIncludeAssignment) {
    // Ensure checkboxes are checked so the bot recognizes them as done
    const checkedAssignment = checkChecklist(assignmentText);
    const truncatedAssignment = truncateToTokens(checkedAssignment, 1200);
    contextParts.push('=== ASSIGNMENT ===');
    contextParts.push(truncatedAssignment);
    contextParts.push('');
  }

  return {
    contextText: contextParts.length > 0 ? contextParts.join('\n') : '',
    hasError
  };
}

// Add helper to remove comments starting with /* ... */, -- (end-of-line), or # (end-of-line)
function stripComments(code) {
  if (!code) return code;
  // Remove block comments: /* ... */
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove SQL/SQL-like single-line comments: -- ...
  code = code.replace(/--.*$/gm, '');
  // Remove hash single-line comments: # ...
  code = code.replace(/#.*$/gm, '');
  return code;
}

// Add: sanitize output to remove noisy runner messages like "✅ Program executed successfully."
function sanitizeOutput(text) {
  if (!text) return text;
  const lines = String(text).split(/\r?\n/);
  const kept = lines.filter(line => {
    const t = line.trim();
    if (!t) return false; // drop blank lines to avoid clutter
    // Common runner success banners (emoji + text)
    if (/^✅.*executed successfully\.?$/i.test(t)) return false;
    if (/^(success|ok|passed|completed)\.?$/i.test(t)) return false;
    // literal "(none)" or "none"
    if (/^\(none\)$/i.test(t) || /^none$/i.test(t)) return false;
    // lines that are just checkmark/emoji
    if (/^[\u2700-\u27BF\u1F300-\u1F6FF\ufe0f\u2600-\u26FF]+$/.test(t)) return false;
    return true;
  });
  return kept.join('\n');
}

// Add helper to normalize/check checkboxes in markdown assignment text
function checkChecklist(text) {
  if (!text) return text;
  // Convert any markdown unchecked boxes like "[ ]" (with any interior spaces) to checked "[x]"
  return String(text).replace(/\[\s*\]/g, '[x]');
}

/**
 * Build context for grading code.
 *
 * @param {Object} request - Grade request object
 * @returns {{ assignmentText: string, userCode: string, outputText: string }}
 */
export function buildGradeContext(request) {
  const assignmentText = truncateToTokens(
    checkChecklist(request.assignmentText || request.assignment?.descriptionMarkdown || 'No assignment provided'),
    1000
  );

  let userCodeRaw;
  if (request.codeFiles && request.codeFiles.length > 0) {
    userCodeRaw = request.codeFiles.map(f => f.source).join('\n\n');
  } else {
    userCodeRaw = request.userCode || 'No code provided';
  }

  // Strip comments before truncation so the grader isn't confused by comments
  const userCodeStripped = stripComments(userCodeRaw);
  let userCode = truncateToTokens(userCodeStripped, 2000);

  // Add output
  const lastRun = request.environment?.lastRun || {};
  // Apply sanitization to raw outputs to remove runner noise
  const stdout = sanitizeOutput(lastRun.stdout || lastRun.consoleDisplay || '') || '';
  const stderr = sanitizeOutput(lastRun.stderr || '') || '';
  const error = sanitizeOutput(lastRun.error || '') || '';

  let outputText = '';

  // Format output with clear sections for the bot
  if (error) outputText += `--- error ---\n${error}\n`;
  if (stderr) outputText += `--- stderr ---\n${stderr}\n`;
  if (stdout) outputText += `--- stdout ---\n${stdout}\n`;

  if (!outputText) outputText = '(No output generated)';

  // Final sanitization and truncation
  outputText = sanitizeOutput(outputText);
  outputText = truncateToTokens(outputText, 1000);

  return { assignmentText, userCode, outputText };
}
