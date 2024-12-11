import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Firebase Admin SDK 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { AuthToken } = await req.json();

    if (!AuthToken) {
      return new NextResponse('AuthToken이 누락되었습니다.', { status: 400 });
    }

    // Firebase ID 토큰 검증
    const decodedToken = await admin.auth().verifyIdToken(AuthToken);
    const uid = decodedToken.uid;

    // 쿠키 설정
    const response = new NextResponse('로그인 성공', { status: 200 });
    response.cookies.set('AuthToken', AuthToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('토큰 검증 실패:', error.message);
    return new NextResponse('토큰 검증 실패', { status: 401 });
  }
}
