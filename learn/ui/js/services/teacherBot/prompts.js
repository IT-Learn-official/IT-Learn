//author: https://github.com/nhermab
//licence: MIT
// Prompt templates and builders for TeacherBot features
//edited by: https://github.com/broodje565

/**
 * System prompt for asking questions.
 */
export const ASK_SYSTEM_PROMPT = [
  "You are a smart, concise coding teacher. Keep responses under 250 words.",
  "CAREFULLY read the error message and code before responding.",
  "If there's an error, identify the EXACT line and explain what's wrong.",
  "Look for common mistakes: typos, undefined variables, syntax errors, logic errors.",
  "When showing code fixes, use markdown fenced blocks with language tags (e.g., ```python).",
  "Be direct and focused. Answer exactly what the student asked.",
  "Guide students to understand the problem, don't just give solutions.",
  "If you're not sure, ask the student to clarify or run the code to see the error."
].join(' ');

/**
 * System prompt for grading code.
 */
export const GRADE_SYSTEM_PROMPT = [
  "You are a strict and fair coding grader.",
  "Evaluate based only on Assignment, Student Code, and Execution Output.",
  "If output is wrong, runtime/syntax error exists, or assignment requirements are not met: failed=true.",
  "If requirements are met and output is correct: failed=false.",
  "Respond with JSON only, no markdown, no extra text.",
  "Use this exact shape: {\"result\":\"PASSED\"|\"FAILED\",\"feedback\":\"short explanation\",\"suggestions\":[\"item\",\"item\"]}",
  "Keep feedback under 80 words and suggestions to max 3 concise items."
].join(' ');



/**
 * Build prompt for asking a question.
 *
 * @param {string} contextText - Assembled context text
 * @param {string} question - User's question
 * @param {boolean} hasError - Whether there's an error in the context
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
export function buildAskPrompt(contextText, question, hasError) {
  let instructions = '';
  if (hasError) {
    instructions = '\n[Your task: Read the error message, examine the code, find the exact mistake, and explain how to fix it briefly.]\n';
  }

  const userPrompt = contextText
    ? contextText + instructions + '\n=== QUESTION ===\n' + question
    : question;

  return {
    systemPrompt: ASK_SYSTEM_PROMPT,
    userPrompt
  };
}

/**
 * Build prompt for grading code.
 *
 * @param {string} assignmentText - Assignment description
 * @param {string} userCode - Student's code
 * @param {string} outputText - Execution output
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
export function buildGradePrompt(assignmentText, userCode, outputText) {
  const userPrompt = `Assignment:
${assignmentText}

Student's Code:
\`\`\`
${userCode}
\`\`\`

Execution Output:
\`\`\`
${outputText}
\`\`\`

Grade this student submission (Student's Code AND Execution Output). Is it correct?`;

  return {
    systemPrompt: GRADE_SYSTEM_PROMPT,
    userPrompt
  };
}

