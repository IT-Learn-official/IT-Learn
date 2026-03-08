//author: https://github.com/nhermab
//licence: MIT
// TeacherBot feature implementations (ask, grade, validate)
//edited by: https://github.com/broodje565

import { getEngine, isEngineReady, initTeacherBot } from './engine.js';
import { buildAskPrompt, buildGradePrompt } from './prompts.js';
import { buildQuestionContext, buildGradeContext } from './contextBuilder.js';
import { parseAskResponse, parseGradeResponse } from './responseParser.js';

// Optional module-level debug toggle (can be controlled per-request via request.debug)
let MODULE_DEBUG = false;
const MAX_LLM_VALIDATION_WAIT_MS = 3500;
export function setTeacherBotDebug(flag) {
  MODULE_DEBUG = !!flag;
}

function hasDeterministicRuntimeFailure(outputText) {
  if (!outputText) return false;
  return /---\s*error\s*---|---\s*stderr\s*---|traceback|syntaxerror|exception|nameerror|no such table|typeerror|referenceerror/i.test(outputText);
}

function isCriticalErrorText(text) {
  if (!text) return false;
  return /traceback|syntaxerror|exception|nameerror|typeerror|referenceerror|no such table|failed|error:/i.test(String(text));
}

function normalizeTextForCompare(value) {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .replace(/\n+$/g, '');
}

function normalizeSqlForCompare(value) {
  return String(value || '')
    .replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/;+$/, '')
    .toLowerCase();
}

function buildNumericTemplate(line) {
  return line.replace(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi, '#');
}

function linesMatchWithNumericTolerance(expectedLine, actualLine) {
  if (expectedLine === actualLine) return true;

  const numberPattern = /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi;
  const expectedNumbers = (expectedLine.match(numberPattern) || []).map(Number);
  const actualNumbers = (actualLine.match(numberPattern) || []).map(Number);

  if (expectedNumbers.length === 0 || expectedNumbers.length !== actualNumbers.length) {
    return false;
  }

  if (buildNumericTemplate(expectedLine) !== buildNumericTemplate(actualLine)) {
    return false;
  }

  for (let i = 0; i < expectedNumbers.length; i += 1) {
    const exp = expectedNumbers[i];
    const act = actualNumbers[i];
    if (!Number.isFinite(exp) || !Number.isFinite(act)) return false;
    const tolerance = Math.max(0.02, Math.abs(exp) * 0.002);
    if (Math.abs(exp - act) > tolerance) {
      return false;
    }
  }

  return true;
}

function stdoutMatchesExpected(expectedStdout, actualStdout) {
  const expected = normalizeTextForCompare(expectedStdout);
  const actual = normalizeTextForCompare(actualStdout);

  if (expected === actual) return true;

  const expectedLines = expected.split('\n');
  const actualLines = actual.split('\n');
  if (expectedLines.length !== actualLines.length) return false;

  for (let i = 0; i < expectedLines.length; i += 1) {
    const exp = expectedLines[i];
    const act = actualLines[i];
    if (exp === act) continue;
    if (!linesMatchWithNumericTolerance(exp, act)) {
      // If exact per-line matching fails, allow expected lines as an ordered subset
      // so extra debug prints don't cause a false negative.
      let ai = 0;
      for (let ei = 0; ei < expectedLines.length; ei += 1) {
        const target = expectedLines[ei];
        let found = false;
        while (ai < actualLines.length) {
          const candidate = actualLines[ai];
          if (target === candidate || linesMatchWithNumericTolerance(target, candidate)) {
            found = true;
            ai += 1;
            break;
          }
          ai += 1;
        }
        if (!found) {
          return false;
        }
      }
      return true;
    }
  }

  return true;
}

