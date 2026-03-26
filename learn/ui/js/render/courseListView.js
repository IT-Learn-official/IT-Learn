//author: https://github.com/nhermab
//licence: MIT
//edited by: https://github.com/broodje565 and https://github.com/superman2775
import { navigateTo } from '../state/router.js';
import { getState, getCourseLanguage, setCourseLanguage } from '../state/appState.js';
import { isChapterRead } from '../state/courseProgress.js';
import { getTrialMode } from '../state/appState.js';
import { startTrialCourse } from '../services/trialMode.js';
import { createTrialBadge } from './trialRegistrationModal.js';
import { getCoins, getHearts, getInventory, getQuests, getStreak } from '../state/gamificationState.js';
import { getCourseLanguageOptions, setStoredCourseLanguage } from '../services/courseLanguageService.js';
import { loadCoursesDoc } from '../services/coursesService.js';

export function renderCoursesScreen(container) {
  const state = getState();
  const { coursesDoc, selectedCourseId } = state;
  const trialMode = getTrialMode();

  container.innerHTML = '';

  if (!coursesDoc || !coursesDoc.courses || coursesDoc.courses.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No courses available.';
    empty.className = 'muted';
    container.appendChild(empty);
    return;
  }

  const courses = coursesDoc.courses;
  const activeCourse = courses.find((course) => String(course.id) === String(selectedCourseId)) || courses[0];

  const dashboard = document.createElement('div');
  dashboard.className = 'learn-dashboard';

  const left = document.createElement('section');
  left.className = 'learn-main';

  left.appendChild(buildActiveUnitCard(activeCourse, courses, trialMode));
  left.appendChild(buildPath(activeCourse, trialMode));

  const right = document.createElement('aside');
  right.className = 'learn-rail';
  right.appendChild(buildQuickStatsCard());
  right.appendChild(buildDailyMissionsCard());
  right.appendChild(buildInventoryCard());

  dashboard.appendChild(left);
  dashboard.appendChild(right);
  container.appendChild(dashboard);
}

function getCourseFlag(course) {
  const id = String(course?.id || '').toLowerCase();
  const title = String(course?.title || '').toLowerCase();
  if (id.includes('python') || title.includes('python')) return '🐍';
  if (id.includes('sql') || title.includes('sql')) return '🗃️';
  if (id.includes('html') || title.includes('html')) return '🌐';
  if (id.includes('css') || title.includes('css')) return '🎨';
  if (id.includes('git') || title.includes('git')) return '🧭';
  return '📚';
}

function buildActiveUnitCard(course, courses, trialMode) {
  const card = document.createElement('article');
  card.className = 'learn-unit-card';

  const chapters = Array.isArray(course?.chapters) ? course.chapters : [];
  const totalLessons = chapters.length;
  let doneLessons = 0;
  for (let i = 0; i < totalLessons; i += 1) {
    if (isChapterRead(course.id, i)) doneLessons += 1;
  }
  const currentLesson = totalLessons > 0 ? Math.min(totalLessons, doneLessons + 1) : 1;

  const top = document.createElement('div');
  top.className = 'learn-unit-top';

  const unitInfo = document.createElement('div');
  unitInfo.className = 'learn-unit-info';
  unitInfo.innerHTML = `
    <span class="learn-unit-label">SECTION ${Math.max(1, Math.ceil(currentLesson / 4))}, LESSON ${currentLesson}</span>
    <h3 class="learn-unit-title">${course.title || 'Your path'}</h3>
  `;

  const pickerStack = document.createElement('div');
  pickerStack.className = 'learn-picker-stack';

  const coursePicker = document.createElement('label');
  coursePicker.className = 'learn-course-picker';
  coursePicker.setAttribute('aria-label', 'Choose course');

  const courseFlag = document.createElement('span');
  courseFlag.className = 'learn-language-flag';
  courseFlag.textContent = getCourseFlag(course);

  const courseSelect = document.createElement('select');
  courseSelect.className = 'learn-language-select';
  courses.forEach((entry) => {
    const option = document.createElement('option');
    option.value = String(entry.id);
    option.textContent = entry.title || String(entry.id);
    if (String(entry.id) === String(course.id)) option.selected = true;
    courseSelect.appendChild(option);
  });

  courseSelect.addEventListener('change', () => {
    const selectedId = courseSelect.value;
    const selectedCourse = courses.find((entry) => String(entry.id) === String(selectedId));
    if (selectedCourse) courseFlag.textContent = getCourseFlag(selectedCourse);
    if (trialMode.isActive) startTrialCourse(selectedId);
    navigateTo({ route: 'courses', courseId: selectedId, tab: 'theory' });
  });

  coursePicker.appendChild(courseFlag);
  coursePicker.appendChild(courseSelect);

  const languagePicker = document.createElement('label');
  languagePicker.className = 'learn-language-picker';
  languagePicker.setAttribute('aria-label', 'Choose course language');

  const languageFlag = document.createElement('span');
  languageFlag.className = 'learn-language-flag';

  function languageEmoji(code) {
    const cleaned = String(code || '').trim().toLowerCase();
    if (cleaned === 'en') return '☕';
    if (cleaned === 'nl') return '🌷';
    if (cleaned === 'de') return '🥨';
    if (cleaned === 'fr') return '🥐';
    return '🌐';
  }

  const languageOptions = getCourseLanguageOptions();
  const activeLang = getCourseLanguage() || 'en';
  languageFlag.textContent = languageEmoji(activeLang);

  const languageSelect = document.createElement('select');
  languageSelect.className = 'learn-language-select';
  languageOptions.forEach((lang) => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.available ? lang.label : `${lang.label} (soon)`;
    option.disabled = !lang.available;
    if (String(lang.code) === String(activeLang)) option.selected = true;
    languageSelect.appendChild(option);
  });

  languageSelect.addEventListener('change', async () => {
    const nextLang = String(languageSelect.value || '').trim().toLowerCase();
    languageFlag.textContent = languageEmoji(nextLang);

    languageSelect.disabled = true;
    courseSelect.disabled = true;

    setStoredCourseLanguage(nextLang);
    setCourseLanguage(nextLang);

    try {
      await loadCoursesDoc();
      window.dispatchEvent(new Event('app:rerender'));
    } catch (error) {
      console.error('Failed to load courses for language', nextLang, error);
      languageSelect.disabled = false;
      courseSelect.disabled = false;
    }
  });

  languagePicker.appendChild(languageFlag);
  languagePicker.appendChild(languageSelect);

  pickerStack.appendChild(coursePicker);
  pickerStack.appendChild(languagePicker);

  top.appendChild(unitInfo);
  top.appendChild(pickerStack);
  card.appendChild(top);

  if (trialMode.isActive) {
    const badgeEl = createTrialBadge(true);
    if (badgeEl) card.appendChild(badgeEl);
  }

  return card;
}

