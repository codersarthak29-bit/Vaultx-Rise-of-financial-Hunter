import React from 'react';

interface VaultXLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  glow?: boolean;
}

export const VaultXLogo: React.FC<VaultXLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  glow = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Insignia */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        {glow && (
          <div className="absolute inset-0 bg-emerald-500/25 rounded-xl blur-md pointer-events-none transition-all" />
        )}
        
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(16,185,129,0.4)]"
        >
          <defs>
            <linearGradient id="vxLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="vxGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Outer Cybernetic Octagon/Vault Shield */}
          <polygon
            points="50,4 82,16 96,50 82,84 50,96 18,84 4,50 18,16"
            fill="#090D16"
            stroke="url(#vxLogoGradient)"
            strokeWidth="4"
          />

          {/* Inner Vault Ring */}
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="url(#vxLogoGradient)"
            strokeWidth="2"
            strokeDasharray="16 6"
            opacity="0.6"
          />

          {/* V - Stylized Sharp Chevron */}
          <path
            d="M30 32 L50 68 L70 32"
            fill="none"
            stroke="url(#vxLogoGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X - Intersecting Hunter Cross Blades */}
          <line
            x1="36"
            y1="64"
            x2="64"
            y2="36"
            stroke="url(#vxGoldGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="36"
            x2="64"
            y2="64"
            stroke="url(#vxGoldGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Central Core Power Gem */}
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-white ${textSizes[size]}`}>
              Vault<span className="text-emerald-400">X</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded">
              RPG
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
            Rise of Financial Hunter
          </span>
        </div>
      )}
    </div>
  );
};
