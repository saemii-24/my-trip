import { BasicProps } from '@type/public';
import React from 'react';

interface BackgroundDescriptionProps extends BasicProps {
  userName?: string;
}

const BackgroundDescription = ({ className, userName }: BackgroundDescriptionProps) => {
  return (
    <div className={className}>
      {/* 설명 텍스트나 이미지 오버레이 배치 가능 */}
      <div className='mt-[-10vh] text-white'>
        <div className='bg-lime-800  bg-opacity-30 backdrop-blur-lg px-4 py-2 rounded mb-2'>
          <p className='text-xs'>Photo By. {userName || 'unsplash'}</p>
          <p className='font-semibold'>Jeju, 대한민국</p>
        </div>
        <div className='bg-lime-800  bg-opacity-30 backdrop-blur-lg px-4 py-2 rounded'>
          <p className='text-sm'>brown and green island on sea during daytime</p>
          {/* <p className='text-sm'>{unsplashData?.alt_description}</p> */}
        </div>
      </div>
    </div>
  );
};

export default BackgroundDescription;
