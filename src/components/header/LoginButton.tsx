'use client';

import { useLoginRedirectCodeQuery, useLogoutMutation } from '@/hooks/query/login';
import { userStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { mutate: logout } = useLogoutMutation();
  const userInformation = userStore(({ userInfo }) => userInfo);

  const redirectToLoginPage = () => {
    if (redirectUri === undefined) return;

    sessionStorage.setItem('pathNameBeforeClickLoginButton', window.location.pathname);
    router.push(redirectUri);
  };

  if (userInformation.userEmail !== undefined && userInformation.userNick !== undefined)
    return <span onClick={() => logout()}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
