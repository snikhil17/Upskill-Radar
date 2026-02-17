'use client';

import { ArrowRight, Zap, TrendingUp, Shield, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Announcement banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
            <Zap className="w-4 h-4" />
            <span>AI-powered career intelligence for the age of disruption</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Stop guessing.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Start upskilling.
            </span>
          </h1>

          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The Upskill Radar analyzes your skills against real market demand,
            identifies your exact gaps, and builds a 15-minute-per-day learning
            path to close them. No more guessing what to learn.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="w-full sm:w-auto text-base">
                Analyze My Skill Gaps
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                View Demo Dashboard
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Free analysis in 30 seconds. No credit card required.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: '74%', label: 'of workers lack clear development paths' },
            { value: '142%', label: 'growth in AI skill demand' },
            { value: '15 min', label: 'per day to close skill gaps' },
            { value: '3x', label: 'more likely to get promoted' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Skill Gap Analysis',
              description:
                'Compare your skills to what the market demands for your exact role, level, and location.',
              color: 'text-indigo-400',
              bgColor: 'bg-indigo-500/10',
            },
            {
              icon: Zap,
              title: 'Rising Skill Alerts',
              description:
                'Know which skills are surging in demand before everyone else catches on.',
              color: 'text-amber-400',
              bgColor: 'bg-amber-500/10',
            },
            {
              icon: BookOpen,
              title: '15-Min Learning Plans',
              description:
                'Curated free resources in a daily micro-learning path designed for busy professionals.',
              color: 'text-emerald-400',
              bgColor: 'bg-emerald-500/10',
            },
            {
              icon: Shield,
              title: 'Career Weather Reports',
              description:
                'Weekly intelligence on your role\'s health, automation risk, and market trends.',
              color: 'text-purple-400',
              bgColor: 'bg-purple-500/10',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            How it works
          </h2>
          <p className="text-center text-slate-400 mb-16 max-w-xl mx-auto">
            From career anxiety to clear action in three steps
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Tell us about you',
                description:
                  'Enter your role, skills, and career goals. Optionally connect your LinkedIn for richer analysis.',
              },
              {
                step: '02',
                title: 'Get your skill radar',
                description:
                  'We analyze thousands of job postings and hiring trends to find your exact skill gaps and opportunities.',
              },
              {
                step: '03',
                title: 'Start your 15-min plan',
                description:
                  'Follow a personalized micro-learning path built from free resources. Track progress daily.',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-slate-800 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
            <h2 className="text-2xl font-bold text-white mb-2">
              Ready to see your skill gaps?
            </h2>
            <p className="text-slate-400 mb-6">
              Join thousands of professionals who stopped guessing and started growing.
            </p>
            <Link href="/onboarding">
              <Button size="lg">
                Get My Free Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
