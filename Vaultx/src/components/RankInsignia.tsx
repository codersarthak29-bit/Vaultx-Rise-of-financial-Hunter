import React from 'react';
import { HunterRank } from '../data/ranksData';

interface RankInsigniaProps {
  rank: HunterRank;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
}

export const RankInsignia: React.FC<RankInsigniaProps> = ({
  rank,
  size = 'md',
  showGlow = true,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-32 h-32 text-3xl'
  };

  const getRankShape = (iconName: string) => {
    switch (iconName) {
      case 'spark':
        return (
          <path
            d="M50 15 L58 40 L85 50 L58 60 L50 85 L42 60 L15 50 L42 40 Z"
            fill="currentColor"
            opacity="0.95"
          />
        );
      case 'scroll':
        return (
          <g fill="currentColor">
            <rect x="25" y="25" width="50" height="50" rx="6" opacity="0.4" />
            <path d="M35 38 H65 M35 50 H65 M35 62 H55" stroke="white" strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      case 'knot':
        return (
          <path
            d="M50 20 C65 20 75 35 75 50 C75 65 65 80 50 80 C35 80 25 65 25 50 C25 35 35 20 50 20 Z M50 35 C42 35 37 42 37 50 C37 58 42 65 50 65 C58 65 63 58 63 50 C63 42 58 35 50 35 Z"
            fill="currentColor"
          />
        );
      case 'compass':
        return (
          <g fill="currentColor">
            <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="6" opacity="0.5" />
            <polygon points="50,20 60,50 50,44 40,50" fill="#38BDF8" />
            <polygon points="50,80 60,50 50,56 40,50" fill="#0284C7" />
          </g>
        );
      case 'staff':
        return (
          <g fill="currentColor">
            <circle cx="50" cy="30" r="14" fill="#C084FC" />
            <circle cx="50" cy="30" r="8" fill="#FFFFFF" />
            <line x1="50" y1="44" x2="50" y2="85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="50" r="4" fill="#E9D5FF" />
          </g>
        );
      case 'dagger':
        return (
          <g fill="currentColor">
            <polygon points="50,15 62,55 50,52 38,55" fill="#C084FC" />
            <rect x="34" y="55" width="32" height="6" rx="2" fill="white" />
            <rect x="47" y="61" width="6" height="24" rx="2" fill="currentColor" />
          </g>
        );
      case 'ouroboros':
        return (
          <g fill="currentColor">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="14 4" />
            <polygon points="68,26 80,32 68,38" fill="white" />
          </g>
        );
      case 'cube':
        return (
          <g fill="currentColor">
            <polygon points="50,20 78,35 50,50 22,35" fill="#FB7185" />
            <polygon points="22,35 50,50 50,80 22,65" fill="#E11D48" />
            <polygon points="78,35 50,50 50,80 78,65" fill="#BE123C" />
          </g>
        );
      case 'lightning':
        return (
          <polygon
            points="55,15 25,52 48,52 42,85 75,45 52,45"
            fill="currentColor"
          />
        );
      case 'shield':
        return (
          <path
            d="M50 18 L78 28 C78 55 64 74 50 82 C36 74 22 55 22 28 Z"
            fill="currentColor"
          />
        );
      case 'alchemy':
        return (
          <g fill="currentColor">
            <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="4" />
            <polygon points="50,22 76,68 24,68" fill="none" stroke="currentColor" strokeWidth="5" />
            <circle cx="50" cy="50" r="7" fill="white" />
          </g>
        );
      case 'hourglass':
        return (
          <g fill="currentColor">
            <polygon points="28,24 72,24 50,50" fill="currentColor" opacity="0.8" />
            <polygon points="50,50 72,76 28,76" fill="currentColor" />
            <line x1="24" y1="22" x2="76" y2="22" stroke="white" strokeWidth="5" strokeLinecap="round" />
            <line x1="24" y1="78" x2="76" y2="78" stroke="white" strokeWidth="5" strokeLinecap="round" />
          </g>
        );
      case 'blades':
        return (
          <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
            <line x1="25" y1="25" x2="75" y2="75" />
            <line x1="75" y1="25" x2="25" y2="75" />
            <circle cx="50" cy="50" r="10" fill="#38BDF8" stroke="white" strokeWidth="3" />
          </g>
        );
      case 'pyramid':
        return (
          <g fill="currentColor">
            <polygon points="50,18 80,75 50,68" fill="#818CF8" />
            <polygon points="50,18 20,75 50,68" fill="#4F46E5" />
            <circle cx="50" cy="42" r="6" fill="#FDE047" />
          </g>
        );
      case 'banner':
        return (
          <g fill="currentColor">
            <polygon points="30,20 70,20 70,75 50,60 30,75" fill="currentColor" />
            <circle cx="50" cy="38" r="8" fill="white" />
          </g>
        );
      case 'chain':
        return (
          <g fill="currentColor">
            <rect x="25" y="38" width="50" height="24" rx="12" fill="none" stroke="currentColor" strokeWidth="7" />
            <line x1="50" y1="28" x2="50" y2="72" stroke="#FDA4AF" strokeWidth="6" strokeLinecap="round" />
          </g>
        );
      case 'flame':
        return (
          <path
            d="M50 18 C58 32 72 45 72 62 C72 75 62 84 50 84 C38 84 28 75 28 62 C28 42 45 35 50 18 Z M50 48 C46 54 42 60 42 66 C42 71 45 74 50 74 C55 74 58 71 58 66 C58 62 55 56 50 48 Z"
            fill="currentColor"
          />
        );
      case 'crown':
        return (
          <polygon
            points="24,75 76,75 82,35 62,52 50,25 38,52 18,35"
            fill="currentColor"
          />
        );
      case 'galaxy':
        return (
          <g fill="currentColor">
            <circle cx="50" cy="50" r="16" fill="#67E8F9" />
            <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="currentColor" strokeWidth="5" transform="rotate(-30 50 50)" />
            <circle cx="50" cy="50" r="8" fill="white" />
          </g>
        );
      case 'phoenix':
      default:
        return (
          <g fill="currentColor">
            <path d="M50 15 C54 28 68 34 82 32 C74 44 64 50 54 52 C65 62 76 75 80 85 C66 82 56 72 50 62 C44 72 34 82 20 85 C24 75 35 62 46 52 C36 50 26 44 18 32 C32 34 46 28 50 15 Z" />
            <circle cx="50" cy="40" r="6" fill="#FDE047" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}
      style={{ color: rank.color }}
    >
      {/* Outer Glow Halo */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 transition-all pointer-events-none"
          style={{ backgroundColor: rank.color }}
        />
      )}

      {/* Hexagonal Shield Background */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          <linearGradient id={`grad-${rank.rankNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={rank.color} />
            <stop offset="100%" stopColor={rank.secondaryColor} />
          </linearGradient>
          <filter id={`glow-${rank.rankNumber}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon Border */}
        <polygon
          points="50,3 91,24 91,76 50,97 9,76 9,24"
          fill="#090D16"
          stroke={`url(#grad-${rank.rankNumber})`}
          strokeWidth="4"
        />

        {/* Inner Facet */}
        <polygon
          points="50,9 85,27 85,73 50,91 15,73 15,27"
          fill="#0F172A"
          opacity="0.9"
        />

        {/* Inner Emblem Shape */}
        <g filter={`url(#glow-${rank.rankNumber})`}>
          {getRankShape(rank.iconName)}
        </g>
      </svg>

      {/* Rank Number Badge */}
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 border border-current text-[9px] font-black leading-none shadow">
        {rank.rankNumber}
      </span>
    </div>
  );
};
