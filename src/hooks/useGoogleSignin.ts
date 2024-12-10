'use client';

import { useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@remote/firebase';

function useGoogleSignin() {
  const signin = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user; // 로그인된 사용자는 result.user에서 가져옵니다.
        console.log(user); // 로그인한 사용자 정보 출력
        console.log('로그인 되었습니다.');
      })
      .catch((error) => {
        console.error(error.message); // 오류 메시지 출력
        console.log('로그인 오류 발생');
      });
  }, []);

  const signout = useCallback(() => {
    auth
      .signOut()
      .then(() => {
        console.log('로그아웃 되었습니다.');
      })
      .catch((error) => {
        console.error(error.message); // 오류 메시지 출력
        console.log('로그아웃 오류 발생');
      });
  }, []);

  return { signin, signout };
}

export default useGoogleSignin;
