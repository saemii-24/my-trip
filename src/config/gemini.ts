import { GoogleGenAI } from '@google/genai';

const geminiApikey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API;
const ai = new GoogleGenAI({ apiKey: geminiApikey });

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'Explain how AI works in a few words',
  });
  console.log(response.text);
}

main();
