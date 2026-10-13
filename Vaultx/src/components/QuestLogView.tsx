import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LEARNING_TRACKS } from '../data/tracksData';
import { Quest, Question } from '../types';
import { sound } from '../utils/audio';
import { CheckCircle2, XCircle, Lightbulb, Zap, Coins, ArrowRight, RotateCcw, Award, BookOpen } from 'lucide-react';

interface QuestRunnerProps {
  quest: Quest;
  onClose: () => void;
}

function shuffleGeneralQuestion(q: Question, indexSeed = 0): Question {
  const correctOpt = q.options[q.correctIndex];
  const distractors = q.options.filter((_, idx) => idx !== q.correctIndex);
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  // Target index: distributed across 1, 2, 3, 0 so correct answer is NOT always Option A
  const targetIndex = [1, 2, 3, 0][(indexSeed + Math.floor(Math.random() * 3)) % 4];
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

export const QuestRunner: React.FC<QuestRunnerProps> = ({ quest, onClose }) => {
  const { awardReward, triggerCelebration } = useGame();
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(() =>
    quest.questions.map((q, idx) => shuffleGeneralQuestion(q, idx))
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);

  // Re-initialize on quest change
  React.useEffect(() => {
    setShuffledQuestions(quest.questions.map((q, idx) => shuffleGeneralQuestion(q, idx)));
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setCorrectCount(0);
    setIsCompleted(false);
    setEarnedXp(0);
    setEarnedCoins(0);
  }, [quest.id]);

  const currentQ: Question = shuffledQuestions[currentIdx] || quest.questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      setCorrectCount((prev) => prev + 1);
      setEarnedXp((prev) => prev + currentQ.xpReward);
      setEarnedCoins((prev) => prev + currentQ.coinReward);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx + 1 < shuffledQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Finished all questions!
      setIsCompleted(true);
      awardReward(earnedXp, earnedCoins, quest.id);
      triggerCelebration();
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setShuffledQuestions(quest.questions.map(shuffleGeneralQuestion));
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setCorrectCount(0);
    setIsCompleted(false);
    setEarnedXp(0);
    setEarnedCoins(0);
  };

  if (isCompleted) {
    const accuracy = Math.round((correctCount / shuffledQuestions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto text-3xl">
          🏆
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            QUEST COMPLETED
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {quest.title}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Splendid problem solving! Your knowledge powers have expanded.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Accuracy</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">{accuracy}%</p>
            <span className="text-[10px] text-slate-500">{correctCount} of {quest.questions.length}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">XP Gained</span>
            <p className="text-2xl font-bold text-sky-400 mt-1 tabular-nums">+{earnedXp}</p>
            <span className="text-[10px] text-slate-500">Hunter XP</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Vault Coins</span>
            <p className="text-2xl font-bold text-amber-400 mt-1 tabular-nums">+{earnedCoins}</p>
            <span className="text-[10px] text-slate-500">Virtual currency</span>
          </div>
        </div>

        {quest.badgeUnlock && (
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Badge Unlocked: {quest.badgeUnlock}</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            Continue to Quest Log →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            {quest.title} · Chapter {quest.chapterNumber}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            {currentQ.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-sky-400 font-semibold bg-sky-950/40 px-2.5 py-1 rounded-md border border-sky-500/20 tabular-nums">
            <Zap className="w-3.5 h-3.5" />
            <span>+{currentQ.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/20 tabular-nums">
            <Coins className="w-3.5 h-3.5" />
            <span>+{currentQ.coinReward}</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Progress meter */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span>Question {currentIdx + 1} of {quest.questions.length}</span>
          <span className="text-emerald-400 font-semibold">{currentQ.difficulty}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / quest.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-3">
        <p className="text-base text-slate-100 font-medium leading-relaxed whitespace-pre-line">
          {currentQ.prompt}
        </p>

        {/* Code Snippet Box if available */}
        {currentQ.codeSnippet && (
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[10px] text-slate-500 uppercase">
              <span>{currentQ.language || 'code'}</span>
              <span>VaultX IDE Sandbox</span>
            </div>
            <pre className="text-emerald-300/90 leading-relaxed">{currentQ.codeSnippet}</pre>
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'border-slate-800 bg-slate-850 hover:bg-slate-800 text-slate-200';

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-md shadow-emerald-500/10 font-semibold';
            } else if (idx === selectedOption) {
              btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-300 font-semibold';
            } else {
              btnStyle = 'border-slate-800 bg-slate-900/50 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800/80 text-xs font-semibold text-slate-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hint & Explanation Deck */}
      <div className="space-y-3 pt-2">
        {!isAnswered && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a hint? (Free)'}</span>
            </button>
          </div>
        )}

        {showHint && !isAnswered && (
          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
            <strong className="font-semibold text-amber-300">Hunter Clue:</strong> {currentQ.hint}
          </div>
        )}

        {/* Answer Explanation */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
            selectedOption === currentQ.correctIndex
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
          }`}>
            <div className="font-bold flex items-center gap-1.5 text-sm">
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Correct! Well played hunter.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-300">Incorrect. Review the concept below:</span>
                </>
              )}
            </div>
            <p className="text-slate-300 pt-1">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <span>{currentIdx + 1 < quest.questions.length ? 'Next Challenge' : 'Complete Quest'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export const QuestLogView: React.FC = () => {
  const { user, activeTrackId, setActiveTrackId, activeQuest, setActiveQuest, setCurrentView } = useGame();

  const selectedTrack = LEARNING_TRACKS.find((t) => t.id === activeTrackId) || LEARNING_TRACKS[0];

  if (activeQuest) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <QuestRunner quest={activeQuest} onClose={() => setActiveQuest(null)} />
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            QUEST LOG & SKILL ROADMAP
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {selectedTrack.name} Chapters
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {selectedTrack.description}
          </p>
        </div>

        {/* Track Selector Dropdown / Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {LEARNING_TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => {
                sound.playClick();
                setActiveTrackId(track.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedTrack.id === track.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>
      </div>

      {selectedTrack.id === 'python' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎮</span>
            <div>
              <h3 className="text-sm font-bold text-white">Full 25-Level Python 3.12 Campaign Available!</h3>
              <p className="text-xs text-slate-300">Play the complete RPG game with 5 biomes, hearts, combo streaks, and milestone boss fights.</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              setCurrentView('python_game');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs whitespace-nowrap shadow-md shadow-emerald-500/20"
          >
            Launch 25-Level Game Map →
          </button>
        </div>
      )}

      {/* Chapters & Quests */}
      <div className="space-y-6">
        {selectedTrack.chapters.map((chapter, chapIdx) => (
          <div key={chapIdx} className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{chapter.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{chapter.description}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-400">
                {chapter.quests.filter((q) => user.completedQuests.includes(q.id)).length} / {chapter.quests.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {chapter.quests.map((quest) => {
                const isCompleted = user.completedQuests.includes(quest.id);

                return (
                  <div
                    key={quest.id}
                    className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                      isCompleted
                        ? 'bg-emerald-950/15 border-emerald-500/30'
                        : 'bg-slate-850/80 border-slate-800 hover:border-emerald-500/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                          <span>~{quest.estimatedMinutes} mins · {quest.questions.length} Challenges</span>
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Completed
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white mb-1.5">{quest.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {quest.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="text-emerald-400">+{quest.xpTotal} XP</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-amber-400">+{quest.coinsTotal} 🪙</span>
                      </div>

                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveQuest(quest);
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                            : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-500/10'
                        }`}
                      >
                        {isCompleted ? 'Replay Quest' : 'Start Quest →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
