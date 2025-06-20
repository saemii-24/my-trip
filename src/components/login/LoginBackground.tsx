import { BasicProps } from '@type/public';
import React from 'react';
import Image from 'next/image';

const LoginBackground = ({ className }: BasicProps) => {
  return (
    <div className='size-full absolute inset-0'>
      {/* {unsplashData?.urls && ( */}
      <Image
        // src={unsplashData?.urls.full}
        // alt={unsplashData?.alt_description}
        src={
          'https://images.unsplash.com/photo-1602934198239-ff2e47d124f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY5ODh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTAzMzQ1MDN8&ixlib=rb-4.1.0&q=85'
        }
        alt={`낮-동안-바다에-갈색과-녹색-섬-it195uMpH00`}
        layout='fill'
        objectFit='cover'
        className='z-0'
        priority
      />
      {/* )} */}
    </div>
  );
};

export default LoginBackground;
