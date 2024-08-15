import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { Flex } from 'antd';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: '즐겨찾기',
  description: '자리나따 즐겨찾기 페이지입니다.',
};

export default function BookmarkLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Flex vertical align="center" style={{ padding: '60px 0', minHeight: 'calc(100vh - 64px)' }}>
        <Flex vertical style={{ width: 1140 }}>
          <Image
            src={'/paper.svg'}
            alt="자리나따 즐겨찾기 페이지 아이콘"
            width={112}
            height={112}
            priority
          />
          <Margin vertical size={18} />
          <Text type="bold-32" colorType="gray900">
            내가 찜한 자리 목록이예요
          </Text>
          <Margin vertical size={8} />
          <Text type="medium-20" colorType="gray600">
            기간이 지난 표는 만료된 자리로 이동돼요!
          </Text>
          <Text type="medium-20" colorType="gray600">
            표 예매에 성공하셨는지 자리나따에게 알려주세요
          </Text>
          <Margin vertical size={60} />
          {children}
        </Flex>
      </Flex>
    </main>
  );
}
