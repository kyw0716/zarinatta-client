import { Flex } from 'antd';
import { color } from '../design-system/Color';

export const TrainTypeChip = ({ text }: { text: string }) => {
  return (
    <Flex
      style={{ padding: '4px 12px', backgroundColor: color['gray50'], color: color['gray950'] }}
    >
      {text}
    </Flex>
  );
};
