import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { ExploreView } from './components/ExploreView';
import { QuestLogView } from './components/QuestLogView';
import { BossBattle } from './components/BossBattle';
import { SpeedBlitz } from './components/SpeedBlitz';
import { GuildLeaderboard } from './components/GuildLeaderboard';
import { InventoryShop } from './components/InventoryShop';
import { PythonGameRealm } from './components/PythonGameRealm';
import { ProfileView } from './components/ProfileView';
import { LandingAuthPage } from './components/LandingAuthPage';
import { AuthModal } from './components/AuthModal';
import { AIGameGuide } from './components/AIGameGuide';
import { MageHunterAvatar } from './components/MageHunterAvatar';
import { RankUpModal } from './components/RankUpModal';

const MainContent: React.FC = () => {
  const { currentView } = useGame();

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col justify-between relative z-10">
      <div className="flex-1">
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'python_game' && <PythonGameRealm />}
        {currentView === 'quest_log' && <QuestLogView />}
        {currentView === 'arena' && <BossBattle />}
        {currentView === 'blitz' && <SpeedBlitz />}
        {currentView === 'guild' && <GuildLeaderboard />}
        {currentView === 'inventory' && <InventoryShop />}
        {currentView === 'profile' && <ProfileView />}
      </div>

      {/* Clean Gaming Footer (Mini project and team removed per Requirement 12) */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-white text-sm">VaultX</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">Rise of the Financial Hunter</span>
            <span>·</span>
            <span>Python 3.12 RPG Campaign (100 Levels · 20 Ranks)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Adaptive Web Audio Synthesizer</span>
            <span>·</span>
            <span>All Code & Quests Live</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

const AppRoot: React.FC = () => {
  const { 
    theme, 
    newlyUnlockedRank, 
    clearRankNotification, 
    savedNotification, 
    clearSavedNotification, 
    isAuthenticated 
  } = useGame();

  return (
    <div className={`min-h-screen text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 relative theme-${theme}`}>
      {/* Continuous Animated Game Background (Requirement 5) */}
      <div className="continuous-game-bg">
        <div className="continuous-grid-layer" />
        <div className="continuous-aurora-1" />
        <div className="continuous-aurora-2" />
      </div>

      {/* Game Save Confirmation Toast */}
      {savedNotification && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 border-2 border-emerald-500/60 text-emerald-200 text-xs font-bold shadow-[0_10px_30px_rgba(16,185,129,0.3)] backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-sm">
            💾
          </span>
          <span>{savedNotification}</span>
          <button
            onClick={clearSavedNotification}
            className="ml-2 text-slate-400 hover:text-white text-xs"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* MAIN LANDING PAGE: When unauthenticated, show the Sign-In and Login landing portal */}
      {!isAuthenticated ? (
        <LandingAuthPage />
      ) : (
        <>
          {/* Main Navigation & App Content */}
          <Navbar />
          <MainContent />

          {/* 2.5D Animated Mage Hunter Avatar (Requirement 7) */}
          <MageHunterAvatar />

          {/* Rank Up Modal Popup with Animation (Requirement 10) */}
          <RankUpModal rank={newlyUnlockedRank} onClose={clearRankNotification} />

          {/* AI Companion */}
          <AIGameGuide />
        </>
      )}

      {/* Auth Modal for overlay triggers if needed */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppRoot />
    </GameProvider>
  );
}
