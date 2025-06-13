'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerWithEmail } from '@utils/authService';

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const [firebaseError, setFirebaseError] = useState('');

  const onSubmit = async (data: RegisterForm) => {
    setFirebaseError('');
    if (data.password !== data.confirmPassword) {
      setFirebaseError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const result = await registerWithEmail(data.email, data.password);
      console.log('회원가입 성공:', result.user);
      // TODO: 사용자 이동
    } catch (err: any) {
      setFirebaseError(err.message);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20 p-4 border rounded shadow'>
      <h1 className='text-2xl font-bold mb-6'>회원가입</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* 이메일 */}
        <div>
          <input
            type='email'
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

        {/* 비밀번호 */}
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='비밀번호'
            className='w-full p-2 border rounded'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: { value: 6, message: '최소 6자 이상 입력해주세요.' },
              maxLength: { value: 15, message: '최대 15자까지 입력 가능합니다.' },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]).{6,15}$/,
                message: '영소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
              },
            })}
          />
          <button
            type='button'
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            비밀번호 보기
          </button>
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='비밀번호 확인'
            className='w-full p-2 border rounded'
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* 제출 */}
        <button
          type='submit'
          className='w-full bg-green-600 text-white p-2 rounded hover:bg-green-700'
        >
          회원가입
        </button>

        {firebaseError && <p className='text-red-600 text-sm mt-2'>{firebaseError}</p>}
      </form>
    </div>
  );
}
