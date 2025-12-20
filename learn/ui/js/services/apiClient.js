//author: https://github.com/nhermab
//licence: MIT
const COURSES_URL = 'api/courses.json';

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${url}`);
  }
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${url}`);
  }
  return response.text();
}

export async function fetchCourses() {
  return fetchJson(COURSES_URL);
}

export async function fetchChapterTheory(courseId, chapter) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = `api/course/${courseId}/${chapterId}/${chapter.theoryResourceUid}`;
  return fetchText(path);
}

export async function fetchChapterQuiz(courseId, chapter) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = `api/course/${courseId}/${chapterId}/${chapter.quizResourceUid}`;
  return fetchJson(path);
}

export async function fetchChapterPractice(courseId, chapter) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = `api/course/${courseId}/${chapterId}/${chapter.practiceResourceUid}`;
  return fetchJson(path);
}

export async function fetchPracticeAssignmentMarkdown(courseId, chapter, assignment) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const baseName = assignment.assignmentResourceUid || '';
  // If the UID already contains a '/', assume it's a full relative path (e.g. 'assignments/...').
  // If it's just a bare markdown filename, prepend 'assignments/'.
  const isBareMarkdownFile = !baseName.includes('/') && baseName.endsWith('.md');
  const finalSegment = isBareMarkdownFile ? `assignments/${baseName}` : baseName;
  const path = `api/course/${courseId}/${chapterId}/${finalSegment}`;
  return fetchText(path);
}

export async function fetchPracticeAttachmentFile(courseId, chapter, template) {
  const chapterId = chapter.id || chapter.chapterId || 'chapter_1';
  const path = `api/course/${courseId}/${chapterId}/${template.path}`;
  return fetchText(path);
}
