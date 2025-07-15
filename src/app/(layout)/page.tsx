import React from 'react';
import Benefits from '@components/public/Benefits';
import Recommendation from '@components/public/Recommendation/Recommendation';
import Notice from '@components/public/Notice';

const Page = () => {
  return (
    <div>
      {/* <Hero /> */}
      <Benefits />
      <Recommendation />
      {/* <Advisory pagination={false} numOfRows={6} /> */}
      {/* <TravelSpecialWarning /> */}
      <Notice pagination={false} numOfRows={5} />
    </div>
  );
};

export default Page;
