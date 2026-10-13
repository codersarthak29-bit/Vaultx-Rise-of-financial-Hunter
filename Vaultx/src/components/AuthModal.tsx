import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { PathMode } from '../types';
import { VaultXLogo } from './VaultXLogo';
import { sound } from '../utils/audio';
import { Eye, EyeOff, Shield, Zap, Sparkles, Trophy, Clock, Bot, X, Check, AlertCircle } from 'lucide-react';

const AVATAR_OPTIONS = ['🧙‍♂️', '⚡', '🗡️', '🤖', '🏹', '🐉', '🔮', '🛡️'];

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register
  } = useGame();

  const [fullName, setFullName] = useState('Sarthak');
  const [gamertag, setGamertag] = useState('uchibatobi');
  const [email, setEmail] = useState('sarthakprajapati29@gmail.com');
  const [password, setPassword] = useState('password123');
  const [selectedAvatar, setSelectedAvatar] = useState('🧙‍♂️');
  const [showPassword, setShowPassword] = useState(false);
  const [pathMode, setPathMode] = useState<PathMode>('Student');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (authModalMode === 'register') {
      const res = register(fullName, gamertag, email, password, pathMode, selectedAvatar);
      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setSuccessMessage(res.message);
      }
    } else {
      const res = login(email, password, fullName, pathMode);
      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setSuccessMessage(res.message);
      }
    }
  };

  const handleQuickDemo = (type: 'sarthak' | 'guest') => {
    sound.playClick();
    if (type === 'sarthak') {
      login('sarthakprajapati29@gmail.com', 'password123', 'Sarthak Singh', 'Student');
    } else {
      login('hunter@vaultx.io', 'vaultx', 'Nexus Hunter', 'Career Pro');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsAuthModalOpen(false);
          }}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Hero Presentation & Lore */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <VaultXLogo size="md" showText={false} glow={true} />
              <div className="flex flex-col">
                <span className="font-black text-lg text-white">VaultX</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Rise of financial hunter
                </span>
              </div>
              <span className="ml-auto text-[10px] font-black tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                100 LEVELS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Master the Code Realms.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Progress through 100 game levels, defeat 20 raid bosses, acquire 20 Hunter Ranks, and conquer Python 3.12 algorithmic challenges.
            </p>

            {/* The Vault is Open Bonus Card */}
            <div className="relative rounded-2xl bg-slate-800/80 border border-emerald-500/30 p-4 mb-6 overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Hunter Induction</span>
                  <p className="text-sm font-black text-white mt-0.5">Claim +500 XP Welcome Boost</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-400 text-slate-950 font-black text-xs shadow-md">
                  +500 XP
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/15 blur-xl pointer-events-none" />
            </div>

            {/* Feature mini-cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <Shield className="w-4 h-4 text-amber-400 mb-1" />
                <h4 className="text-xs font-bold text-slate-200">20 Hunter Ranks</h4>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Emblems every 5 levels</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <Trophy className="w-4 h-4 text-emerald-400 mb-1" />
                <h4 className="text-xs font-bold text-slate-200">100 Game Levels</h4>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">10 elemental biomes</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <Clock className="w-4 h-4 text-sky-400 mb-1" />
                <h4 className="text-xs font-bold text-slate-200">20 Raid Bosses</h4>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Speech bubble riddles</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <Bot className="w-4 h-4 text-purple-400 mb-1" />
                <h4 className="text-xs font-bold text-slate-200">2.5D Mage Hunter</h4>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Animated spell companion</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Hunters Bar */}
          <div className="pt-3 border-t border-slate-800/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Quick 1-Click Test Sign-In
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('sarthak')}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-bold text-emerald-300 transition-colors"
              >
                🧙‍♂️ Hunter Sarthak
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('guest')}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-[11px] font-semibold text-slate-300 transition-colors"
              >
                ⚡ Nexus Pro Hunter
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-slate-900">
          <div className="max-w-md mx-auto w-full">
            
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAuthModalMode('login');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  authModalMode === 'login'
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAuthModalMode('register');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  authModalMode === 'register'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {authModalMode === 'register' ? 'Register New Hunter Profile' : 'Welcome back, Hunter'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 mb-5">
              {authModalMode === 'register'
                ? 'Create your credentials to save ranks, XP, and boss relics.'
                : 'Enter your credentials to continue your 100-level quest.'}
            </p>

            {/* Error & Success Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authModalMode === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Sarthak Singh"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Player Gamertag</label>
                      <input
                        type="text"
                        required
                        value={gamertag}
                        onChange={(e) => setGamertag(e.target.value)}
                        placeholder="e.g. uchibatobi"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Choose Hunter Avatar</label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setSelectedAvatar(av);
                          }}
                          className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all ${
                            selectedAvatar === av
                              ? 'bg-emerald-500/20 border-emerald-400 scale-110 shadow-md'
                              : 'bg-slate-800 border-slate-750 hover:bg-slate-700'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {authModalMode === 'register' ? 'Email Address' : 'Email or Gamertag'}
                </label>
                <input
                  type={authModalMode === 'register' ? 'email' : 'text'}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarthakprajapati29@gmail.com"
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Path Mode Choice */}
              {authModalMode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Hunter Discipline</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Student', 'Casual Explorer', 'Career Pro'] as PathMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setPathMode(mode);
                        }}
                        className={`py-1.5 px-2 text-[11px] font-bold rounded-xl border transition-all text-center truncate ${
                          pathMode === mode
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mode === 'Student' ? '🎓 Student' : mode === 'Casual Explorer' ? '🧭 Casual' : '💼 Career Pro'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 mt-3 active:scale-95"
              >
                <span>✦</span>
                <span>{authModalMode === 'register' ? 'Register & Claim 500 XP →' : 'Authenticate & Enter VaultX →'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
