'use client';

import { useLoginMutation, useSignUpQuery } from '@/hooks/query/login';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { data: signUpQueryData } = useSignUpQuery(code ?? '');
  const loginMutation = useLoginMutation(() => router.push(pathNameBeforeClickLoginButton ?? '/'));
  const pathNameBeforeClickLoginButton = sessionStorage.getItem('pathNameBeforeClickLoginButton');

  if (signUpQueryData?.status === 409) {
    loginMutation.mutate(sessionStorage.getItem('refreshToken') ?? '');
  }

  if (signUpQueryData !== undefined && signUpQueryData.data !== undefined) {
    sessionStorage.setItem('refreshToken', signUpQueryData.data.refreshToken);
    router.push(pathNameBeforeClickLoginButton ?? '/');
  }

  return <>로그인중...</>;
}
