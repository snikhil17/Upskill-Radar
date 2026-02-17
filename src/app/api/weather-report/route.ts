import { NextRequest, NextResponse } from 'next/server';
import { generateWeatherReport } from '@/lib/analysis-engine';

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

    const weatherReport = generateWeatherReport(
      role,
      location || 'Remote',
      skills,
      gaps || []
    );

    return NextResponse.json({ weatherReport });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate weather report' },
      { status: 500 }
    );
  }
}
