import { useQuery } from '@tanstack/react-query';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API!,
});

// 파싱 함수 타입 명시
export function useGeminiGet<T>(prompt: string, parseFn: (rawText: string) => T) {
  const geminiGet = useQuery<T, Error>({
    queryKey: ['gemini', prompt],
    queryFn: async () => {
      if (!prompt) throw new Error('No prompt');

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return parseFn(rawText); // ✅ 전달받은 함수로 파싱
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
