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

  // Load demo data if no analysis exists
  useEffect(() => {
    if (!analysis) {
      const skills = mockUserProfile.skills.map((s) => s.name);
      const mockAnalysis = generateMockAnalysis(
        mockUserProfile.currentRole,
        skills
      );
      setAnalysis(mockAnalysis);
      setLearningPlan(
        generateMockLearningPlan(mockAnalysis.topGaps.map((g) => g.skill))
      );
      setWeatherReport(
        generateMockWeatherReport(
          mockUserProfile.currentRole,
          mockUserProfile.location
        )
      );
      setUser(mockUserProfile);
      setAuthenticated(true);
    }
  }, [analysis, setAnalysis, setLearningPlan, setWeatherReport, setUser, setAuthenticated]);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome header */}
            <div>
              <h1 className="text-2xl font-bold text-white">
                Your Skill Radar
              </h1>
              <p className="text-slate-400 mt-1">
                {user?.currentRole || 'Software Engineer'} &middot;{' '}
                {user?.location || 'San Francisco, CA'}
              </p>
            </div>

            {/* Score cards */}
            <ScoreCards analysis={analysis} />

            {/* Main content grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              <SkillGapCard gaps={analysis.topGaps} />
              <TrendingSkillsCard
                rising={analysis.risingSkills}
                declining={analysis.decliningSkills}
              />
            </div>

            {/* Quick learning plan preview */}
            {learningPlan && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Today&apos;s Learning
                </h2>
                <LearningPlanCard plan={learningPlan} />
              </div>
            )}
          </div>
        )}

        {/* Learning Tab */}
        {activeTab === 'learning' && learningPlan && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Your Learning Plan
              </h1>
              <p className="text-slate-400 mt-1">
                15 minutes per day to close your skill gaps
              </p>
            </div>
            <LearningPlanCard plan={learningPlan} />
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && weatherReport && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Career Weather Report
              </h1>
              <p className="text-slate-400 mt-1">
                Your weekly career intelligence briefing
              </p>
            </div>
            <WeatherReportCard report={weatherReport} />
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && user && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Your Profile</h1>
              <p className="text-slate-400 mt-1">
                Manage your skills and career information
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <ProfileCard user={user} />
              {analysis && <ScoreCards analysis={analysis} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
