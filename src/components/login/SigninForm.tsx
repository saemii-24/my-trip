'use client';

import Input from '@components/public/Input';
import { Dispatch, SetStateAction } from 'react';

import { useForm } from 'react-hook-form';
import FormButton from './FormButton';

interface SigninFormProps {
  setIsSignin: Dispatch<SetStateAction<boolean>>;
}
const SigninForm = ({ setIsSignin }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  // onSubmit 핸들러 추가
  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
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
        <Input
          placeholder='비밀번호 확인'
          type='password'
          register={register('confirmPassword', {
            required: '비밀번호를 다시 한 번 입력해주세요',
            validate: (value, formValues) =>
              value === formValues?.password || '비밀번호가 일치하지 않습니다',
          })}
          error={errors.confirmPassword}
        />
        <FormButton>회원가입</FormButton>
      </form>
      <p className='mt-4 text-sm text-center text-gray-700'>
        이미 계정이 있으신가요?{' '}
        <span
          onClick={() => {
            setIsSignin(true);
          }}
          className='underline font-medium cursor-pointer'
        >
          {' '}
          로그인
        </span>
      </p>
    </div>
  );
};

export default SigninForm;
