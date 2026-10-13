import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LEADERBOARD_DATA } from '../data/tracksData';
import { HUNTER_RANKS } from '../data/ranksData';
import { RankInsignia } from './RankInsignia';
import { Trophy, Medal, Zap, Flame, Shield, Users, Search } from 'lucide-react';
import { sound } from '../utils/audio';

export const GuildLeaderboard: React.FC = () => {
  const { user } = useGame();
  const [selectedLeague, setSelectedLeague] = useState<'All' | 'Diamond' | 'Platinum' | 'Gold'>('All');
  const [search, setSearch] = useState('');

  const filteredList = LEADERBOARD_DATA.filter((entry) => {
    const matchesLeague = selectedLeague === 'All' || entry.league === selectedLeague;
    const matchesSearch =
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.gamertag.toLowerCase().includes(search.toLowerCase());
    return matchesLeague && matchesSearch;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            COMPETITIVE STANDINGS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Global & Guild Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Climb weekly ranks, conquer seasonal leagues, and earn prestige titles.
          </p>
        </div>

        {/* Current User Standing Card */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900 border border-emerald-500/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-black text-sm">
            #{user.gamertag === 'uchibatobi' ? '1' : '7'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{user.gamertag}</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                Diamond
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {user.xp.toLocaleString()} XP · Lvl {user.level}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto">
          {(['All', 'Diamond', 'Platinum', 'Gold'] as const).map((league) => (
            <button
              key={league}
              onClick={() => {
                sound.playClick();
                setSelectedLeague(league);
              }}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedLeague === league
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {league}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hunters..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Player & College</th>
                <th className="py-3.5 px-4">League</th>
                <th className="py-3.5 px-4 text-center">Streak</th>
                <th className="py-3.5 px-4 text-center">Level</th>
                <th className="py-3.5 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredList.map((entry) => {
                const isMe = entry.gamertag === user.gamertag;

                return (
                  <tr
                    key={entry.gamertag}
                    className={`transition-colors ${
                      isMe ? 'bg-emerald-950/20 text-white' : 'hover:bg-slate-850 text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      {entry.rank === 1 ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-black">
                          🥇
                        </span>
                      ) : entry.rank === 2 ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-400/20 text-slate-200 font-black">
                          🥈
                        </span>
                      ) : entry.rank === 3 ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-700/20 text-amber-500 font-black">
                          🥉
                        </span>
                      ) : (
                        <span className="font-bold text-slate-500 tabular-nums">#{entry.rank}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{entry.avatar}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{entry.name}</span>
                            <span className="text-[11px] text-slate-400">(@{entry.gamertag})</span>
                            {isMe && (
                              <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">{entry.college}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        entry.league === 'Diamond'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : entry.league === 'Platinum'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {entry.league}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 text-orange-400 font-bold tabular-nums">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{entry.streak}d</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center tabular-nums font-bold text-slate-300">
                      Lvl {entry.level}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-extrabold text-emerald-400 tabular-nums text-sm">
                        {entry.xp.toLocaleString()} XP
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 20 Hunter Ranks Showcase Gallery (Requirement 6 & 10) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
              PYTHON 3.12 PRESTIGE HIERARCHY
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              20 Hunter Ranks Codex (Every 5 Levels)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Complete each 5-level milestone in Python 3.12 to acquire the corresponding emblem and prestige rewards.
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            Current Rank: Level {user.level} Hunter
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {HUNTER_RANKS.map((r) => {
            const isUnlocked = user.level >= r.unlockedAtLevel;

            return (
              <div
                key={r.rankNumber}
                className={`rounded-2xl border p-4 flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? 'border-slate-700/80 bg-slate-850 shadow-md'
                    : 'border-slate-850 bg-slate-950/60 opacity-60'
                }`}
              >
                <div className="shrink-0 pt-0.5">
                  <RankInsignia rank={r} size="md" showGlow={isUnlocked} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      {r.tier} · Lvl {r.unlockedAtLevel}
                    </span>
                    {isUnlocked && (
                      <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/15 px-1 py-0.2 rounded">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-black text-white">
                    {r.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">
                    {r.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
