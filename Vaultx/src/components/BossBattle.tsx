import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { BOSS_ENCOUNTERS } from '../data/tracksData';
import { BossEntity, Question } from '../types';
import { sound } from '../utils/audio';
import { Shield, Zap, Skull, Swords, Timer, Heart, AlertTriangle, RotateCcw, Flame } from 'lucide-react';

function shuffleBossQuestion(q: Question, idx = 0): Question {
  const correctOpt = q.options[q.correctIndex];
  const distractors = q.options.filter((_, i) => i !== q.correctIndex);
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  const targetIndex = [1, 2, 3, 0][(idx + 1) % 4];
  const newOptions: string[] = [];
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === targetIndex) {
      newOptions.push(correctOpt);
    } else {
      newOptions.push(distractors[dIdx++] || 'Option');
    }
  }
  return {
    ...q,
    options: newOptions,
    correctIndex: targetIndex
  };
}

export const BossBattle: React.FC = () => {
  const { user, awardReward, triggerCelebration, setCurrentView } = useGame();
  const bossTemplate = BOSS_ENCOUNTERS[0];

  // Boss HP is much higher than player HP: 1,500 HP vs Player 100 HP!
  const BOSS_MAX_HP = 1500;
  const PLAYER_MAX_HP = 100;
  const DAMAGE_PER_HIT = 375;

  const [bossQuestions, setBossQuestions] = useState<Question[]>(() =>
    bossTemplate.questions.map((q, idx) => shuffleBossQuestion(q, idx))
  );
  const [bossHp, setBossHp] = useState(BOSS_MAX_HP);
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(bossTemplate.turnTimeSeconds);
  const [battleState, setBattleState] = useState<'INTRO' | 'FIGHT' | 'VICTORY' | 'DEFEAT'>('INTRO');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [bossHitFlash, setBossHitFlash] = useState(false);

  const currentQ: Question = bossQuestions[currentQIdx] || bossTemplate.questions[0];

  // Turn Timer
  useEffect(() => {
    if (battleState !== 'FIGHT') return;

    if (timeLeft <= 0) {
      handleBossAttack('Time expired! Volatility Storm decimated defenses!');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [battleState, timeLeft]);

  const handleBossAttack = (reason: string) => {
    sound.playBossAttack();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    const damage = 25; // Player takes 25 damage per hit
    const nextPlayerHp = Math.max(0, playerHp - damage);
    setPlayerHp(nextPlayerHp);
    setCombatLog((prev) => [
      `💥 Boss Counterstrike: -${damage} HP (${reason})`,
      ...prev.slice(0, 4)
    ]);

    if (nextPlayerHp <= 0) {
      setBattleState('DEFEAT');
    } else {
      setTimeLeft(bossTemplate.turnTimeSeconds);
      setSelectedOpt(null);
    }
  };

  const handleAnswer = (idx: number) => {
    if (battleState !== 'FIGHT' || selectedOpt !== null) return;
    setSelectedOpt(idx);

    if (idx === currentQ.correctIndex) {
      // Player strikes boss!
      sound.playCorrect();
      setBossHitFlash(true);
      setTimeout(() => setBossHitFlash(false), 500);

      const nextBossHp = Math.max(0, bossHp - DAMAGE_PER_HIT);
      setBossHp(nextBossHp);
      setCombatLog((prev) => [
        `⚔️ Arcane Critical Strike! Dealt ${DAMAGE_PER_HIT} DMG to ${bossTemplate.name}!`,
        ...prev.slice(0, 4)
      ]);

      if (nextBossHp <= 0) {
        sound.playLevelUp();
        setBattleState('VICTORY');
        awardReward(bossTemplate.lootReward.xp, bossTemplate.lootReward.coins);
        triggerCelebration();
      } else {
        setTimeout(() => {
          setSelectedOpt(null);
          setCurrentQIdx((prev) => (prev + 1) % bossQuestions.length);
          setTimeLeft(bossTemplate.turnTimeSeconds);
        }, 1200);
      }
    } else {
      // Wrong answer
      sound.playWrong();
      handleBossAttack('Invalid equation submitted!');
    }
  };

  const handleStartFight = () => {
    sound.playClick();
    setBossQuestions(bossTemplate.questions.map(shuffleBossQuestion));
    setBossHp(BOSS_MAX_HP);
    setPlayerHp(PLAYER_MAX_HP);
    setCurrentQIdx(0);
    setTimeLeft(bossTemplate.turnTimeSeconds);
    setCombatLog(['Battle started! Solve phases before timer expires.']);
    setBattleState('FIGHT');
  };

  return (
    <div className={`py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 ${isShaking ? 'animate-pulse' : ''}`}>
      
      {/* Intro Modal / Banner */}
      {battleState === 'INTRO' && (
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-950 border border-rose-500/40 p-8 text-center space-y-6 shadow-2xl">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-400 mx-auto text-5xl shadow-xl shadow-rose-950/50">
            🐉
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
              LEGENDARY RAID BOSS TRIAL
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
              {bossTemplate.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
              {bossTemplate.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Boss HP: <strong className="text-rose-400">{BOSS_MAX_HP} HP</strong> (High Boss HP)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Hunter HP: <strong className="text-emerald-400">{PLAYER_MAX_HP} HP</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <Timer className="w-4 h-4 text-amber-400" />
              <span>{bossTemplate.turnTimeSeconds}s per Phase</span>
            </div>
          </div>

          <button
            onClick={handleStartFight}
            className="px-8 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm transition-all shadow-xl shadow-rose-500/30 flex items-center gap-2.5 mx-auto active:scale-95"
          >
            <Swords className="w-4 h-4" />
            <span>Engage Volatility Boss Battle →</span>
          </button>
        </div>
      )}

      {/* Victory State */}
      {battleState === 'VICTORY' && (
        <div className="rounded-3xl bg-slate-900 border border-emerald-500/50 p-8 text-center space-y-6 shadow-2xl">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-300 mx-auto text-5xl">
            👑
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              LEGENDARY BOSS DEFEATED
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Victory is Yours!</h2>
            <p className="text-sm text-slate-300 mt-2">
              You triumphed over {bossTemplate.name}. Your financial hunter rank escalates!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs text-slate-400">Loot XP</span>
              <p className="text-2xl font-black text-sky-400 mt-1">+{bossTemplate.lootReward.xp}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs text-slate-400">Vault Coins</span>
              <p className="text-2xl font-black text-amber-400 mt-1">+{bossTemplate.lootReward.coins}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs text-slate-400">Artifact Drop</span>
              <p className="text-xs font-bold text-purple-400 mt-2">{bossTemplate.lootReward.itemReward}</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('explore')}
              className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow-lg"
            >
              Back to Code Realms
            </button>
            <button
              onClick={handleStartFight}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fight Again</span>
            </button>
          </div>
        </div>
      )}

      {/* Defeat State */}
      {battleState === 'DEFEAT' && (
        <div className="rounded-3xl bg-slate-900 border border-rose-500/50 p-8 text-center space-y-6 shadow-2xl">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-400 mx-auto text-5xl">
            💀
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
              TRIAL FAILED · HUNTER FALLEN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Your HP reached 0</h2>
            <p className="text-sm text-slate-300 mt-2">
              The volatility storm proved too intense. Restructure your equations and try again!
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleStartFight}
              className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-rose-500/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Revive & Retry</span>
            </button>
            <button
              onClick={() => setCurrentView('explore')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              Return to Safe Hub
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE FIGHT SCREEN */}
      {battleState === 'FIGHT' && (
        <div className="space-y-6">
          
          {/* Dual Health Meters HUD: Boss HP 1500 vs Player HP 100 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Player Meter (100 HP) */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Hunter: {user.gamertag}</span>
                </span>
                <span className="text-slate-200 tabular-nums font-bold">
                  {playerHp} / {PLAYER_MAX_HP} HP
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{ width: `${(playerHp / PLAYER_MAX_HP) * 100}%` }}
                />
              </div>
            </div>

            {/* Boss Meter (1,500 HP - Higher than Player!) */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-rose-900/60 shadow-lg shadow-rose-950/20">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-rose-400 flex items-center gap-1.5">
                  <Skull className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Boss: {bossTemplate.name} (Higher HP)</span>
                </span>
                <span className="text-rose-300 tabular-nums font-black">
                  {bossHp} / {BOSS_MAX_HP} HP
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${(bossHp / BOSS_MAX_HP) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Turn Countdown & Phase Header */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Phase {currentQIdx + 1} of {bossQuestions.length}</span>
            </span>

            <div className="flex items-center gap-2">
              <Timer className={`w-4 h-4 ${timeLeft < 10 ? 'text-rose-500 animate-spin' : 'text-amber-400'}`} />
              <span className={`text-base font-black tabular-nums ${timeLeft < 10 ? 'text-rose-400 animate-pulse' : 'text-slate-100'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* BOSS ARENA CENTERPIECE: Questions appear in a Message Box on TOP of the Boss's head! */}
          <div className="relative flex flex-col items-center pt-2">
            
            {/* SPEECH / MESSAGE BOX (Positioned on top of the Boss Head) */}
            <div className="relative z-20 w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-rose-500/50 p-6 sm:p-7 shadow-[0_10px_35px_rgba(244,63,94,0.25)] space-y-4">
              
              {/* Message Box Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
                    {bossTemplate.name}'s Incantation Riddle
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Phase {currentQIdx + 1}
                </span>
              </div>

              {/* Question Title & Prompt */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {currentQ.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {currentQ.prompt}
                </p>
              </div>

              {/* Code Snippet if applicable */}
              {currentQ.codeSnippet && (
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner">
                  <pre>{currentQ.codeSnippet}</pre>
                </div>
              )}

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedOpt !== null}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all duration-150 ${
                      selectedOpt === idx
                        ? idx === currentQ.correctIndex
                          ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200 shadow-lg shadow-emerald-950/40'
                          : 'border-rose-500 bg-rose-950/50 text-rose-200 shadow-lg shadow-rose-950/40'
                        : 'border-slate-800 bg-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-black text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Speech Bubble Pointer pointing DOWN to the Boss Head */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-900 border-r-2 border-b-2 border-rose-500/50 transform rotate-45" />
            </div>

            {/* BOSS AVATAR (Positioned directly below the speech box) */}
            <div className="relative mt-4 flex flex-col items-center">
              
              {/* Boss Hit Reaction Flash */}
              {bossHitFlash && (
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping pointer-events-none z-10" />
              )}

              {/* Boss Character Model */}
              <div className={`relative w-44 h-48 transition-transform duration-300 ${bossHitFlash ? 'scale-90 rotate-3' : 'animate-[bounce_3s_ease-in-out_infinite]'}`}>
                
                {/* Boss Dark Radial Aura */}
                <div className="absolute inset-0 bg-rose-600/20 rounded-full blur-2xl pointer-events-none" />

                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full drop-shadow-[0_15px_25px_rgba(244,63,94,0.35)]"
                >
                  <defs>
                    <linearGradient id="dragonSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#881337" />
                      <stop offset="50%" stopColor="#4C0519" />
                      <stop offset="100%" stopColor="#1C1917" />
                    </linearGradient>
                    <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#7F1D1D" />
                    </linearGradient>
                  </defs>

                  {/* Boss Wings */}
                  <polygon points="100,80 180,30 170,95 130,120" fill="#4C0519" stroke="#E11D48" strokeWidth="2" opacity="0.8" />
                  <polygon points="100,80 20,30 30,95 70,120" fill="#4C0519" stroke="#E11D48" strokeWidth="2" opacity="0.8" />

                  {/* Dragon Body */}
                  <ellipse cx="100" cy="140" rx="42" ry="32" fill="url(#dragonSkin)" stroke="#F43F5E" strokeWidth="2" />

                  {/* Chest Scales */}
                  <path d="M85 130 Q100 145 115 130" stroke="#FB7185" strokeWidth="3" fill="none" />
                  <path d="M88 142 Q100 155 112 142" stroke="#FB7185" strokeWidth="3" fill="none" />

                  {/* Dragon Head */}
                  <polygon points="100,60 135,115 100,105 65,115" fill="url(#dragonSkin)" stroke="#E11D48" strokeWidth="2" />

                  {/* Left Horn */}
                  <path d="M78 75 C60 50 45 25 35 15 C52 35 68 62 82 78 Z" fill="url(#hornGrad)" />
                  {/* Right Horn */}
                  <path d="M122 75 C140 50 155 25 165 15 C148 35 132 62 118 78 Z" fill="url(#hornGrad)" />

                  {/* Glowing Demon Eyes */}
                  <polygon points="85,86 94,88 88,94" fill="#FDE047" />
                  <polygon points="115,86 106,88 112,94" fill="#FDE047" />
                  <circle cx="89" cy="89" r="1.5" fill="#EF4444" />
                  <circle cx="111" cy="89" r="1.5" fill="#EF4444" />

                  {/* Snout & Fangs */}
                  <polygon points="96,108 100,118 104,108" fill="#FFFFFF" />
                  <polygon points="90,106 93,114 96,106" fill="#FFFFFF" />
                  <polygon points="104,106 107,114 110,106" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Boss Tag */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-rose-500/50 text-[10px] font-black text-rose-400 shadow-md">
                <Skull className="w-3 h-3 text-rose-400" />
                <span>VOLATILITY RAID BOSS</span>
              </div>
            </div>
          </div>

          {/* Live Combat Log */}
          {combatLog.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-[11px] font-mono space-y-1 shadow-inner">
              <span className="text-slate-500 uppercase text-[10px] font-bold">Raid Battle Log</span>
              {combatLog.map((log, i) => (
                <p key={i} className="text-slate-300">{log}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
