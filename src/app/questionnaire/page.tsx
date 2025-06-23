'use client';

import React, { useState } from 'react';
import LoginBackground from '@components/login/LoginBackground';
import Questionnaire from '@components/questionnaire/Questionnaire';
import StepNotice from '@components/questionnaire/StepNotice';

export default function QuestionnairePage() {
  const [questionStep, setQuestionStep] = useState<number>(0);

  return (
    <div className='min-h-[calc(100vh-60px)] w-screen'>
      <LoginBackground className='z-[-10] fixed inset-0' />
      <div className='flex'>
        <StepNotice />
        <Questionnaire />
      </div>
    </div>
  );
}
