import React from 'react';
import Image from 'next/image';
import { BasicProps } from '@type/public';
import { cn } from '@utils/cn';
import { UnsplashResponseType } from '@type/unsplashResponseType';
import formatNumberToShort from '@utils/formatNumber';

interface HeroInfoProps extends BasicProps {
  unsplashData: UnsplashResponseType | undefined;
}
const HeroInfo = ({ className, unsplashData }: HeroInfoProps) => {
  if (!unsplashData) return;
  return (
    <div
      className={cn(
        'relative max-w-[380px] bg-zinc-100 rounded-[60px] backdrop-blur-lg overflow-hidden p-8',
        className,
      )}
    >
      <div className='flex justify-between items-center'>
        <div className='px-2 text-xs py-[2px] rounded-full outline outline-1  outline-sky-500  text-sky-500'>
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
        <br />
        자세한 이미지 정보가 궁금하시면 클릭해보세요!
      </div>
    </div>
  );
};

export default HeroInfo;
