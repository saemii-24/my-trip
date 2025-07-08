export const metadata = {
  title: 'TWA',
  description: 'AI와 함께 시작하는 나의 완벽한 여행 계획',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
