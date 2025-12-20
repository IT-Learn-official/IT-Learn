//author: https://github.com/nhermab
//licence: MIT
import { fetchPracticeAttachmentFile } from '../../services/apiClient.js';
import { setChapterContent } from '../../state/appState.js';
import { getRunnerForLanguage } from '../../runners/index.js';

/**
 * Load template source code into the editor.
 */
export async function loadTemplateSource({
  activeTemplate,
  practice,
  course,
  chapter,
  selectedCourseId,
  selectedChapterId,
  practiceEditor
}) {
  if (!activeTemplate) return;

  const key = activeTemplate.path;

  try {
    if (!practice.templateSources[key]) {
      practice.templateSources[key] = await fetchPracticeAttachmentFile(course.id, chapter, activeTemplate);
      setChapterContent(selectedCourseId, selectedChapterId, { practice });
    }

    if (practiceEditor) {
      practiceEditor.setValue(practice.templateSources[key], -1);

      // Reset language runtime when loading a new file to start fresh
      if (activeTemplate.language) {
        try {
          const runner = getRunnerForLanguage(activeTemplate.language);
          await runner.reset();
        } catch (err) {
          console.warn(`Failed to reset ${activeTemplate.language} runtime:`, err);
        }
      }
    }
  } catch (err) {
    console.error(err);
    if (practiceEditor) {
      practiceEditor.setValue('# Failed to load template source file', -1);
    }
  }
}
