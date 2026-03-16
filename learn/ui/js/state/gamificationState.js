// Gamification state — hearts, XP, coins, streak, leaderboard, quests, reward box, inventory
// All persisted to localStorage

import { checkSession, loadProgress, saveProgress } from '../services/authService.js';

const STORAGE_KEY = 'itlearn_gamification';
const HEARTS_MAX = 5;
const REMOTE_SYNC_DEBOUNCE_MS = 900;
const REWARD_MIN_FACTOR = 0.8;
const REWARD_MAX_FACTOR = 1.2;
const XP_PER_RANK = 12;
const RANKS_PER_LEAGUE = 30;
const XP_PER_LEAGUE = XP_PER_RANK * RANKS_PER_LEAGUE;
const BIG_BOX_UPGRADE_COST = 75;
const BIG_BOX_REWARD_MULTIPLIER = 1.35;

export const LEAGUES = ['Wood', 'Plastic', 'Bronze', 'Silver', 'Gold', 'Diamond', 'Platina', 'Master'];

const QUEST_POOL = [
  { id: 'complete_lesson', label: 'Complete a lesson',           target: 1,  reward: 20, icon: '📖' },
  { id: 'correct_5',       label: 'Get 5 quiz questions right',  target: 5,  reward: 15, icon: '✅' },
  { id: 'streak_today',    label: 'Keep your streak alive',      target: 1,  reward: 25, icon: '🔥' },
  { id: 'complete_2',      label: 'Complete 2 lessons today',    target: 2,  reward: 35, icon: '⚡' },
  { id: 'perfect_quiz',    label: 'Get a perfect quiz score',    target: 1,  reward: 40, icon: '💯' },
  { id: 'practice_once',   label: 'Complete a practice task',    target: 1,  reward: 20, icon: '💻' },
  { id: 'earn_xp_50',      label: 'Earn 50 XP today',           target: 50, reward: 30, icon: '⭐' },
];

export const REWARD_ITEMS = [
  { id: 'coins_sm',     label: '+15 Coins',           icon: '🪙', rarity: 'common',   coins: 15 },
  { id: 'xp_boost_sm',  label: '+20 XP Bonus',        icon: '⭐', rarity: 'common',   xp: 20 },
  { id: 'heart_refill', label: 'Full Heart Refill',   icon: '❤️', rarity: 'uncommon', hearts: HEARTS_MAX },
  { id: 'str_freeze',   label: 'Streak Freeze',       icon: '🧊', rarity: 'uncommon', item: 'streak_freeze' },
  { id: 'coins_md',     label: '+50 Coins',           icon: '💰', rarity: 'rare',     coins: 50 },
  { id: 'double_xp',    label: '2× XP (next lesson)', icon: '🚀', rarity: 'rare',     item: 'double_xp' },
  { id: 'coins_lg',     label: '+100 Coins',          icon: '💎', rarity: 'epic',     coins: 100 },
  { id: 'profile_glow', label: 'Rare Profile Effect', icon: '✨', rarity: 'epic',     item: 'profile_glow' },
];

const RARITY_WEIGHTS = { common: 50, uncommon: 30, rare: 15, epic: 5 };
const BIG_BOX_RARITY_WEIGHTS = { common: 25, uncommon: 35, rare: 30, epic: 10 };

