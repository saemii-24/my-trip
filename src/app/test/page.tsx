'use client';
import React, { useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const Test = () => {
  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: '' });

    async function main() {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: 'Explain how AI works in a few words',
        });
        console.log(response.text);
      } catch (error) {
        console.error('Error generating content:', error);
      }
    }

    main();
  }, []);

  return <div className='center-flex'></div>;
};

export default Test;
