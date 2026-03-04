'use client';

import {
  Sun,
  CloudSun,
  Cloud,
  CloudLightning,
  TrendingUp,
  AlertTriangle,
  Building,
  DollarSign,
  Briefcase,
  Lightbulb,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CareerWeatherReport } from '@/types';

interface WeatherReportCardProps {
  report: CareerWeatherReport;
}

const outlookConfig = {
  sunny: {
    icon: Sun,
    label: 'Clear Skies',
    color: 'text-radar-400',
    bg: 'bg-radar-500/[0.06]',
    border: 'border-radar-500/15',
    description: 'Strong demand, healthy growth',
  },
  'partly-cloudy': {
    icon: CloudSun,
    label: 'Partly Cloudy',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/[0.06]',
    border: 'border-cyan-500/15',
    description: 'Good outlook, some areas to watch',
  },
  cloudy: {
    icon: Cloud,
    label: 'Overcast',
    color: 'text-neutral-400',
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08]',
    description: 'Mixed signals, upskilling critical',
  },
  stormy: {
    icon: CloudLightning,
    label: 'Storm Warning',
    color: 'text-red-400',
    bg: 'bg-red-500/[0.06]',
    border: 'border-red-500/15',
    description: 'Major disruption, act now',
  },
};

export function WeatherReportCard({ report }: WeatherReportCardProps) {
  const outlook = outlookConfig[report.overallOutlook];
  const OutlookIcon = outlook.icon;

  return (
    <div className="space-y-3">
      {/* Weather Outlook */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Career Weather</h3>
          </div>
          <span className="text-[10px] text-neutral-600 font-mono">{report.period}</span>
        </div>

        <div className={`p-4 rounded-lg ${outlook.bg} border ${outlook.border} mb-5`}>
          <div className="flex items-center gap-3">
            <OutlookIcon className={`w-10 h-10 ${outlook.color}`} />
            <div>
              <h4 className={`text-lg font-bold ${outlook.color}`}>{outlook.label}</h4>
              <p className="text-xs text-neutral-500">{outlook.description}</p>
            </div>
          </div>
        </div>

        {/* Key metrics row */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="p-3 rounded-lg bg-surface-1/60">
            <div className="flex items-center gap-1.5 mb-1">
              <Briefcase className="w-3 h-3 text-neutral-600" />
              <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Open Roles</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-white tabular-nums">
                {report.roleHealth.openPositions.toLocaleString()}
              </span>
              <span className={`text-[11px] font-semibold tabular-nums ${
                report.roleHealth.positionsTrend > 0 ? 'text-radar-400' : 'text-red-400'
              }`}>
                {report.roleHealth.positionsTrend > 0 ? '+' : ''}{report.roleHealth.positionsTrend}%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-1/60">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="w-3 h-3 text-neutral-600" />
              <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Salary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white">{report.competitorActivity.averageSalary}</span>
              {report.competitorActivity.salaryTrend === 'up' && (
                <TrendingUp className="w-3 h-3 text-radar-400" />
              )}
            </div>
          </div>
        </div>

        {/* Automation Risk */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-neutral-300">Automation Risk</span>
            </div>
            <span className={`text-xs font-bold tabular-nums ${
              report.automationRisk.score > 50 ? 'text-red-400'
                : report.automationRisk.score > 30 ? 'text-amber-400'
                  : 'text-radar-400'
            }`}>
              {report.automationRisk.score}%
            </span>
          </div>
          <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden mb-2.5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                report.automationRisk.score > 50 ? 'bg-red-500'
                  : report.automationRisk.score > 30 ? 'bg-amber-500'
                    : 'bg-radar-500'
              }`}
              style={{ width: `${report.automationRisk.score}%` }}
            />
          </div>
          <div className="space-y-1">
            {report.automationRisk.signals.slice(0, 2).map((signal, i) => (
              <p key={i} className="text-[11px] text-neutral-600 leading-relaxed pl-2 border-l border-white/[0.06]">
                {signal}
              </p>
            ))}
          </div>
        </div>

        {/* Companies & Roles */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Building className="w-3 h-3 text-neutral-600" />
              <span className="text-[10px] text-neutral-600 uppercase tracking-wider font-semibold">Hiring</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {report.competitorActivity.companiesHiring.slice(0, 6).map((company, i) => (
                <Badge key={i} variant="default">{company}</Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-neutral-600 uppercase tracking-wider font-semibold mb-2 block">
              New Roles
            </span>
            <div className="flex flex-wrap gap-1">
              {report.competitorActivity.newRolesEmerging.map((role, i) => (
                <Badge key={i} variant="radar">{role}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Insight */}
        <div className="p-3.5 rounded-lg bg-radar-500/[0.04] border border-radar-500/10">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-radar-400" />
            <span className="text-[10px] uppercase tracking-wider text-radar-500 font-semibold">Weekly Insight</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {report.weeklyInsight}
          </p>
        </div>
      </Card>

      {/* Recommendations */}
      <Card>
        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold mb-3">
          Action Items
        </div>
        <div className="space-y-2">
          {report.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs">
              <div className="w-4 h-4 rounded-full bg-radar-500/10 border border-radar-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[9px] text-radar-400 font-bold">{i + 1}</span>
              </div>
              <span className="text-neutral-400 leading-relaxed">{rec}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
