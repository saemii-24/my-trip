'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const nextRef = useRef(null);

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

      tl.to(overlayRef.current, { opacity: 1, duration: 1, ease: 'none' }).to(
        nextRef.current,
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.3',
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

      {/* 블랙 오버레이 */}
      <div
        ref={overlayRef}
        className='absolute top-0 left-0 w-full h-full bg-black opacity-0 flex items-center justify-center pointer-events-none'
      >
        <div
          ref={nextRef}
          className='text-center opacity-0 translate-y-10 transition duration-700'
        >
          <h2 className='text-3xl font-bold text-white mb-4'>
            @@님, 여행 준비 되셨나요?
          </h2>
          <p className='text-white'>
            @@님이 원하시는 여행 국가에 맞춰, 페이지를 구성할게요.
          </p>
        </div>
      </div>
    </section>
  );
}
