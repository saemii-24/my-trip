import ArrowLeft from '@components/icon/ArrowLeft';
import React from 'react';

interface TitleProps {
  num: string;
  title: string;
}

const Title = ({ num, title }: TitleProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <ArrowLeft className='size-4' />
        <span className='text-sm'>{num}</span>
      </div>
      <h1 className='font-bold text-lg'>{title}</h1>
    </div>
  );
};

export default Title;
