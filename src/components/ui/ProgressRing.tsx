'use client';

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = '#6366f1',
  label,
  sublabel,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 75) return '#22c55e';
    if (value >= 50) return '#eab308';
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
            stroke="#1e293b"
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
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{value}</span>
          {sublabel && (
            <span className="text-xs text-slate-400">{sublabel}</span>
          )}
        </div>
      </div>
      {label && (
        <span className="mt-2 text-sm font-medium text-slate-300">{label}</span>
      )}
    </div>
  );
}
