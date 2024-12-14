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
      .then(async () => {
        console.log('로그인 되었습니다.');
        try {
          const user = auth.currentUser;

          // 사용자 인증 정보가 없는 경우 예외 처리
          if (!user) {
            throw new Error('사용자 인증 정보를 찾을 수 없습니다.');
          }

          // Firebase ID 토큰 가져오기
          const token = await user.getIdToken();

          // 서버에 POST 요청 보내기
          const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
            },
          });

          if (response.ok) {
            console.log('토큰 전송 완료');
            router.push('/'); // 메인 페이지로 이동
          } else {
            const errorText = await response.text();
            throw new Error(`서버 응답 오류: ${errorText}`);
          }
        } catch (error) {
          console.error('로그인 요청 실패:');
        }
      })
      .catch((error) => {
        console.error('Firebase 로그인 오류:', error.message);
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
