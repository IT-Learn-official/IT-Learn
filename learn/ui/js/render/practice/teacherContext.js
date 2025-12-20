//author: https://github.com/nhermab
//licence: MIT
export function createTeacherContext({
  course,
  chapter,
  activeAssignment,
  activeTemplate,
  languageId,
  codeFiles,
  practice,
  markdownKey,
  lastRun,
}) {
  return {
    courseId: String(course && course.id != null ? course.id : ''),
    chapterId: String(chapter && (chapter.id || chapter.chapterId) ? (chapter.id || chapter.chapterId) : 'chapter_1'),
    assignmentId: String(activeAssignment && activeAssignment.id != null ? activeAssignment.id : ''),
    templatePath: activeTemplate ? activeTemplate.path : '',
    languageId,
    codeFiles: Array.isArray(codeFiles) ? codeFiles : [],
    assignment: {
      title: (activeAssignment && activeAssignment.title) || '',
      descriptionMarkdown: (practice && practice.assignmentMarkdown && markdownKey && practice.assignmentMarkdown[markdownKey]) || '',
    },
    environment: { lastRun: lastRun || null },
  };
}

