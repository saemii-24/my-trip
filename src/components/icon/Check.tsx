import IconProps from '@type/icon';
import React from 'react';

export default function Check({ className = 'text-gray-800' }: IconProps) {
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
        d='M19.5455 6.4965C19.9848 6.93584 19.9848 7.64815 19.5455 8.08749L10.1286 17.5043C9.6893 17.9437 8.97699 17.9437 8.53765 17.5043L4.45451 13.4212C4.01517 12.9819 4.01516 12.2695 4.4545 11.8302C4.89384 11.3909 5.60616 11.3909 6.0455 11.8302L9.33315 15.1179L17.9545 6.4965C18.3938 6.05716 19.1062 6.05716 19.5455 6.4965Z'
        fill='currentColor'
      />
    </svg>
  );
}
