"use client";

import {
  useLoginRedirectCodeQuery,
  useLogoutMutation,
  useUserMeQuery,
} from "@/hooks/query/use-login";
import { SessionStorage } from "@/utils/sessionStorage";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const isLoginPage = pathname === "/login"
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { mutate: logoutMutation } = useLogoutMutation();
  const { data: userData } = useUserMeQuery({ enabled: !isLoginPage });

  const redirectToLoginPage = () => {
    if (redirectUri === undefined) return;

    SessionStorage.set(
      "pathNameBeforeClickLoginButton",
      window.location.pathname
    );

    router.push(redirectUri);
  };

  const logout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        queryClient.cancelQueries({ queryKey: ["userMe"] });
        queryClient.setQueryData(["userMe"], undefined);
        queryClient.removeQueries({ queryKey: ["loginQuery"] });
      }
    });
  };

  if (isLoginPage) return <></>; // 로그인 페이지에서는 버튼 노출 X
  if (userData) return <span onClick={logout}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