const STORE_ITEMS = [
  {
    id: 'buy_streak_freeze',
    title: 'Streak Freeze',
    description: 'Protect your streak for one missed day.',
    icon: '🧊',
    price: 120,
    apply: (s) => { s.inventory.streakFreezes += 1; },
  },
  {
    id: 'buy_full_hearts',
    title: 'Heart Refill',
    description: 'Refill all hearts instantly.',
    icon: '❤️',
    price: 75,
    apply: (s) => { s.hearts.current = s.hearts.max; },
  },
  {
    id: 'buy_double_xp',
    title: '2x XP Boost',
    description: 'Double XP on your next lesson.',
    icon: '🚀',
    price: 150,
    apply: (s) => { s.inventory.doubleXp += 1; },
  },
  {
    id: 'buy_profile_fx',
    title: 'Profile Glow',
    description: 'Unlock a profile glow cosmetic effect.',
    icon: '✨',
    price: 180,
    apply: (s) => {
      s.inventory.profileEffects = Array.isArray(s.inventory.profileEffects) ? s.inventory.profileEffects : [];
      if (!s.inventory.profileEffects.includes('glow')) s.inventory.profileEffects.push('glow');
    },
  },
  {
    id: 'buy_box_normal',
    title: 'Reward Box',
    description: 'Open a reward box instantly.',
    icon: '🎁',
    price: 50,
    apply: () => openBoxInternal({ isBig: false, consumeReady: false, skipSave: true }),
  },
  {
    id: 'buy_box_big',
    title: 'BIG BOX',
    description: 'Better odds and bigger rewards.',
    icon: '📦',
    price: 120,
    apply: () => openBoxInternal({ isBig: true, consumeReady: false, skipSave: true }),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().split('T')[0]; }
function weekStartStr() {
  const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - d.getDay());
  return d.toISOString().split('T')[0];
}
function randomizeReward(base, multiplier = 1) {
  if (typeof base !== 'number' || !Number.isFinite(base) || base <= 0) return 0;
  const scaled = base * multiplier;
  const min = Math.max(1, Math.floor(scaled * REWARD_MIN_FACTOR));
  const max = Math.max(min, Math.ceil(scaled * REWARD_MAX_FACTOR));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatRewardLabel(item) {
  if (item.coins) return `+${item.coins} Coins`;
  if (item.xp) return `+${item.xp} XP Bonus`;
  return item.label;
}
function makeDailyQuests() {
  return [...QUEST_POOL]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(q => ({ ...q, progress: 0, completed: false, claimed: false }));
}
function updateLeagueIndex(state) {
  const nextIndex = Math.min(LEAGUES.length - 1, Math.floor(state.leaderboard.weeklyXp / XP_PER_LEAGUE));
  state.leaderboard.leagueIndex = nextIndex;
}
function defaultState() {
  return {
    hearts:      { current: HEARTS_MAX, max: HEARTS_MAX, lastRefillDate: todayStr() },
    xp:          { total: 0, daily: 0, dailyDate: todayStr() },
    coins:       0,
    streak:      { current: 0, longest: 0, lastDate: null },
    leaderboard: { leagueIndex: 0, weeklyXp: 0, weekStart: weekStartStr() },
    quests:      { date: todayStr(), list: makeDailyQuests() },
    inventory:   { streakFreezes: 0, doubleXp: 0 },
    boxReady:    false,
  };
}

// ─── Load / Save ─────────────────────────────────────────────────────────────
let _state = null;
let _remoteProgressCache = null;
let _remoteSyncTimer = null;
let _suppressRemoteSync = false;

function load() {
  if (_state) return _state;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    _state = raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();

    // Ensure nested objects are not missing keys after a partial restore
    _state.hearts      = Object.assign(defaultState().hearts,      _state.hearts      || {});
    _state.xp         = Object.assign(defaultState().xp,          _state.xp          || {});
    _state.streak     = Object.assign(defaultState().streak,       _state.streak      || {});
    _state.leaderboard= Object.assign(defaultState().leaderboard,  _state.leaderboard || {});
    _state.inventory  = Object.assign(defaultState().inventory,    _state.inventory   || {});

    // Daily heart refill
    if (_state.hearts.lastRefillDate !== todayStr()) {
      _state.hearts.current      = _state.hearts.max;
      _state.hearts.lastRefillDate = todayStr();
    }
    // Daily XP reset
    if (_state.xp.dailyDate !== todayStr()) {
      _state.xp.daily    = 0;
      _state.xp.dailyDate = todayStr();
    }
    // New day quests
    if (!_state.quests || _state.quests.date !== todayStr()) {
      _state.quests = { date: todayStr(), list: makeDailyQuests() };
    }
    // Weekly leaderboard reset
    if (_state.leaderboard.weekStart !== weekStartStr()) {
      _state.leaderboard.weeklyXp  = 0;
      _state.leaderboard.weekStart = weekStartStr();
      updateLeagueIndex(_state);
    }
  } catch {
    _state = defaultState();
  }
  return _state;
}

