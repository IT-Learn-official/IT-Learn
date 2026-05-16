import { navigateTo } from '../state/router.js';
import { renderMarkdownToHtml } from '../utils/markdown.js';
import { upgradeMarkdownCodeBlocks } from '../utils/markdownAceEnhancer.js';
import { fetchProjectFile } from '../services/apiClient.js';
import { loadProjectGuide, loadProjectManifest } from '../services/projectsService.js';
import { markProjectOpened } from '../state/projectsProgress.js';

/* ── Helpers ───────────────────────────────────────────────────────── */

function storageKey(projectId, suffix) {
  const rawLocale = (document.documentElement.lang || navigator.language || 'en');
  const locale = String(rawLocale).toLowerCase().split('-')[0] || 'en';
  return `itlearn.${locale}.projects.${String(projectId)}.${suffix}`;
}

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function aceModeName(filename) {
  const ext = String(filename || '').split('.').pop().toLowerCase();
  const map = {
    html: 'html', htm: 'html',
    css: 'css',
    js: 'javascript', mjs: 'javascript',
    json: 'json',
    py: 'python',
    sql: 'sql',
    md: 'markdown',
    xml: 'xml', svg: 'xml',
    txt: 'text',
  };
  return map[ext] || 'text';
}

function fileIcon(filename) {
  const ext = String(filename || '').split('.').pop().toLowerCase();
  const map = { html: 'html', htm: 'html', css: 'css', js: 'js', mjs: 'js', json: 'json', md: 'md', py: 'py' };
  return map[ext] || 'file';
}

