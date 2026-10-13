import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { GameTheme } from '../types';
import { Palette, Check } from 'lucide-react';
import { sound } from '../utils/audio';

const THEMES: { id: GameTheme; name: string; color: string; accent: string; previewClass: string }[] = [
  { id: 'emerald', name: 'Emerald Hunter', color: '#10B981', accent: '#34D399', previewClass: 'from-emerald-500 to-teal-400' },
  { id: 'cyberpunk', name: 'Cyber Neon', color: '#06B6D4', accent: '#F43F5E', previewClass: 'from-cyan-400 to-pink-500' },
  { id: 'solar', name: 'Solar Vault', color: '#F59E0B', accent: '#FBBF24', previewClass: 'from-amber-400 to-yellow-500' },
  { id: 'arcane', name: 'Arcane Void', color: '#8B5CF6', accent: '#C084FC', previewClass: 'from-violet-500 to-fuchsia-500' },
  { id: 'crimson', name: 'Crimson Overlord', color: '#EF4444', accent: '#F87171', previewClass: 'from-rose-500 to-red-600' }
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  const activeThemeObj = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="relative">
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Change Color Theme"
        title={`Theme: ${activeThemeObj.name}`}
        className="relative p-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 group"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
          style={{ backgroundColor: activeThemeObj.color }}
        />
        <Palette className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-40 w-52 rounded-2xl bg-slate-900 border border-slate-700/80 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 border-b border-slate-800 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Graphics Theme
              </span>
            </div>
            <div className="space-y-1">
              {THEMES.map((t) => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-br ${t.previewClass} border border-white/20 shrink-0`}
                      />
                      <span>{t.name}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
