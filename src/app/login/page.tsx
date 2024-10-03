'use client';

import { useLoginQuery } from '@/hooks/query/login';
import { userStore } from '@/store/userStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { data: loginQueryData } = useLoginQuery(code ?? '');
  const setUserInfo = userStore(({ setUserInfo }) => setUserInfo);

  useEffect(() => {
    if (loginQueryData !== undefined && loginQueryData.data !== undefined) {
      const { userEmail, userNick } = loginQueryData.data;
      setUserInfo({ userEmail, userNick });

      sessionStorage.setItem('refreshToken', loginQueryData.data.refreshToken);
      sessionStorage.setItem('userInfo', JSON.stringify({ userNick, userEmail }));
      router.push(sessionStorage.getItem('pathNameBeforeClickLoginButton') ?? '/');
    }
  }, [loginQueryData, router]);

  return <div>로그인중...</div>;
}
