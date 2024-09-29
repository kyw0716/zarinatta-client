'use client';

import { useLoginQuery } from '@/hooks/query/login';
import { userStore } from '@/store/userStore';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { data: loginQueryData } = useLoginQuery(code ?? '');
  const setUserInfo = userStore(({ setUserInfo }) => setUserInfo);

  if (loginQueryData !== undefined && loginQueryData.data !== undefined) {
    const { userEmail, userNick } = loginQueryData.data;
    setUserInfo({ userEmail, userNick });

    sessionStorage.setItem('refreshToken', loginQueryData.data.refreshToken);
    router.push(sessionStorage.getItem('pathNameBeforeClickLoginButton') ?? '/');
  }

  return <div>로그인중...</div>;
}
