import {
  SkillGapAnalysis,
  LearningPlan,
  CareerWeatherReport,
  UserProfile,
  TrendingSkill,
} from '@/types';

export const mockTrendingSkills: TrendingSkill[] = [
  {
    name: 'AI/ML Engineering',
    category: 'technical',
    trend: 'rising',
    growthRate: 142,
    demandScore: 95,
    timeToLearn: '8-12 weeks',
  },
  {
    name: 'Prompt Engineering',
    category: 'technical',
    trend: 'rising',
    growthRate: 234,
    demandScore: 88,
    timeToLearn: '2-4 weeks',
  },
  {
    name: 'LLM Fine-tuning',
    category: 'technical',
    trend: 'rising',
    growthRate: 189,
    demandScore: 82,
    timeToLearn: '4-6 weeks',
  },
  {
    name: 'Cloud Architecture',
    category: 'technical',
    trend: 'rising',
    growthRate: 45,
    demandScore: 91,
    timeToLearn: '6-10 weeks',
  },
  {
    name: 'Data Engineering',
    category: 'technical',
    trend: 'rising',
    growthRate: 67,
    demandScore: 87,
    timeToLearn: '8-12 weeks',
  },
  {
    name: 'Kubernetes',
    category: 'tools',
    trend: 'stable',
    growthRate: 12,
    demandScore: 78,
    timeToLearn: '4-6 weeks',
  },
  {
    name: 'TypeScript',
    category: 'technical',
    trend: 'rising',
    growthRate: 38,
    demandScore: 85,
    timeToLearn: '3-5 weeks',
  },
  {
    name: 'Strategic Thinking',
    category: 'leadership',
    trend: 'rising',
    growthRate: 28,
    demandScore: 76,
    timeToLearn: '6-8 weeks',
  },
  {
    name: 'jQuery',
    category: 'technical',
    trend: 'declining',
    growthRate: -34,
    demandScore: 22,
    timeToLearn: '1-2 weeks',
  },
  {
    name: 'Manual Testing',
    category: 'technical',
    trend: 'declining',
    growthRate: -28,
    demandScore: 31,
    timeToLearn: '2-3 weeks',
  },
];

export function generateMockAnalysis(
  role: string,
  skills: string[]
): SkillGapAnalysis {
  const skillSet = new Set(skills.map((s) => s.toLowerCase()));

  const potentialGaps = [
    {
      skill: 'AI/ML Integration',
      category: 'technical' as const,
      requiredLevel: 'intermediate' as const,
      demandScore: 95,
      growthRate: 142,
      reason:
        'AI integration is now expected in 78% of senior engineering roles. Companies are restructuring teams around AI-first development.',
    },
    {
      skill: 'Prompt Engineering',
      category: 'technical' as const,
      requiredLevel: 'intermediate' as const,
      demandScore: 88,
      growthRate: 234,
      reason:
        'Fastest growing skill in tech. 3x more job postings mention prompt engineering compared to 6 months ago.',
    },
    {
      skill: 'System Design',
      category: 'technical' as const,
      requiredLevel: 'advanced' as const,
      demandScore: 91,
      growthRate: 18,
      reason:
        'Required for promotion to senior/staff level. 92% of promoted engineers demonstrated strong system design skills.',
    },
    {
      skill: 'Cloud Architecture (AWS/GCP/Azure)',
      category: 'technical' as const,
      requiredLevel: 'advanced' as const,
      demandScore: 89,
      growthRate: 45,
      reason:
        'Multi-cloud expertise is becoming standard. Roles requiring cloud skills pay 23% more on average.',
    },
    {
      skill: 'Data Engineering',
      category: 'technical' as const,
      requiredLevel: 'intermediate' as const,
      demandScore: 87,
      growthRate: 67,
      reason:
        'Data pipeline skills are increasingly required even for frontend and fullstack roles.',
    },
    {
      skill: 'Technical Leadership',
      category: 'leadership' as const,
      requiredLevel: 'intermediate' as const,
      demandScore: 82,
      growthRate: 22,
      reason:
        'Key differentiator for promotion. People who got promoted in your role spent 30% more time on cross-team collaboration.',
    },
    {
      skill: 'LLM Fine-tuning & RAG',
      category: 'technical' as const,
      requiredLevel: 'intermediate' as const,
      demandScore: 85,
      growthRate: 189,
      reason:
        'Companies are building proprietary AI systems. Engineers who can fine-tune and deploy LLMs are in extreme demand.',
    },
    {
      skill: 'Stakeholder Communication',
      category: 'communication' as const,
      requiredLevel: 'advanced' as const,
      demandScore: 74,
      growthRate: 15,
      reason:
        'Top-cited skill gap in performance reviews for engineers seeking promotion to senior roles.',
    },
  ];

  const gaps = potentialGaps
    .filter((g) => !skillSet.has(g.skill.toLowerCase()))
    .slice(0, 5)
    .map((g, i) => ({
      ...g,
      currentLevel: 'none' as const,
      priority: (i === 0 ? 'critical' : i < 3 ? 'high' : 'medium') as
        | 'critical'
        | 'high'
        | 'medium'
        | 'low',
    }));

  const marketFit = Math.min(95, 40 + skills.length * 5);
  const automationRisk = Math.max(10, 65 - skills.length * 4);

  return {
    userId: 'user-1',
    analyzedAt: new Date(),
    topGaps: gaps,
    marketFitScore: marketFit,
    promotionReadinessScore: Math.min(90, 30 + skills.length * 6),
    automationRiskScore: automationRisk,
    risingSkills: mockTrendingSkills.filter((s) => s.trend === 'rising'),
    decliningSkills: mockTrendingSkills.filter((s) => s.trend === 'declining'),
    roleHealthScore: 72,
  };
}

