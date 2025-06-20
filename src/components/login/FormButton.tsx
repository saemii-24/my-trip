import React from 'react';

const FormButton = ({ children }: { children: string }) => {
  return (
    <button
      type='submit'
      className='w-full h-[44px] bg-lime-500 text-white rounded-full font-semibold text-sm'
    >
      {children}
    </button>
  );
};

export default FormButton;
