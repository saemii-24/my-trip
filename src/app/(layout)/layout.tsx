import Footer from '@components/public/Footer';
import Header from '@components/public/Header';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className='mt-[80px] w-full'>{children}</div>
      <Footer />
    </div>
  );
}
