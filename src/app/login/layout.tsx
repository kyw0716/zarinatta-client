import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: '즐겨찾기',
  description: '자리나따 즐겨찾기 페이지입니다.',
};

export default function LoginLayout({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}
