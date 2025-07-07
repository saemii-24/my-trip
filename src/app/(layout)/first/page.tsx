'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountryCitySelector from '@components/questionnaire/First/CountryCitySelector';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const nextRef = useRef(null);
  const highlightRef = useRef(null);
  const selectorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        },
      });

      tl.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: 'none' })
        .to(
          nextRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '+=0',
        )
        .to(
          highlightRef.current,
          { scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2',
        )
        .to(
          [nextRef.current, highlightRef.current],
          { opacity: 0, y: -20, duration: 0.4, ease: 'power1.in' },
          '+=0.3',
        )
        .to(
          selectorRef.current,
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' },
          '-=0.2',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='relative h-screen w-screen overflow-hidden'>
      <Image
        src='https://images.unsplash.com/photo-1542776488-a3bbacfcdccd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='Full Background'
        fill
        className='object-cover'
        priority
      />

      {/* 오버레이 + 텍스트 */}
      <div
        ref={overlayRef}
        className='absolute top-0 left-0 w-full h-full bg-white opacity-0 flex items-center justify-center pointer-events-none'
      >
        <div ref={nextRef} className='text-center opacity-0 translate-y-10'>
          <div className='relative w-full inline-block'>
            <h2 className='text-3xl font-bold text-black mb-4 relative z-10'>
              @@님, 여행 준비 되셨나요?
            </h2>
            {/* 형광펜 */}
            <div
              ref={highlightRef}
              className='absolute bottom-2 left-0 h-4 w-full bg-lime-300 z-0 origin-left scale-x-0'
            />
          </div>
          <p className='text-black'>
            @@님이 원하시는 여행 국가에 맞춰, 페이지를 구성할게요.
          </p>
        </div>
      </div>

      {/* CountryCitySelector 등장 영역 */}
      <div
        ref={selectorRef}
        className='absolute top-0 left-0 w-full h-full bg-white opacity-0 translate-y-10 flex items-center justify-center pointer-events-none'
      >
        <div>
          <CountryCitySelector />
        </div>
      </div>
    </section>
  );
}
