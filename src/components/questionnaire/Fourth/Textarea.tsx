import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';

const Textarea = () => {
  const { register, watch } = useForm();
  const theme = watch('theme', '');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  console.log(isFocused);
  return (
    <div className='w-full'>
      <div
        className={cn(
          'rounded-3xl border bg-white p-5 relative transition-all duration-150',
          {
            'shadow-[0_0_0_2px_#d2fa5c]': isFocused,
          },
        )}
      >
        {/* Placeholder */}
        {theme.length === 0 && (
          <div className='flex gap-2 absolute top-6 pointer-events-none'>
            {isFocused ? (
              <motion.div
                className='w-[2px] bg-lime-500'
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ) : (
              <div className='w-[2px] bg-lime-500' />
            )}
            <div className='text-gray-400 font-light text-base'>
              여행 테마를 입력해주세요
            </div>
          </div>
        )}

        <textarea
          {...register('theme')}
          rows={10}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn('mt-1 w-full bg-transparent resize-none focus:outline-none', {
            'caret-transparent': theme.length === 0 && isFocused,
          })}
        />
      </div>
    </div>
  );
};

export default Textarea;
