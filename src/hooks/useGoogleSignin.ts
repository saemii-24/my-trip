'use client';

import { useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@remote/firebase';
import { useRouter } from 'next/navigation';

function useGoogleSignin() {
  const router = useRouter();
  let user;

  /*TODO
라우터에 요청 -> 쿠키 저장 -> MIDDLEWARE에서 쿠키 확인 -> 로그인 처리

*/

  const signin = useCallback(() => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user; //로그인 된 사용자 정보

        console.log('로그인 되었습니다.');

        const token = await user.getIdToken(); // Firebase ID 토큰 가져오기

        // POST 요청 보내기
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: token, // accessToken을 서버로 전송
          }),
        });

        if (response.ok) {
          // 로그인 후 처리 (예: 쿠키 설정 확인)
          console.log('토큰 전송 완료');
          router.push('/');
        } else {
          console.error('로그인 실패');
        }
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

  return { signin, signout, user };
}

export default useGoogleSignin;
