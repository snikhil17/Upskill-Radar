'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  User,
  MapPin,
  Wrench,
  Target,
  Check,
  Plus,
  Search,
  Sparkles,
  Globe,
  Zap,
  TrendingUp,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAppStore } from '@/store/app-store';
import {
  analyzeSkillGaps,
  generateLearningPlan,
  generateWeatherReport,
} from '@/lib/analysis-engine';
import type { SkillGapAnalysis, LearningPlan, CareerWeatherReport } from '@/types';

// ---------------------------------------------------------------------------
// Data constants
// ---------------------------------------------------------------------------

const ROLE_CATEGORIES = [
  {
    label: 'Engineering',
    roles: [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'DevOps Engineer',
      'SRE / Platform Engineer',
      'Mobile Developer',
      'Embedded Engineer',
      'QA / SDET Engineer',
      'Solutions Architect',
    ],
  },
  {
    label: 'Data & AI',
    roles: [
      'Data Scientist',
      'Data Analyst',
      'Data Engineer',
      'ML Engineer',
      'AI/ML Researcher',
      'Business Intelligence Analyst',
      'Analytics Engineer',
    ],
  },
  {
    label: 'Product & Design',
    roles: [
      'Product Manager',
      'UX Designer',
      'UI Designer',
      'UX Researcher',
      'Product Designer',
      'Technical Writer',
    ],
  },
  {
    label: 'Leadership & Management',
    roles: [
      'Engineering Manager',
      'Tech Lead',
      'VP of Engineering',
      'CTO',
      'Project Manager',
      'Scrum Master',
      'Program Manager',
    ],
  },
  {
    label: 'Business & Consulting',
    roles: [
      'Business Analyst',
      'Management Consultant',
      'IT Consultant',
      'Technology Analyst',
      'Pre-Sales Engineer',
      'Customer Success Engineer',
    ],
  },
];

const LEVEL_OPTIONS = [
  {
    value: 'Entry Level / Junior',
    label: 'Junior',
    desc: '0-2 years',
    icon: Zap,
  },
  {
    value: 'Mid-Level',
    label: 'Mid-Level',
    desc: '2-5 years',
    icon: TrendingUp,
  },
  {
    value: 'Senior',
    label: 'Senior',
    desc: '5-8 years',
    icon: Shield,
  },
  {
    value: 'Staff / Principal',
    label: 'Staff / Principal',
    desc: '8-12 years',
    icon: Sparkles,
  },
  {
    value: 'Lead',
    label: 'Lead',
    desc: 'Team leadership',
    icon: Target,
  },
  {
    value: 'Manager',
    label: 'Manager',
    desc: 'People management',
    icon: User,
  },
  {
    value: 'Director',
    label: 'Director',
    desc: 'Department level',
    icon: Briefcase,
  },
  {
    value: 'VP / Executive',
    label: 'VP / Executive',
    desc: 'Organization level',
    icon: Globe,
  },
];

const INDUSTRY_OPTIONS = [
  'Technology',
  'IT Services & Consulting',
  'Finance / Fintech',
  'Fintech India',
  'E-commerce / Retail',
  'E-commerce India',
  'Healthcare / Biotech',
  'Enterprise / SaaS',
  'Media / Entertainment',
  'Education / EdTech',
  'Consulting',
  'Startup',
  'Government / Public Sector',
  'Telecom',
  'Manufacturing / Industry 4.0',
  'BFSI (Banking & Insurance)',
  'Other',
];

const INDIA_CITIES = [
  'Bangalore',
  'Mumbai',
  'Delhi / NCR',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Gurgaon',
  'Noida',
  'Ahmedabad',
  'Remote (India)',
];

const INTERNATIONAL_CITIES = [
  'San Francisco, CA',
  'New York, NY',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'London, UK',
  'Toronto, Canada',
  'Berlin, Germany',
  'Singapore',
  'Dubai, UAE',
  'Sydney, Australia',
  'Tokyo, Japan',
  'Remote (Global)',
];

