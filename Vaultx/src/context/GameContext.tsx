import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, InventoryItem, Quest, PathMode, GameTheme } from '../types';
import { SHOP_ITEMS } from '../data/shopData';
import { sound } from '../utils/audio';
import { HunterRank, getRankForLevel, isRankMilestoneLevel } from '../data/ranksData';
import confetti from 'canvas-confetti';

interface AuthAccount {
  email: string;
  gamertag: string;
  fullName: string;
  password?: string;
  pathMode: PathMode;
  avatar: string;
  createdAt: string;
}

interface GameContextType {
  user: UserProfile;
  theme: GameTheme;
  setTheme: (theme: GameTheme) => void;
  isAuthenticated: boolean;
  isMuted: boolean;
  isBgmPlaying: boolean;
  toggleBgm: () => void;
  newlyUnlockedRank: HunterRank | null;
  clearRankNotification: () => void;
  savedNotification: string | null;
  clearSavedNotification: () => void;
  saveGame: () => { success: boolean; message: string };
  saveAndQuit: () => void;
  currentView: 'explore' | 'quest_log' | 'python_game' | 'guild' | 'arena' | 'inventory' | 'project_review' | 'blitz' | 'profile';
  activeTrackId: string | null;
  activeQuest: Quest | null;
  activeBossId: string | null;
  activePythonLevelNumber: number | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  login: (emailOrGamertag: string, password?: string, fullName?: string, pathMode?: PathMode) => { success: boolean; message: string };
  register: (fullName: string, gamertag: string, email: string, password?: string, pathMode?: PathMode, avatar?: string) => { success: boolean; message: string };
  guestLogin: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  setCurrentView: (view: 'explore' | 'quest_log' | 'python_game' | 'guild' | 'arena' | 'inventory' | 'project_review' | 'blitz' | 'profile') => void;
  setActiveTrackId: (id: string | null) => void;
  setActiveQuest: (quest: Quest | null) => void;
  setActiveBossId: (id: string | null) => void;
  setActivePythonLevelNumber: (lvl: number | null) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setAuthModalMode: (mode: 'login' | 'register') => void;
  toggleMute: () => void;
  awardReward: (xp: number, coins: number, questId?: string) => void;
  completePythonLevel: (levelNumber: number, stars: number, accuracy: number, xpReward: number, coinReward: number, badgeUnlock?: string) => void;
  buyItem: (item: InventoryItem) => boolean;
  useItem: (itemId: string) => boolean;
  triggerCelebration: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_sarthak_01',
  fullName: 'Sarthak Singh',
  gamertag: 'uchibatobi',
  email: 'sarthakprajapati29@gmail.com',
  pathMode: 'Student',
  theme: 'emerald',
  unlockedRanks: [1, 2],
  xp: 4850,
  level: 10,
  vaultCoins: 1250,
  streakDays: 7,
  lastActiveDate: new Date().toISOString(),
  avatar: '🧙‍♂️',
  equippedTitle: 'Rising Financial Hunter',
  equippedFrame: 'emerald',
  inventory: [
    {
      ...SHOP_ITEMS[0],
      quantity: 2
    },
    {
      ...SHOP_ITEMS[1],
      quantity: 1,
      active: true
    }
  ],
  completedQuests: ['py-q1'],
  trackProgress: {
    python: 10,
    mathematics: 0,
    aptitude: 0,
    reasoning: 0
  },
  pythonLevelProgress: {
    1: { stars: 3, highAccuracy: 100 }
  },
  stats: {
    questionsSolved: 48,
    accuracyPercent: 91,
    bossesDefeated: 2,
    blitzHighScore: 180
  }
};

const INITIAL_ACCOUNTS: AuthAccount[] = [
  {
    email: 'sarthakprajapati29@gmail.com',
    gamertag: 'uchibatobi',
    fullName: 'Sarthak Singh',
    password: 'password123',
    pathMode: 'Student',
    avatar: '🧙‍♂️',
    createdAt: new Date().toISOString()
  },
  {
    email: 'hunter@vaultx.io',
    gamertag: 'vault_hunter',
    fullName: 'Nexus Hunter',
    password: 'vaultx',
    pathMode: 'Career Pro',
    avatar: '⚡',
    createdAt: new Date().toISOString()
  }
];

