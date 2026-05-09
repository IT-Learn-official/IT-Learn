const RECENT_KEY = 'itlearn.projects.recent';

function safeParseJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getRecentProjects() {
  const parsed = safeParseJson(localStorage.getItem(RECENT_KEY), []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((id) => String(id)).filter(Boolean);
}

export function markProjectOpened(projectId) {
  const id = String(projectId || '').trim();
  if (!id) return;
  const current = getRecentProjects().filter((x) => x !== id);
  current.unshift(id);
  localStorage.setItem(RECENT_KEY, JSON.stringify(current.slice(0, 5)));
}

