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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Your 15-Min Daily Plan
            </h3>
            <p className="text-sm text-slate-400">
              {plan.targetSkills.join(', ')}
            </p>
          </div>
        </div>

        {plan.streakDays > 0 && (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">
              {plan.streakDays} day streak
            </span>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">
            {plan.completedModules} of {plan.modules.length} lessons complete
          </span>
          <span className="text-white font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Today's Module */}
      {currentModule && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="purple" size="sm">
              Today&apos;s Lesson
            </Badge>
            <span className="text-xs text-slate-400">Day {currentModule.dayNumber}</span>
          </div>

          <h4 className="text-white font-semibold mb-1">
            {currentModule.title}
          </h4>
          <p className="text-sm text-slate-400 mb-3">
            {currentModule.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Clock className="w-3 h-3" />
            <span>{currentModule.estimatedMinutes} minutes</span>
          </div>

          {/* Resources */}
          <div className="space-y-2 mb-4">
            {currentModule.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Play className="w-3 h-3 text-slate-400" />
                  </div>
                  <div>
                    <span className="text-sm text-white group-hover:text-indigo-400 transition-colors">
                      {resource.title}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{resource.source}</span>
                      <span>·</span>
                      <span>{resource.duration}</span>
                      {resource.isFree && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-400">Free</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </a>
            ))}
          </div>

          <Button
            onClick={() => completeModule(currentModule.id)}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark as Complete
          </Button>
        </div>
      )}

      {/* Upcoming modules */}
      <div>
        <h4 className="text-sm font-medium text-slate-400 mb-3">Coming up</h4>
        <div className="space-y-2">
          {plan.modules
            .filter((m) => !m.completed && m.id !== currentModule?.id)
            .slice(0, 3)
            .map((module, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-8">
                    Day {module.dayNumber}
                  </span>
                  <span className="text-sm text-slate-400">{module.title}</span>
                </div>
                <span className="text-xs text-slate-600">
                  {module.estimatedMinutes}m
                </span>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
}
