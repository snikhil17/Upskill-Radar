import { NextRequest, NextResponse } from 'next/server';
import { analyzeSkillGaps, generateLearningPlan, generateWeatherReport } from '@/lib/analysis-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skills, role, level, industry, location } = body;

    if (!skills || !role || !level || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields: skills, role, level, industry' },
        { status: 400 }
      );
    }

    // Run skill gap analysis
    const analysis = analyzeSkillGaps(skills, role, level, industry);

    // Generate learning plan based on gaps
    const learningPlan = generateLearningPlan(analysis.topGaps);

    // Generate weather report
    const weatherReport = generateWeatherReport(
      role,
      location || 'Remote',
      skills,
      analysis.topGaps
    );

    return NextResponse.json({
      analysis,
      learningPlan,
      weatherReport,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to analyze skills' },
      { status: 500 }
    );
  }
}