const SKILL_CATEGORIES: { label: string; skills: string[] }[] = [
  {
    label: 'Languages',
    skills: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'Go',
      'Rust',
      'C++',
      'C#',
      'Kotlin',
      'Swift',
      'PHP',
      'Ruby',
      'Scala',
      'R',
    ],
  },
  {
    label: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'Angular',
      'Vue.js',
      'Svelte',
      'Tailwind CSS',
      'HTML/CSS',
      'React Native',
      'Flutter',
    ],
  },
  {
    label: 'Backend & Infra',
    skills: [
      'Node.js',
      'Django',
      'Spring Boot',
      'FastAPI',
      'Express.js',
      'NestJS',
      '.NET',
      'REST APIs',
      'GraphQL',
      'gRPC',
      'Microservices',
      'System Design',
    ],
  },
  {
    label: 'Cloud & DevOps',
    skills: [
      'AWS',
      'GCP',
      'Azure',
      'Docker',
      'Kubernetes',
      'Terraform',
      'CI/CD',
      'Jenkins',
      'Linux',
      'Nginx',
      'Serverless',
    ],
  },
  {
    label: 'Data & Databases',
    skills: [
      'SQL',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Elasticsearch',
      'Kafka',
      'Spark',
      'Airflow',
      'Snowflake',
      'Data Modeling',
      'ETL Pipelines',
    ],
  },
  {
    label: 'AI & ML',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Computer Vision',
      'LLMs / GenAI',
      'Prompt Engineering',
      'RAG Systems',
      'MLOps',
      'TensorFlow',
      'PyTorch',
      'LangChain',
    ],
  },
  {
    label: 'Analytics & BI',
    skills: [
      'Data Analysis',
      'Data Visualization',
      'Tableau',
      'Power BI',
      'Excel / Sheets',
      'Looker',
      'A/B Testing',
      'Statistical Analysis',
    ],
  },
  {
    label: 'Soft Skills & Management',
    skills: [
      'Agile / Scrum',
      'Project Management',
      'Product Strategy',
      'User Research',
      'Leadership',
      'Communication',
      'Stakeholder Management',
      'Team Building',
      'Mentoring',
    ],
  },
];

const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.skills);

const GOAL_OPTIONS = [
  {
    goal: 'Get promoted to next level',
    desc: 'Close the gaps that are holding you back',
    icon: TrendingUp,
  },
  {
    goal: 'Switch to a different role',
    desc: 'Build the skills for your target role',
    icon: ArrowRight,
  },
  {
    goal: 'Increase my compensation',
    desc: 'Learn high-demand, high-pay skills',
    icon: Sparkles,
  },
  {
    goal: 'Stay relevant in the AI era',
    desc: 'Future-proof your career against automation',
    icon: Shield,
  },
  {
    goal: 'Become a tech lead',
    desc: 'Develop leadership and architecture skills',
    icon: Target,
  },
  {
    goal: 'Transition into management',
    desc: 'Learn people management and strategy',
    icon: User,
  },
  {
    goal: 'Learn AI/ML skills',
    desc: 'Get into the fastest-growing field',
    icon: Zap,
  },
  {
    goal: 'Crack FAANG / top-tier interviews',
    desc: 'Prepare for dream company interviews',
    icon: Briefcase,
  },
  {
    goal: 'Build side projects / freelance',
    desc: 'Create income outside your 9-5',
    icon: Wrench,
  },
  {
    goal: 'Start a company',
    desc: 'Build the full-stack founder skillset',
    icon: Globe,
  },
];

// ---------------------------------------------------------------------------
// Step indicator icons
// ---------------------------------------------------------------------------

const STEP_META = [
  { icon: Briefcase, label: 'Role' },
  { icon: User, label: 'Level' },
  { icon: MapPin, label: 'Location' },
  { icon: Wrench, label: 'Skills' },
  { icon: Target, label: 'Goals' },
];

