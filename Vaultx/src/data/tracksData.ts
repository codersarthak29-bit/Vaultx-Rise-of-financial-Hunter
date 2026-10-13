import { LearningTrack, BossEntity, LeaderboardEntry } from '../types';

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'python',
    name: 'Python 3.12',
    tagline: '25 Levels · Working RPG Game',
    description: '25 Progressive Game Levels across 5 Biomes: from syntax basics to List Comprehensions, Pattern Matching, PEP 695 Generics, and Asyncio GIL mastery.',
    category: ['All tracks', 'Most popular'],
    badgeTag: 'BEGINNER FRIENDLY',
    color: '#38BDF8',
    accentBg: 'rgba(56, 189, 248, 0.1)',
    iconName: 'Code2',
    totalQuests: 12,
    levelRequired: 1,
    bgGradient: 'from-sky-500/20 via-sky-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: The Gateway of Python Syntax',
        description: 'Understand variables, dynamic typing, string manipulation, and list slices.',
        quests: [
          {
            id: 'py-q1',
            trackId: 'python',
            chapterNumber: 1,
            title: 'List Slices & Comprehensions',
            description: 'Deconstruct lists and write high-speed one-line transformations.',
            estimatedMinutes: 5,
            requiredLevel: 1,
            xpTotal: 250,
            coinsTotal: 75,
            badgeUnlock: 'List Master',
            questions: [
              {
                id: 'py-101',
                title: 'Python Slicing Mechanics',
                prompt: 'What will be the output of the following list slice operation in Python?',
                codeSnippet: 'items = [10, 20, 30, 40, 50, 60]\nresult = items[1:5:2]\nprint(result)',
                language: 'python',
                options: [
                  '[10, 30, 50]',
                  '[20, 40]',
                  '[20, 40, 60]',
                  '[20, 30, 40, 50]'
                ],
                correctIndex: 1,
                explanation: 'Slice syntax is [start:stop:step]. Index 1 is 20, step of 2 hops to index 3 which is 40. Stop index 5 (item 60) is non-inclusive.',
                hint: 'Remember that start index is 1 (second element) and step size is 2.',
                difficulty: 'Novice',
                xpReward: 80,
                coinReward: 25
              },
              {
                id: 'py-102',
                title: 'List Comprehension Filtering',
                prompt: 'Which Python expression correctly filters even squares from the given range 0 through 9?',
                codeSnippet: '# Find squares of even numbers from 0 to 9',
                language: 'python',
                options: [
                  '[for x in range(10) x**2 if x % 2 == 0]',
                  '[x**2 if x % 2 == 0 for x in range(10)]',
                  '[x**2 for x in range(10) if x % 2 == 0]',
                  'filter(lambda x: x**2, range(10))'
                ],
                correctIndex: 2,
                explanation: 'In list comprehensions with a filtering if clause, the condition goes at the end: [expr for item in iterable if condition].',
                hint: 'In list comprehensions without an else clause, the if condition is placed after the for-loop.',
                difficulty: 'Novice',
                xpReward: 85,
                coinReward: 25
              },
              {
                id: 'py-103',
                title: 'Dictionary Key Invariance',
                prompt: 'Which of the following data types CANNOT be used as a key in a standard Python dictionary?',
                codeSnippet: 'd = {}\nd[key] = "VaultX Hunter"',
                language: 'python',
                options: [
                  'string: "hunter_key"',
                  'tuple: (1, 2, 3)',
                  'frozenset: frozenset([1, 2])',
                  'list: [1, 2, 3]'
                ],
                correctIndex: 3,
                explanation: 'Dictionary keys must be hashable and immutable. Lists are mutable and lack a hash implementation, raising a TypeError: unhashable type: list.',
                hint: 'Dictionary keys must be immutable objects that cannot be mutated in place.',
                difficulty: 'Adept',
                xpReward: 85,
                coinReward: 25
              }
            ]
          },
          {
            id: 'py-q2',
            trackId: 'python',
            chapterNumber: 1,
            title: 'Memory, Mutability & Lambdas',
            description: 'Dive into pass-by-object-reference, default argument traps, and anonymous functions.',
            estimatedMinutes: 8,
            requiredLevel: 1,
            xpTotal: 300,
            coinsTotal: 90,
            badgeUnlock: 'Reference Hunter',
            questions: [
              {
                id: 'py-201',
                title: 'The Mutable Default Argument Trap',
                prompt: 'What happens when `append_to([99])` is invoked twice sequentially in this function?',
                codeSnippet: 'def append_to(val, target=[]):\n    target.append(val)\n    return target\n\nprint(append_to(1))\nprint(append_to(2))',
                language: 'python',
                options: ['[1] then [1, 2]', '[1] then [2]', '[1] then []', 'Raises SyntaxError'],
                correctIndex: 0,
                explanation: 'Default argument expressions in Python are evaluated once at function definition time, so the same list instance is reused across invocations.',
                hint: 'Default values in Python functions are bound once at function creation time, not evaluated per call.',
                difficulty: 'Adept',
                xpReward: 100,
                coinReward: 30
              },
              {
                id: 'py-202',
                title: 'Generators vs Iterators',
                prompt: 'What is the primary memory advantage of using `yield` in Python generators instead of returning a full list?',
                language: 'python',
                options: [
                  'Prevents Python garbage collection from freeing memory',
                  'Executes on multiple CPU cores in parallel automatically',
                  'Streams elements lazily on demand without allocating entire collection memory',
                  'Compiles bytecode into C machine instructions'
                ],
                correctIndex: 2,
                explanation: 'Generators produce values on the fly via lazy evaluation (iterators), which uses O(1) space rather than allocating O(N) memory.',
                hint: 'Think about big-O space complexity when handling millions of items.',
                difficulty: 'Adept',
                xpReward: 100,
                coinReward: 30
              },
              {
                id: 'py-203',
                title: 'Lambda Sorting Multi-Key',
                prompt: 'How to sort a list of player tuples `(name, score, rank)` primarily by score descending, then rank ascending?',
                codeSnippet: 'players = [("Sarthak", 90, 2), ("Shivansh", 95, 1), ("Vyom", 90, 1)]',
                language: 'python',
                options: [
                  'sorted(players, key=lambda p: (p[1], -p[2]))',
                  'sorted(players, key=lambda p: (-p[1], p[2]))',
                  'players.sort(reverse=True, secondary=True)',
                  'sorted(players, reverse=(True, False))'
                ],
                correctIndex: 1,
                explanation: 'Using -p[1] reverses the numeric ordering for the first tie-breaker, and p[2] sorts in default ascending order.',
                hint: 'Negating a numeric key flips its sorting direction.',
                difficulty: 'Master',
                xpReward: 100,
                coinReward: 30
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics & Quant',
    tagline: 'Financial & Algorithmic Math',
    description: 'Master compound interest, probability, risk metrics, matrix calculus, and financial quantitative models.',
    category: ['All tracks', 'Math & Aptitude', 'Reasoning & Quant'],
    badgeTag: 'FINANCIAL HUNTER',
    color: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.1)',
    iconName: 'Calculator',
    totalQuests: 10,
    levelRequired: 1,
    bgGradient: 'from-emerald-500/20 via-emerald-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Foundations of Financial Compounding & Probability',
        description: 'Time value of money, continuous growth rates, and expected financial returns.',
        quests: [
          {
            id: 'math-q1',
            trackId: 'mathematics',
            chapterNumber: 1,
            title: 'Compound Growth & Rule of 72',
            description: 'Calculate investment doubling time and continuous compound interest models.',
            estimatedMinutes: 6,
            requiredLevel: 1,
            xpTotal: 300,
            coinsTotal: 90,
            badgeUnlock: 'Wealth Architect',
            questions: [
              {
                id: 'math-101',
                title: 'The Rule of 72',
                prompt: 'If a portfolio in the VaultX fund earns a steady 8% annual compound return, approximately how many years will it take for the capital to double?',
                codeSnippet: 'Formula: Doubling Years ≈ 72 / (Annual Rate %)',
                options: [
                  '18 years',
                  '12 years',
                  '6 years',
                  '9 years'
                ],
                correctIndex: 3,
                explanation: 'Using the Rule of 72: 72 / 8 = 9 years. The exact logarithmic formula ln(2)/ln(1.08) ≈ 9.006 years.',
                hint: 'Divide 72 by the percentage rate 8.',
                difficulty: 'Novice',
                xpReward: 100,
                coinReward: 30
              },
              {
                id: 'math-102',
                title: 'Continuous Compounding Value',
                prompt: 'An initial vault deposit of $10,000 grows with continuous compounding at annual rate r = 5% for 2 years (e ≈ 2.718). What is the terminal value?',
                codeSnippet: 'A = P * e^(r * t)\nP = 10,000, r = 0.05, t = 2 => r*t = 0.10\ne^0.10 ≈ 1.10517',
                options: [
                  '$10,500.00',
                  '$11,000.00',
                  '$11,051.70',
                  '$12,100.00'
                ],
                correctIndex: 2,
                explanation: 'A = 10,000 * e^(0.05 * 2) = 10,000 * e^0.10 ≈ 10,000 * 1.10517 = $11,051.70.',
                hint: 'Multiply the principal 10,000 by 1.10517.',
                difficulty: 'Adept',
                xpReward: 100,
                coinReward: 30
              },
              {
                id: 'math-103',
                title: 'Expected Portfolio Payoff',
                prompt: 'A trade has a 70% probability of gaining $3,000 and a 30% probability of losing $4,000. What is the Expected Value (E[X]) of this trade?',
                options: ['+$900', '+$500', '+$1,100', '-$200'],
                correctIndex: 0,
                explanation: 'E[X] = (0.70 * 3000) + (0.30 * -4000) = 2100 - 1200 = +$900.',
                hint: 'Calculate (0.70 × 3000) minus (0.30 × 4000).',
                difficulty: 'Adept',
                xpReward: 100,
                coinReward: 30
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'aptitude',
    name: 'Aptitude & Quant',
    tagline: 'Placement & Speed Problem Solving',
    description: 'Time & work equations, speed-distance-time, percentage ratios, and competitive placement quantitative puzzles.',
    category: ['All tracks', 'Math & Aptitude'],
    badgeTag: 'CAREER READY',
    color: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.1)',
    iconName: 'Target',
    totalQuests: 10,
    levelRequired: 1,
    bgGradient: 'from-amber-500/20 via-amber-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Speed, Work and Proportions',
        description: 'Core arithmetic logic needed for engineering & tech competitive challenges.',
        quests: [
          {
            id: 'apt-q1',
            trackId: 'aptitude',
            chapterNumber: 1,
            title: 'Work Efficiency & Pipes',
            description: 'Solve cooperative task efficiency and rates problems.',
            estimatedMinutes: 5,
            requiredLevel: 1,
            xpTotal: 260,
            coinsTotal: 80,
            badgeUnlock: 'Speed Strategist',
            questions: [
              {
                id: 'apt-101',
                title: 'Cooperative Work Rates',
                prompt: 'Hunter A can complete a coding challenge in 6 hours, while Hunter B can complete it in 12 hours. Working simultaneously, how long will they take?',
                options: [
                  '3 hours',
                  '4 hours',
                  '5 hours',
                  '4.5 hours'
                ],
                correctIndex: 1,
                explanation: 'Combined rate = 1/6 + 1/12 = 3/12 = 1/4. Total time is the reciprocal: 4 hours.',
                hint: 'Calculate 1/A + 1/B, then take the inverse.',
                difficulty: 'Novice',
                xpReward: 85,
                coinReward: 25
              },
              {
                id: 'apt-102',
                title: 'Relative Speed of Two Trains',
                prompt: 'Two trains 150m and 250m in length are running towards each other on parallel tracks at 54 km/h and 90 km/h. How many seconds will they take to cross each other?',
                options: [
                  '15 seconds',
                  '12 seconds',
                  '8 seconds',
                  '10 seconds'
                ],
                correctIndex: 3,
                explanation: 'Relative speed = 54 + 90 = 144 km/h. In m/s = 144 * (5/18) = 40 m/s. Total distance = 150 + 250 = 400 m. Time = 400 / 40 = 10 seconds.',
                hint: 'Convert relative speed (144 km/h) to m/s by multiplying by 5/18.',
                difficulty: 'Adept',
                xpReward: 90,
                coinReward: 30
              },
              {
                id: 'apt-103',
                title: 'Ratio & Profit Sharing',
                prompt: 'A, B, and C invest capital in ratio 2 : 3 : 5 for periods of 6, 4, and 3 months respectively. What is the ratio of their profit sharing?',
                options: [
                  '12 : 12 : 15',
                  '6 : 6 : 5',
                  '4 : 4 : 5',
                  '2 : 3 : 5'
                ],
                correctIndex: 2,
                explanation: 'Profit ratio is Capital * Time. (2*6) : (3*4) : (5*3) = 12 : 12 : 15, simplifying by dividing by 3 yields 4 : 4 : 5.',
                hint: 'Multiply each capital ratio part by its corresponding month duration.',
                difficulty: 'Adept',
                xpReward: 85,
                coinReward: 25
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'reasoning',
    name: 'Logical Reasoning',
    tagline: 'Deduction & Analytical Puzzles',
    description: 'Syllogisms, blood relations, seating arrangements, matrix logic, and sequence identification.',
    category: ['All tracks', 'Reasoning & Quant'],
    badgeTag: 'COMPETITIVE',
    color: '#8B5CF6',
    accentBg: 'rgba(139, 92, 246, 0.1)',
    iconName: 'BrainCircuit',
    totalQuests: 10,
    levelRequired: 1,
    bgGradient: 'from-purple-500/20 via-purple-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Deductive Systems & Syllogisms',
        description: 'Venn logic, categorical validity, and deductive truth preservation.',
        quests: [
          {
            id: 'rea-q1',
            trackId: 'reasoning',
            chapterNumber: 1,
            title: 'Syllogisms & Truth Tables',
            description: 'Evaluate premises and determine strictly logically sound conclusions.',
            estimatedMinutes: 5,
            requiredLevel: 1,
            xpTotal: 270,
            coinsTotal: 85,
            badgeUnlock: 'Logic Luminary',
            questions: [
              {
                id: 'rea-101',
                title: 'Classical Syllogism',
                prompt: 'Statements:\n1. All hunters are coders.\n2. Some coders are mathematicians.\nConclusions:\nI. Some hunters are mathematicians.\nII. Some mathematicians are coders.',
                options: [
                  'Only Conclusion I follows',
                  'Only Conclusion II follows',
                  'Both follow',
                  'Neither follows'
                ],
                correctIndex: 1,
                explanation: 'Mathematicians overlap with coders, so some mathematicians are definitely coders (II follows). However, there is no guarantee that this overlap intersects with hunters (I does not necessarily follow).',
                hint: 'Draw Venn circles: coders contain hunters, and mathematicians overlap with coders.',
                difficulty: 'Novice',
                xpReward: 90,
                coinReward: 25
              },
              {
                id: 'rea-102',
                title: 'Direction & Coordinates',
                prompt: 'A player walks 20m North, turns Right and walks 30m, then turns Right and walks 35m, then turns Left and walks 15m. What is their final direction from the starting point?',
                options: ['South-East', 'North-East', 'South-West', 'North-West'],
                correctIndex: 0,
                explanation: 'Y-coordinate: +20 - 35 = -15m (South). X-coordinate: +30 + 15 = +45m (East). Net vector is South-East.',
                hint: 'Keep track of X (East/West) and Y (North/South) displacements.',
                difficulty: 'Adept',
                xpReward: 90,
                coinReward: 30
              },
              {
                id: 'rea-103',
                title: 'Sequence Missing Element',
                prompt: 'Find the missing number in the sequence: 4, 9, 25, 49, 121, 169, ?',
                options: [
                  '361',
                  '225',
                  '196',
                  '289'
                ],
                correctIndex: 3,
                explanation: 'These are squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2=169. The next prime is 17, and 17^2 = 289.',
                hint: 'Look at the square roots: 2, 3, 5, 7, 11, 13... What kind of numbers are they?',
                difficulty: 'Master',
                xpReward: 90,
                coinReward: 30
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript & JS',
    tagline: 'Fullstack web apps',
    description: 'Conquer interactive DOM manipulation, asynchronous promises, event loop phases, and modern browser APIs.',
    category: ['All tracks', 'Web & fullstack', 'Most popular'],
    badgeTag: 'MOST PLAYED',
    color: '#EAB308',
    accentBg: 'rgba(234, 179, 8, 0.1)',
    iconName: 'Code',
    totalQuests: 10,
    levelRequired: 1,
    bgGradient: 'from-yellow-500/20 via-yellow-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Asynchronous Concurrency & Closures',
        description: 'Microtasks, event queues, and functional encapsulation.',
        quests: [
          {
            id: 'js-q1',
            trackId: 'javascript',
            chapterNumber: 1,
            title: 'The Event Loop Order',
            description: 'Trace setTimeout vs Promise microtask queue resolution.',
            estimatedMinutes: 5,
            requiredLevel: 1,
            xpTotal: 250,
            coinsTotal: 75,
            badgeUnlock: 'Async Sorcerer',
            questions: [
              {
                id: 'js-101',
                title: 'Microtask vs Macrotask',
                prompt: 'In what exact order will the numbers be logged to console in standard JavaScript runtime?',
                codeSnippet: 'console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);',
                language: 'javascript',
                options: [
                  '1, 3, 4, 2',
                  '1, 2, 3, 4',
                  '1, 4, 3, 2',
                  '1, 4, 2, 3'
                ],
                correctIndex: 2,
                explanation: 'Synchronous code runs first (1, 4). Microtask queue (Promise .then) runs before macrotask queue (setTimeout callback), giving 3 then 2.',
                hint: 'Synchronous code executes first, then microtasks (promises), then macrotasks (timers).',
                difficulty: 'Adept',
                xpReward: 85,
                coinReward: 25
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'java',
    name: 'Java 21',
    tagline: 'Object-oriented quests',
    description: 'Enterprise design patterns, virtual threads, JVM garbage collection tuning, and resilient microservices.',
    category: ['All tracks', 'Systems & low-level'],
    badgeTag: 'LEAGUE READY',
    color: '#EF4444',
    accentBg: 'rgba(239, 68, 68, 0.1)',
    iconName: 'Coffee',
    totalQuests: 8,
    levelRequired: 2,
    bgGradient: 'from-rose-500/20 via-rose-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Modern Java & Concurrency',
        description: 'Records, Pattern Matching, and Virtual Threads.',
        quests: [
          {
            id: 'java-q1',
            trackId: 'java',
            chapterNumber: 1,
            title: 'Virtual Threads in Project Loom',
            description: 'Understand lightweight M:N virtual threading in Java 21.',
            estimatedMinutes: 6,
            requiredLevel: 2,
            xpTotal: 280,
            coinsTotal: 80,
            questions: [
              {
                id: 'java-101',
                title: 'Virtual Threads Memory Footprint',
                prompt: 'Why can a single Java 21 JVM spawn 1,000,000 virtual threads without exhausting OS memory?',
                language: 'java',
                options: [
                  'They compress Java bytecode into shared RAM registers',
                  'Virtual threads are managed in JVM heap memory and do not allocate dedicated OS kernel call stacks',
                  'They bypass garbage collection completely',
                  'They run exclusively inside GPU shaders'
                ],
                correctIndex: 1,
                explanation: 'Virtual threads are lightweight user-mode threads scheduled by the JVM onto carrier OS threads. Their stack memory expands dynamically in heap memory.',
                hint: 'Traditional platform threads consume ~1MB OS stack each, while virtual threads live in the heap.',
                difficulty: 'Master',
                xpReward: 95,
                coinReward: 30
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C & C++',
    tagline: 'Memory & game engines',
    description: 'Direct memory pointers, cache locality, RAII, move semantics, and ultra-high-speed game engine architecture.',
    category: ['All tracks', 'Systems & low-level'],
    badgeTag: 'HARDCORE SPEED',
    color: '#6366F1',
    accentBg: 'rgba(99, 102, 241, 0.1)',
    iconName: 'Cpu',
    totalQuests: 8,
    levelRequired: 2,
    bgGradient: 'from-indigo-500/20 via-indigo-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Pointers & Cache Locality',
        description: 'Stack vs Heap allocation and spatial memory access.',
        quests: [
          {
            id: 'cpp-q1',
            trackId: 'cpp',
            chapterNumber: 1,
            title: 'Cache Hits & Struct of Arrays',
            description: 'Optimize CPU L1/L2 cache prefetching.',
            estimatedMinutes: 7,
            requiredLevel: 2,
            xpTotal: 300,
            coinsTotal: 90,
            questions: [
              {
                id: 'cpp-101',
                title: 'Memory Pointer Arithmetic',
                prompt: 'What does `*(arr + 3)` evaluate to if `int arr[] = {10, 20, 30, 40, 50};`?',
                language: 'cpp',
                options: [
                  'Address of index 3',
                  '30',
                  '50',
                  '40'
                ],
                correctIndex: 3,
                explanation: 'arr decays to pointer to arr[0]. Adding 3 offsets by 3 * sizeof(int), pointing to arr[3], which dereferences to 40.',
                hint: 'Index 0 is 10, index 1 is 20, index 2 is 30, index 3 is 40.',
                difficulty: 'Adept',
                xpReward: 100,
                coinReward: 30
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'rust',
    name: 'Rust',
    tagline: 'Safety & web assembly',
    description: 'Master compiler borrow checker rules, zero-cost abstractions, fearless concurrency, and WebAssembly compilation.',
    category: ['All tracks', 'Systems & low-level'],
    badgeTag: 'RISING STAR',
    color: '#F97316',
    accentBg: 'rgba(249, 115, 22, 0.1)',
    iconName: 'ShieldAlert',
    totalQuests: 8,
    levelRequired: 3,
    bgGradient: 'from-orange-500/20 via-orange-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Ownership & Lifetimes',
        description: 'Borrow rules, mutable aliasing, and RAII safety.',
        quests: [
          {
            id: 'rust-q1',
            trackId: 'rust',
            chapterNumber: 1,
            title: 'Borrowing Invariants',
            description: 'Enforce single mutable reference or multiple immutable references.',
            estimatedMinutes: 6,
            requiredLevel: 3,
            xpTotal: 320,
            coinsTotal: 95,
            questions: [
              {
                id: 'rust-101',
                title: 'Rust Ownership Transfer',
                prompt: 'Why does this Rust code fail to compile?',
                codeSnippet: 'let s1 = String::from("VaultX");\nlet s2 = s1;\nprintln!("{}", s1);',
                language: 'rust',
                options: [
                  's1 was moved to s2; s1 is invalidated to prevent double-free errors',
                  'Strings cannot be assigned without using the ref keyword',
                  'println! only accepts string literals &str',
                  's1 was deallocated immediately upon assignment'
                ],
                correctIndex: 0,
                explanation: 'Rust String does not implement Copy trait. Assignment transfers ownership (move). Reading s1 causes borrow of moved value.',
                hint: 'Rust moves heap-allocated types by default to guarantee single ownership.',
                difficulty: 'Master',
                xpReward: 110,
                coinReward: 35
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    tagline: 'Microservices & APIs',
    description: 'Deploy lightning-fast REST and gRPC services with channels, concurrent Goroutines, and lightweight runtime garbage collection.',
    category: ['All tracks', 'Web & fullstack'],
    badgeTag: 'CLOUD FAVORITE',
    color: '#06B6D4',
    accentBg: 'rgba(6, 182, 212, 0.1)',
    iconName: 'Server',
    totalQuests: 8,
    levelRequired: 2,
    bgGradient: 'from-cyan-500/20 via-cyan-950/40 to-slate-950',
    chapters: [
      {
        title: 'Chapter 1: Goroutines & Channels',
        description: 'CSP concurrency model and deadlock avoidance.',
        quests: [
          {
            id: 'go-q1',
            trackId: 'golang',
            chapterNumber: 1,
            title: 'Channel Deadlock Prevention',
            description: 'Buffered vs unbuffered channel communication.',
            estimatedMinutes: 6,
            requiredLevel: 2,
            xpTotal: 290,
            coinsTotal: 85,
            questions: [
              {
                id: 'go-101',
                title: 'Unbuffered Channel Blocking',
                prompt: 'What happens when sending to an unbuffered channel without an active receiver in Go?',
                codeSnippet: 'ch := make(chan int)\nch <- 42\nfmt.Println("Sent")',
                language: 'go',
                options: [
                  'Buffers up to 64 items silently',
                  'Discards the value and prints "Sent"',
                  'Panics with "fatal error: all goroutines are asleep - deadlock!"',
                  'Automatically spawns a background consumer'
                ],
                correctIndex: 2,
                explanation: 'Sending to an unbuffered channel blocks until another goroutine is ready to receive. In single-threaded execution, this blocks the main routine forever, triggering a runtime deadlock panic.',
                hint: 'Unbuffered channels require both sender and receiver to synchronize simultaneously.',
                difficulty: 'Adept',
                xpReward: 95,
                coinReward: 30
              }
            ]
          }
        ]
      }
    ]
  }
];

export const BOSS_ENCOUNTERS: BossEntity[] = [
  {
    id: 'boss-runtime-dragon',
    name: 'The Volatility & Runtime Behemoth',
    title: 'Trial of the Master Hunter',
    maxHp: 300,
    currentHp: 300,
    attackPower: 35,
    turnTimeSeconds: 45,
    description: 'An ancient sentient entity born from algorithmic crashes and financial market swings. Solve rapid-fire quant and code challenges before the countdown expires to deal devastating critical strikes!',
    lootReward: {
      xp: 800,
      coins: 350,
      itemReward: 'Dragon Core Matrix'
    },
    questions: [
      {
        id: 'boss-1',
        title: 'Phase 1: Algorithmic Complexity Strike',
        prompt: 'What is the tightest Big-O time complexity of querying an item in a balanced Red-Black Tree vs an unindexed array?',
        options: [
                  'O(1) vs O(log N)',
                  'O(log N) vs O(N)',
                  'O(N) vs O(N^2)',
                  'O(log N) vs O(1)'
                ],
                correctIndex: 1,
        explanation: 'Balanced BSTs maintain maximum tree height of 2 * log(N+1), yielding guaranteed O(log N) search, while an unsorted array requires O(N) linear scan.',
        hint: 'Binary trees divide search space in half at each step.',
        difficulty: 'Adept',
        xpReward: 150,
        coinReward: 50
      },
      {
        id: 'boss-2',
        title: 'Phase 2: Quantitative Sharpe Ratio Defense',
        prompt: 'If Portfolio Alpha has an annualized return of 18%, risk-free rate is 3%, and standard deviation is 15%, what is its Sharpe Ratio?',
        options: [
                  '1.5',
                  '1.2',
                  '0.8',
                  '1.0'
                ],
                correctIndex: 3,
        explanation: 'Sharpe Ratio = (Return - RiskFree) / StdDev = (18 - 3) / 15 = 15 / 15 = 1.0.',
        hint: 'Subtract risk-free rate from return, then divide by volatility.',
        difficulty: 'Master',
        xpReward: 200,
        coinReward: 75
      },
      {
        id: 'boss-3',
        title: 'Phase 3: Concurrency Race Condition Slay',
        prompt: 'Which mechanism prevents two concurrent bank withdrawal transactions from overdrafting a single account simultaneously?',
        options: [
                  'Increasing CPU clock speed',
                  'Client-side JavaScript throttle',
                  'Atomic Mutex / Database Row Locking with ACID isolation',
                  'Converting the database to CSV format'
                ],
                correctIndex: 2,
        explanation: 'Mutex locks or serialized database transactions guarantee atomic read-modify-write operations to prevent race condition double-spends.',
        hint: 'Think about database ACID transactions and mutual exclusion.',
        difficulty: 'Master',
        xpReward: 250,
        coinReward: 100
      }
    ]
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    gamertag: 'uchibatobi',
    name: 'Sarthak Singh',
    xp: 6850,
    level: 14,
    streak: 18,
    league: 'Diamond',
    avatar: '⚡',
    college: 'IMS Engineering College (AIML)'
  },
  {
    rank: 2,
    gamertag: 'quantum_coder',
    name: 'Shivansh Soam',
    xp: 6240,
    level: 13,
    streak: 14,
    league: 'Diamond',
    avatar: '🚀',
    college: 'IMS Engineering College (AIML)'
  },
  {
    rank: 3,
    gamertag: 'neo_hunter',
    name: 'Vyom Singhal',
    xp: 5890,
    level: 12,
    streak: 12,
    league: 'Platinum',
    avatar: '🛡️',
    college: 'IMS Engineering College (AIML)'
  },
  {
    rank: 4,
    gamertag: 'algo_knight',
    name: 'Uttkarsh Goel',
    xp: 5410,
    level: 11,
    streak: 10,
    league: 'Platinum',
    avatar: '⚔️',
    college: 'IMS Engineering College (AIML)'
  },
  {
    rank: 5,
    gamertag: 'cypher_dev',
    name: 'Aanya Sharma',
    xp: 4950,
    level: 10,
    streak: 9,
    league: 'Gold',
    avatar: '🔮',
    college: 'AKTU Lucknow'
  },
  {
    rank: 6,
    gamertag: 'shadow_trader',
    name: 'Rohan Verma',
    xp: 4320,
    level: 9,
    streak: 7,
    league: 'Gold',
    avatar: '🦅',
    college: 'AKTU Lucknow'
  }
];
