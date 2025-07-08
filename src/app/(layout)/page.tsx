import React from 'react';
import Advisory from '@components/Advisory';
import Benefits from '@components/public/Benefits';
import Hero from '@components/public/Hero';
import Recommendation from '@components/public/Recommendation/Recommendation';
import Notice from '@components/public/Notice';

const Page = () => {
  return (
    <div>
      <Hero />
      <Benefits />
      <Recommendation />
      {/* <Advisory pagination={false} numOfRows={6} /> */}
      {/* <TravelSpecialWarning /> */}
      <Notice pagination={false} numOfRows={5} />
    </div>
  );
};

export default Page;
