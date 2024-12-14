import { NextRequest, NextResponse } from 'next/server';
import admin from '@remote/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization'); // Authorization 헤더에서 토큰 가져오기

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Authorization 헤더가 없거나 Bearer가 아닌 경우
      return new NextResponse('Authorization 헤더가 없습니다.', { status: 400 });
    }

    const token = authHeader.split(' ')[1]; // Bearer 뒤에 있는 토큰 추출

    // Firebase ID 토큰 검증
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('검증된 사용자:', decodedToken);

    return new NextResponse('로그인 성공', { status: 200 });
  } catch (error) {
    console.error('Firebase 토큰 검증 실패:');
    return new NextResponse('토큰 검증 실패', { status: 401 });
  }
}
