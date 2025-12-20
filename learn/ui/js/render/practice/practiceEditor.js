//author: https://github.com/nhermab
//licence: MIT
export let practiceEditor = null;

export function setPracticeEditor(editor) {
  practiceEditor = editor;
}

export function getCurrentPracticeEditor() {
  return practiceEditor;
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
}
