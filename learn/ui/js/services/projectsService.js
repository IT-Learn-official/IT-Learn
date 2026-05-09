import { fetchProjects, fetchProjectManifest, fetchProjectGuide } from './apiClient.js';
import { getProjectsDoc, getProjectGuide, getProjectManifest, setProjectsDoc, setProjectGuide, setProjectManifest } from '../state/projectsState.js';

export async function loadProjectsDoc({ force = false } = {}) {
  if (!force) {
    const cached = getProjectsDoc();
    if (cached) return cached;
  }
  const doc = await fetchProjects();
  setProjectsDoc(doc);
  return doc;
}


export async function loadProjectManifest(projectId, { force = false } = {}) {
  const cached = getProjectManifest(projectId);
  if (cached && !force) return cached;
  const manifest = await fetchProjectManifest(projectId);
  setProjectManifest(projectId, manifest);
  return manifest;
}

export async function loadProjectGuide(projectId, { force = false } = {}) {
  const cached = getProjectGuide(projectId);
  if (cached && !force) return cached;
  const markdown = await fetchProjectGuide(projectId);
  setProjectGuide(projectId, markdown);
  return markdown;
}

