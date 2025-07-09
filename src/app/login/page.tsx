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
import Image from 'next/image';
import Container from '@components/public/Container';
import { Plane } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isSignin, setIsSignin] = useState<boolean>(false);
  const { country } = countryObj;

  //Unsplash Image
  const { unsplashData, unsplashIsLoading } = useUnsplashGet(country);

  //Loading
  if (unsplashIsLoading) {
    return <BounceLoading />;
  }

  return (
    <div className=' w-[calc(100vw-32px)] h-[calc(100vh-32px)] mt-4 rounded-[60px] overflow-hidden  mx-auto relative'>
      <div className='size-full relative'>
        <Image
          src={unsplashData?.urls.full || ''}
          alt={unsplashData?.alt_description || ''}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* 블랙 그라데이션 오버레이 */}
        <div className='absolute inset-0 bg-black/40 z-10'></div>
        <Container className='absolute inset-0 z-[10] flex-col  w-full flex-center'>
          <Link href='/' className='mb-4'>
            <div className='flex items-center gap-1'>
              <Plane strokeWidth={2} className='text-green-500 size-6' />
              <div className='font-semibold text-xl text-white'>TWA</div>
            </div>
          </Link>
          <div className=' w-[550px] bg-white flex flex-col justify-center items-center rounded-60  py-[60px] '>
            <LoginTitle />

            <div className='mt-10 w-full px-20'>
              {isSignin ? (
                <LoginForm setIsSignin={setIsSignin} />
              ) : (
                <SigninForm setIsSignin={setIsSignin} />
              )}
              <SocialLoginButton />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