function buildRemoteGamificationPayload() {
  const s = load();
  return {
    hearts: { ...s.hearts },
    xp: { ...s.xp },
    coins: s.coins,
    streak: { ...s.streak },
    leaderboard: { ...s.leaderboard },
    quests: { date: s.quests?.date || todayStr(), list: Array.isArray(s.quests?.list) ? s.quests.list.map(q => ({ ...q })) : [] },
    inventory: {
      ...s.inventory,
      profileEffects: Array.isArray(s.inventory?.profileEffects) ? [...s.inventory.profileEffects] : [],
    },
    boxReady: Boolean(s.boxReady),
    savedAt: new Date().toISOString(),
  };
}

function scheduleRemoteGamificationSync() {
  if (_suppressRemoteSync) return;
  if (_remoteSyncTimer) clearTimeout(_remoteSyncTimer);
  _remoteSyncTimer = setTimeout(() => {
    _remoteSyncTimer = null;
    const payload = buildRemoteGamificationPayload();
    void saveRemoteProgressPatch((remote) => {
      const currentProgress = (remote && typeof remote.progress === 'object') ? remote.progress : {};
      return {
        progress: {
          ...currentProgress,
          gamification: payload,
        },
        xp: payload.xp.total,
        streak: payload.streak.current,
        last_active: payload.streak.lastDate || normalizeDateOnly(remote?.last_active) || null,
      };
    });
  }, REMOTE_SYNC_DEBOUNCE_MS);
}

function saveLocalOnly() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_state)); } catch {}
}

function save() {
  saveLocalOnly();
  scheduleRemoteGamificationSync();
}

