'use client';

import { useLoginRedirectCodeQuery } from '@/hooks/query/login';
import { userStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const userInformation = userStore(({ userInfo }) => userInfo);

  const redirectToLoginPage = () => {
    if (redirectUri === undefined) return;

    sessionStorage.setItem('pathNameBeforeClickLoginButton', window.location.pathname);
    router.push(redirectUri);
  };

  if (userInformation.userEmail !== null && userInformation.userNick !== null)
    return <span onClick={() => alert('아직 구현 안했는데 꼬우면 당신이 만드세요')}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
