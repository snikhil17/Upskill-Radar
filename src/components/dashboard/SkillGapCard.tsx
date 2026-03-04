'use client';

import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SkillGap } from '@/types';

interface SkillGapCardProps {
  gaps: SkillGap[];
}

export function SkillGapCard({ gaps }: SkillGapCardProps) {
  const priorityConfig = {
    critical: { variant: 'danger' as const, label: 'Critical' },
    high: { variant: 'warning' as const, label: 'High' },
    medium: { variant: 'info' as const, label: 'Medium' },
    low: { variant: 'default' as const, label: 'Low' },
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Skill Gaps</h3>
        </div>
        <Badge variant="danger">{gaps.length} found</Badge>
      </div>

      <div className="space-y-2">
        {gaps.map((gap, index) => {
          const config = priorityConfig[gap.priority];

          return (
            <div
              key={index}
              className="p-3.5 rounded-lg bg-surface-1/80 border border-white/[0.04] hover:border-white/[0.08] transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radar-400 group-hover:animate-pulse" />
                  <h4 className="text-sm font-medium text-white">{gap.skill}</h4>
                </div>
                <Badge variant={config.variant}>{config.label}</Badge>
              </div>

              <p className="text-xs text-neutral-500 mb-3 leading-relaxed pl-3.5">{gap.reason}</p>

              <div className="flex items-center gap-4 text-[11px] pl-3.5">
                <div className="flex items-center gap-1">
                  <span className="text-neutral-600">Demand</span>
                  <span className="text-white font-semibold tabular-nums">{gap.demandScore}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className={`w-3 h-3 ${gap.growthRate > 50 ? 'text-radar-400' : 'text-amber-400'}`} />
                  <span className={`font-semibold tabular-nums ${gap.growthRate > 50 ? 'text-radar-400' : 'text-amber-400'}`}>
                    +{gap.growthRate}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-neutral-600">Level</span>
                  <span className="text-neutral-300 capitalize">{gap.requiredLevel}</span>
                </div>
              </div>

              <div className="mt-2.5 pl-3.5">
                <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-radar-500 to-cyan-500 transition-all duration-1000"
                    style={{ width: `${gap.demandScore}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
