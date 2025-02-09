"use client";

import {
  useLoginQuery,
  useLoginRedirectCodeQuery,
  useLogoutMutation,
} from "@/hooks/query/use-login";
import { SessionStorage } from "@/utils/sessionStorage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { mutate: logoutMutation } = useLogoutMutation(() =>
    queryClient.invalidateQueries({ queryKey: ["loginQuery"] })
  );
  const loginData = queryClient.getQueryData(["loginQuery"]);

  const redirectToLoginPage = () => {
    if (redirectUri === undefined) return;

    SessionStorage.set(
      "pathNameBeforeClickLoginButton",
      window.location.pathname
    );

    router.push(redirectUri);
  };

  const logout = () => {
    SessionStorage.set("userInfo", null);
    logoutMutation();
  };

  if (loginData !== undefined) return <span onClick={logout}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
