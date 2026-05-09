//author: https://github.com/nhermab
//licence: MIT
//edited by: https://github.com/broodje565
import { resetProjectsState } from './projectsState.js';

const state = {
  coursesDoc: null, // full courses.json document
  courseLanguage: null, // language code used to load courses and course content (e.g. "en")
  selectedCourseId: null,
  selectedChapterId: null,
  selectedTab: 'theory',
  chapterContentCache: new Map(), // key: `${courseId}:${chapterId}`, value: { theory, quiz, practice }
  selectedPracticeAssignmentId: null,
  selectedPracticeTemplatePath: null,
  trialMode: {
    isActive: false,
    courseId: null,
    requiresRegistration: false,
  },
  onboardingRequired: false,
};

export function getState() {
  return state;
}

export function setCoursesDoc(coursesDoc) {
  state.coursesDoc = coursesDoc;
}

export function getCourseLanguage() {
  return state.courseLanguage;
}

export function setCourseLanguage(languageCode) {
  const next = languageCode ? String(languageCode).trim().toLowerCase() : null;
  if (state.courseLanguage === next) return;
  state.courseLanguage = next;

  // Clear language-dependent state (content is loaded from language-specific API paths).
  state.coursesDoc = null;
  state.selectedCourseId = null;
  state.selectedChapterId = null;
  state.selectedTab = 'theory';
  state.chapterContentCache.clear();
  state.selectedPracticeAssignmentId = null;
  state.selectedPracticeTemplatePath = null;

  resetProjectsState();
}

export function setSelection({ courseId, chapterId, tab }) {
  if (courseId !== undefined) state.selectedCourseId = courseId;
  if (chapterId !== undefined) state.selectedChapterId = chapterId;
  if (tab !== undefined) state.selectedTab = tab;

  // Reset practice-specific selection when changing chapter or course
  if (courseId !== undefined || chapterId !== undefined) {
    state.selectedPracticeAssignmentId = null;
    state.selectedPracticeTemplatePath = null;
  }
}

export function setChapterContent(courseId, chapterId, content) {
  const key = `${courseId}:${chapterId}`;
  const existing = state.chapterContentCache.get(key) || {};
  state.chapterContentCache.set(key, { ...existing, ...content });
}

export function getChapterContent(courseId, chapterId) {
  const key = `${courseId}:${chapterId}`;
  return state.chapterContentCache.get(key) || {};
}

export function setTrialMode(isActive, courseId = null, requiresRegistration = false) {
  state.trialMode = {
    isActive,
    courseId,
    requiresRegistration,
  };
}

export function getTrialMode() {
  return state.trialMode;
}

export function setTrialRequiresRegistration(value) {
  state.trialMode.requiresRegistration = value;
}

export function setOnboardingRequired(value) {
  state.onboardingRequired = Boolean(value);
}

export function isOnboardingRequired() {
  return Boolean(state.onboardingRequired);
}


export function setSelectedPracticeAssignmentId(assignmentId) {
  state.selectedPracticeAssignmentId = assignmentId;
}

export function setSelectedPracticeTemplatePath(path) {
  state.selectedPracticeTemplatePath = path;
}
