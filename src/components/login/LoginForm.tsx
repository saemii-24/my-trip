'use client';

import Input from '@components/public/Input';
import { Dispatch, SetStateAction } from 'react';

import { useForm } from 'react-hook-form';
import FormButton from './FormButton';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@utils/authService';

interface LoginFormProps {
  setIsSignin: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setIsSignin }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const { user, country } = await signInWithEmail(data.email, data.password);

      if (!country) {
        router.push('/select-country');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      console.error('로그인 실패:', error.message);
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className='w-full max-w-sm'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
        <Input
          placeholder='이메일'
          type='email'
          register={register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '유효한 이메일 주소를 입력해주세요',
            },
          })}
          error={errors.email}
        />
        <Input
          placeholder='비밀번호'
          type='password'
          register={register('password', {
            required: '비밀번호를 입력해주세요',
            pattern: {
              value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/,
              message: '알파벳 소문자와 숫자를 포함한 6자 이상이어야 합니다',
            },
          })}
          error={errors.password}
        />
        <FormButton>로그인</FormButton>
      </form>
      <p className='mt-4 text-sm text-gray-700 text-center'>
        My Trip이 처음이신가요?
        <span
          onClick={() => {
            setIsSignin(false);
          }}
          className='underline font-medium cursor-pointer'
        >
          {' '}
          회원가입
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
