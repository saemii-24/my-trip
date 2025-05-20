import type { Metadata } from 'next';
import './globals.css';
import { Noto } from '../font';
import Provider from './_provider';

export const metadata: Metadata = {
  title: 'my-trip',
  description: '함께하는 너와 나의 여행, my-trip',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={Noto.variable + ' font'}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
