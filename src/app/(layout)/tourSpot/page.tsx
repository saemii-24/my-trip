'use client';
import { useGeminiGet } from '@query/useGeminiGet';
import tourSpotPrompt from '../../prompt/tourSopt';

export default function TourSpot() {
  const prompt = tourSpotPrompt({ country: '대한민국' });
  const { geminiData } = useGeminiGet(prompt);
  console.log(geminiData);

  return <div></div>;
}
