import React from 'react';
import IconProps from '@type/icon';

export default function ChevronRight({ className = 'text-gray-800' }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M9.625 5.75L15.875 12L9.625 18.25'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
