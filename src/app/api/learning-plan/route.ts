import { NextRequest, NextResponse } from 'next/server';
import { generateLearningPlan } from '@/lib/analysis-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gaps, dailyMinutes } = body;

    if (!gaps || !Array.isArray(gaps)) {
      return NextResponse.json(
        { error: 'Missing required field: gaps (array of SkillGap objects)' },
        { status: 400 }
      );
    }

    const learningPlan = generateLearningPlan(gaps, dailyMinutes || 15);

    return NextResponse.json({ learningPlan });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate learning plan' },
      { status: 500 }
    );
  }
}
