import React from 'react';

export interface HunterRank {
  rankNumber: number;
  unlockedAtLevel: number;
  title: string;
  tier: string;
  color: string;
  secondaryColor: string;
  gradient: string;
  iconName: string;
  description: string;
  perks: string[];
}

export const HUNTER_RANKS: HunterRank[] = [
  {
    rankNumber: 1,
    unlockedAtLevel: 5,
    title: 'Novice Byte',
    tier: 'Tier I',
    color: '#94A3B8',
    secondaryColor: '#64748B',
    gradient: 'from-slate-500 to-slate-700',
    iconName: 'spark',
    description: 'Broke through beginner syntax barriers and learned Python statement evaluation.',
    perks: ['+250 XP Hunter Bonus', '+50 Vault Coins', 'Unlock Title: Novice Byte']
  },
  {
    rankNumber: 2,
    unlockedAtLevel: 10,
    title: 'Syntax Scribe',
    tier: 'Tier II',
    color: '#10B981',
    secondaryColor: '#059669',
    gradient: 'from-emerald-400 to-emerald-700',
    iconName: 'scroll',
    description: 'Transcribes control flows and conditional logic with precision.',
    perks: ['+350 XP Hunter Bonus', '+100 Vault Coins', 'Unlock Title: Syntax Scribe']
  },
  {
    rankNumber: 3,
    unlockedAtLevel: 15,
    title: 'Logic Weaver',
    tier: 'Tier III',
    color: '#06B6D4',
    secondaryColor: '#0891B2',
    gradient: 'from-cyan-400 to-cyan-700',
    iconName: 'knot',
    description: 'Weaves complex boolean expressions and mathematical algorithmic pathways.',
    perks: ['+450 XP Hunter Bonus', '+150 Vault Coins', 'Unlock Title: Logic Weaver']
  },
  {
    rankNumber: 4,
    unlockedAtLevel: 20,
    title: 'Data Pathfinder',
    tier: 'Tier IV',
    color: '#3B82F6',
    secondaryColor: '#1D4ED8',
    gradient: 'from-blue-400 to-blue-700',
    iconName: 'compass',
    description: 'Traverses lists, dictionaries, tuples, sets, and multidimensional slices effortlessly.',
    perks: ['+550 XP Hunter Bonus', '+200 Vault Coins', 'Unlock Title: Data Pathfinder']
  },
  {
    rankNumber: 5,
    unlockedAtLevel: 25,
    title: 'Function Mage',
    tier: 'Tier V',
    color: '#8B5CF6',
    secondaryColor: '#6D28D9',
    gradient: 'from-violet-400 to-purple-800',
    iconName: 'staff',
    description: 'Casts pure functions, variadic *args/**kwargs spells, and lambdas with ease.',
    perks: ['+700 XP Hunter Bonus', '+250 Vault Coins', 'Unlock Arcane Hunter Cape Frame']
  },
  {
    rankNumber: 6,
    unlockedAtLevel: 30,
    title: 'Algorithmic Scout',
    tier: 'Tier VI',
    color: '#A855F7',
    secondaryColor: '#7E22CE',
    gradient: 'from-purple-400 to-fuchsia-800',
    iconName: 'dagger',
    description: 'Detects edge cases, optimizing time and space algorithmic complexity.',
    perks: ['+800 XP Hunter Bonus', '+300 Vault Coins', 'Unlock Title: Algorithmic Scout']
  },
  {
    rankNumber: 7,
    unlockedAtLevel: 35,
    title: 'Recursion Seeker',
    tier: 'Tier VII',
    color: '#EC4899',
    secondaryColor: '#BE185D',
    gradient: 'from-pink-400 to-rose-700',
    iconName: 'ouroboros',
    description: 'Dives deep into recursive call stacks and emerges without exceeding recursion limits.',
    perks: ['+900 XP Hunter Bonus', '+350 Vault Coins', 'Unlock Title: Recursion Seeker']
  },
  {
    rankNumber: 8,
    unlockedAtLevel: 40,
    title: 'Object Shaper',
    tier: 'Tier VIII',
    color: '#F43F5E',
    secondaryColor: '#BE123C',
    gradient: 'from-rose-400 to-red-800',
    iconName: 'cube',
    description: 'Molds object-oriented structures, polymorphic methods, and class hierarchies.',
    perks: ['+1,000 XP Hunter Bonus', '+400 Vault Coins', 'Unlock Title: Object Shaper']
  },
  {
    rankNumber: 9,
    unlockedAtLevel: 45,
    title: 'Pattern Striker',
    tier: 'Tier IX',
    color: '#F97316',
    secondaryColor: '#C2410C',
    gradient: 'from-orange-400 to-amber-700',
    iconName: 'lightning',
    description: 'Wields Python match/case structural pattern matching with deadly precision.',
    perks: ['+1,100 XP Hunter Bonus', '+450 Vault Coins', 'Unlock Title: Pattern Striker']
  },
  {
    rankNumber: 10,
    unlockedAtLevel: 50,
    title: 'Exception Warden',
    tier: 'Tier X',
    color: '#EAB308',
    secondaryColor: '#A16207',
    gradient: 'from-amber-400 to-yellow-700',
    iconName: 'shield',
    description: 'Guards systems against tracebacks, ExceptionGroups, and memory corruptions.',
    perks: ['+1,250 XP Hunter Bonus', '+500 Vault Coins', 'Unlock Golden Warden Crest Frame']
  },
  {
    rankNumber: 11,
    unlockedAtLevel: 55,
    title: 'Memory Alchemist',
    tier: 'Tier XI',
    color: '#84CC16',
    secondaryColor: '#4D7C0F',
    gradient: 'from-lime-400 to-emerald-800',
    iconName: 'alchemy',
    description: 'Transmutes references, manages garbage collection cycles, and optimizes __slots__.',
    perks: ['+1,400 XP Hunter Bonus', '+550 Vault Coins', 'Unlock Title: Memory Alchemist']
  },
  {
    rankNumber: 12,
    unlockedAtLevel: 60,
    title: 'Async Invoker',
    tier: 'Tier XII',
    color: '#14B8A6',
    secondaryColor: '#0F766E',
    gradient: 'from-teal-400 to-cyan-800',
    iconName: 'hourglass',
    description: 'Bends event loops, Tasks, and coroutines without blocking the runtime.',
    perks: ['+1,550 XP Hunter Bonus', '+600 Vault Coins', 'Unlock Title: Async Invoker']
  },
  {
    rankNumber: 13,
    unlockedAtLevel: 65,
    title: 'Concurrency Hunter',
    tier: 'Tier XIII',
    color: '#0284C7',
    secondaryColor: '#0369A1',
    gradient: 'from-sky-400 to-indigo-800',
    iconName: 'blades',
    description: 'Orchestrates multiprocessing and task pools with synchronized locks.',
    perks: ['+1,700 XP Hunter Bonus', '+650 Vault Coins', 'Unlock Title: Concurrency Hunter']
  },
  {
    rankNumber: 14,
    unlockedAtLevel: 70,
    title: 'Metaclass Architect',
    tier: 'Tier XIV',
    color: '#6366F1',
    secondaryColor: '#4338CA',
    gradient: 'from-indigo-400 to-violet-900',
    iconName: 'pyramid',
    description: 'Constructs dynamic types, type.__new__, descriptors, and metaclass blueprints.',
    perks: ['+1,850 XP Hunter Bonus', '+700 Vault Coins', 'Unlock Title: Metaclass Architect']
  },
  {
    rankNumber: 15,
    unlockedAtLevel: 75,
    title: 'Bytecode Vanguard',
    tier: 'Tier XV',
    color: '#8B5CF6',
    secondaryColor: '#6D28D9',
    gradient: 'from-purple-400 to-pink-800',
    iconName: 'banner',
    description: 'Disassembles raw Python bytecode (dis.dis) and analyzes specialized opcodes.',
    perks: ['+2,000 XP Hunter Bonus', '+750 Vault Coins', 'Unlock Bytecode Vanguard Frame']
  },
  {
    rankNumber: 16,
    unlockedAtLevel: 80,
    title: 'GILbreaker Assassin',
    tier: 'Tier XVI',
    color: '#D946EF',
    secondaryColor: '#A21CAF',
    gradient: 'from-fuchsia-400 to-rose-900',
    iconName: 'chain',
    description: 'Shatters Global Interpreter Lock bottlenecks utilizing free-threaded Python 3.12 builds.',
    perks: ['+2,250 XP Hunter Bonus', '+800 Vault Coins', 'Unlock Title: GILbreaker Assassin']
  },
  {
    rankNumber: 17,
    unlockedAtLevel: 85,
    title: 'Cybernetic Pyromancer',
    tier: 'Tier XVII',
    color: '#F43F5E',
    secondaryColor: '#9F1239',
    gradient: 'from-rose-500 to-orange-800',
    iconName: 'flame',
    description: 'Ignites PEP 695 generic type parameters and lightning-fast parser optimizations.',
    perks: ['+2,500 XP Hunter Bonus', '+900 Vault Coins', 'Unlock Infernal Pyromancer Aura']
  },
  {
    rankNumber: 18,
    unlockedAtLevel: 90,
    title: 'Vault Grandmaster',
    tier: 'Tier XVIII',
    color: '#F59E0B',
    secondaryColor: '#B45309',
    gradient: 'from-amber-400 to-yellow-600',
    iconName: 'crown',
    description: 'Commanding general of quant analytics and high-frequency algorithms in the vault.',
    perks: ['+2,800 XP Hunter Bonus', '+1,000 Vault Coins', 'Unlock Grandmaster Royal Mantle']
  },
  {
    rankNumber: 19,
    unlockedAtLevel: 95,
    title: 'Quantum Python Sovereign',
    tier: 'Tier XIX',
    color: '#06B6D4',
    secondaryColor: '#4F46E5',
    gradient: 'from-cyan-400 via-indigo-500 to-purple-800',
    iconName: 'galaxy',
    description: 'Commands multithreaded quantum risk modeling engines with supreme finesse.',
    perks: ['+3,200 XP Hunter Bonus', '+1,200 Vault Coins', 'Unlock Celestial Sovereign Sigil']
  },
  {
    rankNumber: 20,
    unlockedAtLevel: 100,
    title: 'Legendary Financial Archon',
    tier: 'Tier XX (MAX)',
    color: '#FCD34D',
    secondaryColor: '#F59E0B',
    gradient: 'from-yellow-300 via-amber-400 to-emerald-500',
    iconName: 'phoenix',
    description: 'Supreme Pinnacle of VaultX! Has mastered all 100 levels of Python 3.12 algorithmic mastery.',
    perks: ['+5,000 XP Ultimate Reward', '+2,500 Vault Coins', 'Permanent Legendary Archon Crest', 'Immortalized in Guild Hall']
  }
];

export function getRankForLevel(levelNumber: number): HunterRank {
  let highestRank = HUNTER_RANKS[0];
  for (const rank of HUNTER_RANKS) {
    if (levelNumber >= rank.unlockedAtLevel) {
      highestRank = rank;
    } else {
      break;
    }
  }
  return highestRank;
}

export function isRankMilestoneLevel(levelNumber: number): boolean {
  return levelNumber > 0 && levelNumber % 5 === 0 && levelNumber <= 100;
}
