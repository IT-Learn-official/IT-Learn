//author: https://github.com/nhermab
//licence: MIT
// Prompt templates and builders for TeacherBot features

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
  "You are a helpful coding teacher.",
  "Grade the student's work based on the Assignment, Code, and Output.",
  "If the output matches the assignment requirements and the code is decent, say PASSED.",
  "If there are errors or the output is wrong, say FAILED.",
  "Provide a short feedback explaining your decision.",
  "Start your response with 'PASSED' or 'FAILED' followed by your feedback."
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

