import { NextRequest, NextResponse } from 'next/server';
import { queryPakistaniLaw } from '@/lib/legalEngine';

// In-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 60; // Max 60 requests per minute

  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < windowMs);

  if (recent.length >= maxRequests) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  // Remove control characters and limit length to 1000 chars
  return input
    .replace(/[<>]/g, '') // Strip angle brackets to prevent HTML/XSS
    .trim()
    .slice(0, 1000);
}

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'بہت زیادہ درخواستیں بھیجی گئی ہیں۔ براہ کرم کچھ دیر بعد کوشش کریں۔ / Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawQuery = body?.query || '';
    const query = sanitizeInput(rawQuery);

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'براہ کرم اپنا قانونی سوال درج کریں۔ / Please provide a valid legal query.' },
        { status: 400 }
      );
    }

    // Process query through verified Pakistani Legal Engine
    const result = queryPakistaniLaw(query);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result
    });
  } catch (error: any) {
    console.error('Legal Query API Error:', error?.message || error);
    return NextResponse.json(
      { error: 'قانونی سوال کے تجزیے میں غیر متوقع مسئلہ پیش آیا۔ / Internal error processing legal query.' },
      { status: 500 }
    );
  }
}
