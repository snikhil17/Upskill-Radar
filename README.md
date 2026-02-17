# Upskill Radar

A personalized AI career intelligence system that monitors your industry, job postings, and skill trends to tell you exactly what to learn next.

## Features

- **Skill Gap Analysis** - Compare your skills to real market demand for your role, level, and geography
- **Rising Skill Alerts** - Know which skills are surging in demand before everyone else
- **15-Min Daily Learning Plans** - Curated free resources in a micro-learning path designed for busy professionals
- **Career Weather Reports** - Weekly intelligence on your role's health, automation risk, and market trends
- **Automation Risk Score** - Understand how resilient your skillset is to AI disruption
- **Promotion Readiness Score** - See how your skills compare to people getting promoted

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── analyze/      # Skill gap analysis endpoint
│   │   ├── learning-plan/ # Learning plan generation
│   │   └── weather-report/ # Career weather report
│   ├── dashboard/        # Main dashboard page
│   ├── onboarding/       # User onboarding flow
│   └── page.tsx          # Landing page
├── components/
│   ├── dashboard/        # Dashboard components
│   ├── landing/          # Landing page components
│   ├── onboarding/       # Onboarding flow
│   └── ui/               # Reusable UI components
├── lib/
│   ├── analysis-engine.ts # Core skill analysis logic
│   └── mock-data.ts      # Demo/mock data
├── store/
│   └── app-store.ts      # Zustand state management
└── types/
    └── index.ts          # TypeScript type definitions
```

## How It Works

1. **Onboarding** - Users enter their role, level, industry, location, skills, and career goals
2. **Analysis** - The engine compares user skills against a market demand database of in-demand skills
3. **Gap Identification** - Top skill gaps are ranked by demand score, growth rate, and relevance
4. **Learning Plan** - A personalized 15-min/day learning path is generated from free resources
5. **Weather Report** - Weekly career intelligence covering role health, automation risk, and trends

## API Endpoints

### POST /api/analyze
Runs a full skill gap analysis and returns analysis, learning plan, and weather report.

### POST /api/learning-plan
Generates a personalized learning plan from identified skill gaps.

### POST /api/weather-report
Generates a career weather report for a given role and location.
