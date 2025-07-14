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
      <div className='w-full relative aspect-[5/3] rounded-60 overflow-hidden'>
        <Image
          src={placeData.photoUrl || ''}
          alt={placeData.name || '여행 장소 이미지'}
          fill
          className='object-cover'
          priority
        />
        {/* 별점 */}
        <div className='h-10 rounded-full flex gap-1 flex-center px-3 bg-black/30 backdrop-blur-xl text-white absolute top-6 left-6'>
          <Star className='fill-yellow-400 text-yellow-400' size={18} />
          <span>{placeData.rating || '-'}</span>
        </div>
        {/* 좋아요 */}
        <div
          onClick={handleLikeClick}
          className='size-10 bg-white rounded-full flex-center absolute top-6 right-6 cursor-pointer'
        >
          <Heart className={like ? 'fill-red-500 text-red-500' : 'text-gray-950'} />
        </div>
      </div>
      <div className='flex flex-col mt-3 gap-1 px-3'>
        <div className='mt-2 text-3xl font-bold'>{placeData.name || ''}</div>
        <p className=' text-lg text-gray-800'>{placeData.description || ''}</p>
        <p className='flex gap-1 text-gray-400 text-sm mt-1'>
          <MapPin size={16} className='mt-[1px] fill-green-500 text-white' />
          {placeData.address || ''}
        </p>
      </div>
    </div>
  );
};

export default SpotCard;
