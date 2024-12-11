'use client';

import { useState, useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@remote/firebase';
import { useRouter } from 'next/navigation';

function useGoogleSignin() {
  const router = useRouter();

  const signin = useCallback(() => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log('로그인 되었습니다.');
        const user = auth.currentUser;
        const token = await user?.getIdToken(); // Firebase ID 토큰 가져오기

        // POST 요청 보내기
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            AuthToken: token, // accessToken을 서버로 전송
          }),
        });

        if (response.ok) {
          console.log('토큰 전송 완료');
          router.push('/');
        } else {
          console.error('로그인 실패');
        }
      })
      .catch((error) => {
        console.error(error.message);
        console.log('로그인 오류 발생');
      });
  }, [router]);

  const signout = useCallback(async () => {
    try {
      // 서버에 DELETE 요청
      const response = await fetch('/api/signout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 서버 응답 확인
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`서버 로그아웃 실패: ${errorMessage}`);
      }

      // 클라이언트 로그아웃 처리
      await auth.signOut();
      console.log('로그아웃 되었습니다.');

      // 로그아웃 후 리다이렉트 처리
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패');
    }
  }, [router]);

  return { signin, signout };
}

export default useGoogleSignin;
