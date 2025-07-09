import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // ✅ 필수 파라미터
  const apiKey = process.env.NEXT_PUBLIC_GOV_API_KEY;
  console.log(apiKey);

  // ❌ API Key 없을 때 에러
  if (!apiKey) {
    return new Response('API Key is missing', { status: 400 });
  }

  const baseUrl =
    'https://apis.data.go.kr/1262000/TravelSpecialWarningServiceV3/getTravelSpecialWarningListV3';

  // ✅ 기본값 포함한 파라미터 설정
  const params = new URLSearchParams({
    serviceKey: apiKey,
    returnType: 'JSON',
    pageNo: '1',
    numOfRows: '10',
  });

  // ✅ 위에 값 덮어씌워서 전송
  const pageNo = searchParams.get('pageNo');
  const numOfRows = searchParams.get('numOfRows');

  if (pageNo) params.set('pageNo', pageNo);
  if (numOfRows) params.set('numOfRows', numOfRows);

  const fullUrl = `${baseUrl}?${params.toString()}`;

  try {
    const res = await fetch(fullUrl);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    // ❌ 응답 실패 에러
    console.error('API fetch error:', error);
    return new Response('Failed to fetch data', { status: 500 });
  }
}
