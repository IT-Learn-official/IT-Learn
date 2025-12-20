//author: https://github.com/nhermab
//licence: MIT

const state = {
  coursesDoc: null, // full courses.json document
  selectedCourseId: null,
  selectedChapterId: null,
  selectedTab: 'theory',
  chapterContentCache: new Map(), // key: `${courseId}:${chapterId}`, value: { theory, quiz, practice }
  selectedPracticeAssignmentId: null,
  selectedPracticeTemplatePath: null,
};

export function getState() {
  return state;
}

export function setCoursesDoc(coursesDoc) {
  state.coursesDoc = coursesDoc;
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

export function setSelectedPracticeAssignment(assignmentId) {
  state.selectedPracticeAssignmentId = assignmentId;
}

export function setSelectedPracticeTemplatePath(path) {
  state.selectedPracticeTemplatePath = path;
}
