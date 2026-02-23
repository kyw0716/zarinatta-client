import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '../static/css/reset.css';
import PageWithHeader from '@/components/header/PageWithHeader';
import { Suspense } from 'react';
import ModalProvider from '@/components/modal/ModalProvider';
import QueryProvider from '@/components/query-provider/query-provider';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: '자리나따',
  description: '자리나따 메인 페이지 입니다.',
  icons: '/zarinatta.svg',
};

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.variable}>
        <QueryProvider>
          <ModalProvider>
            <AntdRegistry>
              <Suspense>
                <PageWithHeader>{children}</PageWithHeader>
              </Suspense>
            </AntdRegistry>
          </ModalProvider>
        </QueryProvider>
      </body>
      <GoogleAnalytics gaId={"G-DHNPBDNFSJ"} />
    </html>
  );
}
