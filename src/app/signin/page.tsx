'use client';

import { useEffect, useState } from 'react';
import useGoogleSignin from '@hooks/useGoogleSignin';
import { auth } from '@remote/firebase';

export default function Page() {
  const { signin, signout } = useGoogleSignin();
  const user = auth.currentUser;
  console.log(user);

  return (
    <div>
      <button onClick={signin}>로그인</button>
      <button onClick={signout}>로그아웃</button>
    </div>
  );
}