const createFreshStarterProfile = (
  fullName: string,
  gamertag: string,
  email: string,
  pathMode: PathMode = 'Student',
  avatar: string = '🧙‍♂️',
  theme: GameTheme = 'emerald'
): UserProfile => ({
  id: `usr_${Date.now()}`,
  fullName,
  gamertag,
  email,
  pathMode,
  theme,
  unlockedRanks: [],
  xp: 100, // Starter initiation XP
  level: 1,
  vaultCoins: 250,
  streakDays: 1,
  lastActiveDate: new Date().toISOString(),
  avatar,
  equippedTitle: 'Novice Hunter',
  equippedFrame: 'emerald',
  inventory: [],
  completedQuests: [],
  trackProgress: {
    python: 0,
    mathematics: 0,
    aptitude: 0,
    reasoning: 0
  },
  pythonLevelProgress: {}, // 0 completed levels! Level 1 is the first unlocked level
  stats: {
    questionsSolved: 0,
    accuracyPercent: 0,
    bossesDefeated: 0,
    blitzHighScore: 0
  }
});

const INITIAL_SAVES: Record<string, UserProfile> = {
  'sarthakprajapati29@gmail.com': DEFAULT_USER,
  'uchibatobi': DEFAULT_USER,
  'hunter@vaultx.io': createFreshStarterProfile('Nexus Hunter', 'vault_hunter', 'hunter@vaultx.io', 'Career Pro', '⚡')
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<GameTheme>(() => {
    try {
      const savedTheme = localStorage.getItem('vaultx_theme') as GameTheme;
      if (['emerald', 'cyberpunk', 'solar', 'arcane', 'crimson'].includes(savedTheme)) {
        return savedTheme;
      }
    } catch {}
    return 'emerald';
  });

  const getAllSaves = (): Record<string, UserProfile> => {
    try {
      const stored = localStorage.getItem('vaultx_all_saves');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_SAVES;
  };

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const activeId = localStorage.getItem('vaultx_active_user_id');
      const allSaves = getAllSaves();
      if (activeId && allSaves[activeId.toLowerCase()]) {
        return allSaves[activeId.toLowerCase()];
      }
      const stored = localStorage.getItem('vaultx_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vaultx_session_active') === 'true';
    } catch {}
    return false;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [newlyUnlockedRank, setNewlyUnlockedRank] = useState<HunterRank | null>(null);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const [currentView, setCurrentView] = useState<'explore' | 'quest_log' | 'python_game' | 'guild' | 'arena' | 'inventory' | 'project_review' | 'blitz' | 'profile'>('explore');
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [activeBossId, setActiveBossId] = useState<string | null>(null);
  const [activePythonLevelNumber, setActivePythonLevelNumber] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');

  // Load and sync accounts from localStorage
  const getAccounts = (): AuthAccount[] => {
    try {
      const stored = localStorage.getItem('vaultx_accounts');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_ACCOUNTS;
  };

  const saveAccounts = (accs: AuthAccount[]) => {
    try {
      localStorage.setItem('vaultx_accounts', JSON.stringify(accs));
    } catch {}
  };

  // Synchronize current user progress to their isolated save slot
  useEffect(() => {
    try {
      const saves = getAllSaves();
      const emailKey = user.email ? user.email.trim().toLowerCase() : '';
      const tagKey = user.gamertag ? user.gamertag.trim().toLowerCase() : '';

      if (emailKey) saves[emailKey] = user;
      if (tagKey) saves[tagKey] = user;

      localStorage.setItem('vaultx_all_saves', JSON.stringify(saves));
      if (emailKey) localStorage.setItem('vaultx_active_user_id', emailKey);
      localStorage.setItem('vaultx_user', JSON.stringify(user));
    } catch {
      // Storage error ignored
    }
  }, [user]);

  const setTheme = (newTheme: GameTheme) => {
    sound.playClick();
    setThemeState(newTheme);
    try {
      localStorage.setItem('vaultx_theme', newTheme);
    } catch {}
    setUser((prev) => ({ ...prev, theme: newTheme }));
  };

  const toggleBgm = () => {
    const next = sound.toggleBgm();
    setIsBgmPlaying(next);
  };

  const clearRankNotification = () => {
    setNewlyUnlockedRank(null);
  };

  const clearSavedNotification = () => {
    setSavedNotification(null);
  };

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setMuted(nextState);
    if (!nextState) sound.playClick();
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#38BDF8', '#8B5CF6', '#F59E0B']
      });
    } catch {
      // Fallback if canvas is blocked
    }
  };

  // Explicit Save Game feature
  const saveGame = (): { success: boolean; message: string } => {
    try {
      const saves = getAllSaves();
      const emailKey = user.email ? user.email.trim().toLowerCase() : 'guest';
      const updatedUser = {
        ...user,
        lastActiveDate: new Date().toISOString()
      };

      saves[emailKey] = updatedUser;
      if (user.gamertag) {
        saves[user.gamertag.trim().toLowerCase()] = updatedUser;
      }

      localStorage.setItem('vaultx_all_saves', JSON.stringify(saves));
      localStorage.setItem('vaultx_active_user_id', emailKey);
      localStorage.setItem('vaultx_user', JSON.stringify(updatedUser));

      sound.playCoin();
      setSavedNotification(`Progress saved! Hunter "${user.gamertag}" is secure.`);
      setTimeout(() => setSavedNotification(null), 3000);

      return { success: true, message: `Game saved successfully for ${user.gamertag}!` };
    } catch {
      return { success: false, message: 'Failed to write game state.' };
    }
  };

  // Save & Quit feature (saves and logs out safely to landing page)
  const saveAndQuit = () => {
    saveGame();
    sound.playClick();
    try {
      localStorage.removeItem('vaultx_session_active');
    } catch {}
    setTimeout(() => {
      setIsAuthenticated(false);
      setActivePythonLevelNumber(null);
      setActiveBossId(null);
      setActiveQuest(null);
      setCurrentView('explore');
    }, 400);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    sound.playCoin();
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      try {
        const saves = getAllSaves();
        const key = (updated.email || updated.gamertag || 'guest').trim().toLowerCase();
        saves[key] = updated;
        localStorage.setItem('vaultx_all_saves', JSON.stringify(saves));
        localStorage.setItem('vaultx_user', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setSavedNotification('Profile successfully updated & saved!');
    setTimeout(() => setSavedNotification(null), 3000);
  };

  const guestLogin = () => {
    login('sarthakprajapati29@gmail.com', 'password123', 'Sarthak Singh', 'Student');
  };

  const login = (emailOrGamertag: string, password = '', fullName = 'Explorer', pathMode: PathMode = 'Student') => {
    const accounts = getAccounts();
    const cleanId = emailOrGamertag.trim().toLowerCase();
    const matched = accounts.find(
      (a) => a.email.toLowerCase() === cleanId || a.gamertag.toLowerCase() === cleanId
    );

    if (matched && password && matched.password && matched.password !== password) {
      sound.playWrong();
      return { success: false, message: 'Invalid password. Please check credentials.' };
    }

    try {
      localStorage.setItem('vaultx_session_active', 'true');
    } catch {}

    // Check if previous data exists for this specific user ID in isolated saves
    const saves = getAllSaves();
    const targetKey = matched ? matched.email.toLowerCase() : cleanId;
    const existingSave = saves[targetKey] || (matched ? saves[matched.gamertag.toLowerCase()] : undefined);

    if (existingSave) {
      // LOAD PREVIOUS DATA OF THIS SPECIFIC USER (levels, XP, coins, ranks preserved!)
      setUser(existingSave);
      if (existingSave.theme) {
        setThemeState(existingSave.theme);
      }
      sound.playLevelUp();
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      triggerCelebration();
      return { 
        success: true, 
        message: `Welcome back, Hunter ${existingSave.gamertag}! Previous progress restored (${Object.keys(existingSave.pythonLevelProgress || {}).length} levels completed).` 
      };
    }

    // If new player ID with no previous save: START NEW GAME FROM THE STARTING!
    const newPlayerProfile = createFreshStarterProfile(
      matched ? matched.fullName : (fullName || cleanId),
      matched ? matched.gamertag : (cleanId.split('@')[0] || 'hunter'),
      matched ? matched.email : (cleanId.includes('@') ? cleanId : `${cleanId}@vaultx.io`),
      matched ? matched.pathMode : pathMode,
      matched?.avatar || '🧙‍♂️',
      theme
    );

    setUser(newPlayerProfile);
    saves[targetKey] = newPlayerProfile;
    localStorage.setItem('vaultx_all_saves', JSON.stringify(saves));
    localStorage.setItem('vaultx_active_user_id', targetKey);

    sound.playLevelUp();
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    triggerCelebration();
    return { success: true, message: `New game initialized for Hunter ${newPlayerProfile.gamertag}! Quest begins at Level 1.` };
  };

  const register = (
    fullName: string,
    gamertag: string,
    email: string,
    password = '',
    pathMode: PathMode = 'Student',
    avatar = '🧙‍♂️'
  ) => {
    const accounts = getAccounts();
    const cleanEmail = email.trim().toLowerCase();
    const cleanGamertag = gamertag.trim().toLowerCase();

    const exists = accounts.some(
      (a) => a.email.toLowerCase() === cleanEmail || a.gamertag.toLowerCase() === cleanGamertag
    );

    if (exists) {
      sound.playWrong();
      return { success: false, message: 'An account with that Email or Gamertag already exists!' };
    }

    try {
      localStorage.setItem('vaultx_session_active', 'true');
    } catch {}

    const newAccount: AuthAccount = {
      fullName,
      gamertag,
      email: cleanEmail,
      password,
      pathMode,
      avatar,
      createdAt: new Date().toISOString()
    };

    saveAccounts([...accounts, newAccount]);

    // NEW PLAYER: Starts brand new game from the starting! No data from previous player!
    const freshProfile = createFreshStarterProfile(
      fullName,
      gamertag,
      cleanEmail,
      pathMode,
      avatar,
      theme
    );

    const saves = getAllSaves();
    saves[cleanEmail] = freshProfile;
    saves[cleanGamertag] = freshProfile;
    localStorage.setItem('vaultx_all_saves', JSON.stringify(saves));
    localStorage.setItem('vaultx_active_user_id', cleanEmail);

    setUser(freshProfile);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    sound.playLevelUp();
    triggerCelebration();
    return { success: true, message: `Account created! Welcome to VaultX, Hunter ${gamertag}! Starting at Level 1.` };
  };

  const logout = () => {
    saveGame();
    sound.playClick();
    try {
      localStorage.removeItem('vaultx_session_active');
    } catch {}
    setIsAuthenticated(false);
    setCurrentView('explore');
  };

  const awardReward = (xpReward: number, coinReward: number, questId?: string) => {
    setUser((prev) => {
      // Check if 2x surge active
      const surgeActive = prev.inventory.some((i) => i.id === 'xp_potion_2x' && i.active && i.quantity > 0);
      const finalXp = surgeActive ? xpReward * 2 : xpReward;
      const nextXp = prev.xp + finalXp;
      const nextCoins = prev.vaultCoins + coinReward;
      const calculatedLevel = Math.max(1, Math.floor(nextXp / 500) + 1);
      const leveledUp = calculatedLevel > prev.level;

      if (leveledUp) {
        sound.playLevelUp();
        triggerCelebration();
      } else {
        sound.playCoin();
      }

      const nextCompleted = questId && !prev.completedQuests.includes(questId)
        ? [...prev.completedQuests, questId]
        : prev.completedQuests;

      return {
        ...prev,
        xp: nextXp,
        level: calculatedLevel,
        vaultCoins: nextCoins,
        completedQuests: nextCompleted,
        stats: {
          ...prev.stats,
          questionsSolved: prev.stats.questionsSolved + 1
        }
      };
    });
  };

  const completePythonLevel = (
    levelNumber: number,
    stars: number,
    accuracy: number,
    xpReward: number,
    coinReward: number,
    badgeUnlock?: string
  ) => {
    sound.playLevelUp();
    triggerCelebration();

    // Check rank milestone
    if (isRankMilestoneLevel(levelNumber)) {
      const unlockedRank = getRankForLevel(levelNumber);
      setNewlyUnlockedRank(unlockedRank);
    }

    setUser((prev) => {
      const existingLevelProgress = prev.pythonLevelProgress || {};
      const currentEntry = existingLevelProgress[levelNumber];
      const bestStars = currentEntry ? Math.max(currentEntry.stars, stars) : stars;
      const bestAccuracy = currentEntry ? Math.max(currentEntry.highAccuracy, accuracy) : accuracy;

      const updatedProgress = {
        ...existingLevelProgress,
        [levelNumber]: { stars: bestStars, highAccuracy: bestAccuracy }
      };

      const surgeActive = prev.inventory.some((i) => i.id === 'xp_potion_2x' && i.active && i.quantity > 0);
      const finalXp = surgeActive ? xpReward * 2 : xpReward;
      const nextXp = prev.xp + finalXp;
      const nextCoins = prev.vaultCoins + coinReward;
      const calculatedLevel = Math.max(1, Math.floor(nextXp / 500) + 1);

      // Recalculate Python progress % (100 levels total now!)
      const totalCompletedLevels = Object.keys(updatedProgress).length;
      const pythonPercent = Math.min(100, Math.round((totalCompletedLevels / 100) * 100));

      const updatedRanks = isRankMilestoneLevel(levelNumber)
        ? Array.from(new Set([...(prev.unlockedRanks || []), levelNumber / 5]))
        : (prev.unlockedRanks || [1]);

      return {
        ...prev,
        xp: nextXp,
        level: calculatedLevel,
        vaultCoins: nextCoins,
        unlockedRanks: updatedRanks,
        pythonLevelProgress: updatedProgress,
        trackProgress: {
          ...prev.trackProgress,
          python: pythonPercent
        },
        stats: {
          ...prev.stats,
          questionsSolved: prev.stats.questionsSolved + 2,
          bossesDefeated: levelNumber % 5 === 0 ? prev.stats.bossesDefeated + 1 : prev.stats.bossesDefeated
        }
      };
    });
  };

  const buyItem = (item: InventoryItem): boolean => {
    if (user.vaultCoins < item.cost) {
      sound.playWrong();
      return false;
    }
    sound.playCoin();
    setUser((prev) => {
      const existing = prev.inventory.find((i) => i.id === item.id);
      let updatedInv: InventoryItem[];
      if (existing) {
        updatedInv = prev.inventory.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      } else {
        updatedInv = [...prev.inventory, { ...item, quantity: item.quantity || 1 }];
      }
      return {
        ...prev,
        vaultCoins: prev.vaultCoins - item.cost,
        inventory: updatedInv
      };
    });
    return true;
  };

  const useItem = (itemId: string): boolean => {
    const item = user.inventory.find((i) => i.id === itemId);
    if (!item || item.quantity <= 0) return false;
    sound.playClick();

    setUser((prev) => ({
      ...prev,
      inventory: prev.inventory
        .map((i) => {
          if (i.id === itemId) {
            return { ...i, quantity: i.quantity - 1, active: true };
          }
          return i;
        })
        .filter((i) => i.quantity > 0 || i.category === 'cosmetic')
    }));
    return true;
  };

  return (
    <GameContext.Provider
      value={{
        user,
        theme,
        setTheme,
        isAuthenticated,
        isMuted,
        isBgmPlaying,
        toggleBgm,
        newlyUnlockedRank,
        clearRankNotification,
        savedNotification,
        clearSavedNotification,
        saveGame,
        saveAndQuit,
        currentView,
        activeTrackId,
        activeQuest,
        activeBossId,
        activePythonLevelNumber,
        isAuthModalOpen,
        authModalMode,
        login,
        register,
        guestLogin,
        updateUserProfile,
        logout,
        setCurrentView,
        setActiveTrackId,
        setActiveQuest,
        setActiveBossId,
        setActivePythonLevelNumber,
        setIsAuthModalOpen,
        setAuthModalMode,
        toggleMute,
        awardReward,
        completePythonLevel,
        buyItem,
        useItem,
        triggerCelebration
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
