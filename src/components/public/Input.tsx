import React from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
}

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  register,
  error,
  disabled = false,
}: InputProps) => {
  return (
    <div className='mb-4'>
      {label && (
        <label className='block mb-1 text-sm font-medium text-gray-700'>{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full h-[44px] px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-400'
            : 'border-gray-300 focus:ring-blue-400'
        }`}
        {...register}
      />
      {typeof error?.message === 'string' && (
        <p className='ml-2 mt-1 text-xs text-red-600'>{error.message}</p>
      )}
    </div>
  );
};

export default Input;
