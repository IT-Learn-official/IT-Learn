import { fetchCourses } from './apiClient.js';
import { setCoursesDoc } from '../state/appState.js';

export async function loadCoursesDoc() {
  const coursesDoc = await fetchCourses();
  setCoursesDoc(coursesDoc);
  return coursesDoc;
}

