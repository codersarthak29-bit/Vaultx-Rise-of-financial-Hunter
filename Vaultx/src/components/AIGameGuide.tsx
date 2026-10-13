import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Bot, Send, Sparkles, X, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';
import { sound } from '../utils/audio';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

const PRESET_QUESTIONS = [
  'How do list comprehensions differ from map/filter in Python?',
  'Explain Python 3.12 PEP 695 type parameter syntax.',
  'What is the per-interpreter GIL in Python 3.12?',
  'Explain the Rule of 72 and continuous compounding.',
  'What is the relative speed formula for two crossing trains?'
];

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  pep695: `**Python 3.12 Type Parameter Syntax (PEP 695):**\n\n• **Type statement:** \`type Vector[T] = list[T]\` - replaces verbose TypeVar boilerplate.\n• **Generic functions:** \`def first[T](items: list[T]) -> T:\` clean inline type parameters.\n• **Generic classes:** \`class Stack[T]: pass\`.\nThis makes Python 3.12 type safety as elegant and clean as modern TypeScript or Rust!`,
  gil: `**Python 3.12 Per-Interpreter GIL (PEP 684):**\n\n• Historically, CPython shared one Global Interpreter Lock across all threads.\n• Python 3.12 introduced isolated subinterpreters with **individual GILs per interpreter**.\n• This enables genuine multi-core CPU parallelism directly in Python processes without fork/IPC overhead!`,
  list: `**Python List Comprehension vs map/filter:**\n\n• List comprehension provides clearer syntax: \`[x**2 for x in data if x % 2 == 0]\`.\n• In modern Python 3.12, comprehensions avoid the overhead of repeated lambda call invocations, making them both more idiomatic and faster than \`list(map(lambda x: ..., filter(...)))\`.\n• Tip for hunters: For very large datasets, use generator expressions \`(x**2 for x in data)\` to save RAM!`,
  rule: `**The Rule of 72 & Continuous Compounding:**\n\n• **Rule of 72:** Doubling Time ≈ 72 / r (where r is the annual rate percentage). E.g. at 8% per year, capital doubles in ~9 years.\n• **Continuous Compounding:** Value = P × e^(r × t).\nAs compounding intervals approach infinity, Euler's constant e (≈ 2.71828) models optimal exponential growth in financial algorithms.`,
  speed: `**Relative Speed Formula:**\n\n• When two objects move in **opposite directions** towards each other, add their speeds: V_rel = V1 + V2.\n• When moving in the **same direction**, subtract their speeds: V_rel = |V1 - V2|.\n• Crucial exam tip: Convert km/h to m/s by multiplying by (5/18)!`,
  microtask: `**JavaScript Event Loop:**\n\n1. Synchronous call stack executes first.\n2. **Microtasks Queue:** (Promises .then, queueMicrotask, MutationObserver) executes immediately after the current stack empties, BEFORE any macrotask.\n3. **Macrotasks Queue:** (setTimeout, setInterval, I/O) executes in subsequent ticks.`
};

export const AIGameGuide: React.FC = () => {
  const { user } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Greetings Explorer ${user.gamertag}! I am your VaultX AI Game Coach. Ask me anything about Python syntax, quantitative finance math, competitive aptitude, or boss battle strategies.`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;
    sound.playClick();

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: q
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Great query on ${q}! In the VaultX syllabus, mastering this concept enhances your problem-solving accuracy and unlocks higher quest tiers. Try breaking this into core test invariants and practicing the respective chapter quest!`;

      const lower = q.toLowerCase();
      if (lower.includes('pep 695') || lower.includes('type parameter') || lower.includes('generic')) {
        reply = KNOWLEDGE_RESPONSES.pep695;
      } else if (lower.includes('gil') || lower.includes('subinterpreter') || lower.includes('interpreter')) {
        reply = KNOWLEDGE_RESPONSES.gil;
      } else if (lower.includes('list') || lower.includes('comprehension')) {
        reply = KNOWLEDGE_RESPONSES.list;
      } else if (lower.includes('rule') || lower.includes('compound') || lower.includes('math')) {
        reply = KNOWLEDGE_RESPONSES.rule;
      } else if (lower.includes('speed') || lower.includes('train') || lower.includes('aptitude')) {
        reply = KNOWLEDGE_RESPONSES.speed;
      } else if (lower.includes('microtask') || lower.includes('event loop') || lower.includes('js')) {
        reply = KNOWLEDGE_RESPONSES.microtask;
      } else if (lower.includes('python')) {
        reply = KNOWLEDGE_RESPONSES.list;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: reply
        }
      ]);
      setIsTyping(false);
      sound.playCoin();
    }, 600);
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline">AI Game Guide</span>
      </button>

      {/* Slide-out Coach Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[580px] h-[580px] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">VaultX AI Game Guide</h4>
                <p className="text-[10px] text-slate-400">Coach calibrated for {user.pathMode}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800 border border-slate-700/60 text-slate-200 rounded-tl-none font-normal'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700/60 text-slate-400 text-xs flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse delay-100" />
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse delay-200" />
                  <span>Coach analyzing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
            {PRESET_QUESTIONS.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-750 text-[11px] text-slate-300 border border-slate-700/60 shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask formula, code syntax, or hint..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
