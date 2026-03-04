'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Scan, BookOpen, CloudSun, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/* ------------------------------------------------------------------ */
/*  Animated Radar SVG                                                 */
/* ------------------------------------------------------------------ */

function RadarVisualization() {
  const [dots, setDots] = useState<{ cx: number; cy: number; delay: number; r: number }[]>([]);

  useEffect(() => {
    // Generate random skill-dot positions within the radar circle
    const generated = Array.from({ length: 12 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 100;
      return {
        cx: 160 + Math.cos(angle) * radius,
        cy: 160 + Math.sin(angle) * radius,
        delay: Math.random() * 4,
        r: 2 + Math.random() * 3,
      };
    });
    setDots(generated);
  }, []);

  return (
    <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] mx-auto select-none">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-radar-500/[0.04] blur-3xl scale-125" />

      <svg
        viewBox="0 0 320 320"
        fill="none"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Radar sweep gradient */}
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,224,111,0)" />
            <stop offset="100%" stopColor="rgba(0,224,111,0.35)" />
          </linearGradient>

          {/* Dot glow filter */}
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Center glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,224,111,0.25)" />
            <stop offset="100%" stopColor="rgba(0,224,111,0)" />
          </radialGradient>
        </defs>

        {/* Concentric radar rings */}
        {[140, 110, 80, 50, 20].map((r) => (
          <circle
            key={r}
            cx="160"
            cy="160"
            r={r}
            stroke="rgba(0,224,111,0.08)"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Cross hairs */}
        <line x1="160" y1="20" x2="160" y2="300" stroke="rgba(0,224,111,0.06)" strokeWidth="1" />
        <line x1="20" y1="160" x2="300" y2="160" stroke="rgba(0,224,111,0.06)" strokeWidth="1" />
        <line x1="60" y1="60" x2="260" y2="260" stroke="rgba(0,224,111,0.04)" strokeWidth="1" />
        <line x1="260" y1="60" x2="60" y2="260" stroke="rgba(0,224,111,0.04)" strokeWidth="1" />

        {/* Center glow */}
        <circle cx="160" cy="160" r="20" fill="url(#centerGlow)" />

        {/* Rotating sweep arm */}
        <g className="radar-scan" style={{ transformOrigin: '160px 160px' }}>
          <path
            d="M160,160 L160,20 A140,140 0 0,1 258,62 Z"
            fill="url(#sweepGrad)"
            opacity="0.6"
          />
          <line
            x1="160"
            y1="160"
            x2="160"
            y2="20"
            stroke="rgba(0,224,111,0.5)"
            strokeWidth="1.5"
          />
        </g>

        {/* Skill dots that pulse */}
        {dots.map((dot, i) => (
          <g key={i} filter="url(#dotGlow)">
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="#00e06f"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.9;0.3"
                dur={`${2 + dot.delay}s`}
                begin={`${dot.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values={`${dot.r};${dot.r + 1.5};${dot.r}`}
                dur={`${2 + dot.delay}s`}
                begin={`${dot.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Cyan accent dots (secondary signal) */}
        <circle cx="220" cy="90" r="2.5" fill="#06b6d4" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="95" cy="230" r="3" fill="#06b6d4" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="200" r="2" fill="#06b6d4" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.8s" begin="0.5s" repeatCount="indefinite" />
        </circle>

        {/* Center dot */}
        <circle cx="160" cy="160" r="3" fill="#00e06f" opacity="0.9" />
        <circle cx="160" cy="160" r="6" fill="none" stroke="#00e06f" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card data                                                  */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Scan,
    title: 'Skill Gap Scanner',
    description:
      'Your skills compared against live market demand for your exact role, level, and geography. No guesswork.',
    accent: 'radar',
    span: 'md:col-span-2', // wider card
  },
  {
    icon: BookOpen,
    title: 'AI Learning Paths',
    description:
      '15 min/day micro-learning from free, curated resources. Built by AI, refined by humans.',
    accent: 'cyan',
    span: 'md:col-span-1',
  },
  {
    icon: CloudSun,
    title: 'Career Weather',
    description:
      'Weekly reports on your role\'s market temperature, hiring velocity, and emerging trends.',
    accent: 'cyan',
    span: 'md:col-span-1',
  },
  {
    icon: Shield,
    title: 'Automation Shield',
    description:
      'AI risk scoring for every skill in your stack. Know what\'s safe, what\'s threatened, and what to learn next.',
    accent: 'radar',
    span: 'md:col-span-2',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Steps data                                                         */
/* ------------------------------------------------------------------ */

const steps = [
  {
    num: '01',
    title: 'Scan',
    description:
      'Enter your role, skills, and goals. Optionally connect LinkedIn for deeper signal.',
  },
  {
    num: '02',
    title: 'Map',
    description:
      'We cross-reference thousands of live job postings, salary data, and hiring trends to chart your gaps.',
  },
  {
    num: '03',
    title: 'Move',
    description:
      'Follow a personalized 15-min/day plan built from free resources. Track progress. Close gaps.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-surface-0">
      {/* ============ BACKGROUND LAYERS ============ */}
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Top radial glow */}
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-radar-500/[0.045] blur-[120px] pointer-events-none" />

      {/* Secondary cyan glow */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[100px] pointer-events-none" />

      {/* ============ HERO ============ */}
      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 sm:pt-32 pb-20">
        {/* Badge */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-sm text-neutral-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-radar-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-radar-500" />
            </span>
            AI-powered career intelligence
          </div>
        </div>

        {/* Two-column: copy + radar viz */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT — Copy */}
          <div
            className={`text-center lg:text-left transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              <span className="text-white">Your career has</span>
              <br />
              <span className="text-white">blind spots.</span>
              <br />
              <span className="text-gradient-radar">We find them.</span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Upskill Radar scans live market data to pinpoint your exact skill gaps,
              then builds a 15-minute-per-day learning path to close them — before
              the market moves on without you.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/onboarding">
                <Button size="lg" className="w-full sm:w-auto text-base group">
                  Scan My Skills
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                  See Demo
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-neutral-600">
              Free analysis in 30 seconds · No credit card required
            </p>
          </div>

          {/* RIGHT — Radar visualization */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <RadarVisualization />
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="relative border-t border-b border-white/[0.04] bg-surface-1/50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
            {[
              { value: '74%', label: 'of professionals lack a clear development path' },
              { value: '15 min', label: 'per day is all it takes to close critical gaps' },
              { value: '3x', label: 'more likely to get promoted with targeted upskilling' },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-[220px] mx-auto">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES — BENTO GRID ============ */}
      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-radar-500 mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Everything you need to
            <br className="hidden sm:block" />
            <span className="text-gradient-radar"> stay ahead</span>
          </h2>
        </div>

        {/* Bento grid: 2-col base → feature cards span 1 or 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isRadar = feature.accent === 'radar';
            const accentColor = isRadar ? 'text-radar-400' : 'text-cyan-400';
            const accentBg = isRadar ? 'bg-radar-500/10' : 'bg-cyan-500/10';
            const accentBorder = isRadar
              ? 'group-hover:border-radar-500/20'
              : 'group-hover:border-cyan-500/20';

            return (
              <div
                key={i}
                className={`group relative rounded-2xl p-7 sm:p-8 glass ${accentBorder} transition-all duration-500 hover:translate-y-[-2px] ${feature.span}`}
              >
                {/* Subtle top-left glow on hover */}
                <div
                  className={`absolute top-0 left-0 w-40 h-40 rounded-full ${
                    isRadar ? 'bg-radar-500/[0.03]' : 'bg-cyan-500/[0.03]'
                  } blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="relative">
                  <div
                    className={`w-11 h-11 rounded-xl ${accentBg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-5 h-5 ${accentColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-10">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-radar-500 mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            From uncertainty to
            <br className="hidden sm:block" />
            <span className="text-gradient-radar"> clear direction</span>
          </h2>
          <p className="mt-5 text-neutral-500 max-w-lg mx-auto">
            Three steps. Five minutes to set up. A career advantage that compounds daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative group rounded-2xl p-8 glass transition-all duration-500 hover:translate-y-[-2px]"
            >
              {/* Step number */}
              <span className="block text-[4.5rem] font-extrabold leading-none text-white/[0.04] mb-4 select-none">
                {step.num}
              </span>

              {/* Connector line between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-white/[0.08]" />
              )}

              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 pb-32">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background layers inside the CTA card */}
          <div className="absolute inset-0 bg-surface-2" />
          <div className="absolute inset-0 bg-gradient-to-br from-radar-500/[0.06] via-transparent to-cyan-500/[0.04]" />
          <div className="absolute inset-0 border border-white/[0.06] rounded-3xl pointer-events-none" />

          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-radar-500/[0.07] blur-[80px] pointer-events-none" />

          <div className="relative px-8 py-16 sm:px-14 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to see what you&apos;re missing?
            </h2>
            <p className="text-neutral-400 max-w-md mx-auto mb-9">
              Join thousands of professionals who traded career anxiety for a clear,
              data-driven plan.
            </p>
            <Link href="/onboarding">
              <Button size="lg" className="text-base group">
                Scan My Skills
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <p className="mt-5 text-sm text-neutral-600">
              Free forever for individuals · No credit card
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
