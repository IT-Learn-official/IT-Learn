//author: https://github.com/nhermab
//licence: MIT
// Response parsing utilities for TeacherBot
//edited by: https://github.com/broodje565

/**
 * Parse a simple ask question response.
 *
 * @param {Object} reply - LLM reply object
 * @returns {{ feedbackText: string }}
 */
export function parseAskResponse(reply) {
  const content = reply?.choices?.[0]?.message?.content || '';
  return {
    feedbackText: content
  };
}

function extractJsonObject(text) {
  if (!text) return null;
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) return null;
  try {
    return JSON.parse(text.slice(first, last + 1));
  } catch {
    return null;
  }
}

/**
 * Parse grade response.
 *
 * @param {Object} reply - LLM reply object
 * @returns {{ passed: boolean|null, score: number|null, feedbackText: string, suggestions: string[]|undefined }}
 */
export function parseGradeResponse(reply) {
  const rawText = reply?.choices?.[0]?.message?.content || '';
  const parsed = extractJsonObject(rawText);

  const feedbackText = parsed?.feedback || rawText || 'No feedback provided.';
  const suggestions = Array.isArray(parsed?.suggestions)
    ? parsed.suggestions.filter(Boolean).slice(0, 3)
    : [];

  const normalizedResult = String(parsed?.result || '').trim().toUpperCase();
  let passed = null;

  if (normalizedResult === 'PASSED') {
    passed = true;
  } else if (normalizedResult === 'FAILED') {
    passed = false;
  } else {
    const firstLine = rawText.split('\n')[0] || '';
    if (/\bfailed\b/i.test(firstLine)) {
      passed = false;
    } else if (/\bpassed\b/i.test(firstLine)) {
      passed = true;
    } else if (/runtime error|syntax error|traceback|exception|not defined|no such table/i.test(rawText)) {
      passed = false;
    }
  }

  const score = passed === null ? null : (passed ? 100 : 0);

  return {
    passed,
    score,
    feedbackText,
    suggestions
  };
}


