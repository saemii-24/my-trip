import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Container from '../Container';
import React from 'react';
import { cn } from '@utils/cn';

interface CardProps {
  id: string;
  title: string;
  description: string;
  select: string;
  setSelect: Dispatch<SetStateAction<string>>;
}

const Card = ({ title, description, id, select, setSelect }: CardProps) => {
  return (
    <div
      className={cn(
        ' relative h-[600px] rounded-[60px] w-[22%] overflow-hidden transition-all cursor-pointer',
        {
          'w-[calc(100%-60%-24px)]': select === id,
        },
      )}
      onMouseEnter={() => {
        setSelect(id);
      }}
    >
      <button
        className={cn(
          'absolute z-[11]  right-10 top-10 rounded-full size-12 center-flex bg-white transition-all hover:bg-green-50 ',
          {
            'bg-green-400': select === id,
          },
        )}
      >
        <ArrowRight
          strokeWidth={1.5}
          className={cn('transition size-7', {
            '-rotate-45': select !== id,
          })}
        />
      </button>
      <Image
        src={
          'https://images.unsplash.com/photo-1526682847805-721837c3f83b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        alt={''}
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      {/* 블랙 그라데이션 오버레이 */}
      <div className='absolute  inset-0 bg-gradient-to-b to-black/70 from-black/0 z-10'></div>
      {/* 콘텐츠 영역 */}
      <div className='absolute  text-white z-[10] bottom-10 px-10 w-full'>
        <h1 className='text-3xl font-bold !leading-[120%] break-keep mb-2'>
          {title.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        <p className='text-lg mb-6  break-keep'>{description}</p>
        <div className='flex items-center gap-3 w-full'>
          <button className='bg-white text-gray-950 flex items-center justify-between font-medium text-lg pl-6 pr-5 py-3 w-full rounded-full hover:bg-green-700 transition'>
            <span className='group-hover:underline'>See more</span>
            <ChevronRight strokeWidth={2} className='size-5' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
