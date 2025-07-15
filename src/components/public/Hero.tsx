'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useUnsplashGet from '../../query/useUnsplashGet';
import { countryObj } from '@utils/randomImageKeyword';
import BounceLoading from './BounceLoading';
import { useGeminiGet } from '../../query/useGeminiGet';
import heroPromptFunc, { heroPromptParsing } from '../../prompt/hero';
import HeroInfo from './HeroInfo';
import { ChevronRight } from 'lucide-react';
import Container from './Container';

const Hero = () => {
  const { country } = countryObj;
  const { unsplashData, unsplashIsLoading } = useUnsplashGet(country);

  console.log(unsplashData);

  //Gemini Prompt
  const [prompt, setPrompt] = useState('');
  const { geminiData, geminiGetIsLoading } = useGeminiGet(prompt, heroPromptParsing);

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
    <div className=' w-[calc(100vw-32px)] h-[calc(100vh-120px)] rounded-[60px] overflow-hidden mx-auto relative'>
      <div className='size-full relative '>
        <Image
          src={unsplashData?.urls.full || ''}
          alt={unsplashData?.alt_description || ''}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        {/* 블랙 그라데이션 오버레이 */}
        <div className='absolute  inset-0 bg-gradient-to-b to-black/70 from-black/0 z-10'></div>

        {/* 콘텐츠 영역 */}
        <Container className='absolute inset-0 z-[10] text-white'>
          <div className='absolute left-4 bottom-20'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4 max-w-[55%] !leading-[130%] break-keep'>
              {geminiData?.title}
            </h1>
            <p className='text-lg md:text-xl mb-6  max-w-[60%] break-keep'>
              {geminiData?.content}
            </p>
            <div className='flex items-center gap-3'>
              <button className='bg-green-600 text-white  font-medium text-lg px-8 py-3 rounded-full hover:bg-green-700 transition'>
                See more
              </button>
              <button className=' text-white group font-medium text-lg px-8 py-3 rounded-full transition flex items-center gap-5'>
                <span className='group-hover:underline'>Make Plan</span>
                <ChevronRight strokeWidth={2} className='text-white size-5' />
              </button>
            </div>
          </div>
          <HeroInfo className='absolute  bottom-20 right-4' unsplashData={unsplashData} />
        </Container>
      </div>
    </div>
  );
};

export default Hero;
