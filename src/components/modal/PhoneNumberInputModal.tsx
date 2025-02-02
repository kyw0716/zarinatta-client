import { Flex, Input } from 'antd';
import { useEffect, useState } from 'react';
import { color } from '../design-system/Color';
import Text from '../design-system/Text';

export default function PhoneNumberInputModal() {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    console.log(phoneNumber);
  }, [phoneNumber]);

  return (
    <Flex
      style={{
        width: 600,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        padding: 20,
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Flex vertical align="center" gap={16} style={{ position: 'relative' }}>
        <Text type="semiBold-24">전화번호 입력</Text>
        <Input
          placeholder="전화번호를 입력해주세요."
          style={{ width: 560, height: 52, backgroundColor: '#F7F7F7' }}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Flex
          justify="center"
          align="center"
          style={{
            width: 560,
            height: 48,
            borderRadius: 8,
            backgroundColor: color['primary500'],
            cursor: 'pointer',
          }}
        >
          <Text type="semiBold-16" colorType="white">
            확인
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
