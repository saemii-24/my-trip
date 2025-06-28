import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@utils/cn';
import Check from './icon/Check';
import { BasicProps } from '@type/public';

type ButtonProps = BasicProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'size-10 rounded-full center-flex bg-lime-400 hover:bg-lime-500 transition',
        className,
      )}
      {...props}
    >
      <Check className='text-white size-5' />
    </button>
  );
};

export default Button;
