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
    label: 'Sunny',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    description: 'Strong market conditions for your role',
  },
  'partly-cloudy': {
    icon: CloudSun,
    label: 'Partly Cloudy',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    description: 'Good conditions with some areas to watch',
  },
  cloudy: {
    icon: Cloud,
    label: 'Cloudy',
    color: 'text-slate-400',
    bg: 'bg-slate-500/20',
    description: 'Mixed signals - upskilling recommended',
  },
  stormy: {
    icon: CloudLightning,
    label: 'Stormy',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    description: 'Significant disruption ahead - action needed',
  },
};

export function WeatherReportCard({ report }: WeatherReportCardProps) {
  const outlook = outlookConfig[report.overallOutlook];
  const OutlookIcon = outlook.icon;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          Career Weather Report
        </h3>
        <span className="text-xs text-slate-500">{report.period}</span>
      </div>

      {/* Weather outlook */}
      <div className={`p-4 rounded-xl ${outlook.bg} mb-6`}>
        <div className="flex items-center gap-3 mb-2">
          <OutlookIcon className={`w-8 h-8 ${outlook.color}`} />
          <div>
            <h4 className={`text-lg font-bold ${outlook.color}`}>
              {outlook.label}
            </h4>
            <p className="text-sm text-slate-400">{outlook.description}</p>
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-xl bg-slate-900/50">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Open Positions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              {report.roleHealth.openPositions.toLocaleString()}
            </span>
            <span
              className={`text-xs font-medium ${
                report.roleHealth.positionsTrend > 0
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }`}
            >
              {report.roleHealth.positionsTrend > 0 ? '+' : ''}
              {report.roleHealth.positionsTrend}%
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/50">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Salary Range</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              {report.competitorActivity.averageSalary}
            </span>
            {report.competitorActivity.salaryTrend === 'up' && (
              <TrendingUp className="w-3 h-3 text-emerald-400" />
            )}
          </div>
        </div>
      </div>

      {/* Automation risk */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white">
              Automation Risk
            </span>
          </div>
          <Badge
            variant={
              report.automationRisk.score > 50
                ? 'danger'
                : report.automationRisk.score > 30
                  ? 'warning'
                  : 'success'
            }
          >
            {report.automationRisk.score}%
          </Badge>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              report.automationRisk.score > 50
                ? 'bg-red-500'
                : report.automationRisk.score > 30
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
            }`}
            style={{ width: `${report.automationRisk.score}%` }}
          />
        </div>
        <div className="space-y-1">
          {report.automationRisk.signals.slice(0, 2).map((signal, i) => (
            <p key={i} className="text-xs text-slate-500">
              &bull; {signal}
            </p>
          ))}
        </div>
      </div>

      {/* Companies hiring */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Building className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-white">
            Top Companies Hiring
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {report.competitorActivity.companiesHiring.map((company, i) => (
            <Badge key={i} variant="default" size="sm">
              {company}
            </Badge>
          ))}
        </div>
      </div>

      {/* New roles emerging */}
      <div className="mb-6">
        <span className="text-sm font-medium text-white mb-3 block">
          New Roles Emerging
        </span>
        <div className="flex flex-wrap gap-2">
          {report.competitorActivity.newRolesEmerging.map((role, i) => (
            <Badge key={i} variant="purple" size="sm">
              {role}
            </Badge>
          ))}
        </div>
      </div>

      {/* Weekly insight */}
      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
        <h4 className="text-sm font-semibold text-indigo-400 mb-2">
          Weekly Insight
        </h4>
        <p className="text-sm text-slate-300 leading-relaxed">
          {report.weeklyInsight}
        </p>
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-white mb-3">
          This Week&apos;s Recommendations
        </h4>
        <div className="space-y-2">
          {report.recommendations.map((rec, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-slate-400"
            >
              <span className="text-indigo-400 mt-0.5">&#10003;</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
