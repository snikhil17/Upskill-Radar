'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  glow?: boolean;
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  glow = false,
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={`
        bg-surface-2/80 backdrop-blur-sm rounded-xl border border-white/[0.06]
        ${paddingClasses[padding]}
        ${hover ? 'hover:border-white/[0.12] hover:bg-surface-2 transition-all duration-300' : ''}
        ${glow ? 'radar-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-sm font-semibold text-white tracking-wide ${className}`}>
      {children}
    </h3>
  );
}
