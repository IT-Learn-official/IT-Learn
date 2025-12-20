//author: https://github.com/nhermab
//licence: MIT
import { escapeHtml, escapeHtmlAttr, normalizeRefLabel } from './htmlEscape.js';

/**
 * Render inline markdown with code spans and other inline markup.
 * Tokenizes and renders inline code spans first, then non-code inline markup.
 *
 * @param {string} text - Inline text to render
 * @param {Object} refDefs - Reference definitions for links/images
 * @returns {string} Rendered HTML
 */
export function renderInline(text, refDefs) {
  if (!text) return '';
  const refs = refDefs || {};
  let out = '';
  let i = 0;
  const len = text.length;

  while (i < len) {
    const ch = text[i];
    if (ch === '`') {
      // Count backtick run length
      let runStart = i;
      while (i < len && text[i] === '`') i++;
      const runLen = i - runStart;
      // Find matching closing run of same length
      let searchPos = i;
      let closeStart = -1;
      while (searchPos < len) {
        if (text[searchPos] === '`') {
          let k = searchPos;
          while (k < len && text[k] === '`') k++;
          if (k - searchPos === runLen) {
            closeStart = searchPos;
            break;
          }
          searchPos = k;
        } else {
          searchPos++;
        }
      }
      if (closeStart === -1) {
        // No matching run; treat as literal
        out += escapeHtml(text.slice(runStart));
        break;
      }
      const codeContent = text.slice(i, closeStart);
      // Trim a single leading/trailing space as a simple CommonMark approximation
      let trimmed = codeContent;
      if (trimmed.length > 0 && trimmed[0] === ' ') trimmed = trimmed.slice(1);
      if (trimmed.length > 0 && trimmed[trimmed.length - 1] === ' ') trimmed = trimmed.slice(0, -1);
      out += `<code>${escapeHtml(trimmed)}</code>`;
      i = closeStart + runLen;
    } else {
      // Collect non-code until next backtick
      let j = i;
      while (j < len && text[j] !== '`') j++;
      const segment = text.slice(i, j);
      out += renderInlineNoCode(segment, refs);
      i = j;
    }
  }

  return out;
}

/**
 * Process inline markup other than code: links, images, emphasis.
 *
 * @param {string} text - Text to process
 * @param {Object} refDefs - Reference definitions
 * @returns {string} Rendered HTML
 */
export function renderInlineNoCode(text, refDefs) {
  if (!text) return '';
  let out = escapeHtml(text);
  const refs = refDefs || {};

  // Images - reference style first: ![alt][label]
  out = out.replace(/!\[([^\]]*)]\[(.*?)\]/g, (m, alt, label) => {
    const key = normalizeRefLabel(label || alt);
    const def = refs[key];
    if (!def) return m; // leave escaped markdown if missing
    const a = escapeHtmlAttr(alt || '');
    const h = escapeHtmlAttr(def.href || '');
    const t = def.title ? ` title="${escapeHtmlAttr(def.title)}"` : '';
    return `<img src="${h}" alt="${a}"${t}>`;
  });

  // Images - shortcut reference: ![alt][]
  out = out.replace(/!\[([^\]]*)]\[\]/g, (m, alt) => {
    const key = normalizeRefLabel(alt || '');
    const def = refs[key];
    if (!def) return m;
    const a = escapeHtmlAttr(alt || '');
    const h = escapeHtmlAttr(def.href || '');
    const t = def.title ? ` title="${escapeHtmlAttr(def.title)}"` : '';
    return `<img src="${h}" alt="${a}"${t}>`;
  });

  // Images - inline: ![alt](url "title") with simple URL & title support
  out = out.replace(/!\[([^\]]*)]\(([^\s)]+)(?:\s+("([^"]*)"|'([^']*)'|\(([^)]*)\)))?\)/g,
    (m, alt, href, _titleAll, t1, t2, t3) => {
      const title = t1 || t2 || t3 || '';
      const a = escapeHtmlAttr(alt || '');
      const h = escapeHtmlAttr(href || '');
      const t = title ? ` title="${escapeHtmlAttr(title)}"` : '';
      return `<img src="${h}" alt="${a}"${t}>`;
    });

  // Reference links: [text][label]
  out = out.replace(/\[([^\]]+)]\[(.*?)\]/g, (m, textPart, label) => {
    const key = normalizeRefLabel(label || textPart);
    const def = refs[key];
    if (!def) return m;
    const inner = renderInlineNoCode(textPart, refs);
    const h = escapeHtmlAttr(def.href || '');
    const t = def.title ? ` title="${escapeHtmlAttr(def.title)}"` : '';
    return `<a href="${h}"${t}>${inner}</a>`;
  });

  // Shortcut reference links: [text][]
  out = out.replace(/\[([^\]]+)]\[\]/g, (m, textPart) => {
    const key = normalizeRefLabel(textPart);
    const def = refs[key];
    if (!def) return m;
    const inner = renderInlineNoCode(textPart, refs);
    const h = escapeHtmlAttr(def.href || '');
    const t = def.title ? ` title="${escapeHtmlAttr(def.title)}"` : '';
    return `<a href="${h}"${t}>${inner}</a>`;
  });

  // Inline links [text](url "title") - simple, but with multiple title quoting styles
  out = out.replace(/\[([^\]]+)]\(([^\s)]+)(?:\s+("([^"]*)"|'([^']*)'|\(([^)]*)\)))?\)/g,
    (m, textPart, href, _titleAll, t1, t2, t3) => {
      const inner = renderInlineNoCode(textPart, refs);
      const h = escapeHtmlAttr(href || '');
      const title = t1 || t2 || t3 || '';
      const t = title ? ` title="${escapeHtmlAttr(title)}"` : '';
      return `<a href="${h}"${t}>${inner}</a>`;
    });

  // Basic emphasis & strong; still simplified but better ordered
  out = out
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');

  return out;
}

