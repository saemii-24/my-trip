import LoginBackground from '@components/login/LoginBackground';
import Questionnaire from '@components/Questionnaire/Questionnaire';
import StepNotice from '@components/Questionnaire/StepNotice';
import React from 'react';

export default function QuestionnairePage() {
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
