//author: https://github.com/nhermab
//licence: MIT
import { getCourseLanguage } from '../state/appState.js';

const DEFAULT_LANGUAGE = 'en';

function getApiLanguage() {
  const lang = getCourseLanguage();
  return lang ? String(lang) : DEFAULT_LANGUAGE;
}

function apiPath(path) {
  const lang = encodeURIComponent(getApiLanguage());
  const cleaned = String(path || '').replace(/^\//, '');
  return `api/${lang}/${cleaned}`;
}

async function fetchJson(url) {
  const separator = String(url).includes('?') ? '&' : '?';
  const buster = `${separator}_cb=${Date.now()}`;
  const response = await fetch(`${url}${buster}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${url}`);
  }
  return response.json();
}

async function fetchText(url) {
  const separator = String(url).includes('?') ? '&' : '?';
  const buster = `${separator}_cb=${Date.now()}`;
  const response = await fetch(`${url}${buster}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${url}`);
  }
  return response.text();
}




export async function fetchCourses() {
  return fetchJson(apiPath('courses.json'));
}

export async function fetchProjects() {
  return fetchJson(apiPath('projects.json'));
}

export async function fetchProjectManifest(projectId) {
  const cleaned = encodeURIComponent(String(projectId || ''));
  return fetchJson(apiPath(`projects/${cleaned}/manifest.json`));
}

export async function fetchProjectGuide(projectId) {
  const cleaned = encodeURIComponent(String(projectId || ''));
  return fetchText(apiPath(`projects/${cleaned}/guide.md`));
}

export async function fetchProjectFile(projectId, filePath) {
  const cleanedProject = encodeURIComponent(String(projectId || ''));

  const raw = String(filePath || '');
  const parts = raw
    .split('/')
    .filter((p) => p !== '' && p !== '.');

  const normalized = [];
  for (const part of parts) {
    if (part === '..') {
      if (normalized.length > 0) normalized.pop();
      continue;
    }
    normalized.push(encodeURIComponent(part));
  }

  const safePath = normalized.join('/');
  return fetchText(apiPath(`projects/${cleanedProject}/files/${safePath}`));
}

export async function fetchChapterTheory(courseId, chapter) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = apiPath(`course/${courseId}/${chapterId}/${chapter.theoryResourceUid}`);
  return fetchText(path);
}

export async function fetchChapterQuiz(courseId, chapter) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = apiPath(`course/${courseId}/${chapterId}/${chapter.quizResourceUid}`);
  return fetchJson(path);
}

export async function fetchChapterPractice(courseId, chapter) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = apiPath(`course/${courseId}/${chapterId}/${chapter.practiceResourceUid}`);
  return fetchJson(path);
}

export async function fetchPracticeAssignmentMarkdown(courseId, chapter, assignment) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const baseName = assignment.assignmentResourceUid || '';
  // If the UID already contains a '/', assume it's a full relative path (e.g. 'assignments/...').
  // If it's just a bare markdown filename, prepend 'assignments/'.
  const isBareMarkdownFile = !baseName.includes('/') && baseName.endsWith('.md');
  const finalSegment = isBareMarkdownFile ? `assignments/${baseName}` : baseName;
  const path = apiPath(`course/${courseId}/${chapterId}/${finalSegment}`);
  return fetchText(path);
}

export async function fetchPracticeAttachmentFile(courseId, chapter, template) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = apiPath(`course/${courseId}/${chapterId}/${template.path}`);
  return fetchText(path);
}
