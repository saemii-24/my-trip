'use client';

import { useEffect, useState } from 'react';
import useGoogleSignin from '@hooks/useGoogleSignin';

export default function Page() {
  const { signin, signout, user } = useGoogleSignin();

  return (
    <div>
      <button onClick={signin}>로그인</button>
      <button onClick={signout}>로그아웃</button>
    </div>
  );
}