function normalizeDateOnly(value) {
  if (!value) return null;
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

async function getRemoteProgressSnapshot() {
  if (_remoteProgressCache) return _remoteProgressCache;

  const session = await checkSession();
  if (!session?.logged_in) return null;

  const loaded = await loadProgress();
  _remoteProgressCache = loaded && typeof loaded === 'object' ? loaded : null;
  return _remoteProgressCache;
}

async function saveRemoteProgressPatch(patch) {
  try {
    const remote = await getRemoteProgressSnapshot();
    if (!remote) return;

    const resolvedPatch = typeof patch === 'function' ? patch(remote) : patch;
    const payload = { ...remote, ...resolvedPatch };
    const result = await saveProgress(payload);
    if (result?.success) {
      _remoteProgressCache = payload;
    }
  } catch (error) {
    console.error('Failed syncing gamification progress:', error);
  }
}

export async function syncGamificationWithProfileProgress(profileData = null) {
  try {
    const s = load();
    const profileStreak = typeof profileData?.streak === 'number' ? Math.max(0, profileData.streak) : null;
    const profileLastActive = normalizeDateOnly(profileData?.last_active);

    const remote = await getRemoteProgressSnapshot();
    const remoteGamification = remote?.progress?.gamification;

    if (remoteGamification && typeof remoteGamification === 'object') {
      _suppressRemoteSync = true;
      try {
        s.hearts = { ...s.hearts, ...(remoteGamification.hearts || {}) };
        s.xp = { ...s.xp, ...(remoteGamification.xp || {}) };
        s.coins = typeof remoteGamification.coins === 'number' ? remoteGamification.coins : s.coins;
        s.streak = { ...s.streak, ...(remoteGamification.streak || {}) };
        s.leaderboard = { ...s.leaderboard, ...(remoteGamification.leaderboard || {}) };
        s.quests = {
          date: remoteGamification.quests?.date || s.quests.date,
          list: Array.isArray(remoteGamification.quests?.list) ? remoteGamification.quests.list.map(q => ({ ...q })) : s.quests.list,
        };
        s.inventory = {
          ...s.inventory,
          ...(remoteGamification.inventory || {}),
          profileEffects: Array.isArray(remoteGamification.inventory?.profileEffects)
            ? [...remoteGamification.inventory.profileEffects]
            : (Array.isArray(s.inventory.profileEffects) ? s.inventory.profileEffects : []),
        };
        s.boxReady = Boolean(remoteGamification.boxReady);
        saveLocalOnly();
      } finally {
        _suppressRemoteSync = false;
      }
    }

    if (profileStreak !== null) {
      s.streak.current = profileStreak;
      s.streak.longest = Math.max(s.streak.longest, profileStreak);
      if (profileLastActive) s.streak.lastDate = profileLastActive;
      save();
      return { ...s.streak };
    }

    if (!remote) return { ...s.streak };

    const remoteStreak = typeof remote.streak === 'number' ? Math.max(0, remote.streak) : s.streak.current;
    const remoteLastActive = normalizeDateOnly(remote.last_active);

    s.streak.current = remoteStreak;
    s.streak.longest = Math.max(s.streak.longest, remoteStreak);
    if (remoteLastActive) s.streak.lastDate = remoteLastActive;
    save();
    return { ...s.streak };
  } catch (error) {
    console.error('Failed loading profile streak sync:', error);
    return { ...load().streak };
  }
}

// ─── Hearts ──────────────────────────────────────────────────────────────────
export function getHearts() { return { ...load().hearts }; }
export function hasHearts() { return load().hearts.current > 0; }

export function loseHeart() {
  const s = load();
  if (s.hearts.current > 0) s.hearts.current--;
  save();
  return s.hearts.current;
}

export function refillHearts(n = HEARTS_MAX) {
  const s = load();
  s.hearts.current = Math.min(n, s.hearts.max);
  save();
  return s.hearts.current;
}

// ─── XP ──────────────────────────────────────────────────────────────────────
export function getXP() { return { ...load().xp }; }

export function addXP(amount) {
  const s = load();
  const doubled = s.inventory.doubleXp > 0;
  const actual  = doubled ? amount * 2 : amount;
  if (doubled) s.inventory.doubleXp--;
  s.xp.total  += actual;
  s.xp.daily  += actual;
  s.leaderboard.weeklyXp += actual;
  updateLeagueIndex(s);
  _progressQuest('earn_xp_50', actual);
  save();
  return actual;
}

// ─── Coins ───────────────────────────────────────────────────────────────────
export function getCoins()   { return load().coins; }
export function addCoins(n)  { const s = load(); s.coins += n; save(); return s.coins; }
export function spendCoins(n) {
  const s = load(); if (s.coins < n) return false; s.coins -= n; save(); return true;
}

// ─── Streak ──────────────────────────────────────────────────────────────────
export function getStreak() { return { ...load().streak }; }

export function updateStreak() {
  const s     = load();
  const today = todayStr();
  if (s.streak.lastDate === today) return { current: s.streak.current, extended: false };

  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const yd = yesterday.toISOString().split('T')[0];

  if (s.streak.lastDate === yd || s.streak.current === 0) {
    s.streak.current++;
    s.streak.longest  = Math.max(s.streak.longest, s.streak.current);
    s.streak.lastDate = today;
    _progressQuest('streak_today', 1);
    save();
    void saveRemoteProgressPatch({ streak: s.streak.current, last_active: today });
    return { current: s.streak.current, extended: true };
  }

  // Streak broken — use freeze if available
  if (s.inventory.streakFreezes > 0) {
    s.inventory.streakFreezes--;
    s.streak.lastDate = today;
    save();
    void saveRemoteProgressPatch({ streak: s.streak.current, last_active: today });
    return { current: s.streak.current, extended: false, froze: true };
  }

  s.streak.current  = 1;
  s.streak.lastDate = today;
  save();
  void saveRemoteProgressPatch({ streak: s.streak.current, last_active: today });
  return { current: s.streak.current, extended: true, wasReset: true };
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
export function getLeaderboard() {
  const s    = load();
  const leagueFloor = s.leaderboard.leagueIndex * RANKS_PER_LEAGUE * XP_PER_RANK;
  const xpIntoLeague = Math.max(0, s.leaderboard.weeklyXp - leagueFloor);
  const rank = Math.max(1, RANKS_PER_LEAGUE - Math.floor(xpIntoLeague / XP_PER_RANK));
  return {
    league:      LEAGUES[s.leaderboard.leagueIndex] || 'Wood',
    leagueIndex: s.leaderboard.leagueIndex,
    weeklyXp:    s.leaderboard.weeklyXp,
    rank,
  };
}

// ─── Quests ──────────────────────────────────────────────────────────────────
export function getQuests() { return load().quests.list.map(q => ({ ...q })); }

function _progressQuest(id, amount = 1) {
  const s = load();
  const q = s.quests.list.find(q => q.id === id && !q.completed);
  if (!q) return;
  q.progress = Math.min(q.progress + amount, q.target);
  if (q.progress >= q.target) q.completed = true;
}

export function progressQuest(id, amount = 1) { _progressQuest(id, amount); save(); }

export function claimAllQuests() {
  const s = load();
  let coins = 0;
  s.quests.list.forEach(q => { if (q.completed && !q.claimed) { q.claimed = true; coins += q.reward; } });
  s.coins += coins;
  save();
  return coins;
}

// ─── Reward Box ──────────────────────────────────────────────────────────────
export function isBoxReady() { return load().boxReady; }
export function setBoxReady() { const s = load(); s.boxReady = true; save(); }
export function getBoxUpgradeCost() { return BIG_BOX_UPGRADE_COST; }

function openBoxInternal({ isBig = false, consumeReady = false, skipSave = false } = {}) {
  const s = load();
  if (consumeReady && !s.boxReady) return null;
  if (consumeReady) s.boxReady = false;

  const weights = isBig ? BIG_BOX_RARITY_WEIGHTS : RARITY_WEIGHTS;
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  let rarity = 'common';
  for (const [k, w] of Object.entries(weights)) { r -= w; if (r <= 0) { rarity = k; break; } }

  const pool = REWARD_ITEMS.filter(i => i.rarity === rarity);
  const item = { ...pool[Math.floor(Math.random() * pool.length)] };
  const multiplier = isBig ? BIG_BOX_REWARD_MULTIPLIER : 1;

  if (item.coins) item.coins = randomizeReward(item.coins, multiplier);
  if (item.xp) item.xp = randomizeReward(item.xp, multiplier);
  item.label = formatRewardLabel(item);

  if (item.coins) s.coins += item.coins;
  if (item.xp) {
    s.xp.total += item.xp;
    s.xp.daily += item.xp;
    s.leaderboard.weeklyXp += item.xp;
    updateLeagueIndex(s);
  }
  if (item.hearts) s.hearts.current = Math.min(item.hearts, s.hearts.max);
  if (item.item === 'streak_freeze') s.inventory.streakFreezes++;
  if (item.item === 'double_xp') s.inventory.doubleXp++;

  if (!skipSave) save();
  return item;
}

export function openBox({ isBig = false } = {}) {
  return openBoxInternal({ isBig, consumeReady: true });
}

// ─── Inventory ───────────────────────────────────────────────────────────────
export function getInventory() { return { ...load().inventory }; }

export function getStoreItems() {
  return STORE_ITEMS.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    icon: item.icon,
    price: item.price,
  }));
}

