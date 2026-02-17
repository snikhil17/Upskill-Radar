'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  MapPin,
  Wrench,
  Target,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAppStore } from '@/store/app-store';
import { analyzeSkillGaps, generateLearningPlan, generateWeatherReport } from '@/lib/analysis-engine';

const ROLE_SUGGESTIONS = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'DevOps Engineer',
  'Data Analyst',
  'Engineering Manager',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'ML Engineer',
  'Business Analyst',
  'Project Manager',
  'QA Engineer',
  'Solutions Architect',
];

const LEVEL_OPTIONS = [
  'Entry Level / Junior',
  'Mid-Level',
  'Senior',
  'Staff / Principal',
  'Lead',
  'Manager',
  'Director',
  'VP / Executive',
];

const INDUSTRY_OPTIONS = [
  'Technology',
  'Finance / Fintech',
  'Healthcare / Biotech',
  'E-commerce / Retail',
  'Media / Entertainment',
  'Education / EdTech',
  'Enterprise / SaaS',
  'Consulting',
  'Government',
  'Startup',
  'Other',
];

const SKILL_SUGGESTIONS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++',
  'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Spring Boot',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'SQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
  'System Design', 'Microservices', 'REST APIs', 'GraphQL',
  'Git', 'CI/CD', 'Terraform', 'Linux',
  'Agile', 'Scrum', 'Project Management',
  'Data Analysis', 'Data Visualization', 'Tableau', 'Power BI',
  'Product Strategy', 'User Research', 'A/B Testing',
  'Leadership', 'Communication', 'Stakeholder Management',
];

