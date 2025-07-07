import type { Metadata } from 'next';
import './globals.css';
import Provider from './_provider';
import { pretendard, suit } from '../font';

export const metadata: Metadata = {
  title: 'my-trip',
  description: '함께하는 너와 나의 여행, my-trip',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={`${pretendard.variable} ${suit.variable} `}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
