'use client';

import Github from '@components/icon/Github';
import Google from '@components/icon/Google';
import BounceLoading from '@components/public/BounceLoading';
import useUnsplashGet from '@query/useUnsplashGet';
import { signInWithGithub, signInWithGoogle } from '@utils/authService';
import { selectedLocation } from '@utils/randomImageKeyword';
import Image from 'next/image';

export default function LoginPage() {
  const { country } = selectedLocation;
  console.log(country);

  //Unsplash Image
  const { unsplashData, unsplashIsLoading } = useUnsplashGet(country);

  console.log(unsplashData);

  const handleGoogleLogin = async () => {
    try {
      const { user, token } = await signInWithGoogle();
      console.log('Logged in as:', user.displayName);
      // TODO: 페이지로 redirect
    } catch (err: any) {
      alert('Google login failed: ' + err.message);
    }
  };
  const handleGithubLogin = async () => {
    try {
      const { user, token } = await signInWithGithub();
      console.log('Logged in as:', user.displayName);
      // TODO: 페이지로 redirect
    } catch (err: any) {
      alert('Google login failed: ' + err.message);
    }
  };
  //Loading
  if (unsplashIsLoading) {
    return <BounceLoading />;
  }

  return (
    <div className='w-screen h-screen relative'>
      {/* 배경 이미지 */}
      <div className='size-full absolute inset-0'>
        {/* {unsplashData?.urls && ( */}
        <Image
          // src={unsplashData?.urls.full}
          // alt={unsplashData?.alt_description}
          src={
            'https://images.unsplash.com/photo-1602934198239-ff2e47d124f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY5ODh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTAzMzQ1MDN8&ixlib=rb-4.1.0&q=85'
          }
          alt={`낮-동안-바다에-갈색과-녹색-섬-it195uMpH00`}
          layout='fill'
          objectFit='cover'
          className='z-0'
          priority
        />
        {/* )} */}
      </div>
      <div className='bg-white w-[calc(100vw-300px)] h-[calc(100vh-100px)] bg-red absolute top-[50px] right-[150px] rounded-3xl overflow-hidden border-[10px] border-white'>
        <div className='h-full right-0 absolute  rounded-2xl w-[60%] overflow-hidden'>
          {/* {unsplashData?.urls && ( */}
          <Image
            // src={unsplashData?.urls.full}
            // alt={unsplashData?.alt_description}
            src={
              'https://images.unsplash.com/photo-1602934198239-ff2e47d124f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY5ODh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTAzMzQ1MDN8&ixlib=rb-4.1.0&q=85'
            }
            alt={`낮-동안-바다에-갈색과-녹색-섬-it195uMpH00`}
            layout='fill'
            objectFit='cover'
            className='z-10'
            priority
          />
          {/* )} */}
        </div>
        {/* 흰색 박스 영역 */}
        <div className='relative z-10 flex flex-col md:flex-row w-full h-full'>
          {/* 왼쪽 폼 */}
          <div className='w-full md:w-[40%] bg-white flex flex-col justify-center items-center px-6 py-10 '>
            <div className='font-bold text-lime-500 mb-2'>My Trip</div>
            <h1 className='text-3xl font-semibold mb-6 text-center text-gray-950'>
              나의 완벽한
              <br />
              여행의 시작
            </h1>
            <div className='flex gap-6 justify-center ml-[-4px] items-center mb-6'>
              <button onClick={handleGoogleLogin} className='size-5'>
                <Google className='size-6 mt-[1.8px]' />
              </button>
              <button onClick={handleGithubLogin} className='size-5'>
                <Github className='size-6' />
              </button>
            </div>
            <p className='mb-4 text-gray-500 text-center'>or</p>
            <form className='w-full max-w-sm space-y-4'>
              <input
                type='text'
                placeholder='이메일'
                className='w-full  h-[44px] px-4 rounded-full bg-slate-100 text-base placeholder:text-sm'
              />
              <input
                type='password'
                placeholder='비밀번호'
                className='w-full  h-[44px] px-4 rounded-full bg-slate-100 text-base placeholder:text-sm'
              />
              <input
                type='password'
                placeholder='비밀번호 확인'
                className='w-full  h-[44px] px-4 rounded-full bg-slate-100 text-base placeholder:text-sm'
              />
              <button
                type='submit'
                className='w-full h-[44px] bg-lime-500 text-white rounded-full font-semibold text-sm'
              >
                시작하기
              </button>
            </form>
            <p className='mt-4 text-sm'>
              이미 계정이 있으신가요? <a className='underline font-medium'>로그인</a>
            </p>
          </div>
          {/* 오른쪽 이미지 설명 영역 */}
          <div className='hidden md:flex w-[60%] items-center justify-center relative rounded-3xl overflow-hidden'>
            {/* 설명 텍스트나 이미지 오버레이 배치 가능 */}
            <div className='mt-[-10vh] text-white'>
              <div className='bg-lime-800  bg-opacity-30 backdrop-blur-lg px-4 py-2 rounded mb-2'>
                <p className='text-xs'>
                  Photo By. {unsplashData?.user.username || 'unsplash'}
                </p>
                <p className='font-semibold'>Jeju, 대한민국</p>
              </div>
              <div className='bg-lime-800  bg-opacity-30 backdrop-blur-lg px-4 py-2 rounded'>
                <p className='text-sm'>brown and green island on sea during daytime</p>
                {/* <p className='text-sm'>{unsplashData?.alt_description}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
