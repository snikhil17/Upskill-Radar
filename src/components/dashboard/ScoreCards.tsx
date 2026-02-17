'use client';

import { ProgressRing } from '@/components/ui/ProgressRing';
import { Card } from '@/components/ui/Card';
import { SkillGapAnalysis } from '@/types';

interface ScoreCardsProps {
  analysis: SkillGapAnalysis;
}

export function ScoreCards({ analysis }: ScoreCardsProps) {
  const scores = [
    {
      value: analysis.marketFitScore,
      label: 'Market Fit',
      sublabel: '/100',
      description: 'How well your skills match current job market demand',
      color: 'auto',
    },
    {
      value: analysis.promotionReadinessScore,
      label: 'Promotion Ready',
      sublabel: '/100',
      description: 'Your readiness for the next career level',
      color: 'auto',
    },
    {
      value: 100 - analysis.automationRiskScore,
      label: 'AI-Proof Score',
      sublabel: '/100',
      description: 'How resilient your skillset is to AI automation',
      color: 'auto',
    },
    {
      value: analysis.roleHealthScore,
      label: 'Role Health',
      sublabel: '/100',
      description: 'Overall demand and growth outlook for your role',
      color: 'auto',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {scores.map((score, index) => (
        <Card key={index} hover className="flex flex-col items-center text-center">
          <ProgressRing
            value={score.value}
            size={100}
            strokeWidth={7}
            color={score.color}
            sublabel={score.sublabel}
          />
          <h4 className="mt-3 text-sm font-semibold text-white">{score.label}</h4>
          <p className="mt-1 text-xs text-slate-500">{score.description}</p>
        </Card>
      ))}
    </div>
  );
}
