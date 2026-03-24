import { checkSession, loadBadges, loadProgress, saveBadges, saveProgress } from './authService.js';
import { getTrialProgress, getTrialSession, isTrialCompleted } from './trialMode.js';

let remoteProgressCache = null;
let remoteBadgesCache = null;
let remoteProgressPromise = null;
let remoteBadgesPromise = null;
let activeProgressUserId = null;
const chapterFlushTimers = new Map();
const pendingChapterStates = new Map();

function clearInMemoryProgressState() {
  remoteProgressCache = null;
  remoteBadgesCache = null;
  remoteProgressPromise = null;
  remoteBadgesPromise = null;
  pendingChapterStates.clear();
  chapterFlushTimers.forEach((timerId) => clearTimeout(timerId));
  chapterFlushTimers.clear();
}

function normalizeUserId(value) {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text || null;
}

async function ensureUserBoundCaches() {
  const windowUserId = normalizeUserId(typeof window !== 'undefined' ? window.currentUserId : null);
  if (windowUserId) {
    if (activeProgressUserId !== windowUserId) {
      clearInMemoryProgressState();
      activeProgressUserId = windowUserId;
    }
    return;
  }

  const session = await checkSession();
  const sessionUserId = normalizeUserId(session?.logged_in ? session.user_id : null);
  if (activeProgressUserId !== sessionUserId) {
    clearInMemoryProgressState();
    activeProgressUserId = sessionUserId;
  }
}

function ensureObject(value) {
  return value && typeof value === 'object' ? value : {};
}

