import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
export default function MainPicture() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [pathD, setPathD] = useState('');
  const [size, setSize] = useState({ width: 0, height: 0 });
  const R = 60;

  useEffect(() => {
    const updatePath = () => {
      if (!wrapperRef.current || !textRef.current) return;

      const width = wrapperRef.current.offsetWidth;
      const height = wrapperRef.current.offsetHeight;
      const countryWidth = textRef.current.offsetWidth;
      const countryHeight = textRef.current.offsetHeight;

      const d = `
        M ${width - R},0
        A ${R},${R} 0,0,1 ${width},${R}
        L ${width},${height - countryHeight - R}
        A ${R},${R} 0,0,1 ${width - R},${height - countryHeight}
        L ${width - countryWidth + R},${height - countryHeight}
        A ${R},${R} 0,0,0 ${width - countryWidth},${height - countryHeight + R}
        L ${width - countryWidth},${height - R}
        A ${R},${R} 0,0,1 ${width - countryWidth - R},${height}
        L ${R},${height}
        A ${R},${R} 0,0,1 0,${height - R}
        L 0,${R}
        A ${R},${R} 0,0,1 ${R},0
        Z
      `;

      setPathD(d.trim());
      setSize({ width, height });
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className='w-[calc(100vw-32px)] h-[calc(100vh-120px)] relative overflow-hidden'
    >
      <svg
        width={size.width}
        height={size.height}
        className='absolute top-0 left-0 pointer-events-none'
      >
        <defs>
          <clipPath id='clip'>
            <path d={pathD} />
          </clipPath>
        </defs>
        {/* 여기서 path 보이고 싶다면 아래 주석 해제 */}
        {/* <path d={pathD} fill='rgba(255,0,0,0.2)' /> */}
      </svg>

      <div style={{ clipPath: 'url(#clip)' }} className='absolute inset-0'>
        {/* 블랙 그라데이션 오버레이 */}
        <div className='absolute  inset-0 bg-gradient-to-b from-black/50 to-black/0 z-10'></div>

        <Image
          src='https://images.unsplash.com/photo-1698567045771-a22c872c26fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Taipei city view'
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div
        ref={textRef}
        className='absolute bottom-0 right-0 text-[120px] font-black px-[64px]  z-10'
      >
        TAIPEI
      </div>
      <p className='text-xl text-white absolute top-20 left-20 w-[30vw] break-keep font-normal'>
        찻잎 향이 은은히 퍼지는 오래된 골목을 걷고, 말없이 건네는 미소 속에서 사람의
        온기를 느끼는 곳. 대만은 작지만 깊고 진한 여행의 기억을 남깁니다.
      </p>
    </div>
  );
}
