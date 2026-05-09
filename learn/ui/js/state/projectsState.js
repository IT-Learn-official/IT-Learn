const projectsState = {
  projectsDoc: null,
  manifests: new Map(), // projectId -> manifest
  guides: new Map(), // projectId -> markdown
};

export function getProjectsState() {
  return projectsState;
}

export function setProjectsDoc(doc) {
  projectsState.projectsDoc = doc;
}

export function getProjectsDoc() {
  return projectsState.projectsDoc;
}

export function setProjectManifest(projectId, manifest) {
  projectsState.manifests.set(String(projectId), manifest);
}

export function getProjectManifest(projectId) {
  return projectsState.manifests.get(String(projectId)) || null;
}

export function setProjectGuide(projectId, markdown) {
  projectsState.guides.set(String(projectId), markdown);
}

export function getProjectGuide(projectId) {
  return projectsState.guides.get(String(projectId)) || null;
}

export function resetProjectsState() {
  projectsState.projectsDoc = null;
  projectsState.manifests.clear();
  projectsState.guides.clear();
}
