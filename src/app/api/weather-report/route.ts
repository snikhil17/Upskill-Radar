import { NextRequest, NextResponse } from 'next/server';
import { generateWeatherReport } from '@/lib/analysis-engine';
import { analyzeWithGemini, buildWeatherReportPrompt } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, location, skills, gaps } = body;

    if (!role || !skills) {
      return NextResponse.json(
        { error: 'Missing required fields: role, skills' },
        { status: 400 }
      );
    }

    // Try Gemini first
    const gapSkills = (gaps || []).map((g: { skill?: string } | string) =>
      typeof g === 'string' ? g : g.skill || ''
    );
    const prompt = buildWeatherReportPrompt(role, location || 'Remote', skills, gapSkills);
    const result = await analyzeWithGemini(prompt);

    if (result) {
      try {
        const parsed = JSON.parse(result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
        const weatherReport = {
          userId: 'user-1',
          generatedAt: new Date().toISOString(),
          period: `Week of ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
          ...parsed,
        };
        return NextResponse.json({ weatherReport, aiPowered: true });
      } catch {
        // Gemini parse failed, fall through to local engine
      }
    }

    // Fallback to local engine
    const weatherReport = generateWeatherReport(
      role,
      location || 'Remote',
      skills,
      gaps || []
    );
    return NextResponse.json({ weatherReport, aiPowered: false });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate weather report' },
      { status: 500 }
    );
  }
}
