'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useGoogleSignin from '@hooks/useGoogleSignin';
import { auth } from '@remote/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import GoogleMap from '@components/Map';

export default function Page() {
  const { signin, signout } = useGoogleSignin();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    // Firebase Auth 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>메인 페이지</h1>
      {user ? (
        <div className='mb-4'>
          <p className='mb-2'>{user.displayName}님 환영합니다!</p>
          <button
            onClick={signout}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          onClick={signin}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'
        >
          로그인
        </button>
      )}

      <GoogleMap />
    </div>
  );
}
