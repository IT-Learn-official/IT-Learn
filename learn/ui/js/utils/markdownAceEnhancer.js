import { getCurrentPracticeEditor } from '../render/chapterView.js';

// Helper to upgrade rendered markdown code blocks into Ace-powered read-only editors.

function attachTeacherCodeToolbar(pre, editor) {
  // Only attach if this block lives inside a teacher/assistant message, to avoid
  // cluttering normal markdown code blocks elsewhere.
  const messageEl = pre.closest('.teacher-message-assistant');
  if (!messageEl) return;

  const toolbar = document.createElement('div');
  toolbar.className = 'teacher-code-toolbar';

  function createButton(className, label) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `teacher-code-btn ${className}`;
    btn.textContent = label;
    return btn;
  }

  const copyBtn = createButton('teacher-code-btn-copy', '📋 Copy');
  const loadBtn = createButton('teacher-code-btn-load', '📂 Load');
  const insertBtn = createButton('teacher-code-btn-insert', '➕ Insert');

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch (e) {
      // Fallback below.
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      // ignore
    }
    document.body.removeChild(ta);
  }

  copyBtn.addEventListener('click', () => {
    const code = editor.getValue();
    copyToClipboard(code);
  });

  loadBtn.addEventListener('click', () => {
    const targetEditor = getCurrentPracticeEditor && getCurrentPracticeEditor();
    if (!targetEditor) return;
    const code = editor.getValue();
    targetEditor.setValue(code || '', -1);
  });

  insertBtn.addEventListener('click', () => {
    const targetEditor = getCurrentPracticeEditor && getCurrentPracticeEditor();
    if (!targetEditor) return;
    const snippet = editor.getValue();
    const session = targetEditor.session;
    const existing = session.getValue();
    const needsNewline = existing && !existing.endsWith('\n');
    const toInsert = (needsNewline ? '\n' : '') + snippet;
    targetEditor.navigateFileEnd();
    targetEditor.insert(toInsert);
  });

  toolbar.appendChild(copyBtn);
  toolbar.appendChild(loadBtn);
  toolbar.appendChild(insertBtn);

  pre.insertBefore(toolbar, pre.firstChild);
}

export function upgradeMarkdownCodeBlocks(rootEl) {
  if (!rootEl) return;
  if (!window.ace) {
    // Ace not loaded; keep <pre><code> as-is.
    return;
  }

  const blocks = rootEl.querySelectorAll('pre.markdown-code-block');
  blocks.forEach((pre) => {
    if (pre.dataset.aceEnhanced === 'true') return;

    const codeEl = pre.querySelector('code');
    const rawCode = codeEl ? codeEl.textContent : pre.textContent;
    const aceMode = pre.dataset.aceMode || 'ace/mode/text';

    const editorHost = document.createElement('div');
    editorHost.className = 'markdown-ace-editor';
    editorHost.style.width = '100%';
    editorHost.style.height = '220px';

    // Clear out any existing children and insert the editor host.
    pre.innerHTML = '';
    pre.appendChild(editorHost);

    try {
      const editor = window.ace.edit(editorHost);
      editor.setTheme('ace/theme/ide-dark');
      editor.session.setMode(aceMode);
      editor.setValue(rawCode || '', -1); // -1 to move cursor to start
      editor.setReadOnly(true);
      editor.setOptions({
        highlightActiveLine: false,
        highlightGutterLine: false,
        showPrintMargin: false,
        maxLines: Infinity,
        showLineNumbers: true,
        showGutter: false,
      });
      // Prefer wrapping to avoid horizontal scrollbars for typical short snippets.
      editor.session.setUseWrapMode(false);
      editor.renderer.setVScrollBarAlwaysVisible(false);
      editor.renderer.setHScrollBarAlwaysVisible(false);

      // Attach teacher code actions toolbar if applicable.
      attachTeacherCodeToolbar(pre, editor);
      // Remove previous setPadding workaround
      // editor.renderer.setPadding(16);
      // Use CSS to add top and bottom padding to the Ace scroller
      editor.renderer.on('afterRender', function() {
        const scroller = editor.renderer.scroller;
        if (scroller) {
          //scroller.style.paddingTop = '16px';
          //scroller.style.paddingBottom = '16px';
        }
      });
    } catch (e) {
      console.warn('Failed to initialize Ace for markdown code block', e);
      // Fallback: restore basic code view if Ace fails.
      pre.innerHTML = '';
      const fallbackCode = document.createElement('code');
      fallbackCode.textContent = rawCode || '';
      pre.appendChild(fallbackCode);
      return;
    }

    pre.dataset.aceEnhanced = 'true';
  });
}
