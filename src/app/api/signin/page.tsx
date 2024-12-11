import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return new Response('accessToken이 없습니다.', { status: 400 });
    }

    // 쿠키에 저장할 accessToken 설정
    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true, // 클라이언트에서 접근할 수 없도록
      secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 secure 쿠키 사용
      maxAge: 60 * 60 * 24 * 7, // 쿠키 유효 기간
      path: '/', // 쿠키 경로
    });

    return new Response('로그인 성공', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('서버 오류', { status: 500 });
  }
}
