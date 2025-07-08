'use client';
import { useState } from 'react';
import Container from '../Container';
import Card from './Card';

const cards = [
  {
    id: 'recommendation-basicInfo',
    title: '기본\n 여행 정보',
    description: '날씨, 환율, 비자 등 해당 국가의 여행 전 필수 정보입니다.',
  },
  {
    id: 'recommendation-advisory',
    title: '외교부\n 여행 경보',
    description: '해당 국가의 안전 등급 및 유의할 지역 정보를 제공합니다.',
  },
  {
    id: 'recommendation-itinerary',
    title: '추천\n 여행 일정',
    description: '3일, 5일, 7일 등 테마별 일정을 제안해드립니다.',
  },
  {
    id: 'recommendation-spot',
    title: '현지 명소 &\n 체험',
    description: '현지인들이 추천하는 명소, 액티비티, 음식 등을 소개합니다.',
  },
];

const Recommendation = () => {
  const [select, setSelect] = useState<string>('recommendation-basicInfo');

  return (
    <section className='px-4 md:px-20 '>
      <Container>
        <div className='flex gap-6'>
          {cards.map((card, idx) => (
            <Card key={idx} {...card} select={select} setSelect={setSelect} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Recommendation;
