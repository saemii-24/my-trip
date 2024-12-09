'use client';

import { useEffect, useState } from 'react';
import useGoogleSignin from '@hooks/useGoogleSignin';

export default function Home() {
  const { signin, signout } = useGoogleSignin();
  const [isClient, setIsClient] = useState(false); // 클라이언트 여부 상태 추가

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행하도록 설정
  }, []);

  useEffect(() => {
    if (isClient) {
      signin(); // 클라이언트에서만 signin 호출
    }
  }, [isClient, signin]);

  return (
    <div>
      <button onClick={signout}>로그아웃</button>
    </div>
  );
}
