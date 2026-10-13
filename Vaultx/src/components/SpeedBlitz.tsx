import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { Timer, Zap, Flame, RotateCcw, Trophy, CheckCircle2, ArrowRight } from 'lucide-react';

interface BlitzQuestion {
  prompt: string;
  options: string[];
  correct: number;
}

const BLITZ_QUESTIONS: BlitzQuestion[] = [
  {
    prompt: 'In Python, what is the output of `bool([])`?',
    options: ['True', 'False', 'None', 'Error'],
    correct: 1
  },
  {
    prompt: 'A shirt discounted by 20% costs $80. What was its original price?',
    options: ['$96', '$90', '$100', '$105'],
    correct: 2
  },
  {
    prompt: 'Next prime number after 19 is:',
    options: ['21', '27', '29', '23'],
    correct: 3
  },
  {
    prompt: 'Python operator for floor division is:',
    options: ['//', '/', '%', '**'],
    correct: 0
  },
  {
    prompt: 'Rule of 72: at 9% annual interest, money doubles in:',
    options: ['7.2 years', '8 years', '9 years', '10 years'],
    correct: 1
  },
  {
    prompt: 'What does CSS stand for?',
    options: ['Creative Style System', 'Computer Style Sheet', 'Cascading Style Sheets', 'Cascading Script Sheet'],
    correct: 2
  },
  {
    prompt: 'Time complexity of binary search on sorted array:',
    options: ['O(n)', 'O(1)', 'O(n log n)', 'O(log n)'],
    correct: 3
  },
  {
    prompt: 'If 5 workers build 5 walls in 5 days, 1 worker builds 1 wall in:',
    options: ['5 days', '1 day', '25 days', '0.2 days'],
    correct: 0
  }
];

function shuffleBlitzQuestion(q: BlitzQuestion): BlitzQuestion {
  const optionsWithIndex = q.options.map((opt, idx) => ({
    opt,
    isCorrect: idx === q.correct
  }));
  for (let i = optionsWithIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
  }
  return {
    prompt: q.prompt,
    options: optionsWithIndex.map((item) => item.opt),
    correct: optionsWithIndex.findIndex((item) => item.isCorrect)
  };
}

export const SpeedBlitz: React.FC = () => {
  const { awardReward, triggerCelebration, setCurrentView } = useGame();
  const [activeBlitzList, setActiveBlitzList] = useState<BlitzQuestion[]>(() =>
    [...BLITZ_QUESTIONS].sort(() => Math.random() - 0.5).map(shuffleBlitzQuestion)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    if (secondsLeft <= 0) {
      endGame();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, secondsLeft]);

  const startGame = () => {
    sound.playClick();
    setActiveBlitzList([...BLITZ_QUESTIONS].sort(() => Math.random() - 0.5).map(shuffleBlitzQuestion));
    setSecondsLeft(60);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    sound.playLevelUp();

    // Reward XP & Coins based on blitz score
    const earnedXp = Math.round(score * 1.5);
    const earnedCoins = Math.round(score * 0.5);
    awardReward(earnedXp, earnedCoins);
    triggerCelebration();
  };

  const handleAnswer = (optionIdx: number) => {
    if (!isPlaying) return;
    const q = BLITZ_QUESTIONS[currentIdx % BLITZ_QUESTIONS.length];

    if (optionIdx === q.correct) {
      sound.playCorrect();
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      if (nextCombo > maxCombo) setMaxCombo(nextCombo);

      const multiplier = nextCombo >= 5 ? 3 : nextCombo >= 3 ? 2 : 1;
      setScore((s) => s + 20 * multiplier);
    } else {
      sound.playWrong();
      setCombo(0);
    }

    setCurrentIdx((prev) => prev + 1);
  };

  const currentQ = BLITZ_QUESTIONS[currentIdx % BLITZ_QUESTIONS.length];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      
      {/* Intro View */}
      {!isPlaying && !isGameOver && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6 shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto text-3xl">
            ⚡
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              TIME-BASED GAME MODULE
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">60-Second Speed Blitz</h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-2 leading-relaxed">
              Test your rapid reflexes across quantitative math, Python, and logic puzzles. Chain consecutive correct answers to activate Combo Multipliers!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400">Duration</span>
              <p className="text-lg font-bold text-white mt-1">60s</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400">Combo Multiplier</span>
              <p className="text-lg font-bold text-emerald-400 mt-1">Up to 3x</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-slate-400">Payout</span>
              <p className="text-lg font-bold text-amber-400 mt-1">XP + Coins</p>
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            Start Speed Blitz Challenge →
          </button>
        </div>
      )}

      {/* Active Blitz Play View */}
      {isPlaying && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* HUD Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-400 font-extrabold text-base tabular-nums">
                <Timer className="w-4 h-4" />
                <span>{secondsLeft}s</span>
              </div>

              {combo > 1 && (
                <div className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-950/40 border border-orange-500/30 px-2.5 py-1 rounded-lg animate-pulse">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{combo}x COMBO!</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Score:</span>
              <span className="text-xl font-black text-emerald-400 tabular-nums">{score}</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="space-y-4 py-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Question #{currentIdx + 1}
            </span>
            <h3 className="text-xl font-bold text-white leading-relaxed">
              {currentQ.prompt}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="p-4 rounded-xl border border-slate-700 bg-slate-850 hover:bg-emerald-950/30 hover:border-emerald-500/50 text-slate-100 text-sm font-semibold transition-all text-left flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Summary */}
      {isGameOver && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6 shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto text-3xl">
            🎯
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              TIME'S UP!
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Blitz Challenge Finished</h2>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-xs text-slate-400">Final Score</span>
              <p className="text-2xl font-black text-emerald-400 mt-1 tabular-nums">{score}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-xs text-slate-400">Max Combo</span>
              <p className="text-2xl font-black text-orange-400 mt-1 tabular-nums">{maxCombo}x</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
              <span className="text-xs text-slate-400">XP Rewarded</span>
              <p className="text-2xl font-black text-sky-400 mt-1 tabular-nums">+{Math.round(score * 1.5)}</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Another Round</span>
            </button>
            <button
              onClick={() => setCurrentView('explore')}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
            >
              Explore Tracks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
