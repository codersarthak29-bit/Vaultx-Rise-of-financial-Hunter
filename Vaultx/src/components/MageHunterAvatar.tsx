import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getRankForLevel } from '../data/ranksData';
import { sound } from '../utils/audio';
import { Sparkles, Zap, Shield, MessageSquare, ChevronDown, ChevronUp, Wand2 } from 'lucide-react';

interface MageHunterAvatarProps {
  lastAction?: 'idle' | 'cast' | 'shield';
}

const HUNTER_VOICE_LINES = [
  "My staff detects volatile market anomalies in the code!",
  "Remember: Python slices are [start:stop:step]. Keep your focus sharp!",
  "A true Mage Hunter never fear a TypeError—we trace and conquer!",
  "Pattern matching in Python 3.12 is like weaving twin lightning bolts.",
  "Every 5 levels, a new Hunter Rank awaits in the Vault!",
  "Channel your mana into pure algorithms. Victory is near!"
];

export const MageHunterAvatar: React.FC<MageHunterAvatarProps> = ({ lastAction = 'idle' }) => {
  const { user } = useGame();
  const [isMinimized, setIsMinimized] = useState(false);
  const [dialogText, setDialogText] = useState(HUNTER_VOICE_LINES[0]);
  const [showDialog, setShowDialog] = useState(true);
  const [animationState, setAnimationState] = useState<'idle' | 'cast' | 'shield'>('idle');
  const [sparkleCount, setSparkleCount] = useState(0);

  const currentRank = getRankForLevel(user.level);

  // Cycle dialog lines periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * HUNTER_VOICE_LINES.length);
      setDialogText(HUNTER_VOICE_LINES[nextIndex]);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const triggerManualCast = () => {
    sound.playSpellCast();
    setAnimationState('cast');
    setSparkleCount((c) => c + 1);
    setDialogText("Arcane compile spell unleashed! Mana surging!");
    setTimeout(() => setAnimationState('idle'), 1000);
  };

  const triggerShield = () => {
    sound.playShield();
    setAnimationState('shield');
    setDialogText("Aegis ward raised! Logic barrier fortified!");
    setTimeout(() => setAnimationState('idle'), 1000);
  };

  if (isMinimized) {
    return (
      <aside aria-label="Mage Hunter companion" className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            sound.playClick();
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-emerald-400 font-bold text-xs shadow-2xl backdrop-blur-md hover:border-emerald-400 transition-all hover:scale-105"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
            🧙‍♂️
          </span>
          <span>Summon Mage Hunter</span>
          <ChevronUp className="w-4 h-4 text-slate-400" />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Mage Hunter companion" className="fixed bottom-2 right-3 sm:right-6 z-40 pointer-events-none select-none flex flex-col items-end">
      {/* Interactive Speech Bubble */}
      {showDialog && (
        <div className="pointer-events-auto mb-2 max-w-xs sm:max-w-sm rounded-2xl bg-slate-900/95 border border-emerald-500/40 p-3 shadow-2xl backdrop-blur-md text-xs text-slate-200 relative animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-black text-[11px]">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Mage Hunter · {currentRank.title}</span>
            </div>
            <button
              onClick={() => setShowDialog(false)}
              className="text-slate-400 hover:text-white text-[10px] px-1"
            >
              ✕
            </button>
          </div>
          <p className="leading-snug text-slate-300 italic">
            "{dialogText}"
          </p>

          {/* Speech Bubble Arrow pointing to the Mage */}
          <div className="absolute -bottom-2 right-12 w-3 h-3 bg-slate-900 border-r border-b border-emerald-500/40 transform rotate-45" />
        </div>
      )}

      {/* 2.5D Isometric Mage Hunter Rig */}
      <div className="pointer-events-auto relative flex flex-col items-center">
        {/* Quick Spell Quick-bar */}
        <div className="flex items-center gap-1 mb-1 bg-slate-950/80 border border-slate-800/80 rounded-full px-2 py-0.5 backdrop-blur-sm opacity-80 hover:opacity-100 transition-opacity">
          <button
            onClick={triggerManualCast}
            title="Cast Arcane Spell"
            className="p-1 rounded-full hover:bg-emerald-500/20 text-emerald-400 transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={triggerShield}
            title="Deploy Aegis Barrier"
            className="p-1 rounded-full hover:bg-cyan-500/20 text-cyan-400 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setShowDialog((prev) => !prev);
            }}
            title="Hunter Lore & Voice"
            className="p-1 rounded-full hover:bg-purple-500/20 text-purple-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setIsMinimized(true);
            }}
            title="Dock Avatar"
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2.5D Animated Character Canvas Container */}
        <div
          onClick={triggerManualCast}
          className="relative w-36 h-44 cursor-pointer group"
          title="Click to cast Mage Hunter Spell!"
        >
          {/* 2.5D Perspective Ground Rune Ring */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-14 rounded-full pointer-events-none transition-all duration-700"
            style={{
              transform: 'perspective(300px) rotateX(65deg)',
              background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(6,182,212,0.15) 50%, transparent 75%)',
              border: '2px dashed rgba(52,211,153,0.5)',
              boxShadow: '0 0 25px rgba(16,185,129,0.4)'
            }}
          />

          {/* Shield Bubble Effect */}
          {animationState === 'shield' && (
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 bg-cyan-500/20 blur-none animate-ping pointer-events-none z-30" />
          )}

          {/* Cast Mana Flare Effect */}
          {animationState === 'cast' && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-emerald-400/30 rounded-full blur-xl animate-pulse pointer-events-none z-30" />
          )}

          {/* 2.5D Mage Hunter Vector Model */}
          <div
            className={`w-full h-full relative transition-transform duration-300 ${
              animationState === 'cast'
                ? '-translate-y-3 scale-105'
                : 'animate-[bounce_4s_ease-in-out_infinite]'
            }`}
          >
            <svg
              viewBox="0 0 160 200"
              className="w-full h-full drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
            >
              <defs>
                <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064E3B" />
                  <stop offset="60%" stopColor="#022C22" />
                  <stop offset="100%" stopColor="#0B0F19" />
                </linearGradient>
                <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#064E3B" />
                </linearGradient>
                <linearGradient id="staffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <filter id="mageGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Dynamic Shadow */}
              <ellipse cx="80" cy="180" rx="42" ry="12" fill="#000000" opacity="0.6" />

              {/* Flowing Back Cape (2.5D Angled) */}
              <path
                d="M52 82 Q30 135 38 175 Q78 185 118 175 Q128 135 106 82 Z"
                fill="url(#capeGrad)"
                opacity="0.95"
              />

              {/* Mage Hunter Robe Body */}
              <path
                d="M58 85 L48 168 Q80 178 112 168 L102 85 Z"
                fill="url(#robeGrad)"
                stroke="#10B981"
                strokeWidth="1.5"
              />

              {/* Golden Wealth Hunter Belt & Rune Buckle */}
              <rect x="58" y="118" width="44" height="7" rx="3" fill="#D97706" />
              <polygon points="80,116 86,122 80,128 74,122" fill="#FCD34D" />

              {/* Hunter Cowl / Hood */}
              <path
                d="M54 58 C50 35 70 20 80 20 C90 20 110 35 106 58 C106 72 98 84 80 84 C62 84 54 72 54 58 Z"
                fill="#022C22"
                stroke="#10B981"
                strokeWidth="2"
              />

              {/* Shadowed Face within Hood */}
              <ellipse cx="80" cy="56" rx="18" ry="16" fill="#090D16" />

              {/* Glowing Arcane Cyan/Emerald Eyes */}
              <circle cx="73" cy="54" r="3.2" fill="#34D399" filter="url(#mageGlow)" />
              <circle cx="87" cy="54" r="3.2" fill="#34D399" filter="url(#mageGlow)" />
              <circle cx="73" cy="54" r="1.2" fill="#FFFFFF" />
              <circle cx="87" cy="54" r="1.2" fill="#FFFFFF" />

              {/* Hunter Pauldrons / Shoulder Armor */}
              <polygon points="50,80 40,94 62,90" fill="#0F766E" stroke="#34D399" strokeWidth="1" />
              <polygon points="110,80 120,94 98,90" fill="#0F766E" stroke="#34D399" strokeWidth="1" />

              {/* Left Hand: Floating Mana Sigil */}
              <circle cx="48" cy="115" rx="5" ry="4" fill="#047857" />
              <g filter="url(#mageGlow)">
                <circle cx="44" cy="110" r="7" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx="44" cy="110" r="3" fill="#67E8F9" />
              </g>

              {/* Right Hand & Arcane Runic Staff */}
              <circle cx="112" cy="115" rx="5" ry="4" fill="#047857" />
              {/* Staff Shaft */}
              <line
                x1="116"
                y1="35"
                x2="114"
                y2="175"
                stroke="url(#staffGrad)"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Staff Head: Crystal Prisms and Floating Gem */}
              <polygon points="116,35 125,20 116,8 107,20" fill="#06B6D4" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="116" cy="22" r="6" fill="#FDE047" filter="url(#mageGlow)" />
              <circle cx="116" cy="22" r="3" fill="#FFFFFF" />

              {/* Mystic Orbiting Sparks */}
              <circle cx="126" cy="16" r="2" fill="#38BDF8" />
              <circle cx="106" cy="28" r="2" fill="#34D399" />
            </svg>
          </div>

          {/* Interactive Floating Badge Pill */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-emerald-500/50 text-[10px] font-black text-emerald-300 shadow-lg whitespace-nowrap">
            <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            <span>MAGE HUNTER</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
