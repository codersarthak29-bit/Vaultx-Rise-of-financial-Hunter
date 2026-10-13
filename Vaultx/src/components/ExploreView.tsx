import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LEARNING_TRACKS } from '../data/tracksData';
import { LearningTrack, TrackCategory } from '../types';
import { Search, ArrowRight, Play, Lock, Sparkles, Music } from 'lucide-react';
import { sound } from '../utils/audio';

import heroPortalImg from '../assets/images/hero_vault_hunter_portal_1791433356498.jpg';
import badgeHunterImg from '../assets/images/badge_financial_hunter_1791433368841.jpg';
import questPythonImg from '../assets/images/quest_python_dungeon_1791433382467.jpg';
import questMathImg from '../assets/images/quest_quantum_math_1791433394044.jpg';

const FILTER_CATEGORIES: TrackCategory[] = [
  'All tracks',
  'Most popular',
  'Systems & low-level',
  'Web & fullstack',
  'Math & Aptitude',
  'Reasoning & Quant'
];

export const ExploreView: React.FC = () => {
  const { user, setActiveTrackId, setCurrentView, setActiveQuest, isBgmPlaying, toggleBgm } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<TrackCategory>('All tracks');

  const filteredTracks = LEARNING_TRACKS.filter((track) => {
    const matchesCategory =
      selectedFilter === 'All tracks' || track.category.includes(selectedFilter);
    const matchesQuery =
      track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleSelectTrack = (track: LearningTrack) => {
    sound.playClick();
    if (track.id === 'python') {
      setCurrentView('python_game');
      return;
    }
    setActiveTrackId(track.id);
    setCurrentView('quest_log');
  };

  const handleQuickPlay = (track: LearningTrack) => {
    sound.playClick();
    if (track.id === 'python') {
      setCurrentView('python_game');
      return;
    }
    setActiveTrackId(track.id);
    const firstQuest = track.chapters[0]?.quests[0];
    if (firstQuest) {
      setActiveQuest(firstQuest);
    } else {
      setCurrentView('quest_log');
    }
  };

  const getTrackImage = (trackId: string) => {
    if (trackId === 'python') return questPythonImg;
    if (trackId === 'mathematics') return questMathImg;
    return null;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* 3-Step Breadcrumb Progress Bar (matching Slide 7) */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400 text-xs font-bold text-emerald-300">
              1
            </span>
            <span className="text-white">1. Choose track</span>
          </div>

          <span className="text-slate-600">———</span>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400">
              2
            </span>
            <span>2. Build skills</span>
          </div>

          <span className="text-slate-600">———</span>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400">
              3
            </span>
            <span>3. Unlock boss</span>
          </div>
        </div>
      </div>

      {/* Cinematic Hero Portal Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src={heroPortalImg}
            alt="VaultX Cybernetic Portal Gateway"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              CHAPTER 1: THE GATEWAY OF COMPILERS
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Season 04 Live
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Which programming language would you like to master?
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Select your code realm to explore. Slay runtime errors, clear syntax dungeons, climb leaderboards, and build boss-level skills.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('python_game');
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>Play Python 3.12 (100 Lvls)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('arena');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
            >
              <span>Challenge Boss</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentView('blitz');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
            >
              <span>⚡ Speed Blitz</span>
            </button>

            <button
              onClick={toggleBgm}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                isBgmPlaying
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-bounce text-emerald-400' : ''}`} />
              <span>{isBgmPlaying ? '🎵 Music: Playing' : '🎵 Start BGM'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filter Chips (matching Slide 7) */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 40+ programming languages, aptitude topics, & quant math..."
            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedFilter(cat);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Python 3.12 100-Level RPG Campaign Spotlight Banner */}
      <div className="rounded-3xl border border-emerald-500/50 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
              PRIMARY ACTIVE CAMPAIGN · 100 WORKING LEVELS
            </span>
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
              <span>🏆 20 Hunter Ranks</span>
              <span>·</span>
              <span>⚔️ 20 Boss Raids</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Python 3.12: Rise of the Pythonic Master
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Ascend through 100 interactive game levels from syntax basics to generator streaming, structural pattern matching, asyncio GIL mastery, and quantitative finance algorithms. Unlock a new prestigious Hunter Rank after every 5 levels!
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentView('python_game');
          }}
          className="relative z-10 px-7 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2 group shrink-0 active:scale-95"
        >
          <span>Enter 100-Level World Map</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* Grid of Track Cards: Python active, others upcoming with lowered intensity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track) => {
          const isPython = track.id === 'python';
          const userProgress = user.trackProgress[track.id] || 0;
          const trackImg = getTrackImage(track.id);

          return (
            <div
              key={track.id}
              onClick={() => {
                if (isPython) {
                  sound.playClick();
                  setCurrentView('python_game');
                }
              }}
              className={`group relative rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isPython
                  ? 'border-emerald-500/50 bg-slate-900 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer'
                  : 'border-slate-800/40 bg-slate-950/60 opacity-55 grayscale-[25%] cursor-not-allowed'
              }`}
            >
              {/* Optional Visual Thumbnail */}
              {trackImg && (
                <div className="h-28 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={trackImg}
                    alt={track.name}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isPython ? 'group-hover:scale-105 opacity-70' : 'opacity-30'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>
              )}

              {/* Header inside Card */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`font-bold text-lg ${isPython ? 'text-white group-hover:text-emerald-300' : 'text-slate-400'}`}>
                    {track.name}
                  </span>

                  {isPython ? (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border text-emerald-400 border-emerald-500/40 bg-emerald-500/15">
                      ACTIVE REALM · 100 LVLS
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border text-slate-500 border-slate-700 bg-slate-800/40">
                      UPCOMING REALM
                    </span>
                  )}
                </div>

                {/* Subtitle / Tagline */}
                <p className={`text-xs font-semibold mb-2 ${isPython ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {isPython ? '100 Levels · 20 Hunter Ranks · Working Game' : `${track.tagline} (Upcoming Expansion)`}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                  {track.description}
                </p>
              </div>

              {/* Progress & Action Bottom */}
              <div className="space-y-4 p-6 pt-0">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>{isPython ? '100 Level Progress' : 'Status'}</span>
                    <span className="tabular-nums font-semibold text-slate-300">
                      {isPython ? `${userProgress}%` : 'Locked'}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPython ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-slate-700'
                      }`}
                      style={{ width: isPython ? `${Math.max(5, userProgress)}%` : '0%' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/70">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    {isPython ? (
                      <>
                        <span>⚡ 10 Biomes</span>
                        <span>·</span>
                        <span>100 Levels</span>
                      </>
                    ) : (
                      <span className="text-slate-500">Upcoming Expansion Realm</span>
                    )}
                  </div>

                  {isPython ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        setCurrentView('python_game');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-md transition-all active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-slate-950" />
                      <span>Play Now</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Upcoming Realm</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
