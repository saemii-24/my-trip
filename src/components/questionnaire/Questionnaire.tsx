import ArrowLeft from '@components/icon/ArrowLeft';
import CountryAutoComplete from '@components/questionnaire/CountryAutoComplete';
import React from 'react';

const Questionnaire = () => {
  return (
    <div className='bg-red-300 min-h-screen flex-1 p-12'>
      <div className='bg-white size-full rounded-3xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-3 '>
            <ArrowLeft className='size-5' />
            <span>1-1.</span>
          </div>
          <h1 className='font-bold text-2xl'>어떤 나라를 여행하실 예정이세요?</h1>
          <CountryAutoComplete />
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
