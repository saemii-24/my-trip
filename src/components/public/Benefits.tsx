import React from 'react';
import Container from './Container';
import { Backpack } from 'lucide-react';

const Benefits = () => {
  return (
    <section className='w-full py-[120px]'>
      <Container>
        <div className='flex justify-between'>
          <div className='text-3xl font-bold text-gray-500'>Travel With AI</div>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 max-w-[55%] !leading-[130%] text-start'>
            어디 갈지, 뭘 할지 고민되셨죠?
            <br />
            이제 AI가 여러분 취향에 딱 맞는
            <br />
            여행 일정 을 만들어드려요.
            <Backpack className='size-[62px] translate-y-[-8px] text-green-500 inline-block' />
          </h1>
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
