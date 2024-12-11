import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(req: NextRequest) {
  const { idToken } = await req.json();
  const cookieStore = cookies();

  if (!idToken) {
    return new Response('idToken이 올바르지 않습니다.', { status: 400 });
  }

  // 쿠키 삭제 처리
  cookieStore.set('AuthToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // 만료 시간 과거로 설정
    path: '/', // 루트 경로 설정
  });

  return new Response('로그아웃 성공: 쿠키가 삭제되었습니다.', { status: 200 });
}
