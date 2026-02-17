'use client';

import { BookOpen, Check, Clock, ExternalLink, Flame, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LearningPlan } from '@/types';
import { useAppStore } from '@/store/app-store';

interface LearningPlanCardProps {
  plan: LearningPlan;
}

export function LearningPlanCard({ plan }: LearningPlanCardProps) {
  const { completeModule } = useAppStore();
  const currentModule = plan.modules[plan.currentModuleIndex >= 0 ? plan.currentModuleIndex : 0];
  const progress = plan.modules.length > 0
    ? Math.round((plan.completedModules / plan.modules.length) * 100)
    : 0;

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-radar-400" />
          <div>
            <h3 className="text-sm font-semibold text-white">Daily Learning Plan</h3>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              {plan.targetSkills.join(' / ')}
            </p>
          </div>
        </div>

        {plan.streakDays > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
            <Flame className="w-3 h-3 text-amber-400" />
            <span className="text-[11px] font-semibold text-amber-400 tabular-nums">
              {plan.streakDays}d
            </span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-[11px] mb-1.5">
          <span className="text-neutral-500">
            {plan.completedModules}/{plan.modules.length} lessons
          </span>
          <span className="text-white font-semibold tabular-nums">{progress}%</span>
        </div>
        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-radar-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Today's Module */}
      {currentModule && (
        <div className="p-4 rounded-lg bg-radar-500/[0.04] border border-radar-500/10 mb-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Badge variant="radar">Today</Badge>
            <span className="text-[10px] text-neutral-600 font-mono">Day {currentModule.dayNumber}</span>
          </div>

          <h4 className="text-sm font-medium text-white mb-1">
            {currentModule.title}
          </h4>
          <p className="text-xs text-neutral-500 mb-3 leading-relaxed">
            {currentModule.description}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-neutral-600 mb-3">
            <Clock className="w-3 h-3" />
            <span>{currentModule.estimatedMinutes} min</span>
          </div>

          {/* Resources */}
          <div className="space-y-1.5 mb-3">
            {currentModule.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-md bg-surface-1/80 hover:bg-surface-3 border border-transparent hover:border-white/[0.06] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-surface-4 flex items-center justify-center">
                    <Play className="w-3 h-3 text-neutral-400 group-hover:text-radar-400 transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-200 group-hover:text-white transition-colors block">
                      {resource.title}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-600">
                      <span>{resource.source}</span>
                      <span className="text-neutral-700">/</span>
                      <span>{resource.duration}</span>
                      {resource.isFree && (
                        <span className="text-radar-600">Free</span>
                      )}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-700 group-hover:text-radar-400 transition-colors" />
              </a>
            ))}
          </div>

          <Button
            onClick={() => completeModule(currentModule.id)}
            size="sm"
            className="w-full"
          >
            <Check className="w-3.5 h-3.5" />
            Complete Lesson
          </Button>
        </div>
      )}

      {/* Upcoming */}
      <div>
        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold mb-2">
          Coming up
        </div>
        <div className="space-y-1">
          {plan.modules
            .filter((m) => !m.completed && m.id !== currentModule?.id)
            .slice(0, 3)
            .map((module, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 px-2.5 rounded-md bg-surface-1/40"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-neutral-700 font-mono w-6 tabular-nums">
                    D{module.dayNumber}
                  </span>
                  <span className="text-[11px] text-neutral-500">{module.title}</span>
                </div>
                <span className="text-[10px] text-neutral-700 font-mono">
                  {module.estimatedMinutes}m
                </span>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
}
