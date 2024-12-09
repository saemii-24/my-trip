'use client';
import React from 'react';
import useGoogleSignin from '@hooks/useGoogleSignin';

export default function Page() {
  const { signin } = useGoogleSignin();

  return (
    <div>
      <button onClick={signin}>구글 로그인</button>
    </div>
  );
}
