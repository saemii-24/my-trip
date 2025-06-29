import React from 'react';
import Title from './Title';
import Textarea from './Fourth/Textarea';
import Button from '@components/Button';
import TravelPreference from './Third/TravelPreference';
import DateRangePicker from './Second/DateRangePicker';

const Questionnaire = () => {
  return (
    <div className='bg-red-300 min-h-screen flex-1 p-12'>
      <div className='bg-white size-full rounded-3xl '>
        <Title num={'01'} title={'@@님은 어딜 여행하실 계획이신가요?'} />
        {/* <Textarea />
        <Button /> */}
        {/* <TravelPreference /> */}
        <DateRangePicker />
      </div>
    </div>
  );
};

export default Questionnaire;
