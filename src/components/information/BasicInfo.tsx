import CountryLocationMap from '@components/CountryLocationMap';
import CurrencyChart from '@components/CurrencyChart';
import Container from '@components/public/Container';
import { cn } from '@utils/cn';
import { BookCheck, Clock, Languages, MapPin, Plug2, Search, Sun } from 'lucide-react';
import Image from 'next/image';
import { ReactNode } from 'react';
import Currency from './Currency';
import { SectionTitle } from '@components/public/SectionTitle';

export default function BasicInfo() {
  return (
    <>
      <section className=' py-150 '>
        <Container>
          <SectionTitle icon={<MapPin />}>대만 · 타이페이</SectionTitle>

          {/* Left featured article (takes 2 cols on md+) */}
          {/* <div className=''>
            <CountryLocationMap
              lat={23.6987}
              lng={120.9605}
              zoom={7}
              className='h-[60vh] rounded-60 overflow-hidden'
            />
          </div> */}
        </Container>
      </section>
      <section className=''>
        <Container>
          <SectionTitle icon={<Search />}>여행지 기본정보</SectionTitle>
          <div className='grid grid-cols-4 gap-8 '>
            <BaiscInfoBox>
              <Image
                src='https://images.unsplash.com/photo-1650039570310-8ac8abe3d055?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Taipei city view'
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </BaiscInfoBox>
            <BaiscInfoBox className='w-full aspect-square bg-zinc-100 p-8 flex flex-col'>
              <div className='size-[84px] rounded-full bg-white flex-center'>
                <Plug2 className='text-gray-900' size={48} />
              </div>
              <div className='mt-auto'>
                <h2 className='text-5xl font-semibold'>플러그</h2>
                <p className='break-keep text-lg mt-2 text-gray-700'>
                  대만은 100V를 사용하므로, 어댑터가 필요합니다.
                </p>
              </div>
            </BaiscInfoBox>
            <BaiscInfoBox className='w-full aspect-square bg-zinc-100 p-8 flex flex-col'>
              <div className='size-[84px] rounded-full bg-white flex-center'>
                <BookCheck className='text-gray-900' size={48} />
              </div>
              <div className='mt-auto'>
                <h2 className='text-5xl font-semibold'>비자</h2>
                <p className='break-keep text-lg mt-2 text-gray-700'>
                  대한민국 여권 소지자는 90일 무비자 체류가 가능합니다.
                </p>
              </div>
            </BaiscInfoBox>
            <BaiscInfoBox className='w-full aspect-square bg-zinc-100 p-8 flex flex-col'>
              <div className='size-[84px] rounded-full bg-white flex-center'>
                <Sun className='text-gray-900' size={48} />
              </div>
              <div className='mt-auto'>
                <h2 className='text-5xl font-semibold'>기후</h2>
                <p className='break-keep text-lg mt-2 text-gray-700'>
                  연중 온화한 아열대성 기후로, 여름은 한국보다 덥고 습한 날씨입니다.
                </p>
              </div>
            </BaiscInfoBox>
            <BaiscInfoBox className='w-full aspect-square bg-zinc-100 p-8 flex flex-col'>
              <div className='size-[84px] rounded-full bg-white flex-center'>
                <Languages className='text-gray-900' size={48} />
              </div>
              <div className='mt-auto'>
                <h2 className='text-5xl font-semibold'>공용어</h2>
                <p className='break-keep text-lg mt-2 text-gray-700'>
                  중국어 (대만어, 영어 일부 통용)
                </p>
              </div>
            </BaiscInfoBox>
            <BaiscInfoBox className='w-full aspect-square bg-zinc-100 p-8 flex flex-col'>
              <div className='size-[84px] rounded-full bg-white flex-center'>
                <Clock className='text-gray-900' size={48} />
              </div>
              <div className='mt-auto'>
                <h2 className='text-5xl font-semibold'>
                  시차 <span className=' text-3xl'>UTC+8</span>
                </h2>
                <p className='break-keep text-lg mt-2 text-gray-700'>
                  대만이 한국보다 1시간 느립니다.
                </p>
              </div>
            </BaiscInfoBox>
            <BaiscInfoBox className='col-span-2 aspect-auto bg-white border border-gray-100'>
              <Image
                src='https://images.unsplash.com/photo-1697623155235-2e209f081d4b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Taipei city view'
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </BaiscInfoBox>
          </div>
        </Container>
      </section>
      <section className='bg-zinc-100 mt-150 py-150'>
        <Currency />
      </section>
    </>
  );
}

const BaiscInfoBox = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'w-full aspect-square relative rounded-60 overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  );
};
