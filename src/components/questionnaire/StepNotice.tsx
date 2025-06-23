'use client';
import { questionnaireItems } from '@constant/questionnaireItems';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { cn } from '@utils/cn';
import React from 'react';

const StepNotice = () => {
  let currentStep = 1;
  const userValue = '서울';
  const { user, loading, isLoggedIn } = useFirebaseAuth();
  return (
    <div className='min-h-[100vh-60px] pt-[60px] w-[500px] bg-white'>
      <div className='p-5 '>
        <div className='mt-6'>
          <h1 className='text-3xl font-semibold'>
            {user?.displayName || '여행자'}님의
            <br /> 여행 취향을 알려주세요
          </h1>
          <h2 className='mt-1'>
            {user?.displayName || '여행자'}님만을 위한 여행을 준비하고 있어요.
            <br />
            어떤 순간을 기대하고 계신가요?
          </h2>
        </div>
        <div className='mt-8'>
          {questionnaireItems.map((questionnaireItem, index) => {
            return (
              <StepEachContent
                key={questionnaireItem.id}
                questionnaireItem={questionnaireItem}
                isAnswered={currentStep >= index}
                userValue={userValue}
                questionNumber={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepNotice;

interface StepEachContentProps {
  id: string;
  title: string;
  waitAnswer: string;
  selectedNotice: string;
}

const StepEachContent = ({
  questionnaireItem,
  isAnswered,
  userValue,
  questionNumber,
}: {
  questionnaireItem: StepEachContentProps;
  isAnswered: boolean;
  userValue: string;
  questionNumber: number;
}) => {
  const { title, waitAnswer, selectedNotice } = questionnaireItem;
  const { user, loading, isLoggedIn } = useFirebaseAuth();
  return (
    <div className='flex gap-3'>
      <div className='flex flex-col items-center'>
        <div className='size-6 shrink-0 bg-lime-400 rounded-full'></div>
        <div
          className={cn('w-[1px] h-[72px] bg-lime-400 items-stretch', {
            hidden: questionNumber == 3,
          })}
        ></div>
      </div>
      <div>
        <h2 className='text-xl font-bold text-gray-900'>{title}</h2>
        <h3 className='text-base text-gray-700'>
          {isAnswered ? selectedNotice.replace('@@', userValue ?? '') : waitAnswer}
        </h3>
      </div>
    </div>
  );
};
