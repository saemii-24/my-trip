'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signInWithEmail } from '@utils/authService';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [firebaseError, setFirebaseError] = useState<string>('');

  const onSubmit = async (data: LoginForm) => {
    setFirebaseError('');
    try {
      const result = await signInWithEmail(data.email, data.password);
      console.log('로그인 성공:', result.user);
      //로그인 성공 시 이어질 내용 작성성
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20 p-4 border rounded shadow'>
      <h1 className='text-2xl font-bold mb-6'>로그인</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            type='text'
            placeholder='이메일'
            className='w-full p-2 border rounded'
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type='password'
            placeholder='비밀번호'
            className='w-full p-2 border rounded'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다.',
              },
              maxLength: {
                value: 15,
                message: '비밀번호는 최대 15자까지 가능합니다.',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]).{6,15}$/,
                message: '영소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
              },
            })}
          />

          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          로그인
        </button>

        {firebaseError && <p className='text-red-600 text-sm mt-2'>{firebaseError}</p>}
      </form>
    </div>
  );
}
