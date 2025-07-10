'use client';
import CountryLocationMap from '@components/CountryLocationMap';
import CurrencyChart from '@components/CurrencyChart';
import Aeroplane1 from '@components/icon/Aeroplane1';
import MapMarker5 from '@components/icon/MapMarker5';
import ThumbsUp3 from '@components/icon/ThumbsUp3';
import Image from 'next/image';
import RightSection from './_components/RightSection';
import useCurrencyGet from '@query/useCurrencyGet';
import { cn } from '@utils/cn';
import ChevronLeft from '@components/icon/ChevronLeft';
import ChevronRight from '@components/icon/ChevronRight';
import dynamic from 'next/dynamic';
const MainPicture = dynamic(() => import('@components/information/MainPicture'), {
  loading: () => <p>Loading...</p>,
});

export default function InformationPage() {
  return (
    <div className='w-full'>
      <div className='mt-[100px] mx-auto w-fit'>
        <MainPicture />
      </div>
      {/* <h1 className='text-3xl'>대만 · 타이페이</h1>
      <div className='mt-[100px] w-[calc(100vw-32px)] h-[calc(100vh-120px)] rounded-2xl overflow-hidden mx-auto relative'>
        <Image
          src='https://images.unsplash.com/photo-1614419349026-cbcfd0a3df2e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Taipei city view'
          fill
          objectFit='cover'
          priority
        />
      </div> */}
    </div>
  );
}
// export default function DestinationPage() {
//   const callCurrencyCode = 'TWD';
//   const { currencyRateData } = useCurrencyGet(callCurrencyCode);
//   const currencyRate = currencyRateData?.currencyRate;

//   if (!currencyRate) return;

//   const todayRate = Number(Object.values(currencyRate[0])[0]);
//   const yesterdayRate = Number(Object.values(currencyRate[1])[0]);
//   const diff = Number((todayRate - yesterdayRate).toFixed(2));
//   const isUp = diff > 0;

//   return (
//     <div className='min-h-screen  bg-[#F9F9F9] pt-[60px] '>
//       <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6'>
//         {/* Main Content (2/3) */}

//           {/* Header */}
//         <div className='lg:col-span-2 space-y-8'>
//           <div className='comp-border w-full h-[500px] bg-white flex flex-col  rounded-2xl overflow-hidden shadow-sm'>
//             <div className='w-full h-[300px] overflow-hidden relative'>
//               <Image
//                 src='https://images.unsplash.com/photo-1614419349026-cbcfd0a3df2e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//                 alt='Taipei city view'
//                 fill
//                 objectFit='cover'
//                 priority
//               />
//             </div>
//             <div className='flex'>
//               <div className='mt-[-40px] ml-[30px] relative size-[180px] rounded-full border-[6px] border-white overflow-hidden'>
//                 <Image
//                   src='https://images.unsplash.com/photo-1614419349026-cbcfd0a3df2e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//                   alt='Taipei city view'
//                   fill
//                   objectFit='cover'
//                   priority
//                 />
//               </div>
//               <div className='pl-6 pr-4 py-7 bg-white flex-1'>
//                 <div className='flex items-center gap-2 '>
//                   <h1 className='text-3xl font-bold '>대만 · Taiwan</h1>
//                   <div className='bg-lime-100 rounded-full text-lime-600 text-sm px-2 py-[1px] font-medium w-fit'>
//                     아시아
//                   </div>
//                 </div>
//                 <div className='flex gap-5'>
//                   <div className='flex gap-1 mt-2'>
//                     <Aeroplane1 className='size-6 text-lime-500' />
//                     <div className='text-semibold'>
//                       <span>비행시간</span>
//                       <span>: </span>
//                       <span>2시간 30분</span>
//                     </div>
//                   </div>
//                   <div className='flex gap-1 mt-2'>
//                     <ThumbsUp3 className='size-6 text-lime-500' />
//                     <div className='text-semibold'>
//                       <span>여행 최적기</span>
//                       <span>: </span>
//                       <span>3월~5월, 10월~11월</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='mt-5'>
//                   <div className='flex flex-wrap gap-2'>
//                     <span className='bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm'>
//                       #맛집투어
//                     </span>
//                     <span className='bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm'>
//                       #자연감성
//                     </span>
//                     <span className='bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm'>
//                       #커플추천
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Actions */}
//             <div className='bg-white p-4 border-t shadow flex items-center justify-between'>
//               <button className='hover:bg-lime-50 transition w-fit px-5  text-lime-500   py-2 rounded-lg font-semibold'>
//                 맞춤 일정 계획하기
//               </button>
//               <button className='w-fit px-5 ml-auto border bg-lime-400 hover:bg-lime-500 transition  text-white py-2 rounded-lg font-semibold'>
//                 관심여행지 설정
//               </button>
//             </div>
//           </div>

