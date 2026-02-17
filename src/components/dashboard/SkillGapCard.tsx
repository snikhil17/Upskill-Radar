'use client';

import { TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SkillGap } from '@/types';

interface SkillGapCardProps {
  gaps: SkillGap[];
}

export function SkillGapCard({ gaps }: SkillGapCardProps) {
  const priorityConfig = {
    critical: { variant: 'danger' as const, icon: AlertTriangle, label: 'Critical Gap' },
    high: { variant: 'warning' as const, icon: TrendingUp, label: 'High Priority' },
    medium: { variant: 'info' as const, icon: ArrowUpRight, label: 'Medium' },
    low: { variant: 'default' as const, icon: ArrowUpRight, label: 'Low' },
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Your Top Skill Gaps</h3>
        <Badge variant="danger">{gaps.length} gaps found</Badge>
      </div>

      <div className="space-y-4">
        {gaps.map((gap, index) => {
          const config = priorityConfig[gap.priority];
          const Icon = config.icon;

          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <h4 className="font-semibold text-white">{gap.skill}</h4>
                </div>
                <Badge variant={config.variant} size="sm">
                  {config.label}
                </Badge>
              </div>

              <p className="text-sm text-slate-400 mb-3">{gap.reason}</p>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Demand:</span>
                  <span className="text-white font-medium">{gap.demandScore}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Growth:</span>
                  <span
                    className={`font-medium ${
                      gap.growthRate > 50
                        ? 'text-emerald-400'
                        : gap.growthRate > 0
                          ? 'text-amber-400'
                          : 'text-red-400'
                    }`}
                  >
                    +{gap.growthRate}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Required Level:</span>
                  <span className="text-white font-medium capitalize">
                    {gap.requiredLevel}
                  </span>
                </div>
              </div>

              {/* Demand bar */}
              <div className="mt-3">
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
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
