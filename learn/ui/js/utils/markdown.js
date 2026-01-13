//author: https://github.com/nhermab
//licence: MIT
// Small markdown renderer for theory content.
// Supports: headings, paragraphs, code blocks, inline code, links, images, lists, blockquotes, etc.

import { parseBlocks } from './markdown/blockParser.js';
import { renderBlocks } from './markdown/blockRenderer.js';

/**
 * Render markdown to HTML wrapped in a markdown-body div.
 *
 * @param {string} markdown - Markdown text to render
 * @returns {string} HTML output
 */
export function renderMarkdownToHtml(markdown) {
  const { blocks, refDefs } = parseBlocks(markdown || '');
  const html = renderBlocks(blocks, refDefs);
  return `<div class="markdown-body">${html}</div>`;
}
