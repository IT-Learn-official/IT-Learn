//author: https://github.com/nhermab
//licence: MIT
//edited by: https://github.com/broodje565
const DEFAULT_ROUTE = '#/courses';

function parseQuery(queryString) {
  const params = new URLSearchParams(queryString.startsWith('?') ? queryString : `?${queryString}`);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

export function parseLocation(hash) {
  const cleaned = (hash || '').replace(/^#/, '') || '/courses';
  const [pathPart, queryPart] = cleaned.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  const query = queryPart ? parseQuery(queryPart) : {};

  if (segments[0] === 'settings') {
    return {
      route: 'settings',
      tab: query.tab || 'settings',
    };
  }

  if (segments[0] === 'store') {
    return {
      route: 'store',
      tab: query.tab || 'store',
    };
  }

  if (segments[0] === 'badges') {
    return {
      route: 'badges',
      tab: query.tab || 'badges',
    };
  }

  if (segments[0] === 'projects' && segments.length === 1) {
    return {
      route: 'projects',
      tab: query.tab || 'projects',
    };
  }

  if (segments[0] === 'projects' && segments[1]) {
    return {
      route: 'project',
      projectId: decodeURIComponent(segments[1]),
      tab: query.tab || 'ide',
      file: query.file ? String(query.file) : null,
      view: query.view ? String(query.view) : null,
    };
  }

  if (segments[0] === 'profile') {
    return {
      route: 'profile',
      username: segments[1] ? decodeURIComponent(segments[1]) : null,
      tab: query.tab || 'profile',
    };
  }

  if (segments[0] === 'onboarding') {
    return {
      route: 'onboarding',
      tab: query.tab || 'onboarding',
    };
  }

  if (segments[0] === 'courses' && segments.length === 1) {
    return {
      route: 'courses',
      courseId: query.courseId || null,
      chapterId: query.chapterId || null,
      tab: query.tab || 'theory',
    };
  }

  if (segments[0] === 'courses' && segments[1] && segments[2] === 'chapters' && segments[3]) {
    return {
      route: 'chapter',
      courseId: segments[1],
      chapterId: segments[3],
      tab: query.tab || 'theory',
    };
  }

  return { route: 'courses', tab: 'theory' };
}

export function toHash(descriptor) {
  if (descriptor.route === 'settings') {
    return '#/settings';
  }

  if (descriptor.route === 'store') {
    return '#/store';
  }

  if (descriptor.route === 'badges') {
    return '#/badges';
  }

  if (descriptor.route === 'projects') {
    return '#/projects';
  }

  if (descriptor.route === 'project') {
    const base = `#/projects/${encodeURIComponent(String(descriptor.projectId || ''))}`;
    const params = new URLSearchParams();
    if (descriptor.tab && descriptor.tab !== 'ide') params.set('tab', descriptor.tab);
    if (descriptor.file) params.set('file', descriptor.file);
    if (descriptor.view) params.set('view', descriptor.view);
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  if (descriptor.route === 'profile') {
    if (descriptor.username) {
      return `#/profile/${encodeURIComponent(descriptor.username)}`;
    }
    return '#/profile';
  }

  if (descriptor.route === 'onboarding') {
    return '#/onboarding';
  }

  if (descriptor.route === 'courses') {
    const base = '#/courses';
    const params = new URLSearchParams();

    if (descriptor.courseId) params.set('courseId', descriptor.courseId);
    if (descriptor.chapterId) params.set('chapterId', descriptor.chapterId);
    if (descriptor.tab && descriptor.tab !== 'theory') params.set('tab', descriptor.tab);

    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  if (descriptor.route === 'chapter') {
    const { courseId, chapterId, tab } = descriptor;
    const base = `#/courses/${encodeURIComponent(courseId)}/chapters/${encodeURIComponent(chapterId)}`;
    const query = tab && tab !== 'theory' ? `?tab=${encodeURIComponent(tab)}` : '';
    return `${base}${query}`;
  }

  return DEFAULT_ROUTE;
}

export function navigateTo(descriptor) {
  const nextHash = toHash(descriptor);
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  }
}

export function initRouter(onRouteChange) {
  function handle() {
    const route = parseLocation(window.location.hash || DEFAULT_ROUTE);
    onRouteChange(route);
  }

  window.addEventListener('hashchange', handle);
  // Trigger initial route
  handle();
}
