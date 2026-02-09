import Margin from '@/components/design-system/Margin';
import Text from '@/components/design-system/Text';
import { Flex } from 'antd';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { InquiryButton } from './inquiryButton/InquiryButton';

export const metadata: Metadata = {
  title: '고객센터',
  description: '자리나따 고객센터 페이지입니다.',
};

export default function HelpLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Flex
        vertical
        align="center"
        style={{ padding: '60px 0px', minHeight: 'calc(100vh - 64px)' }}
      >
        <Flex style={{ width: 1140 }}>
          <Flex vertical>
            <Image
              src={'/question.svg'}
              alt="자리나따 고객센터 페이지 아이콘"
              width={114.5}
              height={105}
            />
            <Margin vertical size={20} />
            <Text type="bold-32" colorType="gray900">
              고객센터 운영시간
            </Text>
            <Margin vertical size={12} />
            <Text type="medium-20" colorType="gray600">
              평일: 10:00 ~ 18:30
            </Text>
            <Margin vertical size={4} />
            <Text type="medium-20" colorType="gray600">
              (점심시간: 12:30 ~ 13:30), 주말 및 공휴일 휴무
            </Text>
          </Flex>
        </Flex>
        <Margin vertical size={44} />
        <Flex justify="space-between" style={{ width: 1140 }}>
          <Flex
            vertical
            style={{
              width: 550,
              height: 231,
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 24,
            }}
          >
            <Text type="bold-24" colorType="gray950">
              오류 문의
            </Text>
            <Margin vertical size={8} />
            <Text type="medium-16" colorType="gray700">
              자리나따를 이용하시면서 불편했던 점을 공유해주세요.
            </Text>
            <Margin vertical size={24} />
            <Flex align="flex-end" vertical>
              <InquiryButton backgroundColor="primary500" textColor="white" url="https://open.kakao.com/o/s95cNFEh">
                지금 바로 문의하기
              </InquiryButton>
              <Margin vertical size={8} />
              <InquiryButton backgroundColor="gray100" textColor="gray600" isEmailInquiry>
                이메일로 문의하기
              </InquiryButton>
            </Flex>
          </Flex>
          <Flex
            vertical
            style={{
              width: 550,
              height: 231,
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 24,
            }}
          >
            <Text type="bold-24" colorType="gray950">
              광고 문의
            </Text>
            <Margin vertical size={8} />
            <Text type="medium-16" colorType="gray700">
              자리나따는 언제든 환영해요!
            </Text>
            <Margin vertical size={24} />
            <Flex align="flex-end" vertical>
              <InquiryButton backgroundColor="primary500" textColor="white" url="https://open.kakao.com/o/sbnDeHfi">
                지금 바로 문의하기
              </InquiryButton>
              <Margin vertical size={8} />
              <InquiryButton backgroundColor="gray100" textColor="gray600" isEmailInquiry>
                이매일로 문의하기
              </InquiryButton>
            </Flex>
          </Flex>
        </Flex>
        <Margin vertical size={60} />
        {children}
      </Flex>
    </main>
  );
}
