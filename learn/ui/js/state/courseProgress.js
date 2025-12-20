//author: https://github.com/nhermab
//licence: MIT
const READ_CHAPTERS_COOKIE = 'itskill_read_chapters';
const READ_CHAPTERS_MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 days

// In-memory cache of parsed cookie: { [courseId: string]: Uint8Array }
let readChaptersByCourse = null;

function parseReadChaptersCookie() {
  if (readChaptersByCourse) return readChaptersByCourse;
  readChaptersByCourse = Object.create(null);

  const cookie = document.cookie || '';
  const parts = cookie.split(';').map((p) => p.trim());
  const entry = parts.find((p) => p.startsWith(`${READ_CHAPTERS_COOKIE}=`));
  if (!entry) return readChaptersByCourse;

  const value = decodeURIComponent(entry.split('=').slice(1).join('='));
  if (!value) return readChaptersByCourse;

  // Format: courseId1:hex,courseId2:hex
  value.split(',').forEach((pair) => {
    const [courseId, hex] = pair.split(':');
    if (!courseId || !hex) return;
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '');
    if (!cleanHex || cleanHex.length % 2 !== 0) return;
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16) & 0xff;
    }
    readChaptersByCourse[courseId] = bytes;
  });

  return readChaptersByCourse;
}

function serializeReadChaptersCookie(map) {
  const pairs = [];
  Object.keys(map).forEach((courseId) => {
    const bytes = map[courseId];
    if (!bytes || !bytes.length) return;
    let hex = '';
    for (let i = 0; i < bytes.length; i += 1) {
      const b = bytes[i].toString(16).padStart(2, '0');
      hex += b;
    }
    if (hex) {
      pairs.push(`${courseId}:${hex}`);
    }
  });
  return pairs.join(',');
}

function saveReadChaptersCookie() {
  const map = parseReadChaptersCookie();
  const value = serializeReadChaptersCookie(map);
  const encoded = encodeURIComponent(value);
  document.cookie = `${READ_CHAPTERS_COOKIE}=${encoded}; path=/; max-age=${READ_CHAPTERS_MAX_AGE_SECONDS}`;
}

function ensureCourseBytes(courseId, requiredBits) {
  const map = parseReadChaptersCookie();
  const neededBytes = Math.ceil(requiredBits / 8) || 1;
  let bytes = map[courseId];
  if (!bytes || bytes.length < neededBytes) {
    const newBytes = new Uint8Array(neededBytes);
    if (bytes) {
      newBytes.set(bytes.subarray(0, Math.min(bytes.length, neededBytes)));
    }
    bytes = newBytes;
    map[courseId] = bytes;
  }
  return bytes;
}

export function isChapterRead(courseId, chapterIndex) {
  if (!courseId || chapterIndex == null || chapterIndex < 0) return false;
  const map = parseReadChaptersCookie();
  const bytes = map[courseId];
  if (!bytes) return false;
  const byteIndex = Math.floor(chapterIndex / 8);
  const bitIndex = chapterIndex % 8;
  if (byteIndex >= bytes.length) return false;
  return (bytes[byteIndex] & (1 << bitIndex)) !== 0;
}

export function markChapterRead(courseId, chapterIndex, totalChaptersHint) {
  if (!courseId || chapterIndex == null || chapterIndex < 0) return;
  const totalBits = typeof totalChaptersHint === 'number' && totalChaptersHint > 0
    ? Math.max(totalChaptersHint, chapterIndex + 1)
    : (chapterIndex + 1);
  const byteIndex = Math.floor(chapterIndex / 8);
  const bitIndex = chapterIndex % 8;
  const bitsNeeded = Math.max(totalBits, (byteIndex + 1) * 8);
  const bytes = ensureCourseBytes(courseId, bitsNeeded);
  bytes[byteIndex] = bytes[byteIndex] | (1 << bitIndex);
  saveReadChaptersCookie();
}

export function getChapterIndexForCourse(course, chapterId) {
  if (!course || !course.chapters || !course.chapters.length) return -1;
  const targetId = String(chapterId);
  for (let index = 0; index < course.chapters.length; index += 1) {
    const ch = course.chapters[index];
    const cid = ch.id || ch.chapterId || `chapter_${index + 1}`;
    if (String(cid) === targetId) return index;
  }
  return -1;
}