//           {/* About Section */}
//           <section>
//             <h2 className='text-2xl font-semibold mb-2'>About</h2>
//             <p className='text-gray-700'>
//               대만의 수도인 타이베이는 전통과 현대가 공존하는 활기찬 도시로, 야시장, 온천,
//               그리고 아름다운 자연 경관으로 유명합니다.
//             </p>
//           </section>

//           {/* Itinerary */}
//           {/* <section>
//             <h2 className='text-2xl font-semibold mb-2'>추천 일정</h2>
//             <ul className='space-y-2'>
//               <li className='bg-white p-4 rounded-xl shadow'>
//                 1일차: 단수이 → 타이베이 101 → 융캉제
//               </li>
//               <li className='bg-white p-4 rounded-xl shadow'>
//                 2일차: 예스지 버스투어 → 스린야시장
//               </li>
//               <li className='bg-white p-4 rounded-xl shadow'>
//                 3일차: 대만 박물관 → 더 정
//               </li>
//             </ul>
//           </section> */}

//           {/* Spots */}
//           <section>
//             <h2 className='text-2xl font-semibold mb-2'>추천 스팟</h2>
//             <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
//               <div className='bg-white p-4 rounded-xl shadow'>
//                 <h3 className='font-bold'>타이베이 101 카페</h3>
//                 <p className='text-sm text-gray-600'>
//                   전망대 대신 카페에서 즐기는 시티뷰
//                 </p>
//               </div>
//               <div className='bg-white p-4 rounded-xl shadow'>
//                 <h3 className='font-bold'>단수이 바다뷰 스타벅스</h3>
//                 <p className='text-sm text-gray-600'>해질녘 풍경이 아름다운 매장</p>
//               </div>
//             </div>
//           </section>

//           {/* Food */}
//           <section>
//             <h2 className='text-2xl font-semibold mb-2'>음식 추천</h2>
//             <ul className='list-disc list-inside text-gray-700'>
//               <li>주에린 베이커리 에그롤 (융캉제)</li>
//               <li>라뜰리에 누가 크래커</li>
//               <li>호호미 소보루</li>
//               <li>Mr. Chef Snow & Tofu</li>
//             </ul>
//           </section>

//           {/* Travel Tips */}
//           <section>
//             <h2 className='text-2xl font-semibold mb-2'>여행 팁</h2>
//             <p className='text-gray-700'>
//               현지에서는 이지카드로 MRT 및 버스 탑승이 편리하며, 대부분의 매장에서 간단한
//               영어가 통용됩니다.
//             </p>
//           </section>
//         </div>

//         {/* Side Column (1/3) */}
//         <div className='space-y-6'>
//           {/* Info Box */}
//           {/* <RightSection>
//             <RightSection.Title>위치</RightSection.Title>
//             <CountryLocationMap lat={23.6987} lng={120.9605} zoom={7} />
//           </RightSection> */}

//           <RightSection>
//             <RightSection.Title>
//               <div className='flex justify-between items-center'>
//                 <span>환율</span>
//                 <span className='text-gray-500 font-normal text-xs'>
//                   2025년 07월 05일 기준
//                 </span>
//               </div>
//             </RightSection.Title>

//             <div className='flex w-full gap-6'>
//               <div className='w-full'>
//                 {/* 🔹 예: "대만 TWD" */}
//                 <div className='text-sm text-gray-600'>대만 {callCurrencyCode}</div>
//                 {/* 🔸 오늘 환율 + 증감 표시 */}
//                 <div className='flex items-end gap-2 text-xl font-bold text-gray-950'>
//                   {Object.values(currencyRate[0])[0]}
//                   <span
//                     className={cn(
//                       'text-sm font-medium',
//                       diff > 0 ? 'text-red-500' : 'text-lime-500',
//                     )}
//                   >
//                     {diff > 0 ? '▲' : '▼'} {Math.abs(diff)}
//                   </span>
//                 </div>
//                 {/* 🔹 차트 */}
//                 <div className='w-[calc(100%-120px)]'>
//                   <CurrencyChart
//                     currencyRateData={currencyRateData || undefined}
//                     showAxisLabels={false}
//                     showAxisLines={false}
//                     className='h-[80px] w-full '
//                   />
//                 </div>
//               </div>
//               <div className='grid-cols-2 gap-2 grid shrink-0 text-gray-600  text-sm  w-[120px]'>
//                 <div>1개월전</div>
//                 <div className='ml-auto'>40.01</div>
//                 <hr className='col-span-2 bg-gray-500' />
//                 <div>3개월전</div>
//                 <div className='ml-auto'>40.01</div>
//                 <hr className='col-span-2 bg-gray-500' />
//                 <div>1년전</div>
//                 <div className='ml-auto'>40.01</div>
//                 <hr className='col-span-2 bg-gray-500' />
//                 <div className='col-span-2 '>
//                   <div className='items-center flex justify-between'>
//                     <span>자세히 보기</span>
//                     <ChevronRight className='size-4' />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </RightSection>
//         </div>
//       </div>
//     </div>
//   );
// }
