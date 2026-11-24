import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  const lang = searchParams.get('lang') || 'ur';

  if (!text || text.trim().length === 0) {
    return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
  }

  try {
    // Clean text: strip markdown characters, unwanted symbols
    const cleanedText = text
      .replace(/[*#_~`>]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Split text into chunks <= 160 characters (Google TTS limit per request is ~200 chars)
    const chunks = splitTextIntoChunks(cleanedText, 160);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      if (!chunk.trim()) continue;

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(
        lang
      )}&client=tw-ob&q=${encodeURIComponent(chunk.trim())}`;

      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Referer: 'https://translate.google.com/'
        }
      });

      if (!res.ok) {
        throw new Error(`TTS upstream returned status: ${res.status}`);
      }

      const arrayBuffer = await res.arrayBuffer();
      audioBuffers.push(Buffer.from(arrayBuffer));
    }

    if (audioBuffers.length === 0) {
      return NextResponse.json({ error: 'No audio generated' }, { status: 500 });
    }

    const combinedBuffer = Buffer.concat(audioBuffers);

    return new NextResponse(combinedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Content-Length': combinedBuffer.length.toString()
      }
    });
  } catch (error: any) {
    console.error('TTS Route Error:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to generate audio from TTS service' },
      { status: 500 }
    );
  }
}

function splitTextIntoChunks(text: string, maxLen = 160): string[] {
  // Split on punctuation: Urdu khatma (۔), Urdu comma (،), periods, question marks, exclamation marks
  const sentences = text.match(/[^۔،,?!.\n]+[۔،,?!.\n]*/g) || [text];
  const chunks: string[] = [];
  let current = '';

  for (const s of sentences) {
    if ((current + s).length > maxLen) {
      if (current.trim()) chunks.push(current.trim());
      // If a single sentence is longer than maxLen, split by words
      if (s.length > maxLen) {
        const words = s.split(' ');
        let wordChunk = '';
        for (const w of words) {
          if ((wordChunk + ' ' + w).length > maxLen) {
            if (wordChunk.trim()) chunks.push(wordChunk.trim());
            wordChunk = w;
          } else {
            wordChunk += (wordChunk ? ' ' : '') + w;
          }
        }
        current = wordChunk;
      } else {
        current = s;
      }
    } else {
      current += (current ? ' ' : '') + s;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.length > 0 ? chunks : [text.slice(0, maxLen)];
}