function parseSimpleSelect(sql) {
  const normalized = normalizeSqlForCompare(sql);
  const match = normalized.match(/^select\s+(.+?)\s+from\s+([a-z_][a-z0-9_]*)$/i);
  if (!match) return null;

  const normalizeIdentifier = (value) => String(value || '')
    .replace(/[\[\]"'`]/g, '')
    .trim();

  const canonicalColumn = (value) => {
    const cleaned = normalizeIdentifier(value)
      .replace(/\s+as\s+/i, ' ')
      .split(/\s+/)[0]
      .trim();
    return cleaned;
  };

  const columns = match[1]
    .split(',')
    .map((c) => canonicalColumn(c))
    .filter(Boolean);
  const table = match[2].trim();

  if (!columns.length || !table) return null;
  return { columns, table };
}

function sqlMatchesExpected(expectedSql, actualSql) {
  const expected = normalizeSqlForCompare(expectedSql);
  const actual = normalizeSqlForCompare(actualSql);
  if (expected === actual) return true;

  const expSelect = parseSimpleSelect(expected);
  const actSelect = parseSimpleSelect(actual);
  if (!expSelect || !actSelect) return false;
  if (expSelect.table !== actSelect.table) return false;

  const expCols = expSelect.columns;
  const actCols = actSelect.columns;

  if (expCols.length !== actCols.length) return false;
  if (expCols.includes('*') || actCols.includes('*')) return false;

  const expSet = [...expCols].sort().join('|');
  const actSet = [...actCols].sort().join('|');
  return expSet === actSet;
}

function quickValidateAssignment(request) {
  const lastRun = request?.environment?.lastRun || {};
  const solution = request?.assignment?.solution || request?.solution || {};

  if (lastRun?.error || isCriticalErrorText(lastRun?.stderr)) {
    return {
      passed: false,
      score: 0,
      feedbackText: 'FAILED: Your code/query still produces an error. Fix the error output first and validate again.',
      suggestions: [
        'Start with the first error line.',
        'Fix one issue at a time.',
        'Run again until stderr/error is empty.'
      ],
      source: 'deterministic'
    };
  }

  if (typeof solution.expectedStdout === 'string' && solution.expectedStdout.length > 0) {
    const actual = lastRun.stdout || lastRun.consoleDisplay || '';
    const passed = stdoutMatchesExpected(solution.expectedStdout, actual);
    return {
      passed,
      score: passed ? 100 : 0,
      feedbackText: passed
        ? 'PASSED: Output matches the expected result exactly.'
        : 'FAILED: Output does not match the expected result yet.',
      suggestions: passed
        ? ['Great work. You can move to the next assignment.']
        : [
            'Compare each output line with the expected output.',
            'Check capitalization, punctuation, and spacing.',
            'Make sure you print only the required lines.'
          ],
      source: 'deterministic'
    };
  }

  if (typeof solution.expectedQuery === 'string' && solution.expectedQuery.length > 0) {
    const querySource = request?.codeFiles?.[0]?.source || request?.userCode || '';
    const passed = sqlMatchesExpected(solution.expectedQuery, querySource);
    return {
      passed,
      score: passed ? 100 : 0,
      feedbackText: passed
        ? 'PASSED: Your SQL query matches the expected solution.'
        : 'FAILED: Your SQL query does not match the expected query yet.',
      suggestions: passed
        ? ['Nice. The query structure is correct.']
        : [
            'Check selected columns and table name.',
            'Verify commas and SQL keywords.',
            'End the statement with a semicolon.'
          ],
      source: 'deterministic'
    };
  }

  return null;
}

function quickValidateOpenEndedAssignment(request) {
  const lastRun = request?.environment?.lastRun || {};
  const solution = request?.assignment?.solution || request?.solution || {};
  const hasExplicitExpected =
    typeof solution.expectedStdout === 'string' ||
    typeof solution.expectedQuery === 'string';

  if (hasExplicitExpected) return null;
  if (lastRun?.error || isCriticalErrorText(lastRun?.stderr)) {
    return {
      passed: false,
      score: 0,
      feedbackText: 'FAILED: Your program still has an error. Fix the error and validate again.',
      suggestions: [
        'Read the first error line carefully.',
        'Fix one issue at a time and run again.',
        'Validate again once there are no errors.'
      ],
      source: 'deterministic-open-ended'
    };
  }

  const code = request?.codeFiles?.[0]?.source || request?.userCode || '';
  const hasMeaningfulCode = String(code).trim().length >= 12;
  const runCompleted = lastRun?.status === 'completed';

  if (runCompleted && hasMeaningfulCode) {
    return {
      passed: true,
      score: 100,
      feedbackText: 'PASSED: Your solution runs without errors. This is an open-ended assignment, so correct implementations may vary.',
      suggestions: [
        'Great work. Compare your approach with the assignment notes.',
        'Optionally refactor for readability and naming.',
        'Test one extra edge case to be sure.'
      ],
      source: 'deterministic-open-ended'
    };
  }

  return null;
}

function createTimeoutPromise(ms) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve({ __timeout: true }), ms);
  });
}

/**
 * Ask TeacherBot a question about the current assignment/code.
 *
 * @param {Object} request - Request object with userQuestion, codeFiles, assignment, environment, debug
 * @returns {Promise<{feedbackText: string}>}
 */
