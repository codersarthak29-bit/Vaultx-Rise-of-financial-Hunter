import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { 
  PYTHON_100_LEVELS, 
  BIOMES, 
  PythonGameLevel, 
  PythonQuizQuestion,
  getFreshQuestionsForLevel 
} from '../data/pythonLevelsData';
import { getRankForLevel, isRankMilestoneLevel, HUNTER_RANKS } from '../data/ranksData';
import { RankInsignia } from './RankInsignia';
import { sound } from '../utils/audio';
import { 
  Star, Lock, Unlock, Play, Shield, Zap, Skull, Award, ArrowRight, RotateCcw, 
  CheckCircle2, XCircle, Heart, Flame, Sparkles, BookOpen, Terminal, ChevronRight,
  Compass, ArrowLeft, Trophy, Info, Layers, Save
} from 'lucide-react';
import confetti from 'canvas-confetti';

import overworldMapImg from '../assets/images/python_game_world_map_1791434187751.jpg';
import questPythonImg from '../assets/images/quest_python_dungeon_1791433382467.jpg';

export const PythonGameRealm: React.FC = () => {
  const { 
    user, 
    activePythonLevelNumber, 
    setActivePythonLevelNumber, 
    completePythonLevel, 
    setCurrentView,
    saveAndQuit
  } = useGame();

  const [selectedBiomeId, setSelectedBiomeId] = useState<string>('all');
  const [activeLevel, setActiveLevel] = useState<PythonGameLevel | null>(null);

  // In-Game Quiz State
  const [seenQuestionsRecord, setSeenQuestionsRecord] = useState<Record<number, string[]>>(() => {
    try {
      const saved = localStorage.getItem('vaultx_seen_questions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [currentLevelQuestions, setCurrentLevelQuestions] = useState<PythonQuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [combo, setCombo] = useState(1);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showCodex, setShowCodex] = useState(true);
  const [isVictory, setIsVictory] = useState(false);
  const [isDefeat, setIsDefeat] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [strikeEnemy, setStrikeEnemy] = useState(false);
  const [hasAnyMistake, setHasAnyMistake] = useState(false);

  // Completed levels record (clean per-player progress, Level 1 unlocked for all)
  const levelProgress = user.pythonLevelProgress || {};

  // Calculate highest unlocked level up to 100
  const completedLevelNumbers = Object.keys(levelProgress).map(Number);
  const highestCompleted = completedLevelNumbers.length > 0 ? Math.max(...completedLevelNumbers) : 0;
  const unlockedUpTo = Math.min(100, highestCompleted + 1);

  // Calculate total stars
  const totalStars = Object.values(levelProgress).reduce((acc, curr) => acc + (curr.stars || 0), 0);

  // If activePythonLevelNumber is set, load that level
  useEffect(() => {
    if (activePythonLevelNumber) {
      const found = PYTHON_100_LEVELS.find((l) => l.levelNumber === activePythonLevelNumber);
      if (found) {
        startLevel(found);
      }
    }
  }, [activePythonLevelNumber]);

  const startLevel = (lvl: PythonGameLevel) => {
    sound.playClick();
    setActiveLevel(lvl);
    setActivePythonLevelNumber(lvl.levelNumber);

    // Pick fresh, unseen questions from the question pool and shuffle options
    const prevSeen = seenQuestionsRecord[lvl.levelNumber] || [];
    const count = lvl.isBossLevel ? 3 : 2;
    const freshQuestions = getFreshQuestionsForLevel(lvl, prevSeen, count);
    setCurrentLevelQuestions(freshQuestions);

    // Update seen questions history with persistent accumulation to prevent question repetition
    const updatedSeen = Array.from(new Set([...prevSeen, ...freshQuestions.map((q) => q.id)])).slice(-100);
    const updatedRecord = {
      ...seenQuestionsRecord,
      [lvl.levelNumber]: updatedSeen
    };
    setSeenQuestionsRecord(updatedRecord);
    try {
      localStorage.setItem('vaultx_seen_questions', JSON.stringify(updatedRecord));
    } catch {}

    setCurrentQIndex(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setHearts(3);
    setCombo(1);
    setCorrectAnswersCount(0);
    setHasAnyMistake(false);
    setShowCodex(lvl.levelNumber <= 5);
    setIsVictory(false);
    setIsDefeat(false);
  };

  const handleSelectOption = (idx: number) => {
    if (!activeLevel || currentLevelQuestions.length === 0 || isAnswered || isDefeat || isVictory) return;
    const currentQ = currentLevelQuestions[currentQIndex];
    if (!currentQ) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playCorrect();
      setStrikeEnemy(true);
      setTimeout(() => setStrikeEnemy(false), 400);

      setCorrectAnswersCount((prev) => prev + 1);
      setCombo((prev) => Math.min(3, prev + 0.5));
    } else {
      sound.playWrong();
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 400);
      setHasAnyMistake(true);
      setCombo(1);
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
    }
  };

  const handleNextQuestion = () => {
    if (!activeLevel) return;
    sound.playClick();

    if (currentQIndex + 1 < currentLevelQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      // Level questions finished! Check strict mastery
      finishLevel();
    }
  };

  const finishLevel = () => {
    if (!activeLevel || currentLevelQuestions.length === 0) return;
    const totalQ = currentLevelQuestions.length;

    // STRICT MASTERY RULE: If ANY question is wrong, level cannot proceed to next level!
    // Player can only proceed when ALL questions in the level are correct (100% accuracy)
    if (hasAnyMistake || correctAnswersCount !== totalQ) {
      sound.playWrong();
      setIsDefeat(true);
      setIsVictory(false);
      return;
    }

    // Flawless 100% accuracy conquered!
    setIsVictory(true);
    setIsDefeat(false);
    completePythonLevel(
      activeLevel.levelNumber,
      3, // 3 Stars for flawless clear
      100, // 100% accuracy
      activeLevel.xpReward,
      activeLevel.coinReward,
      activeLevel.badgeUnlock || undefined
    );

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleNextLevel = () => {
    if (!activeLevel) return;
    const nextNum = activeLevel.levelNumber + 1;
    if (nextNum <= 100) {
      const nextLvl = PYTHON_100_LEVELS.find((l) => l.levelNumber === nextNum);
      if (nextLvl) {
        startLevel(nextLvl);
      }
    } else {
      // Completed all 100 levels!
      setActiveLevel(null);
      setActivePythonLevelNumber(null);
    }
  };

  const exitToMap = () => {
    sound.playClick();
    setActiveLevel(null);
    setActivePythonLevelNumber(null);
  };

  // Keyboard accessibility for options (keys 1-4 or A-D)
  useEffect(() => {
    if (!activeLevel || isAnswered || isVictory || isDefeat) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === '1' || key === 'A') handleSelectOption(0);
      else if (key === '2' || key === 'B') handleSelectOption(1);
      else if (key === '3' || key === 'C') handleSelectOption(2);
      else if (key === '4' || key === 'D') handleSelectOption(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLevel, isAnswered, isVictory, isDefeat]);

  // =========================================================================
  // VIEW A: ACTIVE LEVEL QUIZ ARENA (RPG Game Stage)
  // =========================================================================
  if (activeLevel && currentLevelQuestions.length > 0) {
    const currentQ: PythonQuizQuestion = currentLevelQuestions[currentQIndex] || currentLevelQuestions[0];

    return (
      <div className={`py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 ${shakeScreen ? 'animate-bounce' : ''}`}>
        
        {/* Top Battle HUD */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={exitToMap}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>World Map</span>
            </button>

            <button
              onClick={saveAndQuit}
              title="Save progress and exit safely"
              className="p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Save & Quit</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded" style={{
                  color: activeLevel.biomeColor,
                  backgroundColor: `${activeLevel.biomeColor}15`,
                  border: `1px solid ${activeLevel.biomeColor}30`
                }}>
                  {activeLevel.biomeName}
                </span>
                {activeLevel.isBossLevel && (
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 animate-pulse">
                    ⚠️ BOSS BATTLE
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Level {activeLevel.levelNumber}: {activeLevel.title}
              </h2>
            </div>
          </div>

          {/* Hearts & Combo Multiplier */}
          <div className="flex items-center gap-4">
            {/* Lives */}
            <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400 font-bold mr-1">Lives:</span>
              {[1, 2, 3].map((heartIndex) => (
                <Heart
                  key={heartIndex}
                  className={`w-4 h-4 transition-transform duration-300 ${
                    heartIndex <= hearts
                      ? 'text-rose-500 fill-rose-500 scale-110'
                      : 'text-slate-700 fill-slate-800 scale-90'
                  }`}
                />
              ))}
            </div>

            {/* Combo Multiplier */}
            <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400 font-extrabold text-xs tabular-nums">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{combo.toFixed(1)}x Combo</span>
            </div>

            {/* Progress in current level */}
            <div className="text-xs text-slate-400">
              Q <span className="text-white font-bold">{currentQIndex + 1}</span> / {currentLevelQuestions.length}
            </div>
          </div>
        </div>

        {/* Victory Modal */}
        {isVictory && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/50 p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto text-4xl shadow-inner">
              {activeLevel.isBossLevel ? '👑' : '🏆'}
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                {activeLevel.isBossLevel ? 'BOSS VANQUISHED!' : 'LEVEL COMPLETE!'}
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Level {activeLevel.levelNumber} Conquered
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                {activeLevel.subtitle}
              </p>
            </div>

            {/* Stars Awarded */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((starIdx) => {
                const earned = (hearts === 3 && starIdx <= 3) || (hearts === 2 && starIdx <= 2) || (hearts === 1 && starIdx <= 1);
                return (
                  <Star
                    key={starIdx}
                    className={`w-8 h-8 transition-all ${
                      earned
                        ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                        : 'text-slate-700'
                    }`}
                  />
                );
              })}
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-[11px] text-slate-400">XP Gained</span>
                <p className="text-xl font-bold text-sky-400 mt-0.5 tabular-nums">+{activeLevel.xpReward}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-[11px] text-slate-400">Vault Coins</span>
                <p className="text-xl font-bold text-amber-400 mt-0.5 tabular-nums">+{activeLevel.coinReward}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-[11px] text-slate-400">Accuracy</span>
                <p className="text-xl font-bold text-emerald-400 mt-0.5 tabular-nums">
                  {Math.round((correctAnswersCount / currentLevelQuestions.length) * 100)}%
                </p>
              </div>
            </div>

            {activeLevel.badgeUnlock && (
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold max-w-md mx-auto">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Hunter Badge Unlocked: {activeLevel.badgeUnlock}</span>
              </div>
            )}

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={exitToMap}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
              >
                Return to World Map
              </button>
              {activeLevel.levelNumber < 100 && (
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  <span>Play Level {activeLevel.levelNumber + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Defeat / Strict Mastery Failed Modal */}
        {isDefeat && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-500/50 p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto text-4xl">
              ⚠️
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400">
                STRICT MASTERY REQUIRED · 100% CORRECT NEEDED
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Level {activeLevel.levelNumber} Not Conquered</h2>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                You cannot proceed to the next level because a question was answered incorrectly. Under Strict Mastery, <strong>all questions must be answered 100% correctly</strong> to unlock the next level!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto text-left leading-relaxed">
              <strong className="text-amber-400 block mb-1">Study Guide Tip:</strong>
              {activeLevel.conceptSummary}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => startLevel(activeLevel)}
                className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Level (Target 100% Correct)</span>
              </button>
              <button
                onClick={exitToMap}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Exit to Map
              </button>
            </div>
          </div>
        )}

        {/* Main Quiz Gameplay Stage */}
        {!isVictory && !isDefeat && (
          <div className="space-y-6">
            
            {/* Enemy & Study Codex Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Enemy Battler Card */}
              <div className="md:col-span-4 rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Opponent</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Stage {currentQIndex + 1}/{currentLevelQuestions.length}</span>
                  </div>

                  <div className={`flex items-center gap-3 py-2 transition-transform duration-300 ${strikeEnemy ? 'scale-125 rotate-6' : ''}`}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 text-3xl shadow-md">
                      {activeLevel.enemyIcon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {activeLevel.isBossLevel ? activeLevel.bossName : `Guardian: ${activeLevel.title}`}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{activeLevel.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Question progress bar */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span>Level Completion</span>
                    <span>{Math.round(((currentQIndex) / currentLevelQuestions.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${((currentQIndex + 1) / currentLevelQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Study Codex Card */}
              <div className="md:col-span-8 rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Python 3.12 Learning Codex</span>
                    </div>
                    <button
                      onClick={() => setShowCodex(!showCodex)}
                      className="text-[10px] text-slate-400 hover:text-white underline"
                    >
                      {showCodex ? 'Collapse' : 'Expand Codex'}
                    </button>
                  </div>

                  {showCodex && (
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono">
                      {activeLevel.conceptSummary}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                  <span>Earn <strong className="text-sky-300">+{activeLevel.xpReward} XP</strong> and <strong className="text-amber-300">+{activeLevel.coinReward} Coins</strong></span>
                  <span className="text-slate-500">Keyboard: [A, B, C, D] or [1, 2, 3, 4]</span>
                </div>
              </div>
            </div>

            {/* Question Terminal & Sandbox */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Challenge #{currentQIndex + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                  {currentQ.prompt}
                </h3>
              </div>

              {/* Code Snippet Box */}
              {currentQ.codeSnippet && (
                <div className="rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden font-mono shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-800 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-rose-500" />
                      <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="ml-2 font-semibold text-slate-300">python_quest_{activeLevel.levelNumber}.py</span>
                    </div>
                    <span>Python 3.12</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm text-emerald-300 leading-relaxed overflow-x-auto">
                    {currentQ.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Interactive 4 Action Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  let style = 'border-slate-800 bg-slate-850 hover:bg-slate-800 text-slate-200 hover:border-slate-700';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      style = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10 scale-[1.01]';
                    } else if (idx === selectedOpt) {
                      style = 'border-rose-500 bg-rose-950/40 text-rose-300 font-bold';
                    } else {
                      style = 'border-slate-800/60 bg-slate-900/40 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 justify-between ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800 text-xs font-bold text-slate-300 shadow-sm">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOpt && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Hint */}
              {isAnswered && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200 ${
                  selectedOpt === currentQ.correctIndex
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    {selectedOpt === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Strike Successful! Concept Verified:</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Shield Hit! Strict Mastery Rule Triggered:</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-200">{currentQ.explanation}</p>
                  {selectedOpt !== currentQ.correctIndex && (
                    <div className="pt-1 text-[11px] font-bold text-rose-400 flex items-center gap-1.5">
                      <span>⚠️ Note: Under Strict Mastery rules, all questions must be answered correctly to unlock the next level.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-lg ${
                      hasAnyMistake
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30'
                        : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/20'
                    }`}
                  >
                    <span>
                      {hasAnyMistake
                        ? (currentQIndex + 1 < currentLevelQuestions.length ? 'Continue (Mastery Failed) →' : 'Complete & Retry Level ⚠️')
                        : (currentQIndex + 1 < currentLevelQuestions.length ? 'Next Battle Phase →' : 'Claim Level Victory 🏆')}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: OVERWORLD WORLD MAP & QUEST BOARD (25 Progressive Game Levels)
  // =========================================================================
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setCurrentView('explore')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Code Tracks</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={saveAndQuit}
            title="Save and exit game session"
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-xs font-bold text-emerald-300 transition-all shadow-sm"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save & Quit</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
            <span>Python 3.12 Campaign</span>
            <span>·</span>
            <span>100 Progressive Levels</span>
            <span>·</span>
            <span>20 Hunter Ranks</span>
          </div>
        </div>
      </div>

      {/* Hero Game Overworld Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src={overworldMapImg}
            alt="Python 3.12 Game Overworld Map"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              PYTHON 3.12 SAGA · 100 LEVELS
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {highestCompleted} / 100 Conquered
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Rise of the Pythonic Master
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Traverse 10 elemental biomes across 100 levels from basic syntax to PEP 695 generics, async concurrency, and high-frequency quant algorithms. Slay 20 milestone bosses to unlock the 20 legendary Hunter Ranks!
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-slate-300">
            {/* Stars */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white tabular-nums">{totalStars} / 300 Stars</span>
            </div>

            {/* Unlocked */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white tabular-nums">Level {unlockedUpTo} Unlocked</span>
            </div>

            {/* Quick Play CTA */}
            <button
              onClick={() => {
                const targetLvl = PYTHON_100_LEVELS.find((l) => l.levelNumber === unlockedUpTo) || PYTHON_100_LEVELS[0];
                startLevel(targetLvl);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Continue Quest (Level {unlockedUpTo})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Biome Filter Tabs (All 10 Biomes) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Select Biome Realm (10 Sectors)</span>
          </h3>
          <span className="text-xs text-slate-500">Each Biome features 10 levels with 2 Boss Ranks</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedBiomeId('all');
            }}
            className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
              selectedBiomeId === 'all'
                ? 'bg-slate-800 border-emerald-400 text-white shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>All 100 Levels</span>
            <p className="text-[10px] text-slate-500 font-normal mt-0.5">Whole Realm Map</p>
          </button>

          {BIOMES.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                sound.playClick();
                setSelectedBiomeId(b.id);
              }}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                selectedBiomeId === b.id
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
              style={{
                borderColor: selectedBiomeId === b.id ? b.color : undefined
              }}
            >
              <span style={{ color: b.color }} className="line-clamp-1">{b.name.split(':')[1]}</span>
              <p className="text-[10px] text-slate-500 font-normal mt-0.5">{b.range}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 100 Progressive Game Level Cards Grid */}
      <div className="space-y-8">
        {BIOMES.filter((b) => selectedBiomeId === 'all' || selectedBiomeId === b.id).map((biome) => {
          const biomeLevels = PYTHON_100_LEVELS.filter((l) => l.biomeId === biome.id);

          return (
            <div key={biome.id} className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-6">
              
              {/* Biome Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 rounded-full" style={{ backgroundColor: biome.color }} />
                    <h3 className="text-lg font-bold text-white">{biome.name}</h3>
                    <span className="text-xs text-slate-500 font-mono">({biome.range})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{biome.description}</p>
                </div>

                <div className="text-xs font-semibold text-slate-400">
                  {biomeLevels.filter((l) => levelProgress[l.levelNumber]).length} / {biomeLevels.length} Cleared
                </div>
              </div>

              {/* Levels Grid in Biome */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {biomeLevels.map((lvl) => {
                  const isCompleted = !!levelProgress[lvl.levelNumber];
                  const stars = levelProgress[lvl.levelNumber]?.stars || 0;
                  const isUnlocked = lvl.levelNumber <= unlockedUpTo;
                  const isCurrent = lvl.levelNumber === unlockedUpTo;
                  const isRankMilestone = isRankMilestoneLevel(lvl.levelNumber);
                  const rank = isRankMilestone ? getRankForLevel(lvl.levelNumber) : null;

                  return (
                    <div
                      key={lvl.levelNumber}
                      onClick={() => isUnlocked && startLevel(lvl)}
                      className={`group relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                        isCurrent
                          ? 'border-emerald-400 bg-emerald-950/20 shadow-xl shadow-emerald-500/10 cursor-pointer ring-2 ring-emerald-500/40'
                          : isCompleted
                          ? 'border-slate-800 bg-slate-850 hover:border-slate-700 cursor-pointer hover:bg-slate-800'
                          : isUnlocked
                          ? 'border-slate-800 bg-slate-900 hover:border-slate-700 cursor-pointer'
                          : 'border-slate-850 bg-slate-950/60 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {/* Top indicator */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                              lvl.isBossLevel
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : isUnlocked
                                ? 'bg-slate-800 text-white border border-slate-700'
                                : 'bg-slate-900 text-slate-600 border border-slate-850'
                            }`}>
                              {lvl.isBossLevel ? '👑' : lvl.levelNumber}
                            </span>

                            {/* Rank Milestone Insignia if Level 5, 10, 15, ..., 100 */}
                            {rank && (
                              <div title={`Unlocks Rank: ${rank.title}`} className="cursor-help">
                                <RankInsignia rank={rank} size="sm" showGlow={false} />
                              </div>
                            )}
                          </div>

                          {/* Lock or Stars */}
                          {isUnlocked ? (
                            isCompleted ? (
                              <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                                {[1, 2, 3].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-3 h-3 ${s <= stars ? 'fill-amber-400' : 'text-slate-700'}`}
                                  />
                                ))}
                              </div>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                OPEN
                              </span>
                            )
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </div>

                        {/* Rank Milestone Pill if applicable */}
                        {isRankMilestone && rank && (
                          <div className="mb-2">
                            <span
                              className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border inline-block"
                              style={{
                                color: rank.color,
                                borderColor: `${rank.color}40`,
                                backgroundColor: `${rank.color}15`
                              }}
                            >
                              Rank: {rank.title}
                            </span>
                          </div>
                        )}

                        {/* Title & Subtitle */}
                        <div className="mb-2">
                          <span className="text-xl inline-block mb-1">{lvl.enemyIcon}</span>
                          <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                            {lvl.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                            {lvl.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Footer inside Card */}
                      <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-semibold">+{lvl.xpReward} XP</span>
                        {isUnlocked ? (
                          <span className="text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
                            {isCompleted ? 'Replay →' : 'Start →'}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[10px]">Lvl {lvl.levelNumber}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
