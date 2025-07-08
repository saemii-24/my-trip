'use client';

import BackgroundDescription from '@components/login/BackgroundDescription';
import LoginBackground from '@components/login/LoginBackground';
import SigninForm from '@components/login/SigninForm';
import LoginTitle from '@components/login/LoginTitle';
import SocialLoginButton from '@components/login/SocialLoginButton';

import BounceLoading from '@components/public/BounceLoading';

import useUnsplashGet from '@query/useUnsplashGet';

import { countryObj } from '@utils/randomImageKeyword';
import LoginForm from '@components/login/LoginForm';
import { useState } from 'react';

export default function LoginPage() {
  const [isSignin, setIsSignin] = useState<boolean>(false);
  const { country } = countryObj;
  console.log(country);

  //Unsplash Image
  const { unsplashData, unsplashIsLoading } = useUnsplashGet(country);

  //Loading
  if (unsplashIsLoading) {
    return <BounceLoading />;
  }

  return (
    <div className='w-screen h-screen relative'>
      {/* 배경 이미지 */}
      <LoginBackground className='size-full absolute inset-0' />
      <div className='bg-white w-[calc(100vw-300px)] h-[calc(100vh-100px)] bg-red absolute top-[50px] right-[150px] rounded-3xl overflow-hidden border-[10px] border-white'>
        <LoginBackground className='h-full right-0 absolute  rounded-2xl w-[60%] overflow-hidden' />
        {/* 흰색 박스 영역 */}
        <div className='relative z-10 flex flex-col md:flex-row w-full h-full'>
          {/* 왼쪽 폼 */}
          <div className='w-full md:w-[40%] bg-white flex flex-col justify-center items-center px-6 py-10 '>
            <LoginTitle />
            <SocialLoginButton className='flex gap-6 justify-center ml-[-4px] items-center mb-6' />
            <p className='mb-4 text-gray-500 text-center'>or</p>
            {isSignin ? (
              <LoginForm setIsSignin={setIsSignin} />
            ) : (
              <SigninForm setIsSignin={setIsSignin} />
            )}
          </div>
          {/* 오른쪽 이미지 설명 영역 */}
          <BackgroundDescription className='hidden md:flex w-[60%] items-center justify-center relative rounded-3xl overflow-hidden' />
        </div>
      </div>
    </div>
  );
}
