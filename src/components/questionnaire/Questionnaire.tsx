import ArrowLeft from '@components/icon/ArrowLeft';
import React from 'react';
import CountryCitySelector from './First/CountryCitySelector';
const Questionnaire = () => {
  return (
    <div className='bg-red-300 min-h-screen flex-1 p-12'>
      <div className='bg-white size-full rounded-3xl px-20 py-[160px] '>
        <div className='flex flex-col h-full gap-2'>
          <div className='flex items-center gap-3'>
            <ArrowLeft className='size-4' />
            <span className='text-sm'>1-1.</span>
          </div>
          <h1 className='font-bold text-lg'>어떤 나라를 여행하실 예정이세요?</h1>
          <div className='w-full mt-auto mb-10'>
            <CountryCitySelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
