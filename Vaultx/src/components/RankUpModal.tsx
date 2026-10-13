import React, { useEffect } from 'react';
import { HunterRank } from '../data/ranksData';
import { RankInsignia } from './RankInsignia';
import { sound } from '../utils/audio';
import { Sparkles, Trophy, Award, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RankUpModalProps {
  rank: HunterRank | null;
  onClose: () => void;
}

export const RankUpModal: React.FC<RankUpModalProps> = ({ rank, onClose }) => {
  useEffect(() => {
    if (rank) {
      sound.playRankUp();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: [rank.color, rank.secondaryColor, '#F59E0B', '#10B981', '#38BDF8']
        });
      } catch {}
    }
  }, [rank]);

  if (!rank) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      {/* Background Rotating Light Rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: rank.color }}
        />
      </div>

      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-slate-700/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 text-center space-y-6 overflow-hidden">
        {/* Top Glow Accent Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: `linear-gradient(90deg, transparent, ${rank.color}, transparent)` }}
        />

        {/* Celebration Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-black tracking-widest uppercase text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NEW HUNTER RANK ACQUIRED!</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Large Animated Rank Emblem */}
        <div className="relative py-2 flex justify-center">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <RankInsignia rank={rank} size="xl" showGlow={true} />
          </div>
        </div>

        {/* Rank Title & Tier */}
        <div className="space-y-1">
          <span
            className="text-xs font-extrabold tracking-widest uppercase"
            style={{ color: rank.color }}
          >
            {rank.tier} · LEVEL {rank.unlockedAtLevel} MILESTONE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {rank.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed pt-1">
            {rank.description}
          </p>
        </div>

        {/* Unlocked Perks List */}
        <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 text-left space-y-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Rank Rewards & Prestige Unlocked</span>
          </span>
          <div className="space-y-1.5 pt-1">
            {rank.perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3.5 rounded-xl text-slate-950 font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 group hover:brightness-110 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${rank.color}, #F59E0B)`,
            boxShadow: `0 8px 24px ${rank.color}40`
          }}
        >
          <span>Claim Rank & Continue Hunting</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
