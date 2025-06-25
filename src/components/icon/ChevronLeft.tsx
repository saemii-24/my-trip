import React from 'react';
import IconProps from '@type/icon';

export default function ChevronLeft({ className = 'text-gray-800' }: IconProps) {
  return (
    <svg
      width='80'
      height='80'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      transform='rotate(0 0 0)'
      className={className}
    >
      <path
        d='M14.375 5.75L8.125 12L14.375 18.25'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
