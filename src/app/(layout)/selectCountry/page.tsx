'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth';
import { SectionTitle } from '@components/public/SectionTitle';
import { Earth } from 'lucide-react';
import Container from '@components/public/Container';
import CountryCitySelector from '@components/questionnaire/First/CountryCitySelector';
import { countryObjList } from '@utils/randomImageKeyword';
import CountryAutoComplete from '@components/questionnaire/First/CountryAutoComplete';
import CityAutoComplete from '@components/questionnaire/First/CityAutoComplete';
import { useForm } from 'react-hook-form';

gsap.registerPlugin(ScrollTrigger);

function SelectCountry() {
  const { user } = useFirebaseAuth();
  const imageRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top top+=80',
        end: '+=130%',
        scrub: true,
        pin: true,
      },
    });

    // Scroll 애니메이션
    tl.to(imageRef.current, {
      scale: 1.2,
      duration: 1,
      ease: 'power2.out',
    }).to(
      blackRef.current,
      {
        opacity: 0.7,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(nameRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              });
            },
          });
        },
      },
      '-=0.5', // blackRef는 살짝 먼저 시작
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className='relative w-full h-fit  overflow-hidden'>
      <div
        ref={imageRef}
        className=' w-[calc(100vw-32px)] mx-auto h-[calc(100vh-120px)] relative overflow-hidden'
      >
        <div className='size-full rounded-[60px] overflow-hidden relative'>
          <Image
            src={
              'https://images.unsplash.com/photo-1597388522516-a755e0fcfc72?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={'흑백-비행기-좌석-q9-rkEJfIG4'}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* 블랙 그라데이션 오버레이 */}
        </div>
        <div ref={blackRef} className='absolute inset-0  bg-black opacity-0 '></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-40px]'>
          <h1
            ref={nameRef}
            className='text-[60px] text-white font-bold opacity-0 text-center'
          >
            {user?.displayName + '님'} 안녕하세요
          </h1>
          <div
            ref={contentRef}
            className='text-white text-center text-lg font-normal opacity-0'
          >
            궁금하신 여행지를 선택하시면 해당 여행지에 맞춰 페이지를 조정할게요.
          </div>
        </div>
      </div>
      {/* 본문 */}
    </div>
  );
}

type FormValues = {
  country: string;
  city: string;
};

export default function SelectCountryPage() {
  const [selectedCountry, setSelectedCountry] = useState<
    (typeof countryObjList)[0] | null
  >(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();
  const country = watch('country');
  const city = watch('city');

  console.log('country:', country);
  console.log('city:', city);
  console.log('errors:', errors);

  return (
    <div>
      <SelectCountry />
      <Container className='pt-150'>
        <SectionTitle icon={<Earth />}>여행지 선택</SectionTitle>
        <p className='text-xl'>
          원하시는 여행지를 선택해주세요. 한국어와 영어 모두 검색하실 수 있어요.
        </p>
        <div className='min-h-dvh pt-20'>
          <div className='space-y-6'>
            <CountryAutoComplete
              name='country'
              register={register}
              watch={watch}
              setValue={setValue}
              onSelectCountry={setSelectedCountry}
              setError={setError}
              clearErrors={clearErrors}
            />

            {/* {selectedCountry && <CityAutoComplete country={selectedCountry} />} */}
          </div>
          <div className='w-full flex justify-end'>
            <button className='mt-10 text-3xl font-medium px-12 py-5 rounded-full  bg-green-500 hover:bg-green-600 transition'>
              선택 완료
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
