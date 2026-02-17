'use client';

import { ProgressRing } from '@/components/ui/ProgressRing';
import { Card } from '@/components/ui/Card';
import { SkillGapAnalysis } from '@/types';
import { Target, TrendingUp, Shield, Activity } from 'lucide-react';

interface ScoreCardsProps {
  analysis: SkillGapAnalysis;
}

export function ScoreCards({ analysis }: ScoreCardsProps) {
  const scores = [
    {
      value: analysis.marketFitScore,
      label: 'Market Fit',
      sublabel: 'score',
      description: 'Skills vs market demand',
      color: 'auto',
      icon: Target,
      iconColor: 'text-radar-400',
    },
    {
      value: analysis.promotionReadinessScore,
      label: 'Promo Ready',
      sublabel: 'score',
      description: 'Next-level readiness',
      color: 'auto',
      icon: TrendingUp,
      iconColor: 'text-cyan-400',
    },
    {
      value: 100 - analysis.automationRiskScore,
      label: 'AI-Proof',
      sublabel: 'score',
      description: 'Automation resilience',
      color: 'auto',
      icon: Shield,
      iconColor: 'text-amber-400',
    },
    {
      value: analysis.roleHealthScore,
      label: 'Role Health',
      sublabel: 'score',
      description: 'Demand outlook',
      color: 'auto',
      icon: Activity,
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {scores.map((score, index) => {
        const Icon = score.icon;
        return (
          <Card key={index} hover padding="sm" className="group">
            <div className="flex items-center justify-between mb-3">
              <Icon className={`w-4 h-4 ${score.iconColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-medium">
                {score.label}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-white tabular-nums">{score.value}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">{score.description}</div>
              </div>
              <ProgressRing
                value={score.value}
                size={44}
                strokeWidth={3}
                color={score.color}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
