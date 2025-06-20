import { BasicProps } from '@type/public';
import React from 'react';

const LoginTitle = ({ className }: BasicProps) => {
  return (
    <div className={className}>
      <div className='font-bold text-lime-500 mb-2 text-center'>My Trip</div>
      <h1 className='text-3xl font-semibold mb-6 text-center text-gray-950'>
        나의 완벽한
        <br />
        여행의 시작
      </h1>
    </div>
  );
};

export default LoginTitle;
