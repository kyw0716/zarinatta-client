import { API_END_POINT } from "@/static/api";
import { UserInfo } from "@/type";
import { ZarinattaAxios } from "@/utils/axios/ZarinattaInstance";
import { SessionStorage } from "@/utils/sessionStorage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: () =>
      fetch(`${API_END_POINT}/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      }),
  });

export const useLoginRedirectCodeQuery = () =>
  useQuery({
    queryKey: ["loginRedirectQuery"],
    queryFn: async () => {
      const response = await fetch(`${API_END_POINT}/v1/auth/redirect`);
      const value = await response.json();

      return value.redirectUri;
    },
  });

export const useLoginQuery = (code: string) =>
  useQuery<{ refreshToken: string; userEmail: string; userNick: string }>({
    queryKey: ["loginQuery"],
    queryFn: async () => {
      const persistUserInfoData = SessionStorage.get<UserInfo>("userInfo");

      if (persistUserInfoData !== null) return persistUserInfoData;

      const userInfo = await ZarinattaAxios.securedApiInstance.get<{
        refreshToken: string;
        userEmail: string;
        userNick: string;
      }>(`/v1/auth/login?code=${code}`);

      SessionStorage.set("userInfo", userInfo);

      return userInfo.data;
    },
    retry: false,
  });
