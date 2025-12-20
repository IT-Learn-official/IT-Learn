//author: https://github.com/nhermab
//licence: MIT
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
