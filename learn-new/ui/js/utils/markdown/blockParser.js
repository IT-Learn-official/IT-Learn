//author: https://github.com/nhermab
//licence: MIT
import { normalizeRefLabel } from './htmlEscape.js';

/**
 * Parse markdown into block structures and reference definitions.
 *
 * @param {string} markdown - Raw markdown text
 * @returns {{ blocks: Array, refDefs: Object }} Parsed blocks and reference definitions
 */
export function parseBlocks(markdown) {
  const lines = markdown.split(/\r?\n/);
  let i = 0;
  let startIndex = 0;

  // YAML front matter at top: --- ... ---
  if (lines.length && lines[0].trim() === '---') {
    for (i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        startIndex = i + 1;
        break;
      }
    }
    if (!startIndex) {
      startIndex = 0; // no closing fence, treat as normal text
    }
  }

  const blocks = [];
  const refDefs = {};

  function addParagraph(text) {
    if (!text.trim()) return;
    blocks.push({ type: 'paragraph', text });
  }

  let pendingParagraph = '';

  function flushParagraph() {
    if (pendingParagraph && pendingParagraph.trim()) {
      addParagraph(pendingParagraph.trim());
      pendingParagraph = '';
    }
  }

  // Helper to detect hr according to simplified CommonMark rules
  function isHr(line) {
    const m = line.match(/^ {0,3}([*_\-])( *\1){2,}\s*$/);
    return !!m;
  }

  for (i = startIndex; i < lines.length; i++) {
    let line = lines[i];

    // Reference definitions
    let refMatch = line.match(/^ {0,3}\[([^\]]+)]:\s+(\S+)(?:\s+("([^"]*)"|'([^']*)'|\(([^)]*)\)))?\s*$/);
    if (refMatch) {
      const label = refMatch[1];
      const href = refMatch[2];
      const title = refMatch[4] || refMatch[5] || refMatch[6] || '';
      refDefs[normalizeRefLabel(label)] = { href, title };
      continue;
    }

    // Fenced code blocks ```lang or ~~~lang
    let fenceMatch = line.match(/^ {0,3}(```+|~~~+)([^`]*)$/);
    if (fenceMatch) {
      flushParagraph();
      const fence = fenceMatch[1][0];
      const langInfo = (fenceMatch[2] || '').trim();
      const lang = langInfo.split(/\s+/)[0] || '';
      const fenceMarker = fence === '`' ? /^( {0,3}```+\s*)$/ : /^( {0,3}~~~+\s*)$/;
      const codeLines = [];
      i++;
      while (i < lines.length && !fenceMarker.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: 'code_fenced', lang, text: codeLines.join('\n') });
      continue;
    }

    // Horizontal rule
    if (isHr(line)) {
      flushParagraph();
      blocks.push({ type: 'hr' });
      continue;
    }

    // Setext heading (look ahead one line)
    if (i + 1 < lines.length && lines[i].trim() && !lines[i].match(/^ {0,3}#/)) {
      const next = lines[i + 1];
      const setextMatch = next.match(/^ {0,3}(=+|-+)\s*$/);
      if (setextMatch) {
        flushParagraph();
        const level = setextMatch[1].startsWith('=') ? 1 : 2;
        blocks.push({ type: 'heading', level, text: line.trim() });
        i++; // skip underline
        continue;
      }
    }

    // ATX headings
    let atxMatch = line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (atxMatch) {
      flushParagraph();
      const level = atxMatch[1].length;
      const text = atxMatch[2];
      blocks.push({ type: 'heading', level, text });
      continue;
    }

    // Blockquote
    let bqMatch = line.match(/^ {0,3}> ?(.*)$/);
    if (bqMatch) {
      flushParagraph();
      const quoteLines = [bqMatch[1]];
      let j = i + 1;
      for (; j < lines.length; j++) {
        const cont = lines[j];
        const m = cont.match(/^ {0,3}> ?(.*)$/);
        if (m) {
          quoteLines.push(m[1]);
        } else if (!cont.trim()) {
          quoteLines.push('');
        } else {
          break;
        }
      }
      i = j - 1;
      blocks.push({ type: 'blockquote', text: quoteLines.join('\n') });
      continue;
    }

    // Lists (unordered/ordered + tasks)
    const uListMatch = line.match(/^ {0,3}([*+-]) +(.+)$/);
    const oListMatch = line.match(/^ {0,3}(\d+)\. +(.+)$/);
    if (uListMatch || oListMatch) {
      flushParagraph();
      const ordered = !!oListMatch;
      const items = [];
      let start = ordered ? parseInt(oListMatch[1], 10) : undefined;
      let j = i;
      while (j < lines.length) {
        const l = lines[j];
        const mU = l.match(/^ {0,3}([*+-]) +(.+)$/);
        const mO = l.match(/^ {0,3}(\d+)\. +(.+)$/);
        if (ordered ? !!mO : !!mU) {
          let textContent = (ordered ? mO[2] : mU[2]);
          let checked = null;
          const taskMatch = textContent.match(/^\[( |x|X)\] +(.*)$/);
          if (taskMatch) {
            checked = taskMatch[1].toLowerCase() === 'x';
            textContent = taskMatch[2];
          }
          const itemLines = [textContent];
          j++;
          while (j < lines.length && /^ {2,}\S?/.test(lines[j]) && !/^ {0,3}([*+-]) +/.test(lines[j]) && !/^ {0,3}(\d+)\. +/.test(lines[j])) {
            itemLines.push(lines[j].replace(/^ {2}/, ''));
            j++;
          }
          items.push({ text: itemLines.join('\n'), checked });
        } else {
          break;
        }
      }
      blocks.push({ type: 'list', ordered, start, items });
      i = j - 1;
      continue;
    }

    // Indented code block (4 spaces or a tab)
    const indentMatch = line.match(/^(?: {4}|\t)(.*)$/);
    if (indentMatch) {
      flushParagraph();
      const codeLines = [indentMatch[1]];
      let j = i + 1;
      for (; j < lines.length; j++) {
        const m = lines[j].match(/^(?: {4}|\t)(.*)$/);
        if (!m) break;
        codeLines.push(m[1]);
      }
      blocks.push({ type: 'code_indented', text: codeLines.join('\n') });
      i = j - 1;
      continue;
    }

    // Blank line: paragraph separator
    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    // Accumulate paragraph text
    if (pendingParagraph) pendingParagraph += ' ' + line.trim();
    else pendingParagraph = line.trim();
  }

  flushParagraph();

  return { blocks, refDefs };
}

