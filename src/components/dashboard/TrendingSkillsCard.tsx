'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
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
      <h3 className="text-lg font-semibold text-white mb-6">Skill Trends</h3>

      {/* Rising Skills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">Rising in Demand</span>
        </div>

        <div className="space-y-2">
          {rising.slice(0, 6).map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-4">
                  {index + 1}.
                </span>
                <span className="text-sm text-white">{skill.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success" size="sm">
                  +{skill.growthRate}%
                </Badge>
                <span className="text-xs text-slate-500 w-20 text-right">
                  {skill.timeToLearn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Declining Skills */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium text-red-400">Declining</span>
        </div>

        <div className="space-y-2">
          {declining.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/30"
            >
              <span className="text-sm text-slate-400">{skill.name}</span>
              <Badge variant="danger" size="sm">
                {skill.growthRate}%
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
