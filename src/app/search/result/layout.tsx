import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { Flex } from 'antd';
import { Metadata } from 'next';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: '열차조회 결과',
  description: '자리나따 열차조회 결과 페이지입니다.',
};

export default function SearchResultLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Flex vertical justify="center">
        <Flex vertical style={{ width: 1140, padding: '60px 0', minHeight: 'calc(100vh - 64px)' }}>
          <Image
            src={'/search.svg'}
            alt="자리나따 열차조회 페이지"
            width={150}
            height={139}
            priority
          />
          <Margin vertical size={4} />
          <Text type="bold-32" colorType="gray900">
            원하는 자리를 조회했어요
          </Text>
          <Margin vertical size={8} />
          <Text type="medium-20" colorType="gray600">
            즐겨찾기를 통해 찜한자리에 추가할 수 있어요!
          </Text>
          <Text type="medium-20" colorType="gray600">
            여석이 나면 문자로 알림이 발송돼요
          </Text>
        </Flex>
        {children}
      </Flex>
    </main>
  );
}
