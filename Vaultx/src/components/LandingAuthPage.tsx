import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { PathMode } from '../types';
import { VaultXLogo } from './VaultXLogo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { sound } from '../utils/audio';
import { 
  Eye, EyeOff, Shield, Zap, Sparkles, Trophy, Clock, Bot, Check, AlertCircle, 
  Terminal, Music, Volume2, VolumeX, ArrowRight, Play, Swords, Flame
} from 'lucide-react';

const AVATAR_OPTIONS = ['🧙‍♂️', '⚡', '🗡️', '🤖', '🏹', '🐉', '🔮', '🛡️'];

export const LandingAuthPage: React.FC = () => {
  const {
    login,
    register,
    guestLogin,
    isBgmPlaying,
    toggleBgm,
    isMuted,
    toggleMute
  } = useGame();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('sarthakprajapati29@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  
  // Register State
  const [regFullName, setRegFullName] = useState('');
  const [regGamertag, setRegGamertag] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPathMode, setRegPathMode] = useState<PathMode>('Student');
  const [regAvatar, setRegAvatar] = useState('🧙‍♂️');

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = login(loginIdentifier, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!regFullName.trim() || !regGamertag.trim() || !regEmail.trim()) {
      setErrorMsg('Please complete all fields.');
      return;
    }

    const res = register(regFullName, regGamertag, regEmail, regPassword, regPathMode, regAvatar);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleQuickDemo = (type: 'sarthak' | 'nexus') => {
    sound.playClick();
    if (type === 'sarthak') {
      login('sarthakprajapati29@gmail.com', 'password123', 'Sarthak Singh', 'Student');
    } else {
      login('hunter@vaultx.io', 'vaultx', 'Nexus Hunter', 'Career Pro');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative z-10 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      
      {/* Top Header Navigation on Landing Page */}
      <header className="flex items-center justify-between py-2 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <VaultXLogo size="md" showText={false} glow={true} />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              <span>Vaultx</span>
              <span className="text-slate-400 text-xs font-normal">:</span>
              <span className="text-emerald-400 font-extrabold text-xs sm:text-sm">
                Rise of financial hunter
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:inline">
              100 Levels · 20 Ranks · Python 3.12 RPG
            </span>
          </div>
        </div>

        {/* Audio and Theme Controls on Landing Page */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* BGM Music Button */}
          <button
            onClick={toggleBgm}
            title={isBgmPlaying ? 'Pause BGM Synthesizer' : 'Play Background Music'}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              isBgmPlaying
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-md shadow-emerald-500/20'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Music className="w-4 h-4" />
            <span className="hidden sm:inline">{isBgmPlaying ? 'Music: ON' : 'Play BGM'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </header>

      {/* Center Landing Page: Epic Auth Terminal Grid */}
      <main className="my-8 sm:my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Lore, Hero Visuals & Fast Sign-Ins */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Hunter Induction Terminal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Sign In to Conquer the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Code Realms</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Embark on the 100-level Python 3.12 financial hunter campaign. Slay 20 legendary raid bosses, acquire 20 hunter ranks, and master strict logic with zero repeated questions.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Terminal className="w-4 h-4 text-emerald-400 mb-1.5" />
                <h4 className="text-xs font-bold text-white">100 Game Levels</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">10 elemental biomes with strict mastery</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Shield className="w-4 h-4 text-amber-400 mb-1.5" />
                <h4 className="text-xs font-bold text-white">20 Hunter Ranks</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Custom vector insignias every 5 levels</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Swords className="w-4 h-4 text-rose-400 mb-1.5" />
                <h4 className="text-xs font-bold text-white">20 Boss Raids</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">High Boss HP & speech bubble incantations</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <Bot className="w-4 h-4 text-purple-400 mb-1.5" />
                <h4 className="text-xs font-bold text-white">2.5D Mage Hunter</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Interactive animated spell companion</p>
              </div>
            </div>

            {/* Quick 1-Click Fast Access Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5 max-w-lg">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  ⚡ 1-Click Instant Demo Profiles
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">Immediate Access</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('sarthak')}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-300 transition-all text-left flex items-center justify-between"
                >
                  <span>🧙‍♂️ Hunter Sarthak</span>
                  <span className="text-[10px] text-slate-400">10 Lvls Conquered</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('nexus')}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-bold text-slate-300 transition-all text-left flex items-center justify-between"
                >
                  <span>⚡ Nexus Hunter</span>
                  <span className="text-[10px] text-slate-400">Level 1 Starter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated Interactive Sign-In / Register Form Terminal */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-900/95 border-2 border-emerald-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-xl relative">
              
              {/* Terminal Header Tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('login');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'login'
                      ? 'bg-slate-800 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Sign In / Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('register');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'register'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Create Account</span>
                </button>
              </div>

              {/* Status Alerts */}
              {errorMsg && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* TAB 1: SIGN IN / LOGIN FORM */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-white">Hunter Credentials</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enter your email or gamertag to restore your saved levels and ranks.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Email or Gamertag
                    </label>
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. sarthakprajapati29@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full pl-3.5 pr-10 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Sign In & Continue Game →</span>
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={guestLogin}
                      className="text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      🎮 Quick Sign In with Default Hunter Profile
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: CREATE NEW ACCOUNT (REGISTER) */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <h3 className="text-xl font-black text-white">New Hunter Induction</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      New players start fresh from Level 1 with full progression saving.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder="e.g. Alex Hunter"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Player Gamertag</label>
                      <input
                        type="text"
                        required
                        value={regGamertag}
                        onChange={(e) => setRegGamertag(e.target.value)}
                        placeholder="e.g. shadow_hunter"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="hunter@example.com"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Path Mode</label>
                      <select
                        value={regPathMode}
                        onChange={(e) => setRegPathMode(e.target.value as PathMode)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Student">Student (Academic)</option>
                        <option value="Casual Explorer">Casual Explorer</option>
                        <option value="Career Pro">Career Pro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Avatar Glyph</label>
                      <div className="flex gap-1.5 overflow-x-auto py-1">
                        {AVATAR_OPTIONS.slice(0, 5).map((av) => (
                          <button
                            key={av}
                            type="button"
                            onClick={() => setRegAvatar(av)}
                            className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm border transition-all ${
                              regAvatar === av
                                ? 'border-emerald-400 bg-emerald-500/20 scale-105'
                                : 'border-slate-800 bg-slate-950 text-slate-400'
                            }`}
                          >
                            {av}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Create Profile & Launch Level 1 →</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Landing Page Footer */}
      <footer className="border-t border-slate-900 py-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white">VaultX</span>
          <span>·</span>
          <span className="text-emerald-400 font-semibold">Rise of the Financial Hunter</span>
          <span>·</span>
          <span>100 Levels RPG Campaign</span>
        </div>
        <div className="text-slate-400">
          Strict 100% Mastery Validation · Isolated Account Saves
        </div>
      </footer>
    </div>
  );
};
