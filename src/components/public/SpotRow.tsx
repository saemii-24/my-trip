import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';
import { GooglePlaceData } from '@query/useGooglePlaceGet';

const SpotRow = ({ placeData }: { placeData: GooglePlaceData }) => {
  const [like, setLike] = useState<boolean>(false);

  const handleLikeClick = () => {
    setLike(!like);
  };
  return (
    <div className='w-full flex  gap-5 border-b border-zinc-100 pb-3'>
      <div className='h-[200px] aspect-[5/3] relative shrink-0 rounded-[40px] overflow-hidden'>
        <Image
          src={placeData.photoUrl || ''}
          alt={placeData.name || '여행 장소 이미지'}
          fill
          className='object-cover'
          priority
        />
      </div>

      <div className='flex flex-col mt-3 gap-1 px-3'>
        {/* 별점 */}
        {/* 좋아요 */}
        <div className='flex justify-between items-center'>
          <div className='mt-2 text-3xl font-bold'>{placeData.name || ''}</div>{' '}
          <div
            onClick={handleLikeClick}
            className='size-10 bg-white rounded-full flex-center absolute top-6 right-6 cursor-pointer'
          >
            <Heart className={like ? 'fill-red-500 text-red-500' : 'text-gray-950'} />
          </div>
        </div>
        <div className='items-center rounded-full flex gap-1 '>
          <Star className='fill-yellow-400 text-yellow-400' size={18} />
          <span>{placeData.rating || '-'}</span>
        </div>
        <div className=' items-center rounded-full flex gap-1 text-gray-400 '>
          <MapPin className=' fill-green-500 text-white' size={18} />
          {placeData.address || ''}
        </div>
        <p className='mt-1 text-lg text-gray-800 break-keep'>
          {placeData.description || ''}
        </p>
      </div>
    </div>
  );
};

export default SpotRow;
