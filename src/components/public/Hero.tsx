'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useUnsplashGet from '../../query/useUnsplashGet';
import { countryObj } from '@utils/randomImageKeyword';
import BounceLoading from './BounceLoading';
import { useGeminiGet } from '../../query/useGeminiPost';
import heroPromptFunc from '../../prompt/hero';
import HeroInfo from './HeroInfo';

const Hero = () => {
  //Unsplash Image
  const { country, city } = countryObj;
  const { unsplashData, unsplashIsLoading } = useUnsplashGet(country);

  //Gemini Prompt
  const [prompt, setPrompt] = useState('');
  const { geminiData, geminiGetIsLoading } = useGeminiGet(prompt);

  useEffect(() => {
    if (unsplashData?.description) {
      const heroPrompt = heroPromptFunc({
        country,
        description: unsplashData.description,
      });
      setPrompt(heroPrompt);
    }
  }, [unsplashData]);

  //Loading
  if (unsplashIsLoading) {
    return <BounceLoading />;
  }

  return (
    <div className=' w-[calc(100vw-32px)] h-[calc(100vh-120px)] rounded-2xl overflow-hidden mx-auto relative'>
      <div className='size-full relative'>
        {/* 이미지 배경 */}
        {unsplashData?.urls && (
          <Image
            src={unsplashData?.urls.full}
            alt={unsplashData?.alt_description}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}

        {/* 블랙 그라데이션 오버레이 */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/0 z-10'></div>

        {/* 콘텐츠 영역 */}
        <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>{geminiData?.title}</h1>
          <p className='text-lg md:text-xl mb-6 max-w-2xl'>{geminiData?.content}</p>
          <button className='bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition'>
            자세히
          </button>
        </div>
        <HeroInfo
          className='absolute z-[100] bottom-10 right-10'
          unsplashData={unsplashData}
        />
      </div>
    </div>
  );
};

export default Hero;
