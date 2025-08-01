// import { NextRequest } from 'next/server';

// export async function GET(req: NextRequest) {
//   // export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   console.log(searchParams);

//   // ✅ 필수 파라미터
//   const apiKey = process.env.NEXT_PUBLIC_GOV_API_KEY;

//   // ❌ API Key 없을 때 에러
//   if (!apiKey) {
//     return new Response('API Key is missing', { status: 400 });
//   }

//   const baseUrl = 'https://apis.data.go.kr/1262000/NoticeService2/getNoticeList2';
//   // ✅ 기본값 포함한 파라미터 설정
//   const params = new URLSearchParams({
//     serviceKey: apiKey,
//     pageNo: '1',
//     numOfRows: '10',
//   });

//   // ✅ 위에 값 덮어씌워서 전송
//   const pageNo = searchParams.get('pageNo');
//   const numOfRows = searchParams.get('numOfRows');

//   if (pageNo) params.set('pageNo', pageNo);
//   if (numOfRows) params.set('numOfRows', numOfRows);

//   const fullUrl = `${baseUrl}?${params}`;
//   console.log('apiKey: ' + apiKey);
//   console.log('fullUrl: ' + fullUrl);

//   try {
//     const res = await fetch(fullUrl);

//     const data = await res.json();
//     console.log('data: ' + data);
//     return Response.json(data);
//   } catch (error) {
//     // ❌ 응답 실패 에러
//     console.error('API fetch error:', error);
//     return new Response('Failed to fetch data', { status: 500 });
//   }
// }
