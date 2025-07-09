import { BasicProps } from '@type/public';
import { cn } from '@utils/cn';
import { Plane } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const LoginTitle = ({ className }: BasicProps) => {
  return (
    <div className={cn('flex-col flex  items-center', className, {})}>
      <h1 className='text-4xl font-bold text-center '>나의 완벽한 여행의 시작</h1>
      <p className='text-center mt-1 text-gray-500'>
        TWA에 로그인 하시고 즐거운 여행을 시작하세요.
      </p>
    </div>
  );
};

export default LoginTitle;
