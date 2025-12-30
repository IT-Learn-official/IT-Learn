//author: https://github.com/nhermab
//licence: MIT
import { getState, getChapterContent, setChapterContent, getTrialMode } from '../state/appState.js';
import { fetchChapterQuiz } from '../services/apiClient.js';
import { ensureQuizLoaded, renderQuiz } from './quiz.js';
import { getChapterIndexForCourse, markChapterRead } from '../state/courseProgress.js';
import { renderTheoryTab } from './theoryTab.js';
import { renderPracticeTab } from './practice/practiceTabRenderer.js';
import { triggerChapterComplete } from './chapterView.js';

export async function renderChapterView({ headerTitleEl, headerSubtitleEl, tabButtons, tabContentEl }) {
  const state = getState();
  const { coursesDoc, selectedCourseId, selectedChapterId, selectedTab } = state;

  if (!coursesDoc || !coursesDoc.courses) {
    if (headerTitleEl) headerTitleEl.textContent = 'Loading courses...';
    if (headerSubtitleEl) headerSubtitleEl.textContent = '';
    if (tabContentEl) tabContentEl.innerHTML = '<p class="muted">Loading...</p>';
    return;
  }

  const course = coursesDoc.courses.find((c) => c.id === selectedCourseId) || null;

  if (!course || !selectedChapterId) {
    if (headerTitleEl) headerTitleEl.textContent = 'Select a chapter';
    if (headerSubtitleEl) headerSubtitleEl.textContent = 'Choose a course and chapter to get started.';
    if (tabContentEl) tabContentEl.innerHTML = '<p class="muted">No chapter selected yet.</p>';
    setActiveTabButton(tabButtons, null);
    return;
  }

  const chapter = (course.chapters || []).find((ch, index) => {
    const chapterId = ch.id || ch.chapterId || `chapter_${index + 1}`;
    return String(chapterId) === String(selectedChapterId);
  }) || null;

  if (!chapter) {
    if (headerTitleEl) headerTitleEl.textContent = 'Chapter not found';
    if (headerSubtitleEl) headerSubtitleEl.textContent = 'The selected chapter does not exist.';
    if (tabContentEl) tabContentEl.innerHTML = '<p class="muted">Please pick another chapter.</p>';
    setActiveTabButton(tabButtons, null);
    return;
  }

  const trialMode = getTrialMode();
  const chapterIndex = getChapterIndexForCourse(course, selectedChapterId);
  if (trialMode.isActive && chapterIndex > 0) {
    if (headerTitleEl) headerTitleEl.textContent = chapter.title || 'Chapter';
    if (headerSubtitleEl) headerSubtitleEl.textContent = course.title || '';
    setActiveTabButton(tabButtons, selectedTab);
    
    tabContentEl.innerHTML = `
      <div class="trial-restricted-content">
        <div class="trial-lock-icon">🔒</div>
        <h2>Keep Learning For Free</h2>
        <p>Great start! Create a free account to unlock every chapter in this course and keep your progress synced.</p>
        <ul class="trial-benefits">
          <li>All chapters unlocked instantly</li>
          <li>Progress and streaks saved</li>
          <li>Practice and quizzes included</li>
        </ul>
        <a href="/signup.html?trial=completed" class="btn btn-primary" style="margin-top: 1rem;">Create Free Account</a>
      </div>
    `;
    return;
  }

  if (chapterIndex >= 0) {
    const wasRead = markChapterRead(selectedCourseId, chapterIndex, course.chapters.length);
    if (!wasRead) {
      triggerChapterComplete();
    }
  }

  if (headerTitleEl) headerTitleEl.textContent = chapter.title || 'Chapter';
  if (headerSubtitleEl) headerSubtitleEl.textContent = course.title || '';

  setActiveTabButton(tabButtons, selectedTab);

  if (selectedTab === 'quiz') {
    await renderQuizTab(course, chapter, tabContentEl);
  } else if (selectedTab === 'practice') {
    await renderPracticeTab(course, chapter, tabContentEl);
  } else {
    await renderTheoryTabDelegate(course, chapter, tabContentEl);
  }
}

function setActiveTabButton(tabButtons, tab) {
  if (!tabButtons) return;
  tabButtons.forEach((button) => {
    if (tab && button.dataset.tab === tab) {
      button.classList.add('is-active');
    } else {
      button.classList.remove('is-active');
    }
  });
}

async function renderTheoryTabDelegate(course, chapter, tabContentEl) {
  const state = getState();
  const { selectedCourseId, selectedChapterId } = state;

  await renderTheoryTab({
    course,
    chapter,
    container: tabContentEl,
    courseId: selectedCourseId,
    chapterId: selectedChapterId,
  });
}

async function renderQuizTab(course, chapter, tabContentEl) {
  const state = getState();
  const { selectedCourseId, selectedChapterId } = state;
  tabContentEl.innerHTML = '<p class="muted">Loading quiz...</p>';

  try {
    const { quiz } = await ensureQuizLoaded({
      course,
      chapter,
      courseId: selectedCourseId,
      chapterId: selectedChapterId,
      getChapterContent,
      setChapterContent,
      fetchChapterQuiz,
    });
    renderQuiz({ container: tabContentEl, quiz });
  } catch (error) {
    console.error(error);
    tabContentEl.innerHTML = '<p class="quiz-feedback is-incorrect">Failed to load quiz.</p>';
  }
}
