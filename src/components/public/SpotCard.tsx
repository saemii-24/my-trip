import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';
import { GooglePlaceData } from '@query/useGooglePlaceGet';

const SpotCard = ({ placeData }: { placeData: GooglePlaceData }) => {
  const [like, setLike] = useState<boolean>(false);

  const handleLikeClick = () => {
    setLike(!like);
  };
  return (
    <div className='w-full  gap-1'>
      <div className='w-full relative aspect-[3/2] rounded-60 overflow-hidden'>
        <Image
          src={placeData.photoUrl || ''}
          alt={placeData.name || '여행 장소 이미지'}
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
        <div className='mt-1 text-2xl font-bold'>{placeData.name || ''}</div>

        <p className='text-lg'>{placeData.description || ''}</p>
        <p className='flex gap-1 text-gray-500 text-sm'>
          <MapPin className={'fill-gray-500 text-white'} scale={10} />
          <span>{placeData.address || ''}</span>
        </p>
      </div>
    </div>
  );
};

export default SpotCard;
