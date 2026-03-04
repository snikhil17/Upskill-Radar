'use client';

import { TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingSkill } from '@/types';

interface TrendingSkillsCardProps {
  rising: TrendingSkill[];
  declining: TrendingSkill[];
}

export function TrendingSkillsCard({ rising, declining }: TrendingSkillsCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-4 h-4 text-radar-400" />
        <h3 className="text-sm font-semibold text-white">Skill Trends</h3>
      </div>

      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-widest text-radar-500 font-semibold mb-2.5">
          Rising demand
        </div>
        <div className="space-y-1">
          {rising.slice(0, 6).map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-md bg-surface-1/60 hover:bg-surface-1 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] text-neutral-600 font-mono w-4 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-neutral-200">{skill.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Badge variant="success">
                  +{skill.growthRate}%
                </Badge>
                <span className="text-[10px] text-neutral-600 w-16 text-right font-mono">
                  {skill.timeToLearn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-red-500 font-semibold mb-2.5">
          Declining
        </div>
        <div className="space-y-1">
          {declining.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-md bg-surface-1/40"
            >
              <span className="text-xs text-neutral-500">{skill.name}</span>
              <Badge variant="danger">
                {skill.growthRate}%
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
