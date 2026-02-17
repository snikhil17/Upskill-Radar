import { NextRequest, NextResponse } from 'next/server';
import { analyzeSkillGaps, generateLearningPlan, generateWeatherReport } from '@/lib/analysis-engine';
import { analyzeWithGemini, buildSkillAnalysisPrompt, buildLearningPlanPrompt, buildWeatherReportPrompt } from '@/lib/gemini';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skills, role, level, industry, location, goals } = body;

    if (!skills || !role || !level || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields: skills, role, level, industry' },
        { status: 400 }
      );
    }

    // Try Gemini first
    const geminiPrompt = buildSkillAnalysisPrompt(role, level, industry, location || 'Remote', skills, goals || []);
    const geminiResult = await analyzeWithGemini(geminiPrompt);

    let analysis;
    let learningPlan;
    let weatherReport;
    let aiPowered = false;

    if (geminiResult) {
      try {
        const parsed = JSON.parse(geminiResult.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
        analysis = {
          userId: 'user-1',
          analyzedAt: new Date().toISOString(),
          ...parsed,
        };
        aiPowered = true;

        // Get AI learning plan
        const gapSkills = parsed.topGaps?.slice(0, 3).map((g: { skill: string }) => g.skill) || [];
        const lpPrompt = buildLearningPlanPrompt(gapSkills, role, level);
        const lpResult = await analyzeWithGemini(lpPrompt);

        if (lpResult) {
          try {
            const lpParsed = JSON.parse(lpResult.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
            learningPlan = {
              userId: 'user-1',
              createdAt: new Date().toISOString(),
              targetSkills: gapSkills,
              dailyMinutes: 15,
              totalWeeks: Math.ceil((lpParsed.modules?.length || 15) / 5),
              modules: (lpParsed.modules || []).map((m: Record<string, unknown>) => ({
                ...m,
                id: uuidv4(),
                completed: false,
              })),
              currentModuleIndex: 0,
              completedModules: 0,
              streakDays: 0,
            };
          } catch {
            learningPlan = generateLearningPlan(analysis.topGaps || []);
          }
        } else {
          learningPlan = generateLearningPlan(analysis.topGaps || []);
        }

        // Get AI weather report
        const wrPrompt = buildWeatherReportPrompt(role, location || 'Remote', skills, gapSkills);
        const wrResult = await analyzeWithGemini(wrPrompt);

        if (wrResult) {
          try {
            const wrParsed = JSON.parse(wrResult.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
            weatherReport = {
              userId: 'user-1',
              generatedAt: new Date().toISOString(),
              period: `Week of ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
              ...wrParsed,
              skillDemand: {
                rising: parsed.risingSkills || [],
                declining: parsed.decliningSkills || [],
              },
            };
          } catch {
            weatherReport = generateWeatherReport(role, location || 'Remote', skills, analysis.topGaps || []);
          }
        } else {
          weatherReport = generateWeatherReport(role, location || 'Remote', skills, analysis.topGaps || []);
        }
      } catch {
        // Gemini parse failed, fall back to local engine
        analysis = analyzeSkillGaps(skills, role, level, industry);
        learningPlan = generateLearningPlan(analysis.topGaps);
        weatherReport = generateWeatherReport(role, location || 'Remote', skills, analysis.topGaps);
      }
    } else {
      // No Gemini, use local engine
      analysis = analyzeSkillGaps(skills, role, level, industry);
      learningPlan = generateLearningPlan(analysis.topGaps);
      weatherReport = generateWeatherReport(role, location || 'Remote', skills, analysis.topGaps);
    }

    return NextResponse.json({
      analysis,
      learningPlan,
      weatherReport,
      aiPowered,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to analyze skills' },
      { status: 500 }
    );
  }
}
