import React from 'react';
import Image from 'next/image';
import { travelCountry } from '@utils/randomImageKeyword';

const Hero = () => {
  const { images, isLoading } = useUnsplashGet({ keyword: travelCountry });

  const image = images.length ? images[Math.floor(Math.random() * images.length)] : null;

  if (isLoading || !image) return <div>로딩 중...</div>;

  return (
    <div className='w-screen h-[calc(100vh-120px)] relative'>
      <Image
        src={image.urls.regular}
        alt={image.alt_description || '여행 이미지'}
        layout='fill'
        objectFit='cover'
        priority
      />
      <h1 className='absolute bottom-6 left-6 text-white text-4xl font-bold drop-shadow-xl'>
        {image.alt_description || travelCountry}
      </h1>
    </div>
  );
};

export default Hero;
