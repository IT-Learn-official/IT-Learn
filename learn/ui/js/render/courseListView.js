//author: https://github.com/nhermab
//licence: MIT
import { navigateTo } from '../state/router.js';
import { getState } from '../state/appState.js';
import { isChapterRead } from '../state/courseProgress.js';

export function renderCoursesScreen(container) {
  const state = getState();
  const { coursesDoc, selectedCourseId } = state;

  container.innerHTML = '';

  const list = document.createElement('ul');
  list.className = 'list';

  if (!coursesDoc || !coursesDoc.courses || coursesDoc.courses.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No courses available.';
    li.className = 'muted';
    list.appendChild(li);
  } else {
    coursesDoc.courses.forEach((course) => {
      const li = document.createElement('li');
      li.className = 'list-item';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'list-button' + (course.id === selectedCourseId ? ' is-active' : '');
      button.textContent = course.title;
      button.addEventListener('click', () => {
        navigateTo({ route: 'courses', courseId: course.id, tab: 'theory' });
      });
      li.appendChild(button);
      list.appendChild(li);
    });
  }

  container.appendChild(list);
}

export function renderChaptersScreen(container, course) {
  container.innerHTML = '';

  const list = document.createElement('ul');
  list.className = 'list';

  if (!course) {
    const li = document.createElement('li');
    li.textContent = 'Select a course to see chapters.';
    li.className = 'muted';
    list.appendChild(li);
  } else if (!course.chapters || course.chapters.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No chapters defined for this course.';
    li.className = 'muted';
    list.appendChild(li);
  } else {
    course.chapters.forEach((chapter, index) => {
      const chapterId = chapter.id || chapter.chapterId || `chapter_${index + 1}`;
      const chapterNumber = index + 1;

      const li = document.createElement('li');
      li.className = 'list-item';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'list-button chapter-list-button';

      const main = document.createElement('div');
      main.className = 'chapter-list-main';

      const numberEl = document.createElement('span');
      numberEl.className = 'chapter-list-number';
      numberEl.textContent = `${chapterNumber}.`;

      const textWrap = document.createElement('div');
      textWrap.className = 'chapter-list-text';

      const titleEl = document.createElement('span');
      titleEl.className = 'chapter-list-title';
      titleEl.textContent = chapter.title || chapter.id || `Chapter ${chapterNumber}`;

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
        badge.textContent = 'Read';
        main.appendChild(badge);
      }

      button.appendChild(main);

      button.addEventListener('click', () => {
        navigateTo({ route: 'chapter', courseId: course.id, chapterId, tab: 'theory' });
      });

      li.appendChild(button);
      list.appendChild(li);
    });
  }

  container.appendChild(list);
}
