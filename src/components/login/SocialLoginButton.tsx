import Github from '@components/icon/Github';
import Google from '@components/icon/Google';
import { BasicProps } from '@type/public';
import { signInWithGithub, signInWithGoogle } from '@utils/authService';
import React from 'react';
import FormButton from './FormButton';
import { cn } from '@utils/cn';

const SocialLoginButton = ({ className }: BasicProps) => {
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

  return (
    <div className={cn('w-full flex-col flex gap-2 mt-10', {})}>
      <FormButton
        onClick={handleGoogleLogin}
        className='bg-white border border-zinc-200 text-gray-900'
      >
        <div className='flex-center w-full gap-2'>
          <Google className='size-6 mt-[1.8px]' />
          <p>구글 로그인</p>
        </div>
      </FormButton>

      <FormButton onClick={handleGithubLogin} className='bg-gray-800'>
        <div className='flex-center w-full gap-2'>
          <Github className='size-6' />
          <p>깃허브 로그인</p>
        </div>
      </FormButton>
    </div>
  );
};

export default SocialLoginButton;
