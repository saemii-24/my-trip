import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: (request) => {
    // Next.js 내부 요청 무시
    if (
      request.url.includes('_rsc=') ||
      request.url.includes('_next/') ||
      request.url.endsWith('/')
    ) {
      return; // 경고 없이 무시
    }

    console.warn('Unhandled request:', request.url);
  },
});
