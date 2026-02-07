interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'default' | 'light';
}

export function Logo({ size = 'md', showText = true, variant = 'default' }: LogoProps) {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-sm' },
    md: { icon: 'w-8 h-8', text: 'text-base' },
    lg: { icon: 'w-12 h-12', text: 'text-xl' }
  };

  const dimensions = sizeMap[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground';

  return (
    <div className="flex items-center gap-2.5">
      {/* Logo Icon - Geometric rocket/growth arrow */}
      <div className={`${dimensions.icon} relative flex-shrink-0`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Main rocket/arrow shape */}
          <path
            d="M16 2L24 10L20 10L20 18L24 22L16 30L8 22L12 18L12 10L8 10L16 2Z"
            fill={variant === 'light' ? 'url(#logoGradientLight)' : 'url(#logoGradient)'}
            className="drop-shadow-lg"
          />
          
          {/* Inner highlight */}
          <path
            d="M16 6L20 10L18 10L18 16L20 18L16 22L12 18L14 16L14 10L12 10L16 6Z"
            fill="white"
            fillOpacity="0.3"
          />
          
          {/* Speed lines */}
          <path
            d="M6 12L2 12M6 16L3 16M26 12L30 12M26 16L29 16"
            stroke={variant === 'light' ? 'rgba(255,255,255,0.6)' : 'url(#logoGradient)'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-semibold tracking-tight ${dimensions.text} ${textColor}`}>
            StartupOps
          </span>
        </div>
      )}
    </div>
  );
}
