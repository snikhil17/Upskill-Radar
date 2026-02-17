import {
  SkillGapAnalysis,
  LearningPlan,
  CareerWeatherReport,
  SkillGap,
  SkillCategory,
  SkillLevel,
  TrendingSkill,
  LearningModule,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Skill demand database - simulates real-time market data
const SKILL_DEMAND_DB: Record<
  string,
  {
    category: SkillCategory;
    demandScore: number;
    growthRate: number;
    requiredLevel: SkillLevel;
    roles: string[];
  }
> = {
  'ai/ml': {
    category: 'technical',
    demandScore: 95,
    growthRate: 142,
    requiredLevel: 'intermediate',
    roles: ['software engineer', 'data scientist', 'product manager', 'data analyst'],
  },
  'prompt engineering': {
    category: 'technical',
    demandScore: 88,
    growthRate: 234,
    requiredLevel: 'intermediate',
    roles: ['software engineer', 'content strategist', 'product manager', 'ux designer'],
  },
  'llm fine-tuning': {
    category: 'technical',
    demandScore: 85,
    growthRate: 189,
    requiredLevel: 'intermediate',
    roles: ['software engineer', 'ml engineer', 'data scientist'],
  },
  'cloud architecture': {
    category: 'technical',
    demandScore: 91,
    growthRate: 45,
    requiredLevel: 'advanced',
    roles: ['software engineer', 'devops engineer', 'solutions architect'],
  },
  'system design': {
    category: 'technical',
    demandScore: 91,
    growthRate: 18,
    requiredLevel: 'advanced',
    roles: ['software engineer', 'backend engineer', 'solutions architect'],
  },
  'data engineering': {
    category: 'technical',
    demandScore: 87,
    growthRate: 67,
    requiredLevel: 'intermediate',
    roles: ['software engineer', 'data engineer', 'data analyst', 'backend engineer'],
  },
  kubernetes: {
    category: 'tools',
    demandScore: 78,
    growthRate: 12,
    requiredLevel: 'intermediate',
    roles: ['devops engineer', 'software engineer', 'sre'],
  },
  typescript: {
    category: 'technical',
    demandScore: 85,
    growthRate: 38,
    requiredLevel: 'advanced',
    roles: ['software engineer', 'frontend engineer', 'fullstack engineer'],
  },
  'technical leadership': {
    category: 'leadership',
    demandScore: 82,
    growthRate: 22,
    requiredLevel: 'intermediate',
    roles: ['software engineer', 'engineering manager', 'tech lead'],
  },
  'stakeholder communication': {
    category: 'communication',
    demandScore: 74,
    growthRate: 15,
    requiredLevel: 'advanced',
    roles: ['product manager', 'engineering manager', 'software engineer', 'ux designer'],
  },
  'strategic thinking': {
    category: 'leadership',
    demandScore: 76,
    growthRate: 28,
    requiredLevel: 'intermediate',
    roles: ['product manager', 'engineering manager', 'business analyst'],
  },
  'data visualization': {
    category: 'analytical',
    demandScore: 72,
    growthRate: 25,
    requiredLevel: 'intermediate',
    roles: ['data analyst', 'product manager', 'ux designer', 'business analyst'],
  },
  'agile/scrum': {
    category: 'tools',
    demandScore: 68,
    growthRate: -5,
    requiredLevel: 'intermediate',
    roles: ['product manager', 'software engineer', 'project manager'],
  },
  cybersecurity: {
    category: 'technical',
    demandScore: 83,
    growthRate: 56,
    requiredLevel: 'intermediate',
    roles: ['software engineer', 'devops engineer', 'security engineer'],
  },
  'rag systems': {
    category: 'technical',
    demandScore: 86,
    growthRate: 198,
    requiredLevel: 'intermediate',
    roles: ['software engineer', 'ml engineer', 'data engineer'],
  },
};

// Learning resource database
const LEARNING_RESOURCES: Record<
  string,
  Array<{
    title: string;
    url: string;
    type: 'video' | 'article' | 'tutorial' | 'exercise' | 'quiz';
    source: string;
    duration: string;
    isFree: boolean;
  }>
> = {
  'ai/ml': [
    { title: 'Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course', type: 'tutorial', source: 'Google', duration: '15 min/day', isFree: true },
    { title: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai/', type: 'video', source: 'fast.ai', duration: '20 min', isFree: true },
    { title: 'ML Fundamentals Interactive', url: 'https://www.kaggle.com/learn', type: 'exercise', source: 'Kaggle', duration: '15 min', isFree: true },
  ],
  'prompt engineering': [
    { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', type: 'article', source: 'DAIR.AI', duration: '10 min read', isFree: true },
    { title: 'ChatGPT Prompt Engineering for Devs', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', type: 'video', source: 'DeepLearning.AI', duration: '15 min', isFree: true },
    { title: 'Build AI Apps with Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', type: 'tutorial', source: 'Anthropic', duration: '15 min', isFree: true },
  ],
  'system design': [
    { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'article', source: 'GitHub', duration: '15 min read', isFree: true },
    { title: 'Designing Data-Intensive Applications (Summary)', url: 'https://www.youtube.com/results?search_query=designing+data+intensive+applications+summary', type: 'video', source: 'YouTube', duration: '15 min', isFree: true },
    { title: 'System Design Interview Practice', url: 'https://www.designgurus.io/course/grokking-the-system-design-interview', type: 'exercise', source: 'Design Gurus', duration: '15 min', isFree: false },
  ],
  'cloud architecture': [
    { title: 'AWS Free Training', url: 'https://aws.amazon.com/training/digital/', type: 'tutorial', source: 'AWS', duration: '15 min/day', isFree: true },
    { title: 'Cloud Architecture Patterns', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/', type: 'article', source: 'Microsoft', duration: '10 min read', isFree: true },
    { title: 'GCP Skills Boost', url: 'https://www.cloudskillsboost.google/', type: 'tutorial', source: 'Google Cloud', duration: '15 min', isFree: true },
  ],
  'data engineering': [
    { title: 'Data Engineering Zoomcamp', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', type: 'tutorial', source: 'DataTalks.Club', duration: '15 min/day', isFree: true },
    { title: 'Apache Spark Fundamentals', url: 'https://spark.apache.org/docs/latest/quick-start.html', type: 'article', source: 'Apache', duration: '12 min read', isFree: true },
  ],
  'technical leadership': [
    { title: 'Staff Engineer Path', url: 'https://staffeng.com/', type: 'article', source: 'StaffEng', duration: '10 min read', isFree: true },
    { title: 'Leading Without Authority', url: 'https://www.youtube.com/results?search_query=technical+leadership+without+authority', type: 'video', source: 'YouTube', duration: '15 min', isFree: true },
  ],
  'stakeholder communication': [
    { title: 'Writing for Engineers', url: 'https://www.heinrichhartmann.com/posts/writing/', type: 'article', source: 'Blog', duration: '8 min read', isFree: true },
    { title: 'Technical Communication Skills', url: 'https://www.youtube.com/results?search_query=technical+communication+for+engineers', type: 'video', source: 'YouTube', duration: '12 min', isFree: true },
  ],
  default: [
    { title: 'Comprehensive Learning Path', url: 'https://www.freecodecamp.org/', type: 'tutorial', source: 'freeCodeCamp', duration: '15 min/day', isFree: true },
    { title: 'Interactive Exercises', url: 'https://exercism.org/', type: 'exercise', source: 'Exercism', duration: '15 min', isFree: true },
  ],
};

export function analyzeSkillGaps(
  userSkills: string[],
  role: string,
  level: string,
  industry: string
): SkillGapAnalysis {
  const normalizedSkills = new Set(userSkills.map((s) => s.toLowerCase().trim()));
  const normalizedRole = role.toLowerCase();

  // Find relevant skills for the user's role
  const relevantSkills = Object.entries(SKILL_DEMAND_DB)
    .filter(([, data]) =>
      data.roles.some((r) => normalizedRole.includes(r) || r.includes(normalizedRole))
    )
    .sort(([, a], [, b]) => b.demandScore - a.demandScore);

  // Identify gaps
  const gaps: SkillGap[] = relevantSkills
    .filter(([skillName]) => {
      // Check if user already has this skill (fuzzy match)
      return !Array.from(normalizedSkills).some(
        (us) => us.includes(skillName) || skillName.includes(us)
      );
    })
    .map(([skillName, data], index) => ({
      skill: skillName.charAt(0).toUpperCase() + skillName.slice(1),
      category: data.category,
      currentLevel: 'none' as const,
      requiredLevel: data.requiredLevel,
      demandScore: data.demandScore,
      growthRate: data.growthRate,
      priority: (
        index === 0 ? 'critical' : index < 3 ? 'high' : index < 6 ? 'medium' : 'low'
      ) as SkillGap['priority'],
      reason: generateGapReason(skillName, data.demandScore, data.growthRate, role),
    }))
    .slice(0, 5);

  // Calculate scores
  const totalRelevant = relevantSkills.length;
  const matchedCount = totalRelevant - gaps.length;
  const marketFitScore = Math.round(
    Math.min(95, (matchedCount / Math.max(totalRelevant, 1)) * 100 + 15)
  );
  const automationRiskScore = calculateAutomationRisk(normalizedSkills, normalizedRole);
  const promotionReadiness = calculatePromotionReadiness(
    normalizedSkills,
    level,
    gaps.length
  );

  // Trending skills
  const risingSkills: TrendingSkill[] = Object.entries(SKILL_DEMAND_DB)
    .filter(([, data]) => data.growthRate > 30)
    .map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      category: data.category,
      trend: 'rising' as const,
      growthRate: data.growthRate,
      demandScore: data.demandScore,
      timeToLearn: estimateTimeToLearn(data.requiredLevel),
    }))
    .sort((a, b) => b.growthRate - a.growthRate);

  const decliningSkills: TrendingSkill[] = [
    { name: 'jQuery', category: 'technical', trend: 'declining', growthRate: -34, demandScore: 22, timeToLearn: '1-2 weeks' },
    { name: 'Manual Testing', category: 'technical', trend: 'declining', growthRate: -28, demandScore: 31, timeToLearn: '2-3 weeks' },
    { name: 'PHP (Legacy)', category: 'technical', trend: 'declining', growthRate: -18, demandScore: 38, timeToLearn: '3-4 weeks' },
  ];

  return {
    userId: 'user-1',
    analyzedAt: new Date(),
    topGaps: gaps,
    marketFitScore,
    promotionReadinessScore: promotionReadiness,
    automationRiskScore,
    risingSkills,
    decliningSkills,
    roleHealthScore: calculateRoleHealth(normalizedRole, industry),
  };
}

export function generateLearningPlan(
  gaps: SkillGap[],
  dailyMinutes: number = 15
): LearningPlan {
  const targetSkills = gaps.slice(0, 3).map((g) => g.skill);
  const modules: LearningModule[] = [];

  targetSkills.forEach((skill, skillIdx) => {
    const normalizedSkill = skill.toLowerCase();
    const resources =
      LEARNING_RESOURCES[normalizedSkill] || LEARNING_RESOURCES['default'];

    // Day 1-2: Foundation
    modules.push({
      id: uuidv4(),
      skillName: skill,
      title: `${skill}: Why It Matters Now`,
      description: `Understand why ${skill} is critical for your career and what the market demands.`,
      estimatedMinutes: dailyMinutes,
      resources: resources.slice(0, 1).map((r) => ({ ...r })),
      completed: false,
      dayNumber: skillIdx * 7 + 1,
    });

    modules.push({
      id: uuidv4(),
      skillName: skill,
      title: `${skill}: Core Concepts`,
      description: `Learn the fundamental concepts and terminology of ${skill}.`,
      estimatedMinutes: dailyMinutes,
      resources: resources.slice(0, 2).map((r) => ({ ...r })),
      completed: false,
      dayNumber: skillIdx * 7 + 2,
    });

    // Day 3-4: Hands-on
    modules.push({
      id: uuidv4(),
      skillName: skill,
      title: `${skill}: First Hands-on Exercise`,
      description: `Apply ${skill} concepts with a guided practical exercise.`,
      estimatedMinutes: dailyMinutes,
      resources: resources.slice(1, 3).map((r) => ({ ...r })),
      completed: false,
      dayNumber: skillIdx * 7 + 3,
    });

    modules.push({
      id: uuidv4(),
      skillName: skill,
      title: `${skill}: Build Something Small`,
      description: `Create a mini-project using ${skill} to solidify your understanding.`,
      estimatedMinutes: dailyMinutes,
      resources: resources.map((r) => ({ ...r })),
      completed: false,
      dayNumber: skillIdx * 7 + 4,
    });

    // Day 5: Deep dive
    modules.push({
      id: uuidv4(),
      skillName: skill,
      title: `${skill}: Advanced Patterns`,
      description: `Explore advanced patterns and best practices in ${skill}.`,
      estimatedMinutes: dailyMinutes,
      resources: resources.slice(-2).map((r) => ({ ...r })),
      completed: false,
      dayNumber: skillIdx * 7 + 5,
    });
  });

  return {
    userId: 'user-1',
    createdAt: new Date(),
    targetSkills,
    dailyMinutes,
    totalWeeks: Math.ceil(modules.length / 5),
    modules: modules.sort((a, b) => a.dayNumber - b.dayNumber),
    currentModuleIndex: 0,
    completedModules: 0,
    streakDays: 0,
  };
}

export function generateWeatherReport(
  role: string,
  location: string,
  skills: string[],
  gaps: SkillGap[]
): CareerWeatherReport {
  const automationRisk = calculateAutomationRisk(
    new Set(skills.map((s) => s.toLowerCase())),
    role.toLowerCase()
  );

  const outlook =
    automationRisk > 60
      ? 'stormy'
      : automationRisk > 40
        ? 'cloudy'
        : automationRisk > 20
          ? 'partly-cloudy'
          : 'sunny';

  return {
    userId: 'user-1',
    generatedAt: new Date(),
    period: `Week of ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
    overallOutlook: outlook as CareerWeatherReport['overallOutlook'],
    roleHealth: {
      score: calculateRoleHealth(role.toLowerCase(), 'technology'),
      trend: 'stable',
      openPositions: Math.floor(8000 + Math.random() * 12000),
      positionsTrend: parseFloat((Math.random() * 8 - 2).toFixed(1)),
    },
    automationRisk: {
      score: automationRisk,
      trend: automationRisk > 40 ? 'increasing' : 'stable',
      signals: generateAutomationSignals(role),
    },
    skillDemand: {
      rising: Object.entries(SKILL_DEMAND_DB)
        .filter(([, d]) => d.growthRate > 30)
        .slice(0, 5)
        .map(([name, data]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          category: data.category,
          trend: 'rising' as const,
          growthRate: data.growthRate,
          demandScore: data.demandScore,
          timeToLearn: estimateTimeToLearn(data.requiredLevel),
        })),
      declining: [
        { name: 'jQuery', category: 'technical' as const, trend: 'declining' as const, growthRate: -34, demandScore: 22, timeToLearn: '1-2 weeks' },
        { name: 'Manual Testing', category: 'technical' as const, trend: 'declining' as const, growthRate: -28, demandScore: 31, timeToLearn: '2-3 weeks' },
      ],
    },
    competitorActivity: {
      companiesHiring: ['Google', 'Microsoft', 'Amazon', 'Meta', 'OpenAI', 'Anthropic', 'Stripe', 'Databricks'],
      newRolesEmerging: ['AI Platform Engineer', 'LLM Ops Specialist', 'AI Safety Engineer', 'Prompt Engineer'],
      salaryTrend: 'up',
      averageSalary: '$145,000 - $195,000',
    },
    recommendations: generateRecommendations(gaps, role),
    weeklyInsight: generateWeeklyInsight(role, location, automationRisk),
  };
}

// Helper functions

function generateGapReason(
  skill: string,
  demandScore: number,
  growthRate: number,
  role: string
): string {
  if (growthRate > 100) {
    return `${skill} demand has grown ${growthRate}% in 6 months. This is the fastest-growing skill for ${role} roles. Early adopters are getting 30%+ salary premiums.`;
  }
  if (demandScore > 85) {
    return `${demandScore}% of new ${role} job postings require ${skill}. This is becoming a baseline expectation, not a differentiator.`;
  }
  if (growthRate > 30) {
    return `${skill} demand is growing steadily at ${growthRate}%. Companies promoting people in your role cite ${skill} as a key differentiator.`;
  }
  return `${skill} appears in ${demandScore}% of relevant job postings. Having this skill would significantly strengthen your market position.`;
}

function calculateAutomationRisk(skills: Set<string>, role: string): number {
  let baseRisk = 45; // Default moderate risk

  // AI-related skills reduce risk
  const aiSkills = ['ai', 'ml', 'machine learning', 'llm', 'prompt engineering', 'deep learning'];
  const hasAiSkills = aiSkills.some((s) => Array.from(skills).some((us) => us.includes(s)));
  if (hasAiSkills) baseRisk -= 20;

  // Creative/leadership skills reduce risk
  const humanSkills = ['leadership', 'communication', 'strategy', 'management', 'design thinking'];
  const humanSkillCount = humanSkills.filter((s) =>
    Array.from(skills).some((us) => us.includes(s))
  ).length;
  baseRisk -= humanSkillCount * 5;

  // Role-based adjustment
  if (role.includes('manager') || role.includes('director')) baseRisk -= 10;
  if (role.includes('data entry') || role.includes('admin')) baseRisk += 20;

  return Math.max(5, Math.min(90, baseRisk));
}

function calculatePromotionReadiness(
  skills: Set<string>,
  level: string,
  gapCount: number
): number {
  let score = 50;
  score += skills.size * 3;
  score -= gapCount * 8;

  if (level.toLowerCase().includes('junior') || level.toLowerCase().includes('entry')) {
    score += 10; // More room to grow = easier to show progress
  }

  return Math.max(10, Math.min(95, score));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function calculateRoleHealth(role: string, industry: string): number {
  // Simplified role health calculation
  if (role.includes('engineer') || role.includes('developer')) return 75;
  if (role.includes('data')) return 82;
  if (role.includes('product')) return 70;
  if (role.includes('design')) return 68;
  if (role.includes('manager')) return 65;
  return 60;
}

function estimateTimeToLearn(level: SkillLevel): string {
  switch (level) {
    case 'beginner':
      return '1-2 weeks';
    case 'intermediate':
      return '4-6 weeks';
    case 'advanced':
      return '8-12 weeks';
    case 'expert':
      return '16-24 weeks';
  }
}

function generateAutomationSignals(role: string): string[] {
  return [
    'AI coding assistants now handle 40% of routine coding tasks',
    'Companies report 20-30% productivity gains from AI tools in this role',
    `New AI-augmented ${role} roles emerging at major companies`,
    'Routine aspects of this role are increasingly automated, but strategic thinking remains human',
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateRecommendations(gaps: SkillGap[], role: string): string[] {
  const recs: string[] = [];

  if (gaps.length > 0) {
    recs.push(
      `Priority: Start learning ${gaps[0].skill} this week - demand is up ${gaps[0].growthRate}% and growing`
    );
  }
  if (gaps.length > 1) {
    recs.push(
      `Next: Build ${gaps[1].skill} skills - ${gaps[1].demandScore}% of postings in your role require it`
    );
  }

  recs.push(
    'Update your LinkedIn profile to highlight AI-related projects and skills'
  );
  recs.push(
    'Contribute to an open-source project in your gap area to build demonstrable experience'
  );

  return recs;
}

function generateWeeklyInsight(
  role: string,
  location: string,
  automationRisk: number
): string {
  if (automationRisk > 50) {
    return `The ${role} landscape in ${location} is shifting rapidly. Routine tasks in your role are being automated, but this creates opportunity: professionals who can orchestrate AI tools are seeing 25-40% salary increases. Focus on becoming the bridge between AI capabilities and business needs.`;
  }
  return `The ${role} role in ${location} shows healthy demand with evolving skill requirements. The market is rewarding professionals who combine traditional expertise with AI fluency. Your biggest opportunity right now: become the person on your team who bridges the gap between AI tools and real business outcomes.`;
}