const GOAL_OPTIONS = [
  'Get promoted to next level',
  'Switch to a different role',
  'Increase my salary',
  'Stay relevant in AI era',
  'Become a tech lead',
  'Transition into management',
  'Learn AI/ML skills',
  'Improve job security',
  'Build side projects',
  'Start a company',
];

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

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      updateOnboarding({ step: currentStep + 1 });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      updateOnboarding({ step: currentStep - 1 });
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    // Simulate analysis delay for UX
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Run analysis
    const analysis = analyzeSkillGaps(
      onboarding.skills,
      onboarding.currentRole,
      onboarding.currentLevel,
      onboarding.industry
    );
    setAnalysis(analysis);

    // Generate learning plan
    const plan = generateLearningPlan(analysis.topGaps);
    setLearningPlan(plan);

    // Generate weather report
    const report = generateWeatherReport(
      onboarding.currentRole,
      onboarding.location,
      onboarding.skills,
      analysis.topGaps
    );
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

    setIsAnalyzing(false);
    router.push('/dashboard');
  };

  const toggleSkill = (skill: string) => {
    const skills = onboarding.skills.includes(skill)
      ? onboarding.skills.filter((s) => s !== skill)
      : [...onboarding.skills, skill];
    updateOnboarding({ skills });
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !onboarding.skills.includes(customSkill.trim())) {
      updateOnboarding({ skills: [...onboarding.skills, customSkill.trim()] });
      setCustomSkill('');
    }
  };

  const toggleGoal = (goal: string) => {
    const goals = onboarding.careerGoals.includes(goal)
      ? onboarding.careerGoals.filter((g) => g !== goal)
      : [...onboarding.careerGoals, goal];
    updateOnboarding({ careerGoals: goals });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return onboarding.currentRole.length > 0;
      case 2:
        return onboarding.currentLevel.length > 0 && onboarding.industry.length > 0;
      case 3:
        return onboarding.location.length > 0;
      case 4:
        return onboarding.skills.length >= 3;
      case 5:
        return onboarding.careerGoals.length >= 1;
      default:
        return false;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Analyzing your career data...
          </h2>
          <div className="space-y-3 text-left">
            {[
              'Scanning job postings for your role...',
              'Comparing skills to market demand...',
              'Identifying your top skill gaps...',
              'Building your personalized learning plan...',
              'Generating career weather report...',
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-slate-400"
                style={{ animationDelay: `${i * 500}ms` }}
              >
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-slate-400">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card padding="lg">
          {/* Step 1: Role */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    What&apos;s your current role?
                  </h2>
                  <p className="text-sm text-slate-400">
                    We&apos;ll analyze job market data specific to your role
                  </p>
                </div>
              </div>

              <input
                type="text"
                placeholder="e.g., Software Engineer"
                value={onboarding.currentRole}
                onChange={(e) => updateOnboarding({ currentRole: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
              />

              <div className="flex flex-wrap gap-2">
                {ROLE_SUGGESTIONS.map((role) => (
                  <button
                    key={role}
                    onClick={() => updateOnboarding({ currentRole: role })}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      onboarding.currentRole === role
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Level & Industry */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Level & Industry
                  </h2>
                  <p className="text-sm text-slate-400">
                    This helps us compare you to the right peer group
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LEVEL_OPTIONS.map((level) => (
                    <button
                      key={level}
                      onClick={() => updateOnboarding({ currentLevel: level })}
                      className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all ${
                        onboarding.currentLevel === level
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Industry
                </label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRY_OPTIONS.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => updateOnboarding({ industry })}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        onboarding.industry === industry
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Years of experience
                </label>
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
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 4"
                />
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Where are you based?
                  </h2>
                  <p className="text-sm text-slate-400">
                    Job market data varies significantly by location
                  </p>
                </div>
              </div>

              <input
                type="text"
                placeholder="e.g., San Francisco, CA"
                value={onboarding.location}
                onChange={(e) => updateOnboarding({ location: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              />

              <div className="flex flex-wrap gap-2">
                {[
                  'San Francisco, CA',
                  'New York, NY',
                  'Seattle, WA',
                  'Austin, TX',
                  'Boston, MA',
                  'Chicago, IL',
                  'Los Angeles, CA',
                  'Denver, CO',
                  'Remote',
                  'London, UK',
                  'Toronto, Canada',
                  'Berlin, Germany',
                  'Bangalore, India',
                  'Singapore',
                ].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => updateOnboarding({ location: loc })}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      onboarding.location === loc
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  LinkedIn URL (optional - for deeper analysis)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={onboarding.linkedinUrl}
                  onChange={(e) =>
                    updateOnboarding({ linkedinUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Step 4: Skills */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    What skills do you have?
                  </h2>
                  <p className="text-sm text-slate-400">
                    Select at least 3 skills. We&apos;ll find what&apos;s missing.
                  </p>
                </div>
              </div>

              {/* Selected count */}
              <div className="mb-4 text-sm text-slate-400">
                {onboarding.skills.length} skills selected
                {onboarding.skills.length < 3 && (
                  <span className="text-amber-400 ml-2">
                    (select at least 3)
                  </span>
                )}
              </div>

              {/* Custom skill input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Add a custom skill..."
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()}
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <Button size="sm" onClick={addCustomSkill}>
                  Add
                </Button>
              </div>

              {/* Skill grid */}
              <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto pr-2">
                {SKILL_SUGGESTIONS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      onboarding.skills.includes(skill)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {onboarding.skills.includes(skill) && '✓ '}
                    {skill}
                  </button>
                ))}
                {/* Custom skills that aren't in suggestions */}
                {onboarding.skills
                  .filter((s) => !SKILL_SUGGESTIONS.includes(s))
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="px-3 py-1.5 rounded-lg text-sm bg-indigo-500 text-white transition-all"
                    >
                      ✓ {skill}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Step 5: Goals */}
          {currentStep === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    What are your career goals?
                  </h2>
                  <p className="text-sm text-slate-400">
                    We&apos;ll prioritize skills that align with your ambitions
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {GOAL_OPTIONS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`w-full px-4 py-3 rounded-xl text-sm text-left transition-all ${
                      onboarding.careerGoals.includes(goal)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {onboarding.careerGoals.includes(goal) ? '✓ ' : ''}
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleAnalyze}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                Analyze My Skill Gaps
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
