import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

export async function analyzeWithGemini(prompt: string): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return null;
  }
}

export function buildSkillAnalysisPrompt(
  role: string,
  level: string,
  industry: string,
  location: string,
  skills: string[],
  goals: string[]
): string {
  return `You are a career intelligence analyst. Analyze the following professional profile and provide a detailed skill gap analysis.

PROFILE:
- Role: ${role}
- Level: ${level}
- Industry: ${industry}
- Location: ${location}
- Current Skills: ${skills.join(', ')}
- Career Goals: ${goals.join(', ')}

Respond ONLY with valid JSON (no markdown, no code blocks) in this exact structure:
{
  "topGaps": [
    {
      "skill": "Skill Name",
      "category": "technical|leadership|communication|analytical|domain|tools|soft-skills",
      "currentLevel": "none",
      "requiredLevel": "beginner|intermediate|advanced|expert",
      "demandScore": 85,
      "growthRate": 120,
      "priority": "critical|high|medium|low",
      "reason": "Specific reason why this skill matters for this person's career"
    }
  ],
  "marketFitScore": 65,
  "promotionReadinessScore": 45,
  "automationRiskScore": 35,
  "roleHealthScore": 72,
  "risingSkills": [
    {
      "name": "Skill",
      "category": "technical",
      "trend": "rising",
      "growthRate": 150,
      "demandScore": 90,
      "timeToLearn": "4-6 weeks"
    }
  ],
  "decliningSkills": [
    {
      "name": "Skill",
      "category": "technical",
      "trend": "declining",
      "growthRate": -30,
      "demandScore": 20,
      "timeToLearn": "1-2 weeks"
    }
  ]
}

Rules:
- Provide exactly 5 skill gaps, ordered by priority
- Be specific to the role, level, location (${location}), and industry
- Consider 2026 market trends, especially AI/ML disruption
- Scores are 0-100
- Growth rates are percentages (can be negative for declining)
- Be honest and actionable, not generic
- Rising skills should have 5-8 items, declining 2-3 items
- Consider the Indian/global job market if location is in India`;
}

export function buildLearningPlanPrompt(
  skills: string[],
  role: string,
  level: string
): string {
  return `You are an expert learning designer. Create a personalized 15-minute-per-day learning plan for closing these skill gaps.

TARGET SKILLS (in priority order): ${skills.join(', ')}
ROLE: ${role}
LEVEL: ${level}

Respond ONLY with valid JSON (no markdown, no code blocks) in this exact structure:
{
  "modules": [
    {
      "skillName": "Skill Name",
      "title": "Module Title",
      "description": "What you'll learn and why it matters",
      "estimatedMinutes": 15,
      "resources": [
        {
          "title": "Resource Title",
          "url": "https://actual-real-url.com",
          "type": "video|article|tutorial|exercise|quiz",
          "source": "Platform Name",
          "duration": "12 min",
          "isFree": true
        }
      ],
      "dayNumber": 1
    }
  ]
}

Rules:
- Create 5 modules per skill (15 total for 3 skills)
- Each module should be completable in 15 minutes
- Resources MUST be real, existing, free resources (YouTube, freeCodeCamp, MDN, Kaggle, Google courses, MIT OCW, Khan Academy, official docs, Dev.to, GitHub repos, etc.)
- Progress from fundamentals to hands-on practice
- Day numbers should be sequential (1-15)
- Include a mix of video, reading, and hands-on practice
- URLs must be real and accessible`;
}

export function buildWeatherReportPrompt(
  role: string,
  location: string,
  skills: string[],
  gaps: string[]
): string {
  return `You are a career market analyst. Generate a weekly career weather report for this professional.

ROLE: ${role}
LOCATION: ${location}
CURRENT SKILLS: ${skills.join(', ')}
SKILL GAPS: ${gaps.join(', ')}

Respond ONLY with valid JSON (no markdown, no code blocks) in this exact structure:
{
  "overallOutlook": "sunny|partly-cloudy|cloudy|stormy",
  "roleHealth": {
    "score": 72,
    "trend": "improving|stable|declining",
    "openPositions": 14200,
    "positionsTrend": 3.2
  },
  "automationRisk": {
    "score": 35,
    "trend": "increasing|stable|decreasing",
    "signals": ["Signal 1", "Signal 2", "Signal 3"]
  },
  "competitorActivity": {
    "companiesHiring": ["Company1", "Company2"],
    "newRolesEmerging": ["Role1", "Role2"],
    "salaryTrend": "up|stable|down",
    "averageSalary": "salary range in local currency"
  },
  "recommendations": ["Actionable recommendation 1", "Rec 2", "Rec 3", "Rec 4"],
  "weeklyInsight": "A detailed 2-3 sentence insight about the current state of this role in this location, with specific actionable advice."
}

Rules:
- Be specific to the location (use local currency, local companies, local market trends)
- For India, use INR and mention Indian companies (TCS, Infosys, Flipkart, Razorpay, CRED, Zerodha, etc.)
- Reference real 2026 market conditions
- Automation signals should be specific and evidence-based
- Recommendations must be immediately actionable
- Companies should be real companies actively hiring for this role in this location`;
}
