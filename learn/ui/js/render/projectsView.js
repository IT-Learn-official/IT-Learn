import { navigateTo } from '../state/router.js';
import { loadProjectsDoc } from '../services/projectsService.js';
import { getRecentProjects } from '../state/projectsProgress.js';
import { getCourseLanguage, setCourseLanguage } from '../state/appState.js';
import { getCourseLanguageOptions } from '../services/courseLanguageService.js';
import { escapeHtml, escapeHtmlAttr } from '../utils/markdown/htmlEscape.js';

function normalizeTag(tag) {
  return String(tag || '').trim();
}

function uniqueSorted(values) {
  const set = new Set(values.filter(Boolean));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function buildProjectCard(project, { onOpen } = {}) {
  const card = document.createElement('button');
  card.className = 'projects-card';
  card.type = 'button';

  const safeTitle = escapeHtml(String(project.title || project.id || ''));
  const safeDifficultyRaw = String(project.difficulty || 'Easy');
  const safeDifficultyText = escapeHtml(safeDifficultyRaw);
  const safeDifficultyClass = escapeHtmlAttr(safeDifficultyRaw.toLowerCase());
  const safeDesc = escapeHtml(String(project.description || ''));
  const safeTags = (project.tags || []).map((t) => escapeHtml(String(t)));

  card.innerHTML = `
    <div class="projects-card-top">
      <h3 class="projects-card-title">${safeTitle}</h3>
      <span class="projects-difficulty projects-difficulty--${safeDifficultyClass}">${safeDifficultyText}</span>
    </div>
    <p class="projects-card-desc">${safeDesc}</p>
    <div class="projects-card-tags">
      ${safeTags.map(t => `<span class="projects-pill">${t}</span>`).join('')}
    </div>
  `;

  card.addEventListener('click', () => onOpen?.(project));
  return card;
}

function buildFilterBar({ difficulties, tags, currentLang, onFilterChange, onLanguageChange } = {}) {
  const bar = document.createElement('div');
  bar.className = 'projects-filters';

  const langHtml = getCourseLanguageOptions()
    .map(l => `<option value="${l.code}" ${l.code === currentLang ? 'selected' : ''}>${l.label}</option>`)
    .join('');

  bar.innerHTML = `
    <label class="projects-filter">
      Language
      <select class="projects-filter-select" id="lang-sel">${langHtml}</select>
    </label>
    <label class="projects-filter">
      Difficulty
      <select class="projects-filter-select" id="diff-sel">
        <option value="">All</option>
        ${difficulties.map(d => `<option value="${escapeHtmlAttr(String(d))}">${escapeHtml(String(d))}</option>`).join('')}
      </select>
    </label>
    <label class="projects-filter">
      Tag
      <select class="projects-filter-select" id="tag-sel">
        <option value="">All</option>
        ${tags.map(t => `<option value="${escapeHtmlAttr(String(t))}">${escapeHtml(String(t))}</option>`).join('')}
      </select>
    </label>
  `;

  bar.querySelector('#lang-sel').addEventListener('change', (e) => onLanguageChange?.(e.target.value));
  bar.querySelector('#diff-sel').addEventListener('change', (e) => onFilterChange?.({ difficulty: e.target.value }));
  bar.querySelector('#tag-sel').addEventListener('change', (e) => onFilterChange?.({ tag: e.target.value }));

  return bar;
}

export async function renderProjectsView(rootEl) {
  const screen = document.createElement('section');
  screen.className = 'screen';
  screen.innerHTML = `
    <header class="screen-header">
      <div class="screen-header-main screen-header-main--align-right">
        <h2 class="screen-header-title">Projects</h2>
        <p class="screen-header-subtitle">Build real-world apps step by step.</p>
      </div>
    </header>
    <div class="screen-body" id="proj-body">
      <p class="muted">Loading projects...</p>
    </div>
  `;
  rootEl.appendChild(screen);

  const body = screen.querySelector('#proj-body');

  async function loadAndRender({ force = false } = {}) {
    body.innerHTML = '<p class="muted">Loading projects...</p>';
    const currentLang = (getCourseLanguage() || 'en').toLowerCase();
    
    let doc = null;
    try {
      doc = force ? await loadProjectsDoc({ force: true }) : await loadProjectsDoc();
    } catch (err) {
      console.error('Fetch failed:', err);
    }

    const projects = (doc && Array.isArray(doc.projects)) ? doc.projects : [];
    body.innerHTML = '';

    const difficulties = uniqueSorted(projects.map(p => p.difficulty || 'Easy'));
    const tags = uniqueSorted(projects.flatMap(p => p.tags || []).map(normalizeTag));

    const filterState = { difficulty: '', tag: '' };

    const filterBar = buildFilterBar({
      difficulties,
      tags,
      currentLang,
      onLanguageChange: async (lang) => {
        setCourseLanguage(lang);
        await loadAndRender({ force: true });
      },
      onFilterChange: (next) => {
        if (next.difficulty !== undefined) filterState.difficulty = next.difficulty;
        if (next.tag !== undefined) filterState.tag = next.tag;
        updateDisplay();
      }
    });
    body.appendChild(filterBar);

    const container = document.createElement('div');
    container.id = 'proj-container';
    body.appendChild(container);

    function updateDisplay() {
      container.innerHTML = '';
      
      const filtered = projects.filter(p => {
        if (filterState.difficulty && p.difficulty !== filterState.difficulty) return false;
        if (filterState.tag && !(p.tags || []).map(normalizeTag).includes(filterState.tag)) return false;
        return true;
      });

      if (projects.length === 0) {
        container.innerHTML = `<p class="muted" style="margin-top: 20px;">No projects found in your library for "${currentLang.toUpperCase()}".</p>`;
        return;
      }

      if (filtered.length === 0) {
        container.innerHTML = '<p class="muted" style="margin-top: 20px;">No projects match your filters.</p>';
        return;
      }

      const recentIds = getRecentProjects();
      const recentItems = filtered.filter(p => recentIds.includes(String(p.id)));
      const allItems = filtered.filter(p => !recentIds.includes(String(p.id)));

      if (recentItems.length > 0) {
        const sect = document.createElement('div');
        sect.className = 'projects-section';
        sect.innerHTML = '<h3 class="projects-section-title">Continue Building</h3>';
        const grid = document.createElement('div');
        grid.className = 'projects-grid';
        recentItems.forEach(p => grid.appendChild(buildProjectCard(p, {
          onOpen: () => navigateTo({ route: 'project', projectId: p.id })
        })));
        sect.appendChild(grid);
        container.appendChild(sect);
      }

      if (allItems.length > 0) {
        const sect = document.createElement('div');
        sect.className = 'projects-section';
        sect.innerHTML = '<h3 class="projects-section-title">All Projects</h3>';
        const grid = document.createElement('div');
        grid.className = 'projects-grid';
        allItems.forEach(p => grid.appendChild(buildProjectCard(p, {
          onOpen: () => navigateTo({ route: 'project', projectId: p.id })
        })));
        sect.appendChild(grid);
        container.appendChild(sect);
      }
    }

    updateDisplay();
  }

  await loadAndRender({ force: true });
}
