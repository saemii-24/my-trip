'use client';
import React from 'react';
import useUnsplashGet from '../../query/useUnsplashGet';
import { country } from '@utils/randomImageKeyword';

const Hero = () => {
  const { unsplashData, unsplashIsLoading } = useUnsplashGet(country);

  // if (unsplashIsLoading) {
  //   return <Loading />;
  // }

  return (
    <div className='w-screen h-[calc(100vh-120px)] relative'>
      {/* <Image
        src={image.urls.regular}
        alt={image.alt_description || '여행 이미지'}
        layout='fill'
        objectFit='cover'
        priority
      />
      <h1 className='absolute bottom-6 left-6 text-white text-4xl font-bold drop-shadow-xl'>
        {image.alt_description || travelCountry}
      </h1> */}
    </div>
  );
};

export default Hero;
