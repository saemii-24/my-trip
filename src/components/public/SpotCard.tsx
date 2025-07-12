import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';

const SpotCard = () => {
  const [like, setLike] = useState<boolean>(false);

  const handleLikeClick = () => {
    setLike(!like);
  };
  return (
    <div className='w-1/4  gap-1'>
      <div className='w-full relative aspect-[3/2] rounded-60 overflow-hidden'>
        <Image
          src='https://images.unsplash.com/photo-1609147110688-83b5fd1288e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Full Background'
          fill
          className='object-cover'
          priority
        />
        <div
          onClick={handleLikeClick}
          className='size-10 bg-white rounded-full flex-center absolute top-6 right-6 cursor-pointer'
        >
          <Heart className={like ? 'fill-red-500 text-red-500' : 'text-gray-950'} />
        </div>
      </div>
      <div className='flex flex-col mt-2 gap-1 px-3'>
        <div className='mt-1 text-2xl font-bold'>타이페이 101타워</div>

        <p className='text-lg'>
          타이페이 101은 2004년 완공 당시 세계 최고층이었던 대만의 대표 랜드마크로, 지금도
          타이베이를 상징하는 초고층 빌딩이다.
        </p>
        <p className='flex gap-1 text-gray-500 text-sm'>
          <MapPin className={'fill-gray-500 text-white'} scale={10} />
          <span>110 대만 Taipei City, Xinyi District, Section 5, Xinyi Rd, 7號89樓</span>
        </p>
      </div>
    </div>
  );
};

export default SpotCard;
