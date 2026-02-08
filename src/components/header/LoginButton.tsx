"use client";

import {
  useLoginQuery,
  useLoginRedirectCodeQuery,
  useLogoutMutation,
  useUserMeQuery,
} from "@/hooks/query/use-login";
import { SessionStorage } from "@/utils/sessionStorage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: redirectUri } = useLoginRedirectCodeQuery();
  const { mutate: logoutMutation } = useLogoutMutation();
  const { data: userData } = useUserMeQuery();
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
    logoutMutation(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userMe"] });
        queryClient.removeQueries({ queryKey: ["loginQuery"] });
      }
    });
  };

  if (userData) return <span onClick={logout}>로그아웃</span>;

  return <span onClick={redirectToLoginPage}>로그인</span>;
}
