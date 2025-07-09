import React from 'react';
import Image from 'next/image';
import { BasicProps } from '@type/public';
import { cn } from '@utils/cn';
import { UnsplashResponseType } from '@type/unsplashResponseType';
import formatNumberToShort from '@utils/formatNumber';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface HeroInfoProps extends BasicProps {
  unsplashData: UnsplashResponseType | undefined;
}
const HeroInfo = ({ className, unsplashData }: HeroInfoProps) => {
  if (!unsplashData) return;
  return (
    <div
      className={cn(
        'relative max-w-[400px] bg-gray-100 rounded-[60px] backdrop-blur-lg overflow-hidden p-8',
        className,
      )}
    >
      <div className='flex justify-between items-center'>
        <div className='px-2 text-xs py-[3px] font-medium rounded-full  bg-green-600 text-white'>
          VIEWS
        </div>
      </div>
      <Image
        className='absolute top-6 right-8 rounded-full'
        alt=''
        width={50}
        height={50}
        src={unsplashData?.user.profile_image.large}
      />
      <div className=' text-black text-5xl mt-2 font-semibold'>
        {formatNumberToShort(unsplashData?.views)}+
      </div>
      <div className=' text-black text-md font-normal mt-2'>
        이 이미지는 Unsplash에 업로드 된 작가 {unsplashData.user.name}의 이미지에요.
      </div>

      <div className='flex w-full justify-between'>
        <button className='font-medium text-lg text-gray-400 rounded-full transition flex items-center gap-5'>
          <span>Image Info</span>
        </button>
        <button className='rounded-full size-12 flex-center bg-green-600 text-white hover:bg-green-700 transition'>
          <ArrowRight strokeWidth={2} className=' size-5' />
        </button>
      </div>
    </div>
  );
};

export default HeroInfo;
