import { NextRequest, NextResponse } from 'next/server';
import { generateLearningPlan } from '@/lib/analysis-engine';
import { analyzeWithGemini, buildLearningPlanPrompt } from '@/lib/gemini';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gaps, role, level, dailyMinutes } = body;

    if (!gaps || !Array.isArray(gaps)) {
      return NextResponse.json(
        { error: 'Missing required field: gaps (array of SkillGap objects)' },
        { status: 400 }
      );
    }

    // Try Gemini first
    const gapSkills = gaps.slice(0, 3).map((g: { skill: string }) => g.skill);
    if (role && level && gapSkills.length > 0) {
      const prompt = buildLearningPlanPrompt(gapSkills, role, level);
      const result = await analyzeWithGemini(prompt);

      if (result) {
        try {
          const parsed = JSON.parse(result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
          const learningPlan = {
            userId: 'user-1',
            createdAt: new Date().toISOString(),
            targetSkills: gapSkills,
            dailyMinutes: dailyMinutes || 15,
            totalWeeks: Math.ceil((parsed.modules?.length || 15) / 5),
            modules: (parsed.modules || []).map((m: Record<string, unknown>) => ({
              ...m,
              id: uuidv4(),
              completed: false,
            })),
            currentModuleIndex: 0,
            completedModules: 0,
            streakDays: 0,
          };
          return NextResponse.json({ learningPlan, aiPowered: true });
        } catch {
          // Gemini parse failed, fall through to local engine
        }
      }
    }

    // Fallback to local engine
    const learningPlan = generateLearningPlan(gaps, dailyMinutes || 15);
    return NextResponse.json({ learningPlan, aiPowered: false });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate learning plan' },
      { status: 500 }
    );
  }
}