function buildPath(course, trialMode) {
  const pathWrap = document.createElement('div');
  pathWrap.className = 'learn-path-wrap';

  pathWrap.appendChild(buildPathLegend());

  const path = document.createElement('div');
  path.className = 'learn-path';

  const chapters = Array.isArray(course.chapters) ? course.chapters : [];
  let firstUnreadIndex = chapters.findIndex((_, idx) => !isChapterRead(course.id, idx));
  if (firstUnreadIndex < 0) firstUnreadIndex = chapters.length - 1;

  chapters.forEach((chapter, index) => {
    const chapterId = chapter.id || chapter.chapterId || `chapter_${index + 1}`;
    const isDone = isChapterRead(course.id, index);
    const isCurrent = index === firstUnreadIndex;
    const progressLocked = index > firstUnreadIndex;
    const trialLocked = trialMode.isActive && index > 0;
    const isLocked = progressLocked || trialLocked;
    const variant = index % 4;

    const node = document.createElement('div');
    node.className = `learn-node-row ${index % 2 === 0 ? 'left' : 'right'}`;
    node.style.setProperty('--node-index', String(index));

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `learn-node learn-node--v${variant} ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''} ${isLocked ? 'is-locked' : ''}`;
    btn.disabled = isLocked;
    btn.setAttribute('aria-label', `Lesson ${index + 1}: ${chapter.title || `Lesson ${index + 1}`}${isLocked ? ' (locked)' : isDone ? ' (done)' : isCurrent ? ' (current)' : ''}`);

    const icon = document.createElement('span');
    icon.className = 'learn-node-icon';
    icon.textContent = isLocked ? '🔒' : String(index + 1);

    btn.appendChild(icon);

    if (!isLocked) {
      btn.addEventListener('click', () => {
        navigateTo({ route: 'chapter', courseId: course.id, chapterId, tab: 'theory' });
      });
    }

    const label = document.createElement('div');
    label.className = 'learn-node-label';
    label.innerHTML = `
      <span class="learn-node-label-index">Lesson ${index + 1}</span>
      <span class="learn-node-label-title">${chapter.title || `Lesson ${index + 1}`}</span>
    `;

    node.appendChild(btn);
    node.appendChild(label);

    path.appendChild(node);
  });

  pathWrap.appendChild(path);
  return pathWrap;
}

function buildPathLegend() {
  const legend = document.createElement('div');
  legend.className = 'learn-path-legend';
  legend.innerHTML = `
    <span class="learn-path-legend-item"><span class="learn-path-legend-dot is-current"></span>Current lesson</span>
    <span class="learn-path-legend-item"><span class="learn-path-legend-dot is-done"></span>Done</span>
    <span class="learn-path-legend-item"><span class="learn-path-legend-dot is-locked"></span>Locked</span>
  `;
  return legend;
}

