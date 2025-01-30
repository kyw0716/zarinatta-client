'use client';

import { ColorType, color } from '@/components/design-system/Color';
import Text from '@/components/design-system/Text';
import { Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface InquiryButtonProps extends PropsWithChildren {
  backgroundColor: ColorType;
  textColor: ColorType | 'white';
  isEmailInquiry?: boolean;
}

export function InquiryButton({
  backgroundColor,
  textColor,
  isEmailInquiry,
  children,
}: InquiryButtonProps) {
  const router = useRouter();

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: 338,
        height: 40,
        borderRadius: 8,
        backgroundColor: color[backgroundColor],
        cursor: 'pointer',
      }}
      onClick={() => {
        isEmailInquiry
          ? router.push(
              'https://mail.google.com/mail/u/0/#inbox?compose=VpCqJKhwRPdbVlDWzQMtZmVzXJlNVxwWDgJnzmnSrnLCqVzdDPfDJDhMrqHTPghVMVXjMmG'
            )
          : alert('아직 개발중이예용');
      }}
    >
      <Text type="semiBold-16" colorType={textColor}>
        {children}
      </Text>
    </Flex>
  );
}
