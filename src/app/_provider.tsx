'use client';

import { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
  // MSW 초기화
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser')
        .then(({ worker }) => {
          worker.start({
            onUnhandledRequest: 'warn',
          });
          console.log('MSW 실행완료!!');
        })
        .catch((error) => {
          console.error('MSW 초기화 실패:', error);
        });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