function stripInjectedCloudflareAnalytics(content) {
  if (typeof content !== 'string' || content.length === 0) return content;
  if (!content.includes('Cloudflare Pages Analytics') && !content.includes('static.cloudflareinsights.com/beacon.min.js')) return content;

  const injectedBlock =
    /<!--\s*Cloudflare Pages Analytics\s*-->\s*<script\b[^>]*\bsrc=(['"])https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js\1[^>]*>\s*<\/script>\s*<!--\s*Cloudflare Pages Analytics\s*-->/gi;
  const injectedScript =
    /<script\b(?=[^>]*\bsrc=(['"])https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js\1)(?=[^>]*\bdata-cf-beacon=)[^>]*>\s*<\/script>/gi;

  return content
    .replace(injectedBlock, '')
    .replace(injectedScript, '');
}

/* ── File tree ─────────────────────────────────────────────────────── */

function buildFileTree(files) {
  const root = { name: '', children: new Map(), file: null };
  (files || []).forEach((f) => {
    const p = String(f.path || '').replace(/^\/+/, '');
    if (!p) return;
    const parts = p.split('/').filter(Boolean);
    let node = root;
    parts.forEach((part, idx) => {
      if (!node.children.has(part)) {
        node.children.set(part, { name: part, children: new Map(), file: null });
      }
      node = node.children.get(part);
      if (idx === parts.length - 1) node.file = f;
    });
  });
  return root;
}

function renderTree(node, { onOpenFile, activeFile } = {}) {
  const ul = document.createElement('ul');
  ul.className = 'projects-tree';

  // Sort: folders first, then files, alphabetically
  const entries = Array.from(node.children.values()).sort((a, b) => {
    const aIsDir = a.children.size > 0 && !a.file;
    const bIsDir = b.children.size > 0 && !b.file;
    if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  entries.forEach((child) => {
    const li = document.createElement('li');

    if (child.file) {
      // File
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'projects-tree-file';
      btn.dataset.path = String(child.file.path || '');
      btn.dataset.icon = fileIcon(child.name);

      if (activeFile && String(child.file.path || '').replace(/^\/+/, '') === activeFile) {
        btn.classList.add('is-active');
      }

      const name = document.createElement('span');
      name.className = 'projects-tree-name';
      name.textContent = child.name;
      btn.appendChild(name);
      btn.addEventListener('click', () => onOpenFile?.(child.file));
      li.appendChild(btn);
    } else {
      // Folder
      const label = document.createElement('div');
      label.className = 'projects-tree-folder is-open';
      label.textContent = child.name;

      const subtree = renderTree(child, { onOpenFile, activeFile });

      label.addEventListener('click', () => {
        label.classList.toggle('is-open');
        subtree.style.display = label.classList.contains('is-open') ? '' : 'none';
      });

      li.appendChild(label);
      li.appendChild(subtree);
    }
    ul.appendChild(li);
  });
  return ul;
}

/* ── Guide task state ──────────────────────────────────────────────── */

function loadGuideTaskState(projectId) {
  return safeParse(localStorage.getItem(storageKey(projectId, 'guideTasks')), {});
}

function saveGuideTaskState(projectId, state) {
  localStorage.setItem(storageKey(projectId, 'guideTasks'), JSON.stringify(state || {}));
}

/* ── File state ────────────────────────────────────────────────────── */

function loadFileState(projectId) {
  return safeParse(localStorage.getItem(storageKey(projectId, 'files')), {});
}

function saveFileState(projectId, fileState) {
  localStorage.setItem(storageKey(projectId, 'files'), JSON.stringify(fileState || {}));
}

function debounceWithFlush(fn, wait) {
  let timer = null;
  let lastArgs = null;
  const debounced = function(...args) {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, lastArgs);
    }, wait);
  };
  debounced.flush = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, lastArgs);
    }
  };
  return debounced;
}

const debouncedSaveFileState = debounceWithFlush(saveFileState, 500);

/* ══════════════════════════════════════════════════════════════════════
   MAIN RENDER
   ══════════════════════════════════════════════════════════════════════ */

export async function renderProjectIdeView(rootEl, { projectId, file, view } = {}) {
  const pid = String(projectId || '').trim();
  if (!pid) {
    rootEl.innerHTML = '<p class="quiz-feedback is-incorrect">Missing project id.</p>';
    return;
  }

  markProjectOpened(pid);

  /* ── Screen shell ─────────────────────────────────────────────── */
  const screen = document.createElement('section');
  screen.className = 'screen projects-ide-screen';

  const header = document.createElement('header');
  header.className = 'screen-header';

  const headerContent = document.createElement('div');
  headerContent.className = 'screen-header-content-with-tabs';

  const actionGroup = document.createElement('div');
  actionGroup.className = 'tabs tabs-in-header';

  /* ── UI state ───────────────────────────────────────────────────── */
  const uiState = safeParse(localStorage.getItem(storageKey(pid, 'ui')), { previewOpen: true, explorerOpen: true });
  if (typeof uiState.previewOpen !== 'boolean') uiState.previewOpen = true;
  if (typeof uiState.explorerOpen !== 'boolean') uiState.explorerOpen = true;

  function saveUiState() {
    localStorage.setItem(storageKey(pid, 'ui'), JSON.stringify(uiState));
  }

  // SVG Icon Helper
  const getIcon = (name) => {
    const icons = {
      back: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
      guide: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>`,
      refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,
      close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
      panel: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>`
    };
    const svg = icons[name] || '';
    return svg ? svg.replace('<svg ', '<svg aria-hidden="true" focusable="false" ') : '';
  };


  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'btn-icon';
  backBtn.innerHTML = getIcon('back');
  backBtn.title = 'Back to Projects';
  backBtn.setAttribute('aria-label', 'Back to Projects');
  backBtn.addEventListener('click', () => navigateTo({ route: 'projects' }));

  const toggleGuideBtn = document.createElement('button');
  toggleGuideBtn.type = 'button';
  toggleGuideBtn.className = 'btn-icon';
  toggleGuideBtn.innerHTML = getIcon('guide');
  toggleGuideBtn.title = 'Project Guide';
  toggleGuideBtn.setAttribute('aria-label', 'Project Guide');

  const toggleExplorerBtn = document.createElement('button');
  toggleExplorerBtn.type = 'button';
  toggleExplorerBtn.className = 'btn-icon projects-ide-explorer-toggle';
  toggleExplorerBtn.innerHTML = getIcon('panel');
  toggleExplorerBtn.title = 'Toggle Explorer';
  toggleExplorerBtn.setAttribute('aria-label', 'Toggle Explorer');


  actionGroup.appendChild(backBtn);
  actionGroup.appendChild(toggleExplorerBtn);
  actionGroup.appendChild(toggleGuideBtn);

  const mainHeader = document.createElement('div');
  mainHeader.className = 'screen-header-main screen-header-main--align-right';

  const title = document.createElement('h2');
  title.className = 'screen-header-title';
  title.textContent = 'Project';

  const subtitle = document.createElement('p');
  subtitle.className = 'screen-header-subtitle';
  subtitle.textContent = 'Loading project...';

  mainHeader.appendChild(title);
  mainHeader.appendChild(subtitle);

  headerContent.appendChild(actionGroup);
  headerContent.appendChild(mainHeader);
  header.appendChild(headerContent);

  const body = document.createElement('div');
  body.className = 'screen-body';

  screen.appendChild(header);
  screen.appendChild(body);
  rootEl.appendChild(screen);

  /* ── Load manifest + guide ────────────────────────────────────── */
  let manifest;
  let guideMd;
  try {
    [manifest, guideMd] = await Promise.all([loadProjectManifest(pid), loadProjectGuide(pid)]);
  } catch (err) {
    console.error(err);
    body.innerHTML = '<div style="padding: 20px;"><p class="quiz-feedback is-incorrect">Failed to load project details.</p></div>';
    return;
  }

  title.textContent = manifest?.title || pid;
  subtitle.textContent = manifest?.description || 'Build step by step.';

  /* ── IDE layout ───────────────────────────────────────────────── */
  const layout = document.createElement('div');
  layout.className = 'projects-ide';

  // -- Sidebar (file tree) --
  const sidebar = document.createElement('div');
  sidebar.className = 'projects-ide-sidebar';

  const sidebarHeader = document.createElement('div');
  sidebarHeader.className = 'projects-ide-sidebar-header';
  sidebarHeader.textContent = 'Explorer';

  const sidebarBody = document.createElement('div');
  sidebarBody.className = 'projects-ide-sidebar-body';

  sidebar.appendChild(sidebarHeader);
  sidebar.appendChild(sidebarBody);

  // -- Main area (tabs + editor + preview) --
  const main = document.createElement('div');
  main.className = 'projects-ide-main';

  // Tab bar
  const tabBar = document.createElement('div');
  tabBar.className = 'projects-ide-tabs';

  // Editor + preview split
  const mainSplit = document.createElement('div');
  mainSplit.className = 'projects-ide-main-split';

  const editorHost = document.createElement('div');
  editorHost.className = 'projects-ide-editor';

  // Resize gutter
  const midResize = document.createElement('div');
  midResize.className = 'projects-ide-resize projects-ide-resize-mid';

  // Preview
  const previewWrap = document.createElement('div');
  previewWrap.className = 'projects-ide-preview';

  const previewTop = document.createElement('div');
  previewTop.className = 'projects-ide-preview-top';

  const previewTitle = document.createElement('div');
  previewTitle.className = 'projects-ide-preview-title';
  previewTitle.textContent = 'Live Preview';

  const previewRefresh = document.createElement('button');
  previewRefresh.type = 'button';
  previewRefresh.className = 'btn-icon projects-ide-preview-refresh';
  previewRefresh.innerHTML = getIcon('refresh');
  previewRefresh.title = 'Refresh preview';
  previewRefresh.setAttribute('aria-label', 'Refresh preview');

  previewTop.appendChild(previewTitle);
  previewTop.appendChild(previewRefresh);

  const previewFrame = document.createElement('iframe');
  previewFrame.className = 'projects-ide-preview-frame';
  previewFrame.setAttribute('title', 'Live preview');
  // Do not use `allow-same-origin` here to limit iframe access to host origin resources.
  // Scripts still run in the iframe via `allow-scripts` but the iframe is kept cross-origin.
  previewFrame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals allow-pointer-lock allow-popups allow-downloads');

  previewWrap.appendChild(previewTop);
  previewWrap.appendChild(previewFrame);

  mainSplit.appendChild(editorHost);
  mainSplit.appendChild(midResize);
  mainSplit.appendChild(previewWrap);

  // Status bar
  const statusBar = document.createElement('div');
  statusBar.className = 'projects-ide-statusbar';

  const statusFile = document.createElement('span');
  statusFile.className = 'projects-ide-statusbar-item';
  statusFile.textContent = 'No file open';

  const statusMode = document.createElement('span');
  statusMode.className = 'projects-ide-statusbar-item';
  statusMode.style.marginLeft = 'auto';
  statusMode.textContent = '';

  statusBar.appendChild(statusFile);
  statusBar.appendChild(statusMode);

  main.appendChild(tabBar);
  main.appendChild(mainSplit);
  main.appendChild(statusBar);

  layout.appendChild(sidebar);
  layout.appendChild(main);

  body.innerHTML = '';
  body.appendChild(layout);

  /* ── State ─────────────────────────────────────────────────────── */
  let activeFile = null;
  const fileState = loadFileState(pid);
  const openTabs = []; // array of file path strings
  let aceEditor = null;
  // uiState initialized above (needs pid in scope for toggle buttons)

  // If any HTML file content was cached while Cloudflare injected analytics,
  // scrub it now so the token never shows inside the IDE.
  {
    let changed = false;
    Object.keys(fileState || {}).forEach((p) => {
      const isHtml = /\.(html?)$/i.test(p);
      if (!isHtml) return;
      const value = fileState[p];
      if (typeof value !== 'string') return;
      const cleaned = stripInjectedCloudflareAnalytics(value);
      if (cleaned !== value) {
        fileState[p] = cleaned;
        changed = true;
      }
    });
    if (changed) saveFileState(pid, fileState);
  }

  /* ── Ace editor init ──────────────────────────────────────────── */
  function initAceEditor() {
    if (typeof ace === 'undefined') {
      console.warn('Ace editor not available, falling back to textarea');
      const ta = document.createElement('textarea');
      ta.className = 'projects-ide-textarea';
      ta.spellcheck = false;
      ta.autocapitalize = 'off';
      ta.autocomplete = 'off';
      ta.wrap = 'off';
      ta.style.cssText = 'width:100%;height:100%;flex:1;resize:none;border:0;outline:0;background:transparent;color:inherit;font:inherit;padding:12px;';
      editorHost.appendChild(ta);

      const listeners = new Set();
      ta.addEventListener('input', () => listeners.forEach((fn) => fn()));

      // Minimal adapter so the rest of the code can keep using aceEditor-like calls.
      return {
        __isTextareaFallback: true,
        el: ta,
        setReadOnly(v) { ta.readOnly = !!v; },
        setValue(v) { ta.value = String(v ?? ''); },
        getValue() { return ta.value; },
        focus() { ta.focus(); },
        resize() {},
        session: {
          on(evt, fn) {
            if (evt === 'change' && typeof fn === 'function') listeners.add(fn);
          },
          setMode() {},
          setUseWrapMode() {},
        },
      };
    }

    const editorDiv = document.createElement('div');
    editorDiv.style.cssText = 'width:100%;height:100%;flex:1;';
    editorHost.appendChild(editorDiv);

    const editor = ace.edit(editorDiv);
    editor.setTheme('ace/theme/ide-dark');
    editor.setOptions({
      fontSize: '14px',
      showPrintMargin: false,
      tabSize: 2,
      useSoftTabs: true,
      wrap: true,
      showGutter: true,
      highlightActiveLine: true,
      highlightGutterLine: true,
      animatedScroll: true,
      showFoldWidgets: true,
      fadeFoldWidgets: true,
      displayIndentGuides: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
    });

    // Auto-save on change
      editor.session.on('change', () => {
        if (!activeFile) return;
        fileState[activeFile] = editor.getValue();
        debouncedSaveFileState(pid, fileState);
        schedulePreviewRefresh();
      });

    return editor;
  }

  // Show empty state initially
  const emptyState = document.createElement('div');
  emptyState.className = 'projects-ide-empty-state';
  emptyState.innerHTML = `
    <div class="empty-icon">📂</div>
    <p>Select a file from the explorer to start editing</p>
  `;
  editorHost.appendChild(emptyState);

  /* ── Tab management ───────────────────────────────────────────── */
  function renderTabs() {
    tabBar.innerHTML = '';
    openTabs.forEach((path) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'projects-ide-tab';
      if (path === activeFile) tab.classList.add('is-active');

      const basename = path.split('/').pop();
      const label = document.createElement('span');
      label.textContent = basename;
      tab.appendChild(label);

      const closeBtn = document.createElement('span');
      closeBtn.className = 'projects-ide-tab-close';
      closeBtn.textContent = '×';
      closeBtn.title = 'Close tab';
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(path);
      });
      tab.appendChild(closeBtn);

      tab.addEventListener('click', () => switchToFile(path));
      tabBar.appendChild(tab);
    });
  }

  function openTab(path) {
    if (!openTabs.includes(path)) {
      openTabs.push(path);
    }
  }

  function closeTab(path) {
    const idx = openTabs.indexOf(path);
    if (idx === -1) return;
    openTabs.splice(idx, 1);

    if (activeFile === path) {
      // Switch to adjacent tab or show empty
      if (openTabs.length > 0) {
        const nextIdx = Math.min(idx, openTabs.length - 1);
        switchToFile(openTabs[nextIdx]);
      } else {
        activeFile = null;
        showEmptyState();
        updateStatusBar();
        renderTabs();
        updateFileTreeHighlight();
      }
    } else {
      renderTabs();
    }
  }

  function showEmptyState() {
    if (aceEditor) {
      aceEditor.setValue('', -1);
      aceEditor.setReadOnly(true);
    }
    // Re-add empty state if editor isn't initialized
    if (!aceEditor) {
      editorHost.innerHTML = '';
      editorHost.appendChild(emptyState);
    }
  }

  /* ── File switching ───────────────────────────────────────────── */
  async function switchToFile(path) {
    const cleanPath = String(path || '').replace(/^\/+/, '');
    if (!cleanPath) return;
    activeFile = cleanPath;

    // Ensure content is loaded
    if (typeof fileState[cleanPath] !== 'string') {
      try {
        const content = await fetchProjectFile(pid, cleanPath);
        fileState[cleanPath] = content;
        saveFileState(pid, fileState);
      } catch (err) {
        console.error(err);
        fileState[cleanPath] = `/* Failed to load ${cleanPath} */`;
      }
    }

    let content = fileState[cleanPath] || '';
    const isHtml = /\.(html?)$/i.test(cleanPath);
    if (isHtml) {
      const cleanedContent = stripInjectedCloudflareAnalytics(content);
      if (cleanedContent !== content) {
        content = cleanedContent;
        fileState[cleanPath] = cleanedContent;
        saveFileState(pid, fileState);
      }
    }

    // Initialize Ace if needed
    if (!aceEditor) {
      editorHost.innerHTML = '';
      aceEditor = initAceEditor();
    }

    if (aceEditor) {
      aceEditor.setReadOnly(false);
      aceEditor.setValue(content, -1);
      const mode = aceModeName(cleanPath);
      try {
        aceEditor.session.setMode(`ace/mode/${mode}`);
      } catch (err) {
        console.warn(`Ace mode not available: ${mode}`, err);
        aceEditor.session.setMode('ace/mode/text');
      }
      aceEditor.focus();
    }

    openTab(cleanPath);
    renderTabs();
    updateStatusBar();
    updateFileTreeHighlight();
    remember('files');
  }

  function updateStatusBar() {
    if (activeFile) {
      statusFile.textContent = `Path: ${activeFile}`;
      const mode = aceModeName(activeFile);
      statusMode.textContent = `Mode: ${mode.toUpperCase()}`;
    } else {
      statusFile.textContent = 'No file open';
      statusMode.textContent = '';
    }
  }

  function updateFileTreeHighlight() {
    sidebarBody.querySelectorAll('.projects-tree-file').forEach((btn) => {
      const p = String(btn.dataset.path || '').replace(/^\/+/, '');
      btn.classList.toggle('is-active', p === activeFile);
    });
  }

  /* ── File tree rendering ──────────────────────────────────────── */
  function renderFileTree() {
    const tree = buildFileTree(manifest?.files || []);
    sidebarBody.innerHTML = '';
    const treeEl = renderTree(tree, {
      onOpenFile: (fileEntry) => switchToFile(fileEntry.path),
      activeFile,
    });
    sidebarBody.appendChild(treeEl);
  }

  renderFileTree();

  /* ── Resize behaviour ─────────────────────────────────────────── */
  function makeDraggable(handle, onMove, { onStart, onEnd } = {}) {
    if (!handle) return;

    handle.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      handle.setPointerCapture?.(e.pointerId);

      onStart?.();
      document.body.classList.add('projects-ide-is-resizing');
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';

      const startX = e.clientX;
      const initialPreviewW = previewWrap?.offsetWidth || 0;

      function move(e2) {
        const dx = e2.clientX - startX;
        onMove(dx, { initialPreviewW });
      }

      function up(e2) {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', up);
        document.removeEventListener('pointercancel', up);
        try {
          handle.releasePointerCapture?.(e2.pointerId);
        } catch {
          // ignore
        }
        document.body.classList.remove('projects-ide-is-resizing');
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        onEnd?.();
        // Resize Ace editor if present
        if (aceEditor) aceEditor.resize();
      }

      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
      document.addEventListener('pointercancel', up);
    });
  }

  makeDraggable(
    midResize,
    (dx, { initialPreviewW }) => {
    const newW = Math.max(180, Math.round(initialPreviewW - dx));
    previewWrap.style.width = newW + 'px';
    previewWrap.style.flex = 'none';
    },
    {
      onStart: () => previewFrame?.classList?.add('is-resize-disabled'),
      onEnd: () => previewFrame?.classList?.remove('is-resize-disabled'),
    }
  );

  /* ── Panel state ──────────────────────────────────────────────── */
  function remember(viewName) {
    localStorage.setItem(storageKey(pid, 'lastView'), viewName);
    if (activeFile) localStorage.setItem(storageKey(pid, 'lastFile'), activeFile);
  }

  function applyPanelState() {
    mainSplit.classList.toggle('is-preview-collapsed', !uiState.previewOpen);
    layout.classList.toggle('is-explorer-collapsed', !uiState.explorerOpen);
  }

  applyPanelState();

  toggleExplorerBtn.addEventListener('click', () => {
    uiState.explorerOpen = !uiState.explorerOpen;
    saveUiState();
    applyPanelState();
    if (aceEditor) aceEditor.resize();
  });

  /* ── Guide modal ──────────────────────────────────────────────── */
  const guideModal = document.createElement('div');
  guideModal.className = 'projects-ide-guide-modal';
  guideModal.style.display = 'none';

  const modalContent = document.createElement('div');
  modalContent.className = 'projects-ide-guide-modal-content';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'projects-ide-guide-modal-header';

  const modalTitle = document.createElement('h3');
  modalTitle.style.margin = '0';
  modalTitle.style.fontSize = '16px';
  modalTitle.textContent = '📖 Project Guide';

  const closeModalBtn = document.createElement('button');
  closeModalBtn.type = 'button';
  closeModalBtn.className = 'btn-icon projects-ide-guide-close';
  closeModalBtn.innerHTML = getIcon('close');
  closeModalBtn.title = 'Close guide';
  closeModalBtn.setAttribute('aria-label', 'Close guide');
  closeModalBtn.addEventListener('click', () => {
    guideModal.style.display = 'none';
  });

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeModalBtn);

  const guideBox = document.createElement('div');
  guideBox.className = 'projects-ide-guidebox';
  guideBox.innerHTML = renderMarkdownToHtml(guideMd || '');
  upgradeMarkdownCodeBlocks(guideBox);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(guideBox);
  guideModal.appendChild(modalContent);
  body.appendChild(guideModal);

  // Close modal when clicking backdrop
  guideModal.addEventListener('click', (e) => {
    if (e.target === guideModal) {
      guideModal.style.display = 'none';
    }
  });

  // Guide task checkboxes
  const taskState = loadGuideTaskState(pid);
  const markdownBody = guideBox.querySelector('.markdown-body');
  if (markdownBody) {
    markdownBody.querySelectorAll('input[type="checkbox"][data-task-id]').forEach((cb) => {
      const id = cb.dataset.taskId;
      cb.checked = !!taskState[id];
      const li = cb.closest('li');
      if (li) li.classList.toggle('task-done', cb.checked);
    });

    markdownBody.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.type !== 'checkbox' || !target.dataset.taskId) return;
      taskState[target.dataset.taskId] = !!target.checked;
      saveGuideTaskState(pid, taskState);
      const li = target.closest('li');
      if (li) li.classList.toggle('task-done', target.checked);
    });
  }

  // Toggle guide button
  toggleGuideBtn.addEventListener('click', () => {
    guideModal.style.display = guideModal.style.display === 'none' ? 'flex' : 'none';
  });

  /* ── Live preview ─────────────────────────────────────────────── */
  function computePreviewHtml() {
    const entryPath = String(manifest?.entry || 'index.html');
    const html = typeof fileState[entryPath] === 'string' ? stripInjectedCloudflareAnalytics(fileState[entryPath]) : '';

    // Inline stylesheets
    const withCss = html.replace(/<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi, (m, href) => {
      const cleaned = String(href || '').replace(/^\.\//, '').replace(/^\/+/, '');
      const css = typeof fileState[cleaned] === 'string' ? fileState[cleaned] : '';
      return `<style>\n${css}\n</style>`;
    });

    // Inline scripts
    const withJs = withCss.replace(/<script\s+[^>]*src=["']([^"']+)["'][^>]*>\s*<\/script>/gi, (m, src) => {
      const cleaned = String(src || '').replace(/^\.\//, '').replace(/^\/+/, '');
      const js = typeof fileState[cleaned] === 'string' ? fileState[cleaned] : '';
      return `<script>\n${js}\n</script>`;
    });

    return withJs;
  }

  let previewTimer = null;

  function refreshPreview() {
    const entryPath = String(manifest?.entry || '');
    if (!entryPath) {
      previewWrap.style.display = 'none';
      return;
    }
    previewWrap.style.display = '';
    const out = computePreviewHtml();
    previewFrame.srcdoc = out;
  }

  function schedulePreviewRefresh() {
    if (previewTimer) window.clearTimeout(previewTimer);
    previewTimer = window.setTimeout(() => refreshPreview(), 400);
  }

  previewRefresh.addEventListener('click', refreshPreview);

  /* ── Load all project files ───────────────────────────────────── */
  const entryFiles = (manifest?.files || []).map((f) => String(f.path || '')).filter(Boolean);
  await Promise.all(
    entryFiles.map(async (p) => {
      if (typeof fileState[p] === 'string') return;
      try {
        const content = await fetchProjectFile(pid, p);
        fileState[p] = content;
      } catch {
        fileState[p] = '';
      }
    })
  );
  // Persist immediately after initial load to avoid data loss.
  saveFileState(pid, fileState);

  // Ensure any pending debounced save is flushed when the user leaves the page.
  window.addEventListener('beforeunload', () => {
    try {
      if (debouncedSaveFileState && typeof debouncedSaveFileState.flush === 'function') debouncedSaveFileState.flush();
    } catch (e) {
      // ignore
    }
  });

  /* ── Open initial file ────────────────────────────────────────── */
  const initialFile = file
    || localStorage.getItem(storageKey(pid, 'lastFile'))
    || manifest?.entry
    || (manifest?.files?.[0]?.path || null);

  if (initialFile) {
    await switchToFile(initialFile);
  }

  // Initial preview
  refreshPreview();
}

