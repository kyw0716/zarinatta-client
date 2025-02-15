import { Flex, Input } from 'antd';
import { useEffect, useState } from 'react';
import { color } from '../design-system/Color';
import Text from '../design-system/Text';
import { useFillMockData } from '@/hooks/query/use-fill-mock-data';
import { usePhoneNumberInput } from '@/hooks/query/use-phone-number-input';
import { useModalStore } from '@/hooks/use-modal-store';

export default function PhoneNumberInputModal() {
  const { mutate } = useFillMockData();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [count, setCount] = useState(0);

  const closeModal = useModalStore(({ closeModal }) => closeModal);
  const { mutate: requestUserPhoneNumber } = usePhoneNumberInput(closeModal);

  const increase = () => {
    setCount((current) => current + 1);
  };

  useEffect(() => {
    if (count > 10) {
      alert('이걸 10번이나 누르는 쉨이 있네');
      mutate();
    }
  }, [count]);

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
          onClick={() => {
            if (phoneNumber.length > 0) {
              requestUserPhoneNumber(phoneNumber);
            }

            increase();
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
