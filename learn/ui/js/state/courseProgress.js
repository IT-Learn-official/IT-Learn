//author: https://github.com/nhermab
//licence: MIT
//edited by: https://github.com/broodje565
import { checkSession, loadProgress, saveProgress } from '../services/authService.js';

const LEGACY_READ_CHAPTERS_COOKIE = 'itskill_read_chapters';
const COURSE_READ_CHAPTERS_KEY = 'courseReadChapters';

let readChaptersByCourse = Object.create(null);
let hydratedForUserId = null;
let hydrationPromise = null;

function normalizeUserId(value) {
  const text = String(value || '').trim();
  return text || null;
}

function getCurrentUserId() {
  return normalizeUserId(typeof window !== 'undefined' ? window.currentUserId : null);
}

function ensureCourseSet(courseId) {
  const key = String(courseId || '').trim();
  if (!key) return null;
  if (!(readChaptersByCourse[key] instanceof Set)) {
    readChaptersByCourse[key] = new Set();
  }
  return readChaptersByCourse[key];
}

function parseReadMapFromProgress(progressPayload) {
  const result = Object.create(null);
  const progressRoot = progressPayload && typeof progressPayload.progress === 'object' ? progressPayload.progress : {};
  const rawReadMap = progressRoot && typeof progressRoot[COURSE_READ_CHAPTERS_KEY] === 'object'
    ? progressRoot[COURSE_READ_CHAPTERS_KEY]
    : {};

  Object.entries(rawReadMap || {}).forEach(([courseId, rawValue]) => {
    const set = new Set();

    if (Array.isArray(rawValue)) {
      rawValue.forEach((entry) => {
        const index = Number.parseInt(entry, 10);
        if (Number.isInteger(index) && index >= 0) {
          set.add(index);
        }
      });
    } else if (rawValue && typeof rawValue === 'object') {
      Object.entries(rawValue).forEach(([indexKey, isRead]) => {
        if (!isRead) return;
        const index = Number.parseInt(indexKey, 10);
        if (Number.isInteger(index) && index >= 0) {
          set.add(index);
        }
      });
    }

    if (set.size > 0) {
      result[String(courseId)] = set;
    }
  });

  return result;
}

function serializeReadMapForProgress(map) {
  const out = {};
  Object.entries(map).forEach(([courseId, set]) => {
    if (!(set instanceof Set) || set.size === 0) return;
    out[courseId] = Array.from(set).sort((a, b) => a - b);
  });
  return out;
}

function clearLegacyReadCookie() {
  if (typeof document === 'undefined') return;
  try {
    document.cookie = `${LEGACY_READ_CHAPTERS_COOKIE}=; path=/; max-age=0`;
  } catch {
    // Ignore cookie cleanup errors.
  }
}

async function persistReadMapToRemote() {
  const userId = getCurrentUserId();
  if (!userId) return;

  try {
    const remote = await loadProgress();
    const progressRoot = remote && typeof remote.progress === 'object' ? remote.progress : {};
    const nextProgressRoot = {
      ...progressRoot,
      [COURSE_READ_CHAPTERS_KEY]: serializeReadMapForProgress(readChaptersByCourse),
    };

    const payload = {
      ...(remote && typeof remote === 'object' ? remote : {}),
      progress: nextProgressRoot,
    };

    await saveProgress(payload);
  } catch (error) {
    console.error('Failed to persist read chapters to backend:', error);
  }
}

export async function hydrateCourseProgressFromRemote() {
  const userId = getCurrentUserId();
  if (!userId) {
    hydratedForUserId = null;
    readChaptersByCourse = Object.create(null);
    clearLegacyReadCookie();
    return;
  }

  if (hydratedForUserId === userId) return;
  if (hydrationPromise) {
    await hydrationPromise;
    if (hydratedForUserId === userId) return;
  }

  hydrationPromise = (async () => {
    try {
      const session = await checkSession();
      if (!session?.logged_in || normalizeUserId(session.user_id) !== userId) {
        readChaptersByCourse = Object.create(null);
        hydratedForUserId = userId;
        clearLegacyReadCookie();
        return;
      }

      const remote = await loadProgress();
      readChaptersByCourse = parseReadMapFromProgress(remote);
      hydratedForUserId = userId;
      clearLegacyReadCookie();
    } catch (error) {
      console.error('Failed to hydrate course progress from backend:', error);
      readChaptersByCourse = Object.create(null);
      hydratedForUserId = userId;
      clearLegacyReadCookie();
    }
  })();

  try {
    await hydrationPromise;
  } finally {
    hydrationPromise = null;
  }
}

export function isChapterRead(courseId, chapterIndex) {
  if (!courseId || chapterIndex == null || chapterIndex < 0) return false;
  const set = readChaptersByCourse[String(courseId)];
  return set instanceof Set ? set.has(chapterIndex) : false;
}

export function markChapterRead(courseId, chapterIndex, _totalChaptersHint) {
  if (!courseId || chapterIndex == null || chapterIndex < 0) return false;

  const set = ensureCourseSet(courseId);
  if (!set) return false;

  const wasAlreadyRead = set.has(chapterIndex);
  if (!wasAlreadyRead) {
    set.add(chapterIndex);
    void persistReadMapToRemote();
  }

  return wasAlreadyRead;
}

export function resetCourseProgressState() {
  readChaptersByCourse = Object.create(null);
  hydratedForUserId = null;
  hydrationPromise = null;
}

export function getChapterIndexForCourse(course, chapterId) {
  if (!course || !course.chapters || !course.chapters.length) return -1;
  const targetId = String(chapterId);
  for (let index = 0; index < course.chapters.length; index += 1) {
    const ch = course.chapters[index];
    const cid = ch.id || ch.chapterId || `chapter_${index + 1}`;
    if (String(cid) === targetId) return index;
  }
  return -1;
}
