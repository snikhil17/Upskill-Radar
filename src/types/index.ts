export interface UserProfile {
  id: string;
  name: string;
  email: string;
  linkedinUrl?: string;
  currentRole: string;
  currentLevel: string;
  industry: string;
  yearsExperience: number;
  location: string;
  skills: Skill[];
  resumeText?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  name: string;
  level: SkillLevel;
  yearsUsed: number;
  category: SkillCategory;
  verified: boolean;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type SkillCategory =
  | 'technical'
  | 'leadership'
  | 'communication'
  | 'analytical'
  | 'domain'
  | 'tools'
  | 'soft-skills';

export interface SkillGap {
  skill: string;
  category: SkillCategory;
  currentLevel: SkillLevel | 'none';
  requiredLevel: SkillLevel;
  demandScore: number; // 0-100, how much the market demands this
  growthRate: number; // percentage growth in demand over last 6 months
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
}

export interface SkillGapAnalysis {
  userId: string;
  analyzedAt: Date;
  topGaps: SkillGap[];
  marketFitScore: number; // 0-100
  promotionReadinessScore: number; // 0-100
  automationRiskScore: number; // 0-100
  risingSkills: TrendingSkill[];
  decliningSkills: TrendingSkill[];
  roleHealthScore: number; // 0-100
}

export interface TrendingSkill {
  name: string;
  category: SkillCategory;
  trend: 'rising' | 'stable' | 'declining';
  growthRate: number;
  demandScore: number;
  timeToLearn: string; // e.g., "2-4 weeks"
}

export interface LearningPlan {
  userId: string;
  createdAt: Date;
  targetSkills: string[];
  dailyMinutes: number;
  totalWeeks: number;
  modules: LearningModule[];
  currentModuleIndex: number;
  completedModules: number;
  streakDays: number;
}

export interface LearningModule {
  id: string;
  skillName: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  resources: LearningResource[];
  completed: boolean;
  dayNumber: number;
}

export interface LearningResource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'tutorial' | 'exercise' | 'quiz';
  source: string;
  duration: string;
  isFree: boolean;
}

export interface CareerWeatherReport {
  userId: string;
  generatedAt: Date;
  period: string;
  overallOutlook: 'sunny' | 'partly-cloudy' | 'cloudy' | 'stormy';
  roleHealth: {
    score: number;
    trend: 'improving' | 'stable' | 'declining';
    openPositions: number;
    positionsTrend: number;
  };
  automationRisk: {
    score: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    signals: string[];
  };
  skillDemand: {
    rising: TrendingSkill[];
    declining: TrendingSkill[];
  };
  competitorActivity: {
    companiesHiring: string[];
    newRolesEmerging: string[];
    salaryTrend: 'up' | 'stable' | 'down';
    averageSalary: string;
  };
  recommendations: string[];
  weeklyInsight: string;
}

export interface JobPosting {
  title: string;
  company: string;
  location: string;
  skills: string[];
  level: string;
  salary?: string;
  postedDate: Date;
  source: string;
}

export interface OnboardingData {
  step: number;
  linkedinUrl: string;
  resumeText: string;
  currentRole: string;
  currentLevel: string;
  industry: string;
  yearsExperience: number;
  location: string;
  skills: string[];
  careerGoals: string[];
}