export function generateMockLearningPlan(gaps: string[]): LearningPlan {
  const modules = gaps.flatMap((skill, skillIndex) => [
    {
      id: `mod-${skillIndex}-1`,
      skillName: skill,
      title: `Introduction to ${skill}`,
      description: `Understand the fundamentals and why ${skill} matters for your career right now.`,
      estimatedMinutes: 15,
      resources: [
        {
          title: `${skill} Fundamentals - Free Course`,
          url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(skill + ' tutorial 2026'),
          type: 'video' as const,
          source: 'YouTube',
          duration: '12 min',
          isFree: true,
        },
        {
          title: `Getting Started with ${skill}`,
          url: 'https://dev.to/search?q=' + encodeURIComponent(skill),
          type: 'article' as const,
          source: 'Dev.to',
          duration: '5 min read',
          isFree: true,
        },
      ],
      completed: false,
      dayNumber: skillIndex * 7 + 1,
    },
    {
      id: `mod-${skillIndex}-2`,
      skillName: skill,
      title: `${skill} in Practice`,
      description: `Hands-on exercises to build real ${skill} experience.`,
      estimatedMinutes: 15,
      resources: [
        {
          title: `${skill} Hands-on Tutorial`,
          url: 'https://github.com/search?q=' + encodeURIComponent(skill + ' tutorial'),
          type: 'tutorial' as const,
          source: 'GitHub',
          duration: '15 min',
          isFree: true,
        },
      ],
      completed: false,
      dayNumber: skillIndex * 7 + 2,
    },
    {
      id: `mod-${skillIndex}-3`,
      skillName: skill,
      title: `${skill} Deep Dive`,
      description: `Advanced concepts and real-world applications of ${skill}.`,
      estimatedMinutes: 15,
      resources: [
        {
          title: `Advanced ${skill} Concepts`,
          url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent('advanced ' + skill),
          type: 'video' as const,
          source: 'YouTube',
          duration: '15 min',
          isFree: true,
        },
      ],
      completed: false,
      dayNumber: skillIndex * 7 + 3,
    },
  ]);

  return {
    userId: 'user-1',
    createdAt: new Date(),
    targetSkills: gaps,
    dailyMinutes: 15,
    totalWeeks: Math.ceil(modules.length / 5),
    modules,
    currentModuleIndex: 0,
    completedModules: 0,
    streakDays: 0,
  };
}

export function generateMockWeatherReport(
  role: string,
  location: string
): CareerWeatherReport {
  return {
    userId: 'user-1',
    generatedAt: new Date(),
    period: 'Week of Feb 17, 2026',
    overallOutlook: 'partly-cloudy',
    roleHealth: {
      score: 72,
      trend: 'stable',
      openPositions: 14200,
      positionsTrend: 3.2,
    },
    automationRisk: {
      score: 35,
      trend: 'increasing',
      signals: [
        'AI coding assistants handling 40% of routine coding tasks',
        'Companies reporting 20% productivity gains from AI tools',
        'New "AI-augmented developer" roles emerging at major tech companies',
      ],
    },
    skillDemand: {
      rising: mockTrendingSkills.filter((s) => s.trend === 'rising').slice(0, 5),
      declining: mockTrendingSkills.filter((s) => s.trend === 'declining'),
    },
    competitorActivity: {
      companiesHiring: [
        'Google',
        'Microsoft',
        'Amazon',
        'Meta',
        'Apple',
        'OpenAI',
        'Anthropic',
        'Stripe',
      ],
      newRolesEmerging: [
        'AI Platform Engineer',
        'LLM Operations Specialist',
        'AI Safety Engineer',
        'Prompt Engineer',
      ],
      salaryTrend: 'up',
      averageSalary: '$145,000 - $195,000',
    },
    recommendations: [
      'Start learning AI/ML integration this week - demand up 142% in your area',
      'Consider getting AWS Solutions Architect certification - 23% salary premium',
      'Join an open-source AI project to build portfolio evidence',
      'Update your LinkedIn headline to include "AI" keywords - 3x more recruiter views',
    ],
    weeklyInsight: `The ${role} role in ${location} is showing stable demand with a shift toward AI-augmented workflows. Companies are not replacing developers - they are hiring developers who can work WITH AI. The biggest career risk right now is not learning AI tools; the biggest opportunity is becoming the person who helps your team adopt them.`,
  };
}

export const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  currentRole: 'Software Engineer',
  currentLevel: 'Mid-level',
  industry: 'Technology',
  yearsExperience: 4,
  location: 'San Francisco, CA',
  skills: [
    { name: 'JavaScript', level: 'advanced', yearsUsed: 4, category: 'technical', verified: true },
    { name: 'React', level: 'advanced', yearsUsed: 3, category: 'technical', verified: true },
    { name: 'Node.js', level: 'intermediate', yearsUsed: 3, category: 'technical', verified: true },
    { name: 'Python', level: 'intermediate', yearsUsed: 2, category: 'technical', verified: true },
    { name: 'SQL', level: 'intermediate', yearsUsed: 3, category: 'technical', verified: true },
    { name: 'Git', level: 'advanced', yearsUsed: 4, category: 'tools', verified: true },
    { name: 'REST APIs', level: 'advanced', yearsUsed: 3, category: 'technical', verified: true },
    { name: 'TypeScript', level: 'intermediate', yearsUsed: 2, category: 'technical', verified: false },
  ],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
};