function toSafeNumber(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

function hasOwnKeys(value) {
  return value && typeof value === 'object' && Object.keys(value).length > 0;
}

function normalizeOptionalText(value) {
  if (typeof value !== 'string') return null;
  return value;
}

function normalizeRemoteProgress(raw) {
  const progressRoot = ensureObject(raw?.progress);
  const taskStateByChapter = ensureObject(
    progressRoot.taskStateByChapter || progressRoot.taskState || raw?.taskStateByChapter || raw?.taskState
  );
  const progressGamification = ensureObject(progressRoot.gamification);
  const progressXp = ensureObject(progressGamification.xp);
  const progressStreak = ensureObject(progressGamification.streak);
  const missionsFromTopLevel = ensureObject(raw?.missions);
  const missionsFromProgress = ensureObject(progressRoot.missions);
  const mistakesFromTopLevel = Array.isArray(raw?.mistakes) ? raw.mistakes : null;
  const mistakesFromProgress = Array.isArray(progressRoot.mistakes) ? progressRoot.mistakes : null;

  return {
    ...ensureObject(raw),
    progress: {
      ...progressRoot,
      taskStateByChapter,
    },
    xp: toSafeNumber(raw?.xp, toSafeNumber(progressXp.total, 0)),
    streak: toSafeNumber(raw?.streak, toSafeNumber(progressStreak.current, 0)),
    missions: hasOwnKeys(missionsFromTopLevel) ? missionsFromTopLevel : missionsFromProgress,
    mistakes: mistakesFromTopLevel ?? mistakesFromProgress ?? [],
  };
}

async function ensureRemoteProgressLoaded() {
  await ensureUserBoundCaches();
  if (remoteProgressCache) return remoteProgressCache;
  if (remoteProgressPromise) return remoteProgressPromise;

  remoteProgressPromise = (async () => {
    const loaded = await loadProgress();
    remoteProgressCache = normalizeRemoteProgress(loaded);
    return remoteProgressCache;
  })();

  try {
    return await remoteProgressPromise;
  } finally {
    remoteProgressPromise = null;
  }
}

async function ensureRemoteBadgesLoaded() {
  await ensureUserBoundCaches();
  if (remoteBadgesCache) return remoteBadgesCache;
  if (remoteBadgesPromise) return remoteBadgesPromise;

  remoteBadgesPromise = (async () => {
    const loaded = await loadBadges();
    remoteBadgesCache = ensureObject(loaded);
    return remoteBadgesCache;
  })();

  try {
    return await remoteBadgesPromise;
  } finally {
    remoteBadgesPromise = null;
  }
}

function computeStatsFromTaskState(taskStateByChapter) {
  let chaptersTouched = 0;
  let tasksCompleted = 0;
  let perfectTaskChapters = 0;
  const uniqueCourses = new Set();

  Object.entries(ensureObject(taskStateByChapter)).forEach(([chapterKey, chapterState]) => {
    const values = Object.values(ensureObject(chapterState));
    if (values.length === 0) return;

    chaptersTouched += 1;

    const [courseId] = chapterKey.split(':');
    if (courseId) uniqueCourses.add(courseId);

    const completedInChapter = values.filter(Boolean).length;
    tasksCompleted += completedInChapter;
    if (values.every(Boolean)) {
      perfectTaskChapters += 1;
    }
  });

  return {
    chaptersTouched,
    tasksCompleted,
    perfectTaskChapters,
    exploredCourses: uniqueCourses.size,
  };
}

async function flushChapterTaskState(chapterKey) {
  const nextChapterState = pendingChapterStates.get(chapterKey);
  if (!nextChapterState) return;

  pendingChapterStates.delete(chapterKey);

  try {
    const remote = await ensureRemoteProgressLoaded();
    const progressRoot = ensureObject(remote.progress);
    const remoteTaskStateByChapter = ensureObject(progressRoot.taskStateByChapter);

    remoteTaskStateByChapter[chapterKey] = { ...nextChapterState };
    remote.progress = {
      ...progressRoot,
      taskStateByChapter: remoteTaskStateByChapter,
    };
    remote.last_active = new Date().toISOString().slice(0, 10);

    await saveProgress(remote);
  } catch (error) {
    console.error(`Failed to flush chapter task state for ${chapterKey}:`, error);

    if (!pendingChapterStates.has(chapterKey)) {
      pendingChapterStates.set(chapterKey, { ...nextChapterState });
    }

    if (!chapterFlushTimers.has(chapterKey)) {
      const retryTimer = setTimeout(() => {
        chapterFlushTimers.delete(chapterKey);
        void flushChapterTaskState(chapterKey);
      }, 1500);
      chapterFlushTimers.set(chapterKey, retryTimer);
    }
  }
}

export function queueTaskStateSync(courseId, chapterId, chapterState) {
  const chapterKey = `${courseId || ''}:${chapterId || ''}`;
  pendingChapterStates.set(chapterKey, ensureObject(chapterState));

  const existingTimer = chapterFlushTimers.get(chapterKey);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  const timer = setTimeout(() => {
    chapterFlushTimers.delete(chapterKey);
    void flushChapterTaskState(chapterKey);
  }, 650);

  chapterFlushTimers.set(chapterKey, timer);
}

export async function getRemoteTaskStateForChapter(courseId, chapterId) {
  const chapterKey = `${courseId || ''}:${chapterId || ''}`;
  const remote = await ensureRemoteProgressLoaded();
  const taskStateByChapter = ensureObject(remote.progress?.taskStateByChapter);
  return ensureObject(taskStateByChapter[chapterKey]);
}

export async function getBadgeStatsFromBackend() {
  const remote = await ensureRemoteProgressLoaded();
  const remoteTaskStateByChapter = ensureObject(remote.progress?.taskStateByChapter);

  const taskStats = computeStatsFromTaskState(remoteTaskStateByChapter);
  const missionsSource = hasOwnKeys(remote.missions) ? remote.missions : ensureObject(remote.progress?.missions);
  const missionsCompleted = Object.values(ensureObject(missionsSource)).filter(Boolean).length;
  const mistakesCount = Array.isArray(remote.mistakes) ? remote.mistakes.length : 0;

  const trialProgress = getTrialProgress();
  const trialSession = getTrialSession();
  const trialChapterCount = trialProgress?.chapters?.length || 0;

  return {
    ...taskStats,
    xp: toSafeNumber(remote.xp, 0),
    streak: toSafeNumber(remote.streak, 0),
    missionsCompleted,
    mistakesCount,
    hasTrialData: Boolean(trialSession || trialProgress),
    trialChapterCount,
    trialCompleted: isTrialCompleted(),
  };
}

export async function syncBadgeUnlocks(computedBadges) {
  const stored = await ensureRemoteBadgesLoaded();
  const unlockMap = ensureObject(stored.unlockedBadges);

  let hasChanges = false;
  computedBadges.forEach((badge) => {
    const isUnlocked = badge.progress >= badge.goal;
    if (!isUnlocked || unlockMap[badge.id]) return;

    unlockMap[badge.id] = {
      unlockedAt: new Date().toISOString(),
      title: badge.title,
    };
    hasChanges = true;
  });

  const payload = {
    unlockedBadges: unlockMap,
    totalUnlocks: Object.keys(unlockMap).length,
    lastSyncedAt: new Date().toISOString(),
  };

  if (hasChanges) {
    const result = await saveBadges(payload);
    if (result.success) {
      remoteBadgesCache = payload;
    }
  }

  return payload;
}

export async function updateRemoteProgress(mutation) {
  const remote = await ensureRemoteProgressLoaded();
  const base = normalizeRemoteProgress(remote);
  const changes = typeof mutation === 'function' ? mutation(base) : mutation;
  if (!changes || typeof changes !== 'object') {
    return { success: false };
  }

  const payload = normalizeRemoteProgress({
    ...base,
    ...changes,
    progress: {
      ...ensureObject(base.progress),
      ...ensureObject(changes.progress),
    },
  });

  const result = await saveProgress(payload);
  if (result?.success) {
    remoteProgressCache = payload;
  }
  return result;
}

export async function saveOnboardingPreferencesToProgress(preferences) {
  const safePrefs = {
    learningPath: String(preferences?.learningPath || '').slice(0, 64),
    goal: String(preferences?.goal || '').slice(0, 64),
    level: String(preferences?.level || '').slice(0, 64),
    commitment: String(preferences?.commitment || '').slice(0, 16),
    updatedAt: new Date().toISOString(),
  };

  return updateRemoteProgress((remote) => ({
    progress: {
      ...ensureObject(remote.progress),
      onboardingPreferences: safePrefs,
    },
  }));
}

export async function getPracticeAutoSaveValue(autoSaveKey) {
  const remote = await ensureRemoteProgressLoaded();
  const autosaveRoot = ensureObject(remote.progress?.practiceAutosaveByTemplate);
  return normalizeOptionalText(autosaveRoot[autoSaveKey]);
}

export async function savePracticeAutoSaveValue(autoSaveKey, code) {
  const key = String(autoSaveKey || '').slice(0, 256);
  if (!key) return { success: false };

  const safeCode = String(code || '');
  return updateRemoteProgress((remote) => ({
    progress: {
      ...ensureObject(remote.progress),
      practiceAutosaveByTemplate: {
        ...ensureObject(remote.progress?.practiceAutosaveByTemplate),
        [key]: safeCode,
      },
      lastPracticeAutosaveAt: new Date().toISOString(),
    },
  }));
}

export async function markLessonCompletedInProgress({ courseId, chapterId, correct, total, awardXp = true }) {
  const chapterKey = `${courseId || ''}:${chapterId || ''}`;
  if (!chapterKey || chapterKey === ':') {
    return { success: false };
  }

  const safeCorrect = Number.isFinite(correct) ? Math.max(0, Math.trunc(correct)) : 0;
  const safeTotal = Number.isFinite(total) ? Math.max(0, Math.trunc(total)) : 0;
  const safeScore = safeTotal > 0 ? Math.max(0, Math.min(1, safeCorrect / safeTotal)) : 0;

  return updateRemoteProgress((remote) => ({
    progress: {
      ...ensureObject(remote.progress),
      lessonCompletionByChapter: {
        ...ensureObject(remote.progress?.lessonCompletionByChapter),
        [chapterKey]: {
          completed: true,
          correct: safeCorrect,
          total: safeTotal,
          score: safeScore,
          awardXp: Boolean(awardXp),
          completedAt: new Date().toISOString(),
        },
      },
    },
    last_active: new Date().toISOString().slice(0, 10),
  }));
}
