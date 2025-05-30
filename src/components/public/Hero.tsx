'use client';
import React from 'react';
import Image from 'next/image';
import useUnsplashGet from '../../query/useUnsplashGet';
import { country } from '@utils/randomImageKeyword';
import BounceLoading from './BounceLoading';

const Hero = () => {
  const { unsplashData, unsplashIsLoading } = useUnsplashGet(country);

  console.log(unsplashData);

  if (unsplashIsLoading) {
    return <BounceLoading />;
  }

  return (
    <div className='w-screen h-[calc(100vh-120px)] relative'>
      {unsplashData?.urls && (
        <Image
          src={unsplashData?.urls.regular}
          alt={'여행 이미지'}
          layout='fill'
          objectFit='cover'
          priority
        />
      )}
    </div>
  );
};

export default Hero;
