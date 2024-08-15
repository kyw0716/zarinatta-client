import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { Flex } from 'antd';

export default function BookmarkPage() {
  return (
    <Flex vertical>
      <Flex>
        <Text type="semiBold-24" colorType="gray950">
          찜한자리
        </Text>
        <Margin horizontal size={32} />
        <Text type="semiBold-24" colorType="gray400">
          만료된 자리
        </Text>
      </Flex>
      <Margin vertical size={36} />
    </Flex>
  );
}
