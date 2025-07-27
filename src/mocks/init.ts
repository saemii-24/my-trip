import { server } from './server';

let isInitialized = false;

export function initMSW() {
  if (
    !isInitialized &&
    process.env.NODE_ENV === 'development' &&
    typeof window === 'undefined'
  ) {
    console.log('🚀 MSW 서버 초기화 중...');

    server.listen({
      onUnhandledRequest: 'warn',
    });

    isInitialized = true;
    console.log('✅ MSW 서버 초기화 완료');

    // 프로세스 종료 시 정리
    process.on('SIGINT', () => {
      server.close();
      console.log('🛑 MSW 서버 종료');
    });

    process.on('SIGTERM', () => {
      server.close();
      console.log('🛑 MSW 서버 종료');
    });
  }
}
