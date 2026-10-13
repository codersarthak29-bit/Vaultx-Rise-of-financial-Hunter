import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { HUNTER_RANKS, HunterRank, getRankForLevel } from '../data/ranksData';
import { RankInsignia } from './RankInsignia';
import { sound } from '../utils/audio';
import { PathMode } from '../types';
import { 
  User, Shield, Award, Zap, Trophy, Flame, Save, LogOut, Check, 
  Sparkles, Edit3, ArrowLeft, Heart, Lock, Unlock, Eye, Star
} from 'lucide-react';

const AVATAR_OPTIONS = ['🧙‍♂️', '⚡', '🗡️', '🤖', '🏹', '🐉', '🔮', '🛡️', '🦅', '👑', '🐺', '🌟'];
const TITLE_OPTIONS = [
  'Novice Hunter',
  'Rising Financial Hunter',
  'Syntax Apprentice',
  'Scope Sorcerer',
  'Loop Specialist',
  'Recursion Master',
  'Algorithm Alchemist',
  'Async Grandmaster',
  'Grandmaster Quant Sorcerer'
];

export const ProfileView: React.FC = () => {
  const { 
    user, 
    updateUserProfile, 
    saveGame, 
    saveAndQuit, 
    setCurrentView 
  } = useGame();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [gamertag, setGamertag] = useState(user.gamertag);
  const [pathMode, setPathMode] = useState<PathMode>(user.pathMode || 'Student');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || '🧙‍♂️');
  const [equippedTitle, setEquippedTitle] = useState(user.equippedTitle || 'Rising Financial Hunter');
  const [selectedRankDetail, setSelectedRankDetail] = useState<HunterRank | null>(null);

  const completedLevelsCount = Object.keys(user.pythonLevelProgress || {}).length;
  const currentRank = getRankForLevel(Math.max(5, (user.unlockedRanks && user.unlockedRanks.length > 0) ? Math.max(...user.unlockedRanks) * 5 : 5));
  const currentXpInLevel = user.xp % 500;
  const xpPercent = Math.min(100, Math.round((currentXpInLevel / 500) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playLevelUp();
    updateUserProfile({
      fullName,
      gamertag,
      pathMode,
      avatar: selectedAvatar,
      equippedTitle
    });
    setIsEditing(false);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setCurrentView('explore')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Realms</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={saveGame}
            title="Save current game state"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-all shadow-sm active:scale-95"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save Progress</span>
          </button>

          <button
            onClick={saveAndQuit}
            title="Save and exit game session"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-xs font-bold text-emerald-300 transition-all shadow-sm active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save & Quit</span>
          </button>
        </div>
      </div>

      {/* HUNTER HERO PROFILE CARD */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
          
          {/* Left: Avatar & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            
            {/* Avatar Circle with Level Badge */}
            <div className="relative group shrink-0">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-slate-800 border-4 border-emerald-500/60 text-6xl shadow-xl shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                <span>{user.avatar || '🧙‍♂️'}</span>
              </div>
              <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500 border-2 border-slate-950 text-slate-950 font-black text-xs shadow-lg">
                Lv.{user.level}
              </span>
            </div>

            {/* User Meta */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  {user.pathMode || 'Student Hunter'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                  {user.equippedTitle || 'Rising Financial Hunter'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {user.fullName}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400">
                <span>Gamertag: <strong className="text-emerald-400">{user.gamertag}</strong></span>
                <span>·</span>
                <span>{user.email}</span>
              </div>

              {/* XP Progress Bar to next level */}
              <div className="pt-2 max-w-sm">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>Level {user.level} Progress</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{currentXpInLevel} / 500 XP</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Current Hunter Rank Badge & Edit Toggle */}
          <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md">
              <RankInsignia rank={currentRank} size="md" showGlow={true} />
              <div className="text-left">
                <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider">
                  CURRENT RANK
                </span>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {currentRank.title}
                </h4>
                <span className="text-[11px] text-slate-400 font-semibold">
                  Tier: {currentRank.tier}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setIsEditing((prev) => !prev);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Hunter Identity'}</span>
            </button>
          </div>
        </div>

        {/* PROFILE EDIT FORM (Toggled) */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-8 pt-8 border-t border-slate-800 space-y-6 animate-in fade-in duration-200">
            <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              <span>Customize Hunter Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Player Gamertag</label>
                <input
                  type="text"
                  required
                  value={gamertag}
                  onChange={(e) => setGamertag(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Equipped Hunter Title</label>
                <select
                  value={equippedTitle}
                  onChange={(e) => setEquippedTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  {TITLE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Path Mode</label>
                <select
                  value={pathMode}
                  onChange={(e) => setPathMode(e.target.value as PathMode)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Student">Student (Academic Focus)</option>
                  <option value="Casual Explorer">Casual Explorer (RPG Paced)</option>
                  <option value="Career Pro">Career Pro (Industry Mastery)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Choose Hunter Avatar Glyph</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedAvatar(av);
                      }}
                      className={`h-9 w-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                        selectedAvatar === av
                          ? 'border-emerald-400 bg-emerald-500/20 scale-110 shadow'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* HUNTER PERFORMANCE & STATS METRICS */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-400" />
          <span>Hunter Career Performance</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">100-Level Quest</span>
            <p className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">
              {completedLevelsCount} <span className="text-xs text-slate-500">/ 100</span>
            </p>
            <span className="text-[10px] text-slate-500 block mt-0.5">Levels Cleared</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Accuracy</span>
            <p className="text-2xl font-black text-sky-400 mt-1 tabular-nums">
              {user.stats.accuracyPercent}%
            </p>
            <span className="text-[10px] text-slate-500 block mt-0.5">Strict Mastery Rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Bosses Slayed</span>
            <p className="text-2xl font-black text-rose-400 mt-1 tabular-nums">
              {user.stats.bossesDefeated}
            </p>
            <span className="text-[10px] text-slate-500 block mt-0.5">Raid Encounters</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Vault Coins</span>
            <p className="text-2xl font-black text-amber-400 mt-1 tabular-nums">
              {user.vaultCoins.toLocaleString()}
            </p>
            <span className="text-[10px] text-slate-500 block mt-0.5">Available Currency</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Total Hunter XP</span>
            <p className="text-2xl font-black text-purple-400 mt-1 tabular-nums">
              {user.xp.toLocaleString()}
            </p>
            <span className="text-[10px] text-slate-500 block mt-0.5">Accumulated Mastery</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Daily Streak</span>
            <p className="text-2xl font-black text-orange-400 mt-1 tabular-nums">
              {user.streakDays} Days 🔥
            </p>
            <span className="text-[10px] text-slate-500 block mt-0.5">Consistency Bonus</span>
          </div>
        </div>
      </div>

      {/* ALL 20 HUNTER RANKS SHOWCASE */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>All 20 Hunter Ranks & Insignias</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Assigned every 5 levels in the Python 3.12 100-Level Campaign. Click any rank to view lore & perks.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            Unlocked: <strong className="text-emerald-400 font-bold">{(user.unlockedRanks || []).length} / 20 Ranks</strong>
          </div>
        </div>

        {/* 20 Ranks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {HUNTER_RANKS.map((rank) => {
            const isUnlocked = (user.unlockedRanks || []).includes(rank.rankNumber) || completedLevelsCount >= rank.unlockedAtLevel;
            return (
              <button
                key={rank.rankNumber}
                onClick={() => {
                  sound.playClick();
                  setSelectedRankDetail(rank);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col items-center text-center relative group ${
                  isUnlocked
                    ? 'border-slate-700 bg-slate-900/90 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/30'
                    : 'border-slate-800/60 bg-slate-950/60 opacity-60 hover:opacity-80'
                }`}
              >
                {/* Status Badge */}
                <span className={`absolute top-2.5 right-2.5 text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                  isUnlocked 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isUnlocked ? 'Unlocked' : `Lv.${rank.unlockedAtLevel}`}
                </span>

                {/* Insignia */}
                <div className="my-2 group-hover:scale-110 transition-transform">
                  <RankInsignia rank={rank} size="md" showGlow={isUnlocked} />
                </div>

                <div className="space-y-0.5 mt-1">
                  <span className="text-[10px] font-bold text-slate-400 block">
                    Rank {rank.rankNumber} · {rank.tier}
                  </span>
                  <h4 className="text-xs font-extrabold text-white leading-tight">
                    {rank.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 block">
                    Unlocked at Level {rank.unlockedAtLevel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RANK DETAIL POPUP MODAL */}
      {selectedRankDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl text-center">
            <button
              onClick={() => setSelectedRankDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs p-2 rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>

            <div className="mx-auto flex justify-center">
              <RankInsignia rank={selectedRankDetail} size="xl" showGlow={true} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black text-amber-400 tracking-widest">
                RANK {selectedRankDetail.rankNumber} · {selectedRankDetail.tier.toUpperCase()} TIER
              </span>
              <h3 className="text-xl font-black text-white">
                {selectedRankDetail.title}
              </h3>
              <p className="text-xs text-emerald-400 font-semibold">
                Milestone Requirement: Level {selectedRankDetail.unlockedAtLevel} Conquered
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {selectedRankDetail.description}
            </p>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400">Hunter Perks</span>
              <span className="font-bold text-amber-300">
                {selectedRankDetail.perks && selectedRankDetail.perks.length > 0 
                  ? selectedRankDetail.perks.join(', ') 
                  : 'Exclusive Hunter Insignia & Title'}
              </span>
            </div>

            <button
              onClick={() => setSelectedRankDetail(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow-md"
            >
              Close Insignia Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
