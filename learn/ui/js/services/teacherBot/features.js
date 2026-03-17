//author: https://github.com/nhermab
//licence: MIT
// TeacherBot feature implementations (ask, grade, validate)

import { getEngine, isEngineReady } from './engine.js';
import { buildAskPrompt, buildGradePrompt } from './prompts.js';
import { buildQuestionContext, buildGradeContext } from './contextBuilder.js';
import { parseAskResponse, parseGradeResponse } from './responseParser.js';

// Optional module-level debug toggle (can be controlled per-request via request.debug)
let MODULE_DEBUG = true;
export function setTeacherBotDebug(flag) {
  MODULE_DEBUG = !!flag;
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
      temperature: hasError ? 0.1 : 0.1,
      max_tokens: 330,
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
      max_tokens: 300,
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
  // Simplified: Delegate to gradeCode
  return gradeCode(request);
}
