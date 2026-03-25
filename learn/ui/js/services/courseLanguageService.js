export const COURSE_LANGUAGE_STORAGE_KEY = 'it-learn:course-language';

const COURSE_LANGUAGES = [
  { code: 'en', label: 'English', available: true },
  { code: 'nl', label: 'Dutch', available: true },
  { code: 'fr', label: 'French', available: false },
  { code: 'de', label: 'German', available: true },
];

export function getCourseLanguageOptions() {
  return COURSE_LANGUAGES.slice();
}

export function isKnownCourseLanguage(code) {
  const cleaned = String(code || '').trim().toLowerCase();
  return COURSE_LANGUAGES.some((lang) => lang.code === cleaned);
}

export function isAvailableCourseLanguage(code) {
  const cleaned = String(code || '').trim().toLowerCase();
  return COURSE_LANGUAGES.some((lang) => lang.code === cleaned && lang.available);
}

export function getStoredCourseLanguage() {
  try {
    const value = localStorage.getItem(COURSE_LANGUAGE_STORAGE_KEY);
    const cleaned = value ? String(value).trim().toLowerCase() : '';
    return isKnownCourseLanguage(cleaned) ? cleaned : null;
  } catch (error) {
    return null;
  }
}

export function setStoredCourseLanguage(code) {
  const cleaned = code ? String(code).trim().toLowerCase() : '';
  if (!cleaned || !isKnownCourseLanguage(cleaned)) return;
  try {
    localStorage.setItem(COURSE_LANGUAGE_STORAGE_KEY, cleaned);
  } catch (error) {
    // ignore storage failures (private mode, restricted environments)
  }
}

export function guessInitialCourseLanguage() {
  try {
    const browser = String(navigator?.language || '').toLowerCase();
    const candidate = browser.split('-')[0];
    if (isKnownCourseLanguage(candidate)) return candidate;
  } catch (error) {
    // ignore
  }
  return 'en';
}
