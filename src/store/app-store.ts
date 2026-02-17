import { create } from 'zustand';
import {
  UserProfile,
  SkillGapAnalysis,
  LearningPlan,
  CareerWeatherReport,
  OnboardingData,
} from '@/types';

interface AppState {
  // User
  user: UserProfile | null;
  isAuthenticated: boolean;

  // Onboarding
  onboarding: OnboardingData;
  isOnboarding: boolean;

  // Analysis
  analysis: SkillGapAnalysis | null;
  isAnalyzing: boolean;

  // Learning
  learningPlan: LearningPlan | null;

  // Weather
  weatherReport: CareerWeatherReport | null;

  // Actions
  setUser: (user: UserProfile) => void;
  setAuthenticated: (auth: boolean) => void;
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  setOnboarding: (isOnboarding: boolean) => void;
  setAnalysis: (analysis: SkillGapAnalysis) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setLearningPlan: (plan: LearningPlan) => void;
  setWeatherReport: (report: CareerWeatherReport) => void;
  completeModule: (moduleId: string) => void;
  resetStore: () => void;
}

const initialOnboarding: OnboardingData = {
  step: 1,
  linkedinUrl: '',
  resumeText: '',
  currentRole: '',
  currentLevel: '',
  industry: '',
  yearsExperience: 0,
  location: '',
  skills: [],
  careerGoals: [],
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  onboarding: initialOnboarding,
  isOnboarding: false,
  analysis: null,
  isAnalyzing: false,
  learningPlan: null,
  weatherReport: null,

  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  updateOnboarding: (data) =>
    set((state) => ({
      onboarding: { ...state.onboarding, ...data },
    })),
  setOnboarding: (isOnboarding) => set({ isOnboarding }),
  setAnalysis: (analysis) => set({ analysis }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setLearningPlan: (learningPlan) => set({ learningPlan }),
  setWeatherReport: (weatherReport) => set({ weatherReport }),
  completeModule: (moduleId) =>
    set((state) => {
      if (!state.learningPlan) return state;
      const modules = state.learningPlan.modules.map((m) =>
        m.id === moduleId ? { ...m, completed: true } : m
      );
      const completedModules = modules.filter((m) => m.completed).length;
      return {
        learningPlan: {
          ...state.learningPlan,
          modules,
          completedModules,
          currentModuleIndex: modules.findIndex((m) => !m.completed),
          streakDays: state.learningPlan.streakDays + 1,
        },
      };
    }),
  resetStore: () =>
    set({
      user: null,
      isAuthenticated: false,
      onboarding: initialOnboarding,
      isOnboarding: false,
      analysis: null,
      isAnalyzing: false,
      learningPlan: null,
      weatherReport: null,
    }),
}));
