import { Flex } from 'antd';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: '열차조회',
  description: '자리나따 열차조회 페이지입니다.',
};

export default function SearchLayout({ children }: PropsWithChildren) {
  return <Flex justify="center">{children}</Flex>;
}
