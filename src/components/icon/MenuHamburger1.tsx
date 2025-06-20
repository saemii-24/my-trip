import React from 'react';
import IconProps from '@type/icon';

export default function MenuHamburger1({ className = 'text-gray-800' }: IconProps) {
  return (
    <svg
      width='80'
      height='80'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M3.5625 6C3.5625 5.58579 3.89829 5.25 4.3125 5.25H20.3125C20.7267 5.25 21.0625 5.58579 21.0625 6C21.0625 6.41421 20.7267 6.75 20.3125 6.75L4.3125 6.75C3.89829 6.75 3.5625 6.41422 3.5625 6Z'
        fill='currentColor'
      />
      <path
        d='M3.5625 18C3.5625 17.5858 3.89829 17.25 4.3125 17.25L20.3125 17.25C20.7267 17.25 21.0625 17.5858 21.0625 18C21.0625 18.4142 20.7267 18.75 20.3125 18.75L4.3125 18.75C3.89829 18.75 3.5625 18.4142 3.5625 18Z'
        fill='currentColor'
      />
      <path
        d='M4.3125 11.25C3.89829 11.25 3.5625 11.5858 3.5625 12C3.5625 12.4142 3.89829 12.75 4.3125 12.75L20.3125 12.75C20.7267 12.75 21.0625 12.4142 21.0625 12C21.0625 11.5858 20.7267 11.25 20.3125 11.25L4.3125 11.25Z'
        fill='currentColor'
      />
    </svg>
  );
}
