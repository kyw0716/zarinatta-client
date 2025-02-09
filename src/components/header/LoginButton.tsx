"use client";

import {
  useLoginQuery,
  useLoginRedirectCodeQuery,
  useLogoutMutation,
} from "@/hooks/query/use-login";
import { userStore } from "@/store/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { mutate: logoutMutation } = useLogoutMutation();
  const userInformation = userStore(({ userInfo }) => userInfo);
  const resetUserInfo = userStore((state) => state.resetUserInfo);
  const { data: loginQueryData } = useLoginQuery();

  console.log(loginQueryData);

  const redirectToLoginPage = () => {
    if (redirectUri === undefined) return;

    sessionStorage.setItem(
      "pathNameBeforeClickLoginButton",
      window.location.pathname
    );
    router.push(redirectUri);
  };

  const logout = () => {
    logoutMutation();
    resetUserInfo();
  };

  if (
    userInformation.userEmail !== undefined &&
    userInformation.userNick !== undefined
  )
    return <span onClick={logout}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
