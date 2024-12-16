'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useGoogleSignin from '@hooks/useGoogleSignin';
import { auth } from '@remote/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import Map from '../components/Map';

export default function Page() {
  const { signin, signout } = useGoogleSignin();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    // Firebase Auth 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    console.log(user);

    return () => unsubscribe();
  }, []);

  return (
    <div>
      메인!!
      {user ? (
        <div>
          <p>{user.displayName}님 환영합니다!</p>
          <button onClick={signout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={signin}>로그인</button>
      )}
      <Map />
    </div>
  );
}
