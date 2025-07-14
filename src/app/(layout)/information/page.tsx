'use client';
import dynamic from 'next/dynamic';
import BasicInfo from '@components/information/BasicInfo';
const MainPicture = dynamic(() => import('@components/information/MainPicture'), {
  loading: () => <p>Loading...</p>,
});

export default function InformationPage() {
  return (
    <div className='w-full'>
      <div className=' mx-auto w-fit'>
        <MainPicture />
      </div>
      <BasicInfo />
      {/* <h1 className='text-3xl'>대만 · 타이페이</h1>
      <div className='mt-[100px] w-[calc(100vw-32px)] h-[calc(100vh-120px)] rounded-2xl overflow-hidden mx-auto relative'>
        <Image
          src='https://images.unsplash.com/photo-1614419349026-cbcfd0a3df2e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Taipei city view'
          fill
          objectFit='cover'
          priority
        />
      </div> */}
    </div>
  );
}
