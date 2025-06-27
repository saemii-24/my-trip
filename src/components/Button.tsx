import React from 'react';
import ArrowRight from './icon/ArrowRight';
import Check from './icon/Check';
import { BasicProps } from '@type/public';
import { cn } from '@utils/cn';

const Button = ({ className }: BasicProps) => {
  return (
    <button
      type='button'
      className={cn(
        'size-10 rounded-full center-flex bg-lime-400 hover:bg-lime-500 transition',
        className,
      )}
    >
      {/* <ArrowRight className='text-white size-5' /> */}
      <Check className='text-white size-5' />
    </button>
  );
};

export default Button;
