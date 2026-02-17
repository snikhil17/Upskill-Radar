'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer';

  const variantClasses = {
    primary:
      'bg-radar-500 text-surface-0 hover:bg-radar-400 focus:ring-radar-500/50 shadow-lg shadow-radar-500/20 hover:shadow-radar-400/30 font-semibold',
    secondary:
      'bg-surface-3 text-neutral-200 hover:bg-surface-4 focus:ring-neutral-500/30 border border-white/5',
    outline:
      'border border-white/10 text-neutral-300 hover:bg-white/5 hover:border-white/20 focus:ring-white/20',
    ghost: 'text-neutral-400 hover:text-white hover:bg-white/5 focus:ring-white/20',
    danger:
      'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 focus:ring-red-500/30',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
