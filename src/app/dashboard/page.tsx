'use client';

import { useState, useEffect } from 'react';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { ScoreCards } from '@/components/dashboard/ScoreCards';
import { SkillGapCard } from '@/components/dashboard/SkillGapCard';
import { TrendingSkillsCard } from '@/components/dashboard/TrendingSkillsCard';
import { LearningPlanCard } from '@/components/dashboard/LearningPlanCard';
import { WeatherReportCard } from '@/components/dashboard/WeatherReportCard';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { useAppStore } from '@/store/app-store';
import {
  generateMockAnalysis,
  generateMockLearningPlan,
  generateMockWeatherReport,
  mockUserProfile,
} from '@/lib/mock-data';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    user,
    analysis,
    learningPlan,
    weatherReport,
    setUser,
    setAnalysis,
    setLearningPlan,
    setWeatherReport,
    setAuthenticated,
  } = useAppStore();

  useEffect(() => {
    if (!analysis) {
      const skills = mockUserProfile.skills.map((s) => s.name);
      const mockAnalysis = generateMockAnalysis(mockUserProfile.currentRole, skills);
      setAnalysis(mockAnalysis);
      setLearningPlan(generateMockLearningPlan(mockAnalysis.topGaps.map((g) => g.skill)));
      setWeatherReport(generateMockWeatherReport(mockUserProfile.currentRole, mockUserProfile.location));
      setUser(mockUserProfile);
      setAuthenticated(true);
    }
  }, [analysis, setAnalysis, setLearningPlan, setWeatherReport, setUser, setAuthenticated]);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-surface-0 flex items-center justify-center">
        <div className="animate-spin w-6 h-6 border-2 border-radar-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-0">
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-white">
                Your Skill Radar
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                {user?.currentRole || 'Software Engineer'} &middot;{' '}
                {user?.location || 'San Francisco, CA'}
              </p>
            </div>

            <ScoreCards analysis={analysis} />

            <div className="grid lg:grid-cols-2 gap-4">
              <SkillGapCard gaps={analysis.topGaps} />
              <TrendingSkillsCard
                rising={analysis.risingSkills}
                declining={analysis.decliningSkills}
              />
            </div>

            {learningPlan && <LearningPlanCard plan={learningPlan} />}
          </div>
        )}

        {/* Learning Tab */}
        {activeTab === 'learning' && learningPlan && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-white">Learning Plan</h1>
              <p className="text-xs text-neutral-500 mt-1">
                15 minutes per day to close your skill gaps
              </p>
            </div>
            <LearningPlanCard plan={learningPlan} />
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && weatherReport && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
              <h1 className="text-xl font-bold text-white">Career Weather</h1>
              <p className="text-xs text-neutral-500 mt-1">
                Weekly career intelligence briefing
              </p>
            </div>
            <WeatherReportCard report={weatherReport} />
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && user && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-white">Profile</h1>
              <p className="text-xs text-neutral-500 mt-1">
                Your skills and career information
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <ProfileCard user={user} />
              <div>
                {analysis && <ScoreCards analysis={analysis} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
