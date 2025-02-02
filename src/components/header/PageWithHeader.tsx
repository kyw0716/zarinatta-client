import { Flex, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import PageNavigatorMenu from './PageNavigatorMenu';
import LoginButton from './LoginButton';
import PhoneNumberInputModalButton from './PhoneNumberInputModalButton';

export default function PageWithHeader({ children }: PropsWithChildren) {
  return (
    <Layout>
      <Header
        style={{
          height: 56,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Flex style={{ width: 1178 }} justify="space-between">
          <Flex align="center" justify="space-between" style={{ width: 472 }}>
            <Link href={'/'} style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                alt="자리나따 로고 이미지"
                src={'/logo.svg'}
                width={80}
                height={30}
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <PageNavigatorMenu />
          </Flex>
          <Flex gap={15}>
            <PhoneNumberInputModalButton />
            <LoginButton />
          </Flex>
        </Flex>
      </Header>
      <Content style={{ backgroundColor: '#f7f7f7' }}>{children}</Content>
    </Layout>
  );
}
