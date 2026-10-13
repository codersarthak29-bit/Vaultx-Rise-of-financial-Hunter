import { InventoryItem } from '../types';

export const SHOP_ITEMS: InventoryItem[] = [
  {
    id: 'streak_shield',
    name: 'Streak Shield',
    description: 'Guards your active study streak against missed days for 24 hours.',
    category: 'boost',
    icon: 'Shield',
    cost: 150,
    quantity: 1
  },
  {
    id: 'xp_potion_2x',
    name: '2X XP Surge Catalyst',
    description: 'Doubles all XP earned in the next 3 completed quests or boss battles.',
    category: 'boost',
    icon: 'Zap',
    cost: 200,
    quantity: 1
  },
  {
    id: 'time_extender',
    name: 'Chrono Time Freeze',
    description: 'Grants +20 extra seconds in Boss Battles and Speed Blitz challenges.',
    category: 'utility',
    icon: 'Clock',
    cost: 120,
    quantity: 1
  },
  {
    id: 'cyber_frame',
    name: 'Emerald Cyber Matrix Frame',
    description: 'A radiant animated emerald cybernetic border around your player gamertag.',
    category: 'cosmetic',
    icon: 'Sparkles',
    cost: 350,
    quantity: 1
  },
  {
    id: 'title_hunter',
    name: 'Title: "Grand Financial Hunter"',
    description: 'An elite title displayed prominently on leaderboards and profile cards.',
    category: 'cosmetic',
    icon: 'Award',
    cost: 500,
    quantity: 1
  },
  {
    id: 'ai_hint_pack',
    name: 'Oracle Insight Crystals (x5)',
    description: 'Reveals full step-by-step problem breakdowns during high-stakes challenges.',
    category: 'utility',
    icon: 'HelpCircle',
    cost: 100,
    quantity: 5
  }
];