// ---------------------------------------------------------------------------
// Analyzing phase messages (revealed sequentially)
// ---------------------------------------------------------------------------

const ANALYSIS_MESSAGES = [
  'Initializing career radar...',
  'Scanning job market data for your role...',
  'Comparing your skills to market demand...',
  'Identifying critical skill gaps...',
  'Mapping growth trajectories...',
  'Building your personalized learning plan...',
  'Generating career weather forecast...',
  'Compiling final report...',
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function OnboardingFlow() {
  const router = useRouter();
  const {
    onboarding,
    updateOnboarding,
    setAnalysis,
    setLearningPlan,
    setWeatherReport,
    setUser,
    setAuthenticated,
  } = useAppStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [roleSearch, setRoleSearch] = useState('');
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  // Direction of step transition: 1 = forward, -1 = back
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSteps = 5;

  // ------------------------------------------------------------------
  // Filtered skill list
  // ------------------------------------------------------------------
  const filteredSkills = useMemo(() => {
    if (!skillSearch.trim()) return ALL_SKILLS;
    const q = skillSearch.toLowerCase();
    return ALL_SKILLS.filter((s) => s.toLowerCase().includes(q));
  }, [skillSearch]);

  // ------------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------------
  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
        updateOnboarding({ step: currentStep + 1 });
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentStep, updateOnboarding]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((s) => s - 1);
        updateOnboarding({ step: currentStep - 1 });
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentStep, updateOnboarding]);

  // ------------------------------------------------------------------
  // Keyboard: Enter advances
  // ------------------------------------------------------------------
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && canProceed() && !isAnalyzing) {
        if (currentStep < totalSteps) handleNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, onboarding, isAnalyzing]);

  // ------------------------------------------------------------------
  // Analysis phase animation
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!isAnalyzing) return;
    const msgInterval = setInterval(() => {
      setVisibleMessages((v) => {
        if (v >= ANALYSIS_MESSAGES.length) {
          clearInterval(msgInterval);
          return v;
        }
        return v + 1;
      });
    }, 600);
    const progressInterval = setInterval(() => {
      setAnalyzeProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // ease out: faster start, slower end
        const increment = Math.max(0.5, (100 - p) * 0.06);
        return Math.min(100, p + increment);
      });
    }, 50);
    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [isAnalyzing]);

  // ------------------------------------------------------------------
  // Run analysis
  // ------------------------------------------------------------------
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    setVisibleMessages(0);

    // Start the animation and API call concurrently
    const animationPromise = new Promise((resolve) => setTimeout(resolve, 4200));

    let analysis: SkillGapAnalysis;
    let plan: LearningPlan;
    let report: CareerWeatherReport;

    try {
      // Call the API endpoint for Gemini-powered analysis
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: onboarding.skills,
          role: onboarding.currentRole,
          level: onboarding.currentLevel,
          industry: onboarding.industry,
          location: onboarding.location,
          goals: onboarding.careerGoals,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        analysis = data.analysis;
        plan = data.learningPlan;
        report = data.weatherReport;
      } else {
        throw new Error('API call failed');
      }
    } catch {
      // Fallback to local analysis engine
      analysis = analyzeSkillGaps(
        onboarding.skills,
        onboarding.currentRole,
        onboarding.currentLevel,
        onboarding.industry
      ) as SkillGapAnalysis;
      plan = generateLearningPlan(analysis.topGaps) as LearningPlan;
      report = generateWeatherReport(
        onboarding.currentRole,
        onboarding.location,
        onboarding.skills,
        analysis.topGaps
      ) as CareerWeatherReport;
    }

    // Wait for animation to finish
    await animationPromise;

    setAnalysis(analysis);
    setLearningPlan(plan);
    setWeatherReport(report);

    // Create user profile
    setUser({
      id: 'user-1',
      name: 'User',
      email: '',
      currentRole: onboarding.currentRole,
      currentLevel: onboarding.currentLevel,
      industry: onboarding.industry,
      yearsExperience: onboarding.yearsExperience,
      location: onboarding.location,
      skills: onboarding.skills.map((s) => ({
        name: s,
        level: 'intermediate' as const,
        yearsUsed: 2,
        category: 'technical' as const,
        verified: false,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setAuthenticated(true);

    // Final pause then redirect
    setAnalyzeProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push('/dashboard');
  };

  // ------------------------------------------------------------------
  // Skill helpers
  // ------------------------------------------------------------------
  const toggleSkill = (skill: string) => {
    const skills = onboarding.skills.includes(skill)
      ? onboarding.skills.filter((s) => s !== skill)
      : [...onboarding.skills, skill];
    updateOnboarding({ skills });
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !onboarding.skills.includes(trimmed)) {
      updateOnboarding({ skills: [...onboarding.skills, trimmed] });
      setCustomSkill('');
    }
  };

  const toggleGoal = (goal: string) => {
    const goals = onboarding.careerGoals.includes(goal)
      ? onboarding.careerGoals.filter((g) => g !== goal)
      : [...onboarding.careerGoals, goal];
    updateOnboarding({ careerGoals: goals });
  };

  // ------------------------------------------------------------------
  // Validation
  // ------------------------------------------------------------------
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function canProceed() {
    switch (currentStep) {
      case 1:
        return onboarding.currentRole.length > 0;
      case 2:
        return (
          onboarding.currentLevel.length > 0 &&
          onboarding.industry.length > 0
        );
      case 3:
        return onboarding.location.length > 0;
      case 4:
        return onboarding.skills.length >= 3;
      case 5:
        return onboarding.careerGoals.length >= 1;
      default:
        return false;
    }
  }

  // ====================================================================
  // RENDER: Analyzing state (radar scan animation)
  // ====================================================================
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-surface-0 flex items-center justify-center p-4 overflow-hidden">
        {/* Background grid */}
        <div className="fixed inset-0 grid-bg opacity-40" />

        <div className="relative z-10 text-center max-w-lg w-full">
          {/* Radar animation */}
          <div className="relative w-48 h-48 mx-auto mb-10">
            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-4 rounded-full border border-white/[0.06]" />
            <div className="absolute inset-8 rounded-full border border-white/[0.08]" />
            <div className="absolute inset-12 rounded-full border border-white/[0.10]" />

            {/* Sweeping radar beam */}
            <div className="absolute inset-0 radar-scan">
              <div
                className="absolute top-1/2 left-1/2 w-1/2 h-0.5"
                style={{
                  transformOrigin: 'left center',
                  background:
                    'linear-gradient(90deg, rgba(0,224,111,0.8), transparent)',
                }}
              />
              {/* Beam glow cone */}
              <div
                className="absolute top-1/2 left-1/2 w-1/2 origin-left"
                style={{
                  height: '60px',
                  marginTop: '-30px',
                  background:
                    'conic-gradient(from -15deg, transparent, rgba(0,224,111,0.08) 15deg, transparent 30deg)',
                }}
              />
            </div>

            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-radar-500 shadow-[0_0_20px_rgba(0,224,111,0.6)]" />
            </div>

            {/* Blips that appear and fade */}
            <div
              className="absolute w-2 h-2 rounded-full bg-radar-400 shadow-[0_0_8px_rgba(0,224,111,0.5)]"
              style={{
                top: '25%',
                left: '65%',
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: '0.3s',
              }}
            />
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-radar-400 shadow-[0_0_8px_rgba(0,224,111,0.5)]"
              style={{
                top: '60%',
                left: '22%',
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: '1.2s',
              }}
            />
            <div
              className="absolute w-2 h-2 rounded-full bg-radar-400 shadow-[0_0_8px_rgba(0,224,111,0.5)]"
              style={{
                top: '40%',
                left: '78%',
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: '0.8s',
              }}
            />
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-radar-400 shadow-[0_0_8px_rgba(0,224,111,0.5)]"
              style={{
                top: '72%',
                left: '58%',
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: '1.8s',
              }}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Scanning your career landscape
          </h2>
          <p className="text-neutral-400 text-sm mb-8">
            Our radar is analyzing market data, skill demand, and growth
            opportunities
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xs mx-auto mb-8">
            <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-radar-500 to-radar-400 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${analyzeProgress}%` }}
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2 font-mono">
              {Math.round(analyzeProgress)}%
            </p>
          </div>

          {/* Sequential status messages */}
          <div className="space-y-2 text-left max-w-sm mx-auto">
            {ANALYSIS_MESSAGES.map((msg, i) => {
              const isVisible = i < visibleMessages;
              const isLatest = i === visibleMessages - 1;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  {isVisible && !isLatest ? (
                    <Check className="w-4 h-4 text-radar-500 shrink-0" />
                  ) : isLatest ? (
                    <div className="w-4 h-4 shrink-0 relative flex items-center justify-center">
                      <div className="absolute w-4 h-4 rounded-full border-2 border-radar-500/30" />
                      <div className="absolute w-4 h-4 rounded-full border-2 border-radar-500 border-t-transparent animate-spin" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      isLatest
                        ? 'text-white'
                        : isVisible
                          ? 'text-neutral-500'
                          : 'text-neutral-600'
                    }`}
                  >
                    {msg}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ====================================================================
  // RENDER: Main onboarding flow
  // ====================================================================
  return (
    <div className="min-h-screen bg-surface-0 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-30" />

      {/* Subtle radar glow in top-right */}
      <div
        className="fixed -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,224,111,1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* ---------------------------------------------------------------- */}
        {/* Step progress indicator                                          */}
        {/* ---------------------------------------------------------------- */}
        <div className="mb-8">
          {/* Step circles */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4">
            {STEP_META.map((meta, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === currentStep;
              const isCompleted = stepNum < currentStep;
              const StepIcon = meta.icon;

              return (
                <div key={i} className="flex items-center">
                  <button
                    onClick={() => {
                      if (isCompleted) {
                        setDirection(stepNum < currentStep ? -1 : 1);
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentStep(stepNum);
                          updateOnboarding({ step: stepNum });
                          setIsTransitioning(false);
                        }, 200);
                      }
                    }}
                    disabled={!isCompleted}
                    className={`
                      relative flex items-center justify-center rounded-full transition-all duration-300
                      ${
                        isActive
                          ? 'w-11 h-11 bg-radar-500 text-surface-0 shadow-[0_0_24px_rgba(0,224,111,0.3)]'
                          : isCompleted
                            ? 'w-9 h-9 bg-radar-500/20 text-radar-500 cursor-pointer hover:bg-radar-500/30'
                            : 'w-9 h-9 bg-surface-3 text-neutral-600'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <StepIcon className={`${isActive ? 'w-5 h-5' : 'w-4 h-4'}`} />
                    )}
                  </button>
                  {i < STEP_META.length - 1 && (
                    <div
                      className={`w-6 sm:w-10 h-px mx-1 transition-colors duration-500 ${
                        stepNum < currentStep
                          ? 'bg-radar-500/50'
                          : 'bg-white/[0.06]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Text label */}
          <div className="text-center">
            <span className="text-xs text-neutral-500 font-mono tracking-wider uppercase">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Main card                                                        */}
        {/* ---------------------------------------------------------------- */}
        <Card padding="none" className="overflow-hidden">
          <div
            className={`p-6 sm:p-8 transition-all duration-200 ${
              isTransitioning
                ? direction === 1
                  ? 'opacity-0 translate-x-4'
                  : 'opacity-0 -translate-x-4'
                : 'opacity-100 translate-x-0'
            }`}
          >
            {/* ============================================================ */}
            {/* STEP 1: Role Selection                                       */}
            {/* ============================================================ */}
            {currentStep === 1 && (
              <div>
                <StepHeader
                  icon={Briefcase}
                  title="What do you do?"
                  subtitle="Select your current role or type a custom one. This powers everything."
                />

                {/* Search / Custom input */}
                <div className="relative mb-5">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search roles or type your own..."
                    value={onboarding.currentRole || roleSearch}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRoleSearch(val);
                      updateOnboarding({ currentRole: val });
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-radar-500 focus:shadow-[0_0_0_3px_rgba(0,224,111,0.1)] text-sm transition-all"
                  />
                </div>

                {/* Role categories */}
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  {ROLE_CATEGORIES.filter((cat) => {
                    if (!roleSearch.trim()) return true;
                    const q = roleSearch.toLowerCase();
                    return cat.roles.some((r) => r.toLowerCase().includes(q));
                  }).map((cat) => {
                    const q = roleSearch.toLowerCase();
                    const roles = roleSearch.trim()
                      ? cat.roles.filter((r) => r.toLowerCase().includes(q))
                      : cat.roles;
                    if (roles.length === 0) return null;
                    return (
                      <div key={cat.label}>
                        <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                          {cat.label}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {roles.map((role) => (
                            <Chip
                              key={role}
                              label={role}
                              selected={onboarding.currentRole === role}
                              onClick={() => {
                                updateOnboarding({ currentRole: role });
                                setRoleSearch('');
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 2: Level & Industry                                     */}
            {/* ============================================================ */}
            {currentStep === 2 && (
              <div>
                <StepHeader
                  icon={User}
                  title="Your experience level & industry"
                  subtitle="We will benchmark you against the right peer group."
                />

                {/* Level grid */}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Your Level
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {LEVEL_OPTIONS.map((lvl) => {
                    const isSelected = onboarding.currentLevel === lvl.value;
                    const LvlIcon = lvl.icon;
                    return (
                      <button
                        key={lvl.value}
                        onClick={() =>
                          updateOnboarding({ currentLevel: lvl.value })
                        }
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                          isSelected
                            ? 'bg-radar-500 text-surface-0 border-radar-500 shadow-[0_0_20px_rgba(0,224,111,0.15)]'
                            : 'bg-surface-3 text-neutral-400 border-transparent hover:bg-surface-4 hover:text-neutral-300'
                        }`}
                      >
                        <LvlIcon
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-surface-0' : 'text-neutral-500 group-hover:text-neutral-400'
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {lvl.label}
                          </p>
                          <p
                            className={`text-[11px] ${
                              isSelected ? 'text-surface-0/70' : 'text-neutral-600'
                            }`}
                          >
                            {lvl.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Industry */}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Industry
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {INDUSTRY_OPTIONS.map((ind) => (
                    <Chip
                      key={ind}
                      label={ind}
                      selected={onboarding.industry === ind}
                      onClick={() => updateOnboarding({ industry: ind })}
                    />
                  ))}
                </div>

                {/* Years of experience */}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Years of Experience
                </p>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={onboarding.yearsExperience || ''}
                  onChange={(e) =>
                    updateOnboarding({
                      yearsExperience: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-radar-500 focus:shadow-[0_0_0_3px_rgba(0,224,111,0.1)] text-sm transition-all"
                  placeholder="e.g. 4"
                />
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 3: Location                                             */}
            {/* ============================================================ */}
            {currentStep === 3 && (
              <div>
                <StepHeader
                  icon={MapPin}
                  title="Where are you based?"
                  subtitle="Salary benchmarks and job demand vary dramatically by location."
                />

                {/* Search */}
                <div className="relative mb-5">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search cities or type your own..."
                    value={onboarding.location || locationSearch}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLocationSearch(val);
                      updateOnboarding({ location: val });
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-radar-500 focus:shadow-[0_0_0_3px_rgba(0,224,111,0.1)] text-sm transition-all"
                  />
                </div>

                {/* India cities */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🇮🇳</span>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      India
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {INDIA_CITIES.filter((c) => {
                      if (!locationSearch.trim()) return true;
                      return c
                        .toLowerCase()
                        .includes(locationSearch.toLowerCase());
                    }).map((city) => (
                      <Chip
                        key={city}
                        label={city}
                        selected={onboarding.location === city}
                        onClick={() => {
                          updateOnboarding({ location: city });
                          setLocationSearch('');
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* International cities */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-neutral-500" />
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      International
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {INTERNATIONAL_CITIES.filter((c) => {
                      if (!locationSearch.trim()) return true;
                      return c
                        .toLowerCase()
                        .includes(locationSearch.toLowerCase());
                    }).map((city) => (
                      <Chip
                        key={city}
                        label={city}
                        selected={onboarding.location === city}
                        onClick={() => {
                          updateOnboarding({ location: city });
                          setLocationSearch('');
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* LinkedIn URL (optional) */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    LinkedIn URL{' '}
                    <span className="text-neutral-600 normal-case font-normal">
                      (optional &mdash; for deeper analysis)
                    </span>
                  </p>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={onboarding.linkedinUrl}
                    onChange={(e) =>
                      updateOnboarding({ linkedinUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface-1 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-radar-500 focus:shadow-[0_0_0_3px_rgba(0,224,111,0.1)] text-sm transition-all"
                  />
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 4: Skills                                               */}
            {/* ============================================================ */}
            {currentStep === 4 && (
              <div>
                <StepHeader
                  icon={Wrench}
                  title="What skills do you have?"
                  subtitle="Pick at least 3. We will find what is missing and what to learn next."
                />

                {/* Skill count badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        onboarding.skills.length >= 3
                          ? 'bg-radar-500/15 text-radar-500'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {onboarding.skills.length >= 3 ? (
                        <Check className="w-3 h-3" />
                      ) : null}
                      {onboarding.skills.length} skill
                      {onboarding.skills.length !== 1 ? 's' : ''} selected
                      {onboarding.skills.length < 3 && (
                        <span className="text-neutral-500 ml-1">
                          (min 3)
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Search + Custom skill input */}
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search or add a skill..."
                      value={customSkill || skillSearch}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomSkill(val);
                        setSkillSearch(val);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          // If the search matches an existing skill exactly, toggle it
                          const exact = ALL_SKILLS.find(
                            (s) =>
                              s.toLowerCase() ===
                              customSkill.trim().toLowerCase()
                          );
                          if (exact) {
                            toggleSkill(exact);
                            setCustomSkill('');
                            setSkillSearch('');
                          } else if (customSkill.trim()) {
                            addCustomSkill();
                            setSkillSearch('');
                          }
                        }
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-1 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-radar-500 focus:shadow-[0_0_0_3px_rgba(0,224,111,0.1)] text-sm transition-all"
                    />
                  </div>
                  {customSkill.trim() &&
                    !ALL_SKILLS.some(
                      (s) =>
                        s.toLowerCase() === customSkill.trim().toLowerCase()
                    ) && (
                      <Button
                        size="sm"
                        onClick={() => {
                          addCustomSkill();
                          setSkillSearch('');
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    )}
                </div>

                {/* Selected skills (always visible) */}
                {onboarding.skills.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-white/[0.06]">
                    <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mb-2">
                      Your Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {onboarding.skills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-radar-500 text-surface-0 transition-all hover:bg-radar-400"
                        >
                          <Check className="w-3 h-3" />
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill grid by category */}
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                  {skillSearch.trim() ? (
                    // Flat filtered list
                    <div className="flex flex-wrap gap-2">
                      {filteredSkills
                        .filter((s) => !onboarding.skills.includes(s))
                        .map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            selected={false}
                            onClick={() => {
                              toggleSkill(skill);
                              setCustomSkill('');
                              setSkillSearch('');
                            }}
                          />
                        ))}
                      {filteredSkills.filter(
                        (s) => !onboarding.skills.includes(s)
                      ).length === 0 && (
                        <p className="text-xs text-neutral-500 py-2">
                          No matching skills found. Press Enter to add &ldquo;
                          {customSkill.trim()}&rdquo; as a custom skill.
                        </p>
                      )}
                    </div>
                  ) : (
                    // Categorized
                    SKILL_CATEGORIES.map((cat) => {
                      const unselected = cat.skills.filter(
                        (s) => !onboarding.skills.includes(s)
                      );
                      if (unselected.length === 0) return null;
                      return (
                        <div key={cat.label}>
                          <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mb-2">
                            {cat.label}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {unselected.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                selected={false}
                                onClick={() => toggleSkill(skill)}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Custom skills not in the master list */}
                  {onboarding.skills.filter((s) => !ALL_SKILLS.includes(s))
                    .length > 0 && (
                    <div>
                      <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mb-2">
                        Custom Skills
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {onboarding.skills
                          .filter((s) => !ALL_SKILLS.includes(s))
                          .map((skill) => (
                            <button
                              key={skill}
                              onClick={() => toggleSkill(skill)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-radar-500 text-surface-0 transition-all hover:bg-radar-400"
                            >
                              <Check className="w-3 h-3" />
                              {skill}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STEP 5: Career Goals                                         */}
            {/* ============================================================ */}
            {currentStep === 5 && (
              <div>
                <StepHeader
                  icon={Target}
                  title="What are you optimizing for?"
                  subtitle="Select one or more goals. We will prioritize skills that get you there."
                />

                <div className="space-y-2">
                  {GOAL_OPTIONS.map(({ goal, desc, icon: GoalIcon }) => {
                    const isSelected = onboarding.careerGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 border ${
                          isSelected
                            ? 'bg-radar-500 text-surface-0 border-radar-500 shadow-[0_0_20px_rgba(0,224,111,0.12)]'
                            : 'bg-surface-3 text-neutral-400 border-transparent hover:bg-surface-4 hover:text-neutral-300'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-surface-0/20'
                              : 'bg-white/[0.04] group-hover:bg-white/[0.06]'
                          }`}
                        >
                          <GoalIcon
                            className={`w-4 h-4 ${
                              isSelected
                                ? 'text-surface-0'
                                : 'text-neutral-500 group-hover:text-neutral-400'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              isSelected ? 'text-surface-0' : ''
                            }`}
                          >
                            {goal}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${
                              isSelected ? 'text-surface-0/60' : 'text-neutral-600'
                            }`}
                          >
                            {desc}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'border-surface-0/40 bg-surface-0/20'
                              : 'border-white/[0.1]'
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-surface-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Navigation footer                                                */}
          {/* ---------------------------------------------------------------- */}
          <div className="px-6 sm:px-8 py-5 border-t border-white/[0.06] flex items-center justify-between bg-surface-2/50">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} disabled={!canProceed()} size="md">
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleAnalyze}
                disabled={!canProceed()}
                size="lg"
                className="shadow-[0_0_30px_rgba(0,224,111,0.2)] hover:shadow-[0_0_40px_rgba(0,224,111,0.3)]"
              >
                <Sparkles className="w-4 h-4" />
                Launch Radar Analysis
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>

        {/* Hint text */}
        <p className="text-center text-[11px] text-neutral-600 mt-4">
          {currentStep < totalSteps
            ? 'Press Enter to continue'
            : 'Your data stays on-device. Nothing is sent to a server.'}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StepHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-11 h-11 rounded-xl bg-radar-500/10 border border-radar-500/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-radar-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white leading-tight">{title}</h2>
        <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
        selected
          ? 'bg-radar-500 text-surface-0 shadow-[0_0_12px_rgba(0,224,111,0.15)]'
          : 'bg-surface-3 text-neutral-400 hover:bg-surface-4 hover:text-neutral-300'
      }`}
    >
      {selected && <Check className="w-3 h-3" />}
      {label}
    </button>
  );
}
