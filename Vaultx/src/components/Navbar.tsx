import React from 'react';
import { useGame } from '../context/GameContext';
import { VaultXLogo } from './VaultXLogo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { sound } from '../utils/audio';
import { 
  Compass, Terminal, Skull, Zap, Trophy, ShoppingBag, 
  Volume2, VolumeX, Music, Flame, Award, Shield, User, LogOut, Save, Disc
} from 'lucide-react';

interface NavItem {
  id: 'explore' | 'python_game' | 'arena' | 'blitz' | 'guild' | 'inventory' | 'quest_log' | 'profile';
  label: string;
  badge?: string;
  icon: React.ReactNode;
  activeColor: string;
}

export const Navbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isMuted,
    isBgmPlaying,
    toggleBgm,
    currentView,
    setCurrentView,
    setActiveTrackId,
    setActiveQuest,
    setActiveBossId,
    logout,
    saveAndQuit,
    setIsAuthModalOpen,
    setAuthModalMode,
    toggleMute
  } = useGame();

  const handleNav = (view: 'explore' | 'quest_log' | 'python_game' | 'guild' | 'arena' | 'inventory' | 'blitz' | 'profile') => {
    sound.playClick();
    setActiveQuest(null);
    setActiveBossId(null);
    setCurrentView(view);
  };

  const navItems: NavItem[] = [
    {
      id: 'explore',
      label: 'Explore Realms',
      icon: <Compass className="w-5 h-5" />,
      activeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40 shadow-emerald-500/20'
    },
    {
      id: 'python_game',
      label: 'Python 3.12 (100 Lvls)',
      badge: '100 Lvls',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      activeColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-400 shadow-emerald-500/25'
    },
    {
      id: 'arena',
      label: 'Boss Arena',
      badge: 'Raid',
      icon: <Skull className="w-5 h-5 text-rose-400" />,
      activeColor: 'text-rose-400 bg-rose-500/15 border-rose-500/40 shadow-rose-500/20'
    },
    {
      id: 'blitz',
      label: 'Speed Blitz',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      activeColor: 'text-amber-400 bg-amber-500/15 border-amber-500/40 shadow-amber-500/20'
    },
    {
      id: 'guild',
      label: 'Guild & 20 Ranks',
      badge: 'Ranks',
      icon: <Trophy className="w-5 h-5 text-purple-400" />,
      activeColor: 'text-purple-400 bg-purple-500/15 border-purple-500/40 shadow-purple-500/20'
    },
    {
      id: 'inventory',
      label: 'Vault Shop',
      icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />,
      activeColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/40 shadow-cyan-500/20'
    },
    {
      id: 'profile',
      label: 'Hunter Profile',
      icon: <User className="w-5 h-5 text-emerald-400" />,
      activeColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-400 shadow-emerald-500/20'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        
        {/* Left: Brand name "Vaultx: Rise of financial hunter" with custom logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTrackId(null);
              handleNav('explore');
            }}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none rounded-xl p-1 transition-all"
            title="Return to Home"
          >
            <VaultXLogo size="md" showText={false} glow={true} />
            <div className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <span>Vaultx</span>
                <span className="text-slate-400 text-xs font-normal hidden sm:inline">:</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 hidden sm:inline">
                  Rise of financial hunter
                </span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase sm:hidden">
                Rise of financial hunter
              </span>
            </div>
          </button>
        </div>

        {/* Middle: Icon-only Navigation with sleek animated hover tooltip / expanding label */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleNav(item.id)}
                  aria-label={item.label}
                  className={`relative p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? `border-current ${item.activeColor} shadow-lg scale-105`
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/90 hover:border-slate-800 hover:scale-105'
                  }`}
                >
                  {item.icon}

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  )}

                  {/* Optional Mini Badge on Icon */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 text-[8px] font-black px-1 py-0.2 rounded-full bg-slate-900 border border-current leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Hover Tooltip / Expanding Text */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] font-bold text-white shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5">
                  <span>{item.label}</span>
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-l border-t border-slate-700/80 transform rotate-45" />
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right: Audio Controls, Theme Switcher, Player Status / Auth */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* BGM Music Toggle Button */}
          <button
            onClick={toggleBgm}
            aria-label={isBgmPlaying ? 'Pause BGM Music' : 'Play Background Music'}
            title={isBgmPlaying ? 'Background Music: Playing (Click to mute)' : 'Background Music: Off (Click to play)'}
            className={`p-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
              isBgmPlaying
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-md shadow-emerald-500/20'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Music className="w-4 h-4" />
            {isBgmPlaying && (
              <span className="flex items-center gap-0.5">
                <span className="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" />
                <span className="w-0.5 h-3.5 bg-emerald-300 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              </span>
            )}
          </button>

          {/* Sound Effects Mute Toggle Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            title={isMuted ? 'Sound Effects: Muted' : 'Sound Effects: Active'}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Player Info / Auth State */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* XP Counter */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs font-semibold text-emerald-400 tabular-nums">
                <Zap className="w-3.5 h-3.5" />
                <span>{user.xp.toLocaleString()} XP</span>
              </div>

              {/* Coins Counter */}
              <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs font-semibold text-amber-300 tabular-nums">
                <span>🪙</span>
                <span>{user.vaultCoins.toLocaleString()}</span>
              </div>

              {/* Player Avatar Button */}
              <button
                onClick={() => handleNav('profile')}
                title={`${user.fullName} (${user.gamertag}) - Level ${user.level} (Click to view Profile)`}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 border-2 border-emerald-500/60 text-sm font-bold text-emerald-300 hover:border-emerald-400 transition-all hover:scale-105 shadow-md"
              >
                <span>{user.avatar || '🧙‍♂️'}</span>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-slate-950 shadow">
                  {user.level}
                </span>
              </button>

              {/* SAVE & QUIT BUTTON (Requirement 2) */}
              <button
                onClick={saveAndQuit}
                title="Save & Quit (Secures your progress to your account and signs out)"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold text-xs transition-all shadow-sm active:scale-95"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Save & Quit</span>
              </button>

              {/* Log out */}
              <button
                onClick={logout}
                title="Log Out"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sound.playClick();
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap active:scale-95"
              >
                Join Hunter
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
