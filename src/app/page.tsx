import Text from '@/components/design-system/Text';
import { Flex } from 'antd';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <Flex vertical align="center">
        <Image src={'/크롱이.jpeg'} alt="제 반려 도마뱀 사진입니다." width={650} height={1200} />
        <Text type={'bold-32'}>크롱이</Text>
      </Flex>
    </main>
  );
}
