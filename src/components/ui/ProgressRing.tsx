'use client';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  value,
  size = 100,
  strokeWidth = 6,
  color = '#00e06f',
  label,
  sublabel,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 70) return '#00e06f';
    if (value >= 45) return '#eab308';
    if (value >= 25) return '#f97316';
    return '#ef4444';
  };

  const ringColor = color === 'auto' ? getColor() : color;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${ringColor}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white tabular-nums">{value}</span>
          {sublabel && (
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{sublabel}</span>
          )}
        </div>
      </div>
      {label && (
        <span className="mt-2 text-xs font-medium text-neutral-400">{label}</span>
      )}
    </div>
  );
}