function buildQuickStatsCard() {
  const hearts = getHearts();
  const coins = getCoins();
  const streak = getStreak();

  const card = document.createElement('article');
  card.className = 'learn-rail-card learn-quick-stats';
  card.innerHTML = `
    <div class="learn-stat-item"><span>🔥</span><strong>${streak.current}</strong></div>
    <div class="learn-stat-item"><span>❤️</span><strong>${hearts.current}</strong></div>
    <div class="learn-stat-item"><span>🪙</span><strong>${coins}</strong></div>
  `;
  return card;
}

function buildDailyMissionsCard() {
  const quests = getQuests().slice(0, 3);

  const card = document.createElement('article');
  card.className = 'learn-rail-card learn-missions-card';

  const title = document.createElement('h4');
  title.textContent = 'Daily missions';
  card.appendChild(title);

  quests.forEach((quest) => {
    const percent = Math.min(100, Math.round((quest.progress / quest.target) * 100));
    const row = document.createElement('div');
    row.className = `learn-mission-row${quest.completed ? ' is-done' : ''}`;
    row.innerHTML = `
      <span class="learn-mission-icon">${quest.icon}</span>
      <div class="learn-mission-main">
        <span class="learn-mission-label">${quest.label}</span>
        <div class="learn-mission-bar"><div style="width:${percent}%"></div></div>
      </div>
      <span class="learn-mission-reward">+${quest.reward}</span>
    `;
    card.appendChild(row);
  });

  return card;
}

function buildInventoryCard() {
  const inventory = getInventory();

  const card = document.createElement('article');
  card.className = 'learn-rail-card learn-inventory-card';
  card.innerHTML = `
    <h4>Inventory</h4>
    <div class="learn-inventory-row">
      <span>🧊 Streak freezes</span>
      <strong>${inventory.streakFreezes || 0}</strong>
    </div>
    <div class="learn-inventory-row">
      <span>🚀 2x XP boosts</span>
      <strong>${inventory.doubleXp || 0}</strong>
    </div>
    <button type="button" class="learn-shop-btn">Open Shop</button>
  `;

  const button = card.querySelector('.learn-shop-btn');
  if (button) {
    button.addEventListener('click', () => navigateTo({ route: 'store' }));
  }

  return card;
}

export function renderChaptersScreen(container, course) {
  container.innerHTML = '';

  const list = document.createElement('ul');
  list.className = 'list';

  if (!course) {
    const li = document.createElement('li');
    li.textContent = 'Select a course to see its lessons.';
    li.className = 'muted';
    list.appendChild(li);
  } else if (!course.chapters || course.chapters.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No lessons defined for this course.';
    li.className = 'muted';
    list.appendChild(li);
  } else {
    const trialMode = getTrialMode();
    let firstUnreadIndex = course.chapters.findIndex((_, idx) => !isChapterRead(course.id, idx));
    if (firstUnreadIndex < 0) firstUnreadIndex = course.chapters.length - 1;

    course.chapters.forEach((chapter, index) => {
      const chapterId = chapter.id || chapter.chapterId || `chapter_${index + 1}`;
      const chapterNumber = index + 1;
      const progressLocked = index > firstUnreadIndex;
      const trialLocked = trialMode.isActive && index > 0;
      const isLocked = progressLocked || trialLocked;

      const li = document.createElement('li');
      li.className = 'list-item';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'list-button chapter-list-button';
      button.disabled = isLocked;
      if (isLocked) {
        button.classList.add('is-locked');
      }

      const main = document.createElement('div');
      main.className = 'chapter-list-main';

      const numberEl = document.createElement('span');
      numberEl.className = 'chapter-list-number';
      numberEl.textContent = `${chapterNumber}.`;

      const textWrap = document.createElement('div');
      textWrap.className = 'chapter-list-text';

      const titleEl = document.createElement('span');
      titleEl.className = 'chapter-list-title';
      titleEl.textContent = chapter.title || chapter.id || `Lesson ${chapterNumber}`;

      const descriptionText = chapter.description || '';
      if (descriptionText) {
        const descEl = document.createElement('span');
        descEl.className = 'chapter-list-description';
        descEl.textContent = descriptionText;
        textWrap.appendChild(titleEl);
        textWrap.appendChild(descEl);
      } else {
        textWrap.appendChild(titleEl);
      }

      main.appendChild(numberEl);
      main.appendChild(textWrap);

      // Read marker
      const read = isChapterRead(course.id, index);
      if (read) {
        button.classList.add('is-read');
        const badge = document.createElement('span');
        badge.className = 'chapter-list-read-badge';
        badge.textContent = 'Done';
        main.appendChild(badge);
      } else if (isLocked) {
        const badge = document.createElement('span');
        badge.className = 'chapter-list-read-badge';
        badge.textContent = 'Locked';
        main.appendChild(badge);
      }

      button.appendChild(main);

      button.addEventListener('click', () => {
        if (isLocked) return;
        navigateTo({ route: 'chapter', courseId: course.id, chapterId, tab: 'theory' });
      });

      li.appendChild(button);
      list.appendChild(li);
    });
  }

  container.appendChild(list);
}

