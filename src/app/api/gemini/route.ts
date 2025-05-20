import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const geminiApiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API;

export async function POST(req: NextRequest) {
  if (!geminiApiKey) {
    return NextResponse.json(
      { error: 'Gemini API key is not configured' },
      { status: 500 },
    );
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: geminiApiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Gemini' },
      { status: 500 },
    );
  }
}
