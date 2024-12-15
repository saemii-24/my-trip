'use client';

import { useState, useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, store } from '@remote/firebase';
import { useRouter } from 'next/navigation';
import { collection, doc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from '@constant/index';

function useGoogleSignin() {
  const router = useRouter();

  const signin = useCallback(() => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async () => {
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
          console.log('로그인 되었습니다.');
          const 새로운유저 = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          };
          setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), 새로운유저);
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
      // 클라이언트에서 Firebase 로그아웃
      await auth.signOut();
      console.log('로그아웃 되었습니다.');

      // 쿠키 직접 삭제
      document.cookie = 'AuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

      // 로그아웃 후 리다이렉트 처리
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  }, [router]);

  return { signin, signout };
}

export default useGoogleSignin;
