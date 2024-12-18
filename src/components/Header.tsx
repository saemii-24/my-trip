import Link from 'next/link';
import React from 'react';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
const Header = () => {
  return (
    <header className='flex h-[56px] w-full items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md border-b border-gray-200 fixed top-0'>
      {/* 로고 */}
      <div className='text-2xl font-medium text-black flex gap-2'>
        <MdOutlineTravelExplore className='text-[40px] flex items-center font-thin' />
        <div className='text-base leading-4 mt-1'>
          MY
          <br />
          TRIP
        </div>
      </div>

      {/* 메뉴 */}
      <nav className='flex space-x-6 ml-auto'>
        <Link href='/travel-list' className='text-gray-700 hover:text-blue-500'>
          나의 여행
        </Link>
        <Link href='/shared-plans' className='text-gray-700 hover:text-blue-500'>
          여행 추천
        </Link>
      </nav>

      {/* 로그인 버튼 */}
      <button
        className='ml-10 flex items-center gap-3 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
        onClick={() => console.log('Google Login Clicked')}
      >
        <FcGoogle />
        로그인
      </button>
    </header>
  );
};

export default Header;
