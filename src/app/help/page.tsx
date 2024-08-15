import Text from '@/components/design-system/Text';
import { Flex } from 'antd';

export default function HelpPage() {
  return (
    <Flex vertical style={{ width: 1140 }}>
      <Text type="bold-32" colorType="gray900">
        공지사항
      </Text>
    </Flex>
  );
}
