export type PathMode = 'Student' | 'Casual Explorer' | 'Career Pro';

export type GameTheme = 'emerald' | 'cyberpunk' | 'solar' | 'arcane' | 'crimson';

export interface UserProfile {
  id: string;
  fullName: string;
  gamertag: string;
  email: string;
  pathMode: PathMode;
  theme?: GameTheme;
  unlockedRanks?: number[];
  xp: number;
  level: number;
  vaultCoins: number;
  streakDays: number;
  lastActiveDate: string;
  avatar: string;
  equippedTitle: string;
  equippedFrame: string;
  inventory: InventoryItem[];
  completedQuests: string[];
  trackProgress: Record<string, number>; // trackId -> percent completed
  pythonLevelProgress?: Record<number, { stars: number; highAccuracy: number }>;
  stats: {
    questionsSolved: number;
    accuracyPercent: number;
    bossesDefeated: number;
    blitzHighScore: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: 'boost' | 'cosmetic' | 'utility';
  icon: string;
  cost: number;
  quantity: number;
  active?: boolean;
}

export type TrackCategory = 
  | 'All tracks' 
  | 'Most popular' 
  | 'Systems & low-level' 
  | 'Web & fullstack' 
  | 'Math & Aptitude' 
  | 'Reasoning & Quant';

export interface Question {
  id: string;
  title: string;
  prompt: string;
  codeSnippet?: string;
  language?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  difficulty: 'Novice' | 'Adept' | 'Master';
  xpReward: number;
  coinReward: number;
}

export interface Quest {
  id: string;
  trackId: string;
  chapterNumber: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  requiredLevel: number;
  questions: Question[];
  xpTotal: number;
  coinsTotal: number;
  badgeUnlock?: string;
  isBossQuest?: boolean;
}

export interface LearningTrack {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: TrackCategory[];
  badgeTag: string; // e.g. "BEGINNER FRIENDLY", "FINANCIAL HUNTER"
  color: string;
  accentBg: string;
  iconName: string;
  totalQuests: number;
  levelRequired: number;
  bgGradient: string;
  chapters: {
    title: string;
    description: string;
    quests: Quest[];
  }[];
}

export interface BossEntity {
  id: string;
  name: string;
  title: string;
  maxHp: number;
  currentHp: number;
  attackPower: number;
  turnTimeSeconds: number;
  description: string;
  lootReward: {
    xp: number;
    coins: number;
    itemReward: string;
  };
  questions: Question[];
}

export interface LeaderboardEntry {
  rank: number;
  gamertag: string;
  name: string;
  xp: number;
  level: number;
  streak: number;
  league: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
  avatar: string;
  college?: string;
}
