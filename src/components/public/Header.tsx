import React from 'react';
import MenuHamburger1 from '@components/icon/MenuHamburger1';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='h-[60px] flex items-center justify-between px-5  fixed top-0 right-0 left-0 '>
      <Link href='/' className='cursor-pointer flex items-center h-full'>
        <h1 className='font-suit font-medium text-2xl'>My Trip</h1>
        <div className='border-l-2 border-black text-sm ml-3 pl-3 font-suit'>
          계획은 꼼꼼히
          <br />
          여행은 간단히
        </div>
      </Link>
      <MenuHamburger1 className='size-8 cursor-pointer' />
    </header>
  );
};

export default Header;