export function buyStoreItem(itemId) {
  const s = load();
  const item = STORE_ITEMS.find((entry) => entry.id === itemId);
  if (!item) return { success: false, error: 'Item not found.' };
  if (s.coins < item.price) return { success: false, error: 'Not enough coins.' };

  s.coins -= item.price;
  const reward = item.apply(s) || null;
  save();
  return { success: true, itemId: item.id, remainingCoins: s.coins, reward };
}

// ─── Lesson Complete ─────────────────────────────────────────────────────────
export function onLessonComplete({ correct, total, awardXp = true }) {
  const base   = 10;
  const quizXp = correct * 5;
  const perfXp = (correct === total && total > 0) ? 15 : 0;

  const xpEarned = awardXp ? addXP(base + quizXp + perfXp) : 0;

  if (awardXp) {
    progressQuest('complete_lesson', 1);
    progressQuest('complete_2', 1);
    progressQuest('correct_5', correct);
    if (correct === total && total > 0) progressQuest('perfect_quiz', 1);
  }

  const streak = awardXp ? updateStreak() : getStreak();
  if (awardXp) setBoxReady();

  return { xpEarned, streak };
}

// ─── Sidebar Stats ───────────────────────────────────────────────────────────
export function updateSidebarStats() {
  const h = getHearts();
  const s = getStreak();
  const c = getCoins();
  const inv = getInventory();
  const hEl = document.getElementById('stat-hearts');
  const sEl = document.getElementById('stat-streak');
  const cEl = document.getElementById('stat-coins');
  const fEl = document.getElementById('stat-freezes');
  if (hEl) hEl.textContent = `${h.current}/${h.max}`;
  if (sEl) sEl.textContent = s.current;
  if (cEl) cEl.textContent = c;
  if (fEl) fEl.textContent = String(inv.streakFreezes || 0);
}
