'use client';

import { useLoginRedirectCodeQuery, useLogoutMutation } from '@/hooks/query/login';
import { userStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginButton() {
  const router = useRouter();
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { mutate: logout } = useLogoutMutation();
  const userInformation = userStore(({ userInfo }) => userInfo);
  const setUserInfo = userStore((state) => state.setUserInfo);

  const redirectToLoginPage = () => {
    if (redirectUri === undefined) return;

    sessionStorage.setItem('pathNameBeforeClickLoginButton', window.location.pathname);
    router.push(redirectUri);
  };

  useEffect(() => {
    const userInfo = JSON.parse(JSON.stringify(sessionStorage.getItem('userInfo')));
    console.log(userInfo);
    if (userInfo !== null) setUserInfo(userInfo);
  }, []);

  if (userInformation.userEmail !== undefined && userInformation.userNick !== undefined)
    return <span onClick={() => logout()}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
