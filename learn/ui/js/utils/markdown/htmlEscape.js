//author: https://github.com/nhermab
//licence: MIT

/**
 * Escape HTML special characters for content.
 *
 * @param {string} str - Text to escape
 * @returns {string} HTML-escaped text
 */
export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Escape HTML special characters for attributes.
 *
 * @param {string} str - Text to escape
 * @returns {string} Attribute-safe escaped text
 */
export function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Normalize reference label for link/image definitions.
 *
 * @param {string} label - Reference label to normalize
 * @returns {string} Normalized label (trimmed, lowercase, collapsed whitespace)
 */
export function normalizeRefLabel(label) {
  return label.trim().toLowerCase().replace(/\s+/g, ' ');
}

