"use client";

import { useLoginQuery } from "@/hooks/query/use-login";
import { SessionStorage } from "@/utils/sessionStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { data: loginQueryData } = useLoginQuery(code ?? "");

  useEffect(() => {
    if (loginQueryData !== undefined) {
      SessionStorage.set("refreshToken", loginQueryData.refreshToken);
      router.push(
        sessionStorage.getItem("pathNameBeforeClickLoginButton") ?? "/"
      );
    }
  }, [loginQueryData, router]);

  return <div>로그인중....</div>;
}
