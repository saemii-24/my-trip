import Github from '@components/icon/Github';
import Google from '@components/icon/Google';
import { BasicProps } from '@type/public';
import { signInWithGithub, signInWithGoogle } from '@utils/authService';
import React from 'react';

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
    <div className={className}>
      <button onClick={handleGoogleLogin} className='size-5'>
        <Google className='size-6 mt-[1.8px]' />
      </button>
      <button onClick={handleGithubLogin} className='size-5'>
        <Github className='size-6' />
      </button>
    </div>
  );
};

export default SocialLoginButton;
