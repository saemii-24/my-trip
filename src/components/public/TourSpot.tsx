import React, { useEffect, useRef, useState } from 'react';
import Container from './Container';
import { SectionTitle } from './SectionTitle';
import { Map, MapPinned, Store, Utensils } from 'lucide-react';

const anchorItems = [
  { icon: <MapPinned size={28} />, href: '#hotspot', label: 'hotspot' },
  { icon: <Utensils size={28} />, href: '#food', label: 'food' },
  { icon: <Store size={28} />, href: '#shopping', label: 'shopping' },
];

const TourSpot = () => {
  const [activeSection, setActiveSection] = useState<string>('hotspot');

  const hotspotRef = useRef<HTMLElement>(null);
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
        threshold: [0.25, 0.5, 0.75],
      },
    );

    const sections = [hotspotRef, foodRef, shoppingRef];
    sections.forEach((ref) => ref.current && observer.observe(ref.current));

    return () => observer.disconnect();
  }, []);

  return (
    <Container className=''>
      <div className='flex-center'>
        <SectionTitle icon={<Map />} className=''>
          여행지 기본정보
        </SectionTitle>
      </div>

      <div className='flex gap-5 relative'>
        <div className='h-fit sticky top-[calc(50vh-80px)] flex flex-col gap-3'>
          {anchorItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.href}
                className={`flex-center border size-[60px] rounded-full transition-colors ${
                  isActive
                    ? 'text-green-500 border-green-500'
                    : ' border-zinc-200 hover:text-green-500'
                }`}
                onClick={() => {
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {item.icon}
              </button>
            );
          })}
        </div>
        <section className='flex flex-col flex-1 bg-zinc-100'>
          <article
            id='hotspot'
            ref={hotspotRef}
            className='bg-green-50 min-h-[1000px]'
          ></article>
          <article
            id='food'
            ref={foodRef}
            className='bg-blue-50 min-h-[1000px]'
          ></article>
          <article
            id='shopping'
            ref={shoppingRef}
            className='bg-red-50 min-h-[1000px]'
          ></article>
        </section>
      </div>
    </Container>
  );
};

export default TourSpot;
