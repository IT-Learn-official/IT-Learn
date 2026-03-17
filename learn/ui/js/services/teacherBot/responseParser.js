//author: https://github.com/nhermab
//licence: MIT
// Response parsing utilities for TeacherBot

/**
 * Parse a simple ask question response.
 *
 * @param {Object} reply - LLM reply object
 * @returns {{ feedbackText: string }}
 */
export function parseAskResponse(reply) {
  return {
    feedbackText: reply.choices[0].message.content
  };
}

/**
 * Parse grade response.
 *
 * @param {Object} reply - LLM reply object
 * @returns {{ passed: boolean|null, score: number|null, feedbackText: string, suggestions: string[]|undefined }}
 */
export function parseGradeResponse(reply) {
  const feedbackText = reply.choices[0].message.content;

  // Simple pass/fail check
  const passed = /pass(ed)?/i.test(feedbackText.split('\n')[0]);

  return {
    passed,
    score: passed ? 100 : 0,
    feedbackText,
    suggestions: []
  };
}


