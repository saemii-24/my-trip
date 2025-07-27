import Footer from '@components/public/Footer';
import Header from '@components/public/Header';
import { ReactNode } from 'react';
import { initMSW } from '../../mocks/init';

// 서버 사이드에서만 실행
if (typeof window === 'undefined') {
  initMSW();
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className='mt-[80px] w-full'>{children}</div>
      <Footer />
    </div>
  );
}
