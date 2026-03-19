//author: https://github.com/nhermab
//licence: MIT

const taskStateCache = new Map();

function makeKey(courseId, chapterId) {
  return `${courseId || ''}:${chapterId || ''}`;
}

export function loadTaskState(courseId, chapterId) {
  const key = makeKey(courseId, chapterId);
  const cached = taskStateCache.get(key);
  if (cached && typeof cached === 'object') return { ...cached };
  return {};
}

export function saveTaskState(courseId, chapterId, state) {
  const key = makeKey(courseId, chapterId);
  taskStateCache.set(key, state && typeof state === 'object' ? { ...state } : {});
}

export function updateTaskState(courseId, chapterId, taskId, checked) {
  const current = loadTaskState(courseId, chapterId);
  const next = { ...current, [taskId]: !!checked };
  saveTaskState(courseId, chapterId, next);
  return next;
}
