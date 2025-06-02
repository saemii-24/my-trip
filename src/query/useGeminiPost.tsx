'use client';

import { useQuery } from '@tanstack/react-query';
import { GoogleGenAI } from '@google/genai';

interface GeminiResponse {
  result: string;
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
      const result = response.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // JSON parsing 안전하게 시도
      try {
        return JSON.parse(result);
      } catch {
        return { title: '제목 없음', content: result };
      }
    },
    enabled: !!prompt,
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
