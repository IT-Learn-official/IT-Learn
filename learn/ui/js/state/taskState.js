//author: https://github.com/nhermab
//licence: MIT

const STORAGE_PREFIX = 'taskState:';

function makeKey(courseId, chapterId) {
  return `${STORAGE_PREFIX}${courseId || ''}:${chapterId || ''}`;
}

export function loadTaskState(courseId, chapterId) {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  const key = makeKey(courseId, chapterId);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
    return {};
  } catch (e) {
    console.warn('Failed to load task state', e);
    return {};
  }
}

export function saveTaskState(courseId, chapterId, state) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const key = makeKey(courseId, chapterId);
  try {
    window.localStorage.setItem(key, JSON.stringify(state || {}));
  } catch (e) {
    console.warn('Failed to save task state', e);
  }
}

export function updateTaskState(courseId, chapterId, taskId, checked) {
  const current = loadTaskState(courseId, chapterId);
  const next = { ...current, [taskId]: !!checked };
  saveTaskState(courseId, chapterId, next);
  return next;
}
