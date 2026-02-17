'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'radar';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-white/5 text-neutral-400 border border-white/5',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    info: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    radar: 'bg-radar-500/10 text-radar-400 border border-radar-500/20',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wider uppercase font-semibold',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  return (
    <span className={`inline-flex items-center rounded-md ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
