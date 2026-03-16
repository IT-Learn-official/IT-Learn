//author: https://github.com/nhermab
//licence: MIT
export let practiceEditor = null;
let practiceEditorAutoSaveId = null;

export function setPracticeEditor(editor) {
  practiceEditor = editor;
}

export function getCurrentPracticeEditor() {
  return practiceEditor;
}

export function setPracticeEditorAutoSaveId(intervalId) {
  if (practiceEditorAutoSaveId) {
    clearInterval(practiceEditorAutoSaveId);
  }
  practiceEditorAutoSaveId = intervalId;
}

export function clearPracticeEditorAutoSave() {
  if (practiceEditorAutoSaveId) {
    clearInterval(practiceEditorAutoSaveId);
    practiceEditorAutoSaveId = null;
  }
}

export function destroyPracticeEditor() {
  if (practiceEditor) {
    try {
      if (typeof practiceEditor.destroy === 'function') {
        practiceEditor.destroy();
      }
    } catch (e) {
      console.warn('Failed to destroy practice editor', e);
    }
    practiceEditor = null;
  }
  clearPracticeEditorAutoSave();
}
