import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인된 사용자는 signin 접근 불가, 로그인하지 않은 사용자는 signin으로 리디렉션
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('AuthToken'); // 쿠키에서 인증 토큰을 가져옵니다.

  // 로그인 상태 체크
  if (token) {
    // 로그인 상태라면 signin 페이지로 접근 불가
    if (request.nextUrl.pathname === '/signin') {
      return NextResponse.redirect(new URL('/', request.url)); // 홈으로 리디렉션
    }
  } else {
    // 로그인 안된 상태라면 signin 페이지로 강제 리디렉션
    if (request.nextUrl.pathname !== '/signin') {
      return NextResponse.redirect(new URL('/signin', request.url)); // signin으로 리디렉션
    }
  }

  return NextResponse.next(); // 그 외의 경우에는 정상적으로 요청을 처리
}

export const config = {
  matcher: ['/signin', '/'], // signin과 홈 페이지에만 적용
};
