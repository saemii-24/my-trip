import './globals.css';
import { Noto } from '../font';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={Noto.variable + ' font'}>{children}</body>
    </html>
  );
}
