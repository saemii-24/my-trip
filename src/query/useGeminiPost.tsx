'use client';

import { useQuery } from '@tanstack/react-query';
import { GoogleGenAI } from '@google/genai';
import { itineraryPromptParsing } from '../prompt/itinerary';

interface GeminiResponse {
  title: string;
  content: string;
}

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API!,
});

export function useGeminiGet(prompt: string) {
  const geminiGet = useQuery<GeminiResponse, Error>({
    queryKey: ['gemini', prompt],
    queryFn: async () => {
      if (!prompt) throw new Error('No prompt');

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log(rawText);

      // console.log(itineraryPromptParsing(rawText));

      // return itineraryPromptParsing(rawText);
      // //title과 content로 파싱한다.
      const titleMatch = rawText.match(/Title:\s*(.+)/);
      const contentMatch = rawText.match(/Content:\s*([\s\S]+)/);

      return {
        title: titleMatch?.[1]?.trim() || '',
        content: contentMatch?.[1]?.trim() || '',
      };
    },
    enabled: !!prompt && !!process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API,
    retry: 0,
  });

  return {
    geminiData: geminiGet.data,
    geminiGetIsLoading: geminiGet.isLoading,
    geminiGetIsSuccess: geminiGet.isSuccess,
    geminiGetIsError: geminiGet.isError,
    geminiGetError: geminiGet.error,
  };
}
