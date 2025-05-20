'use client';

import { useMutation } from '@tanstack/react-query';

interface GeminiResponse {
  result: string;
}

interface GeminiRequest {
  prompt: string;
}

export function useGeminiMutation() {
  const geminiMutation = useMutation<GeminiResponse, Error, GeminiRequest>({
    mutationFn: async ({ prompt }) => {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch Gemini response');
      }

      return response.json();
    },
  });

  return {
    mutate: geminiMutation.mutate,
    data: geminiMutation.data,
    isPending: geminiMutation.isPending,
    isError: geminiMutation.isError,
    error: geminiMutation.error,
  };
}
