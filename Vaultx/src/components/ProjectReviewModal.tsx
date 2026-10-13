import React from 'react';
import { useGame } from '../context/GameContext';
import { GraduationCap, Users, Calendar, Database, Layers, CheckCircle2, BookOpen, GitFork } from 'lucide-react';
import { sound } from '../utils/audio';

export const ProjectReviewModal: React.FC = () => {
  const { setCurrentView } = useGame();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Title & Institutional Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Mini Project (BCS554) · Review 2
          </span>
          <span className="text-xs font-semibold text-slate-400">
            Academic Session: 2026-27
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            VaultX : Rise of Financial Hunter
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium">
            Gamified Learning Platform for Skill Development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Supervisor</span>
            <p className="text-sm font-bold text-white mt-0.5">Dr. Vikas Goel</p>
            <p className="text-slate-400">HOD, Department of CSE-AIML / CSD</p>
            <p className="text-slate-500 text-[11px] mt-1">IMS Engineering College, Ghaziabad · Dr. A.P.J Abdul Kalam Technical University, Lucknow</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Submitted By (Group Members)</span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <p className="font-semibold text-white">Sarthak Singh</p>
                <p className="text-[11px] text-slate-400 font-mono">2401431650048</p>
              </div>
              <div>
                <p className="font-semibold text-white">Shivansh Soam</p>
                <p className="text-[11px] text-slate-400 font-mono">2401431650051</p>
              </div>
              <div>
                <p className="font-semibold text-white">Vyom Singhal</p>
                <p className="text-[11px] text-slate-400 font-mono">2401431650066</p>
              </div>
              <div>
                <p className="font-semibold text-white">Uttkarsh Goel</p>
                <p className="text-[11px] text-slate-400 font-mono">2401431650061</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement & Solution (Slide 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-xs uppercase font-extrabold text-rose-400">Problem Statement</span>
          <h3 className="text-base font-bold text-white">The Challenge in STEM & Skill Learning</h3>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">›</span>
              <span>Traditional learning of Python, aptitude, reasoning & mathematics can feel repetitive and theory-heavy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">›</span>
              <span>Students often struggle to stay engaged and motivated while practicing skills.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">›</span>
              <span>Need for a unified learning platform combining education with interactive gameplay.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-xs uppercase font-extrabold text-emerald-400">Our Solution</span>
          <h3 className="text-base font-bold text-white">VaultX Game-Based Learning Engine</h3>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">›</span>
              <span>VaultX transforms learning into an interactive game-based experience.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">›</span>
              <span>Players complete challenges, earn rewards, progress through levels, and develop real skills.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">›</span>
              <span>Combines learning + challenges + progression + virtual economy (Vault Coins & XP) in one platform.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Component Hierarchy & ER Diagram (Slide 3) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">System Design, Architecture & ER Model</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Component Hierarchy */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
            <p className="text-emerald-400 font-bold pb-2 border-b border-slate-800">Component Hierarchy</p>
            <pre className="text-xs text-slate-300 leading-snug pt-2">
{`VaultX
├── Authentication
│   ├── Login
│   └── Registration
├── Game Engine
│   ├── Levels
│   ├── Quests
│   └── Challenges
├── Learning System
│   ├── Python
│   ├── Aptitude
│   ├── Reasoning
│   └── Mathematics
├── Reward System
│   ├── XP
│   ├── Vault Coins
│   └── Achievements
└── Player System
    ├── Profile
    ├── Inventory
    └── Progress`}
            </pre>
          </div>

          {/* ER Diagram Representation */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
            <p className="text-amber-400 font-bold pb-2 border-b border-slate-800">Entity Relationship (ER) Diagram</p>
            <pre className="text-xs text-slate-300 leading-snug pt-2">
{`USER
│
├──────< PROGRESS >────── LEVEL
│
├──────< QUEST >───────── CATEGORY
│   │
│   └───────── QUESTION
│
└──────< INVENTORY >───── ITEM`}
            </pre>
            <div className="pt-4 text-[11px] text-slate-400 not-italic font-sans">
              <p>• Normalized relational mappings between user progress, quest hierarchies, question banks, and virtual inventory items.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Work Distribution (Slide 8) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-400" />
          <h2 className="text-lg font-bold text-white">Team Work Distribution (Slide 8)</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Team Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Key Contributions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Sarthak Singh</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Game Logic & Backend</td>
                <td className="py-3 px-4">Game engine, level progression, quests, challenges, reward system, backend logic</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Vyom Singhal</td>
                <td className="py-3 px-4 text-purple-400 font-semibold">UI/UX Designer</td>
                <td className="py-3 px-4">Game interface, layouts, visual design, user experience</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Shivansh Soam</td>
                <td className="py-3 px-4 text-sky-400 font-semibold">Backend Developer</td>
                <td className="py-3 px-4">Database integration, APIs, authentication, backend support</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Uttkarsh Goel</td>
                <td className="py-3 px-4 text-amber-400 font-semibold">Development & Testing</td>
                <td className="py-3 px-4">Feature integration, testing, debugging, and deployment support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gantt Chart & Current Progress (Slide 9) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Gantt Chart Schedule & Timeline (Slide 9)</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800">
            <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Phase / Module</th>
                <th className="py-2.5 px-3 text-center">Week 1</th>
                <th className="py-2.5 px-3 text-center">Week 2</th>
                <th className="py-2.5 px-3 text-center">Week 3</th>
                <th className="py-2.5 px-3 text-center">Week 4</th>
                <th className="py-2.5 px-3 text-center">Week 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-2 px-3 font-medium">UI/UX & Authentication</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Main Menu & Time Module</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Game Levels & Quests</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Learning Modules (Python, Math, Aptitude, Reasoning)</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Rewards & Database</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Testing & Bug Fixing</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Final Integration & Deployment</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400 font-bold">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Academic Literature References (Slide 10) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <span className="text-xs uppercase font-extrabold text-slate-400">Literature Citations</span>
        <h3 className="text-base font-bold text-white">References & Prior Research</h3>
        <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-5">
          <li>Gamification in Education: What, How, Why Bother? (2011)</li>
          <li>Gamification in Education: A Systematic Mapping Study (2015)</li>
          <li>Does Gamification Improve Student Learning Outcome? (2020)</li>
          <li>A Systematic Literature Review of Education for Generation Alpha — Alena (2024)</li>
          <li>Gamification in Education and Training: A Literature Review (2025)</li>
        </ul>
        <div className="pt-2">
          <span className="text-xs font-semibold text-emerald-400">
            GitHub Repository: VaultX — GitHub Repository (IMS Engineering College)
          </span>
        </div>
      </div>
    </div>
  );
};
