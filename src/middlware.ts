import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import admin from '@remote/firebaseAdmin'; // Firebase Admin SDK

export async function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL('/', req.url));
  // const { pathname } = req.nextUrl; // 요청 URL의 경로 가져오기
  // console.log('왜 안될까?');

  // // Firebase ID 토큰 확인
  // const authHeader = req.headers.get('Authorization');
  // const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  // console.log('토큰: ' + token);

  // try {
  //   if (token) {
  //     // Firebase Admin SDK로 토큰 검증
  //     const decodedToken = await admin.auth().verifyIdToken(token);
  //     console.log('사용자 인증 성공:', decodedToken);

  //     // 이미 로그인한 상태에서 /signin 접근 시 메인 페이지로 리다이렉트
  //     if (pathname.startsWith('/signin')) {
  //       return NextResponse.redirect(new URL('/', req.url));
  //     }

  //     // 로그인이 유효한 상태이므로 요청 통과
  //     return NextResponse.next();
  //   }
  // } catch (error) {
  //   console.error('토큰 검증 실패:', error);
  // }

  // // 로그인이 되어 있지 않다면:
  // if (!pathname.startsWith('/signin')) {
  //   // /signin이 아닌 보호된 페이지 접근 시 /signin으로 리다이렉트
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }

  // // 로그인하지 않은 상태에서 /signin은 접근 허용
  // return NextResponse.next();
}

// 미들웨어를 모든 경로에 적용
export const config = {
  matcher: '/',
};
