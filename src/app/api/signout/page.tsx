import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();
  const cookieStore = await cookies();

  if (!idToken) {
    return new Response('id Token이 올바르지 않습니다.', { status: 400 });
  }

  cookieStore.set('AuthToken', idToken);
  return new Response('id Token을 쿠키에 설정했습니다.', { status: 400 });
}
