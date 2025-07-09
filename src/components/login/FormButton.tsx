import { cn } from '@utils/cn';
import React, { HTMLAttributes, ReactNode } from 'react';

interface FormButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const FormButton = ({ children, className }: FormButtonProps) => {
  return (
    <button
      type='submit'
      className={cn(
        'w-full h-[50px] bg-green-500 text-white rounded-2xl font-semibold text-md',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default FormButton;
