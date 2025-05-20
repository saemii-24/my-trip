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
  const [geminiResponse, setGeminiResponse] = useState<string>('');

  useEffect(() => {
    // Firebase Auth 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleGeminiRequest = async () => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: '5월에 한국에 여행가기 좋은 장소는?',
        }),
      });

      const data = await response.json();
      if (data.result) {
        setGeminiResponse(data.result);
      }
    } catch (error) {
      console.error('Gemini API 호출 중 에러:', error);
    }
  };

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

      <div className='mb-4'>
        <button
          onClick={handleGeminiRequest}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        >
          Gemini에게 여행지 추천받기
        </button>
        {geminiResponse && (
          <div className='mt-4 p-4 bg-gray-100 rounded'>
            <h2 className='font-bold mb-2'>Gemini의 추천:</h2>
            <p className='whitespace-pre-wrap'>{geminiResponse}</p>
          </div>
        )}
      </div>

      <GoogleMap />
    </div>
  );
}
