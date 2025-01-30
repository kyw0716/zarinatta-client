'use client';

import { API_END_POINT } from '@/static/api';
import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { Flex } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    ZarinattaAxios.securedApiInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.status === 401) {
          const isUserWantToLogin = window.confirm(
            '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?'
          );

          if (isUserWantToLogin) {
            const response = await fetch(`${API_END_POINT}/v1/auth/redirect`);
            const value = await response.json();

            sessionStorage.setItem('pathNameBeforeClickLoginButton', window.location.pathname);
            router.push(value.redirectUri);
          }
        }
      }
    );
  }, []);

  return (
    <main>
      <Flex vertical align="center">
        <Image
          src={'/landing-page.svg'}
          alt="랜딩 페이지 이미지"
          width={1280}
          height={4462}
          layout="responsive"
          style={{ width: '100vw', height: 'auto', cursor: 'pointer' }}
          onClick={() => router.push(`/search?departDate=${dayjs().format('YYYYMMDD')}`)}
        />
      </Flex>
    </main>
  );
}
