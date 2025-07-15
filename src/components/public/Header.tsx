'use client';
import React from 'react';
import MenuHamburger1 from '@components/icon/MenuHamburger1';
import Link from 'next/link';
import { Plane, UserRound } from 'lucide-react';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { logout } from '@utils/authService';

const Header = () => {
  const { isLoggedIn } = useFirebaseAuth();

  return (
    <header className='h-[80px]  z-[100] flex items-center justify-between px-5  fixed top-0 right-0 left-0 '>
      <Link href='/'>
        <div className='flex items-center gap-1'>
          <Plane strokeWidth={2} className='text-green-500 size-8' />
          <div className='font-semibold text-3xl'>TWA</div>
        </div>
      </Link>
      <div className='items-center flex gap-2'>
        <Link
          href='/selectCountry'
          className='bg-green-500 bg-gradient-to-r to-green-500 from-green-600 text-white px-8 rounded-full py-2 font-bold text-lg'
        >
          Travel Country
        </Link>
        {isLoggedIn ? (
          // <button
          //   onClick={logout}
          //   className='border border-gray-200 text-gray-950 hover:border-red-500 hover:text-red-500 px-8 rounded-full py-2 font-bold text-lg'
          // >
          //   Logout
          // </button>
          <button className='h-[44px] flex-center aspect-square border rounded-full'>
            <UserRound />
          </button>
        ) : (
          <Link
            href='/login'
            className='border border-gray-200 text-gray-950 hover:border-gray-900 px-8 rounded-full py-2 font-bold text-lg'
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
