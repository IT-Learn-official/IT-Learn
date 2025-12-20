//author: https://github.com/nhermab
//licence: MIT
import { escapeHtml, escapeHtmlAttr } from './htmlEscape.js';
import { renderInline } from './inlineParser.js';
import { parseBlocks } from './blockParser.js';

/**
 * Get Ace editor mode for a language hint.
 *
 * @param {string} lang - Language identifier
 * @returns {{ lang: string, ace: string }} Language and Ace mode
 */
function getAceModeForLang(lang) {
  const l = (lang || '').toLowerCase();
  if (l === 'python' || l === 'py' || !l) return { lang: l || 'python', ace: 'ace/mode/python' };
  if (l === 'js' || l === 'javascript') return { lang: l, ace: 'ace/mode/javascript' };
  return { lang: l || 'text', ace: 'ace/mode/text' };
}

/**
 * Render a code block to HTML with Ace integration.
 *
 * @param {string} text - Code content
 * @param {string} langHint - Language hint
 * @returns {string} Rendered HTML
 */
function renderCodeBlock(text, langHint) {
  const mode = getAceModeForLang(langHint || '');
  const code = escapeHtml(text || '');
  return `<pre class="markdown-code-block" data-language="${escapeHtmlAttr(mode.lang)}" data-ace-mode="${escapeHtmlAttr(mode.ace)}"><code>${code}</code></pre>`;
}

/**
 * Render parsed blocks to HTML.
 *
 * @param {Array} blocks - Parsed block structures
 * @param {Object} refDefs - Reference definitions
 * @returns {string} Rendered HTML
 */
export function renderBlocks(blocks, refDefs) {
  const htmlParts = blocks.map((block) => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${renderInline(block.text, refDefs)}</p>`;
      case 'heading': {
        const level = Math.min(Math.max(block.level || 1, 1), 6);
        return `<h${level}>${renderInline(block.text, refDefs)}</h${level}>`;
      }
      case 'code_fenced':
        return renderCodeBlock(block.text, block.lang);
      case 'code_indented':
        return renderCodeBlock(block.text, '');
      case 'hr':
        return '<hr />';
      case 'list': {
        const tag = block.ordered ? 'ol' : 'ul';
        const startAttr = block.ordered && block.start && block.start !== 1 ? ` start="${block.start}"` : '';
        // Mark list as task-list if any item has checked != null
        const isTaskList = block.items.some((item) => item.checked !== null && item.checked !== undefined);
        const listClass = isTaskList ? ' class="task-list"' : '';
        const itemsHtml = block.items.map((item, index) => {
          const inner = renderInline(item.text, refDefs);
          if (item.checked === null || item.checked === undefined) {
            return `<li>${inner}</li>`;
          }
          const checkedAttr = item.checked ? ' checked' : '';
          const taskId = `${index}`;
          const liClass = item.checked ? ' class="task-list-item task-done"' : ' class="task-list-item"';
          const checkbox = `<input type="checkbox" data-task-id="${escapeHtmlAttr(taskId)}"${checkedAttr}>`;
          return `<li${liClass}>${checkbox} ${inner}</li>`;
        }).join('');
        return `<${tag}${startAttr}${listClass}>${itemsHtml}</${tag}>`;
      }
      case 'blockquote': {
        const inner = renderMarkdownInner(block.text, refDefs);
        return `<blockquote>${inner}</blockquote>`;
      }
      default:
        return '';
    }
  });

  return htmlParts.join('\n');
}

/**
 * Render markdown with existing reference definitions (for nested content).
 *
 * @param {string} markdown - Markdown text
 * @param {Object} existingRefDefs - Existing reference definitions
 * @returns {string} Rendered HTML
 */
export function renderMarkdownInner(markdown, existingRefDefs) {
  const { blocks, refDefs } = parseBlocks(markdown);
  const mergedRefs = Object.assign({}, existingRefDefs || {}, refDefs);
  return renderBlocks(blocks, mergedRefs);
}