export async function askQuestion(request) {
  if (!isEngineReady()) {
    throw new Error('TeacherBot is not ready. Please initialize it first.');
  }

  const engine = getEngine();
  const { contextText, hasError } = buildQuestionContext(request);
  const { systemPrompt, userPrompt } = buildAskPrompt(contextText, request.userQuestion, hasError);

  const debug = MODULE_DEBUG || !!request?.debug;
  if (debug) {
    console.log('[TeacherBot][askQuestion] CONTEXT:\n', contextText);
    console.log('[TeacherBot][askQuestion] SYSTEM PROMPT:\n', systemPrompt);
    console.log('[TeacherBot][askQuestion] USER PROMPT:\n', userPrompt);
  }

  try {
    const reply = await engine.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: hasError ? 0.1 : 0.15,
      max_tokens: 170,
    });

    if (debug) console.log('[TeacherBot][askQuestion] RAW REPLY:\n', reply);
    return parseAskResponse(reply);
  } catch (err) {
    console.error('Error asking Teacher:', err);
    throw err;
  }
}

/**
 * Ask TeacherBot to grade the user's code.
 *
 * @param {Object} request - Request object with assignmentText, userCode, debug
 * @returns {Promise<{passed: boolean|null, score: number|null, feedbackText: string, suggestions?: string[]}>}
 */
export async function gradeCode(request) {
  if (!isEngineReady()) {
    throw new Error('TeacherBot is not ready. Please initialize it first.');
  }

  const engine = getEngine();
  const { assignmentText, userCode, outputText } = buildGradeContext(request);
  const { systemPrompt, userPrompt } = buildGradePrompt(assignmentText, userCode, outputText);

  if (hasDeterministicRuntimeFailure(outputText)) {
    return {
      passed: false,
      score: 0,
      feedbackText: 'FAILED: Your code has a runtime or syntax error. Fix the error shown in the execution output and run again.',
      suggestions: [
        'Read the first error line carefully.',
        'Fix that issue before changing other code.',
        'Run again and ensure stderr/error is empty.'
      ]
    };
  }

  const debug = MODULE_DEBUG || !!request?.debug;
  if (debug) {
    console.log('[TeacherBot][gradeCode] ASSIGNMENT:\n', assignmentText);
    console.log('[TeacherBot][gradeCode] STUDENT CODE (truncated):\n', userCode);
    console.log('[TeacherBot][gradeCode] OUTPUT:\n', outputText);
    console.log('[TeacherBot][gradeCode] SYSTEM PROMPT:\n', systemPrompt);
    console.log('[TeacherBot][gradeCode] USER PROMPT:\n', userPrompt);
  }

  try {
    const reply = await engine.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.01,
      max_tokens: 120,
    });

    if (debug) console.log('[TeacherBot][gradeCode] RAW REPLY:\n', reply);
    return parseGradeResponse(reply);
  } catch (err) {
    console.error('Error grading with Teacher:', err);
    throw err;
  }
}

/**
 * Ask the teacher to validate whether the assignment is passed.
 *
 * @param {Object} request - Request object with assignment, codeFiles, environment, debug
 * @returns {Promise<{passed: boolean|null, feedbackText: string}>}
 */
export async function validateAssignment(request) {
  const quickValidation = quickValidateAssignment(request);
  if (quickValidation) {
    return quickValidation;
  }

  const quickOpenEndedValidation = quickValidateOpenEndedAssignment(request);
  if (quickOpenEndedValidation) {
    return quickOpenEndedValidation;
  }

  if (!isEngineReady()) {
    await initTeacherBot();
  }

  const llmValidationOrTimeout = await Promise.race([
    gradeCode(request),
    createTimeoutPromise(MAX_LLM_VALIDATION_WAIT_MS)
  ]);

  if (llmValidationOrTimeout && llmValidationOrTimeout.__timeout) {
    const lastRun = request?.environment?.lastRun || {};
    if (!lastRun?.error && !isCriticalErrorText(lastRun?.stderr)) {
      return {
        passed: true,
        score: 100,
        feedbackText: 'PASSED: Validation timeout reached, but your latest run completed without critical errors.',
        suggestions: [
          'Looks good. You can continue to the next step.',
          'If needed, run one extra self-test for confidence.'
        ],
        source: 'timeout-fallback'
      };
    }

    return {
      passed: false,
      score: 0,
      feedbackText: 'FAILED: Validation timed out and your latest run still shows errors.',
      suggestions: [
        'Fix runtime errors first.',
        'Then validate again.'
      ],
      source: 'timeout-fallback'
    };
  }

  const llmValidation = llmValidationOrTimeout;
  return {
    ...llmValidation,
    source: 'llm'
  };
}
