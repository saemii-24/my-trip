import React, { useEffect, useRef, useState } from 'react';
import Container from './Container';
import { SectionTitle } from './SectionTitle';
import { Map, MapPinned, Store, Utensils, Rows, LayoutGrid } from 'lucide-react';
import SpotCard from './SpotCard';
import SpotRow from './SpotRow'; // 새로운 row 형태 컴포넌트 (가정)
import { useGooglePlaceGet } from '@query/useGooglePlaceGet';
import { cn } from '@utils/cn';

const anchorItems = [
  { icon: <MapPinned size={28} />, href: '#sightSeeing', label: 'sightSeeing' },
  { icon: <Utensils size={28} />, href: '#food', label: 'food' },
  { icon: <Store size={28} />, href: '#shopping', label: 'shopping' },
];

const TourSpot = () => {
  const [activeSection, setActiveSection] = useState('sightSeeing');
  const [compMode, setCompMode] = useState<'card' | 'row'>('card');

  const { googlePlaceData, googlePlaceIsLoading } = useGooglePlaceGet('대만', '타이페이');

  const sightSeeingRef = useRef<HTMLElement>(null);
  const foodRef = useRef<HTMLElement>(null);
  const shoppingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: 0.4,
        rootMargin: '-80px 0px -40% 0px', // header 보정 추가
      },
    );

    const sections = [sightSeeingRef, foodRef, shoppingRef];
    sections.forEach((ref) => ref.current && observer.observe(ref.current));

    return () => observer.disconnect();
  }, []);

  if (googlePlaceIsLoading) return <div>데이터를 받아옵니다.</div>;
  if (!googlePlaceData) return <div>데이터가 없습니다.</div>;

  const RenderComponent = compMode === 'card' ? SpotCard : SpotRow;

  return (
    <Container>
      <div className='flex justify-center items-center ml-[96px]'>
        <SectionTitle icon={<Map />}>여행지 기본정보</SectionTitle>
      </div>

      {/* 렌더링 선택 버튼 */}
      <div className='flex justify-end gap-2 mb-6'>
        <button
          onClick={() => setCompMode('card')}
          className={cn(
            'flex-center border size-10 rounded-2xl transition-colors bg-white ',
            {
              ' border-green-500 bg-green-50 text-green-500': compMode === 'card',
            },
          )}
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => setCompMode('row')}
          className={cn(
            'flex-center border size-10 rounded-2xl transition-colors bg-white ',
            {
              ' border-green-500 bg-green-50 text-green-500': compMode === 'row',
            },
          )}
        >
          <Rows size={20} />
        </button>
      </div>

      <div className='flex gap-5 relative'>
        <div className='h-fit sticky top-[calc(50vh-80px)] flex flex-col gap-3'>
          {anchorItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.href}
                className={cn(
                  'flex-center border size-[60px] rounded-full transition-colors ',
                  {
                    'text-green-500 border-green-500 bg-green-50': isActive,
                    'border-zinc-200 hover:text-green-500': !isActive,
                  },
                )}
                onClick={() => {
                  const target = document.querySelector(item.href);
                  if (target) {
                    const y = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                {item.icon}
              </button>
            );
          })}
        </div>
        <section className='flex flex-col flex-1 pl-4'>
          <h3 className='flex-col text-center  font-semibold text-5xl mb-6 '>
            <div className='w-fit flex gap-4'>
              <span className='mt-1'>관광명소</span>
            </div>
            <div className='text-lg font-normal border-l-2 border-green-500 text-gray-700 px-3 mt-3 break-keep'>
              {googlePlaceData.sightseeing?.criteria}
            </div>
          </h3>
          <article id='sightSeeing' ref={sightSeeingRef} className='scroll-mt-20'>
            {/* <h3 className='flex-col  font-semibold text-5xl flex-center mb-8 '>
              <div className='w-fit flex-col'>
                <span>관광명소</span>
                <div className='w-full items-stretch h-[4px] bg-gray-700 mt-1'></div>
              </div>
            </h3> */}
            <div
              className={cn('w-full', {
                'grid grid-cols-3 gap-12': compMode === 'card',
                'flex flex-col gap-4': compMode === 'row',
              })}
            >
              {googlePlaceData.sightseeing?.places.map((item) => (
                <RenderComponent key={item.name} placeData={item} />
              ))}
            </div>
          </article>
          <article id='food' ref={foodRef} className='bg-blue-50 scroll-mt-20'>
            <div
              className={cn('w-full', {
                'grid grid-cols-3 gap-12': compMode === 'card',
                'flex flex-col gap-4': compMode === 'row',
              })}
            >
              {googlePlaceData.food?.places.map((item) => (
                <RenderComponent key={item.name} placeData={item} />
              ))}
            </div>
          </article>
          <article id='shopping' ref={shoppingRef} className='bg-red-50 scroll-mt-20'>
            <div
              className={cn('w-full', {
                'grid grid-cols-3 gap-12': compMode === 'card',
                'flex flex-col gap-4': compMode === 'row',
              })}
            >
              {googlePlaceData.shopping?.places.map((item) => (
                <RenderComponent key={item.name} placeData={item} />
              ))}
            </div>
          </article>
        </section>
      </div>
    </Container>
  );
};

export default TourSpot;
