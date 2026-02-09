"use client";

import {
  useLoginRedirectCodeQuery,
  useLogoutMutation,
  useUserMeQuery,
} from "@/hooks/query/use-login";
import { useAuthStore } from "@/hooks/use-auth-store";
import { SessionStorage } from "@/utils/sessionStorage";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const setLoggedOut = useAuthStore((s) => s.setLoggedOut);
  const isLoginPage = pathname === "/login"
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { mutate: logoutMutation } = useLogoutMutation();
  const { data: userData } = useUserMeQuery({ enabled: !isLoginPage });

  const redirectToLoginPage = () => {
    if (redirectUri === undefined) return;

    SessionStorage.set(
      "pathNameBeforeClickLoginButton",
      window.location.pathname + window.location.search
    );

    router.push(redirectUri);
  };

  const logout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        setLoggedOut(true);
        queryClient.cancelQueries({ queryKey: ["userMe"] });
        queryClient.setQueryData(["userMe"], null);
        queryClient.removeQueries({ queryKey: ["loginQuery"] });
      }
    });
  };

  if (isLoginPage) return <></>; // 로그인 페이지에서는 버튼 노출 X
  if (userData) return <span onClick={logout}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
