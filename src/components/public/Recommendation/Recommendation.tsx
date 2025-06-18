import Container from '../Container';
import Card from './Card';

const cards = [
  {
    title: '기본 여행 정보',
    description: '날씨, 환율, 비자 등 해당 국가의 여행 전 필수 정보입니다.',
  },
  {
    title: '외교부 여행 경보',
    description: '해당 국가의 안전 등급 및 유의할 지역 정보를 제공합니다.',
  },
  {
    title: '추천 여행 일정',
    description: '3일, 5일, 7일 등 테마별 일정을 제안해드립니다.',
  },
  {
    title: '현지 명소 & 체험',
    description: '현지인들이 추천하는 명소, 액티비티, 음식 등을 소개합니다.',
  },
];

const Recommendation = () => {
  return (
    <section className='py-16 px-4 md:px-20 ]'>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {cards.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Recommendation;
