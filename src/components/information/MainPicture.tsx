import { useEffect, useRef, useState } from 'react';

export default function MainPicture() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [pathD, setPathD] = useState('');
  const R = 60;

  useEffect(() => {
    const updatePath = () => {
      if (!wrapperRef.current || !textRef.current) return;
      const width = wrapperRef.current.offsetWidth;
      const height = wrapperRef.current.offsetHeight;
      const countryWidth = textRef.current.offsetWidth;
      const countryHeight = 150;

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
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, []);

  if (typeof window !== 'object') {
    return <></>;
  }

  return (
    <div
      ref={wrapperRef}
      className=' w-[calc(100vw-32px)] h-[calc(100vh-120px)] relative'
    >
      <svg
        viewBox={`0 0 ${wrapperRef.current?.offsetWidth || 0} ${wrapperRef.current?.offsetHeight || 0}`}
        width='100%'
        height='100%'
        preserveAspectRatio='none'
      >
        <path d={pathD} fill='red' />
      </svg>
      <div
        ref={textRef}
        className='absolute bottom-0 right-0 text-[100px] font-black px-10'
      >
        TAIPEI
      </div>
    </div>
  );
}
