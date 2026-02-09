import { API_END_POINT } from "@/static/api";
import { Me } from "@/type";
import { ZarinattaAxios } from "@/utils/axios/ZarinattaInstance";
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

export const useLoginQuery = (code?: string) =>
  useQuery<{ refreshToken: string; userEmail: string; userNick: string }>({
    queryKey: ["loginQuery"],
    queryFn: async () => {
      const { data } = await ZarinattaAxios.securedApiInstance.get<{
        refreshToken: string;
        userEmail: string;
        userNick: string;
      }>(`/v1/auth/login?code=${code}`);
      return data;
    },
    retry: false,
  });

export const useUserMeQuery = (options?: { enabled?: boolean }) =>
  useQuery<Me>({
    queryKey: ["userMe"],
    queryFn: async () => {
      const response = await ZarinattaAxios.securedApiInstance.get<Me>(
        `${API_END_POINT}/v1/users/me`
      );
      return response.data;
    },
    retry: false,
    enabled: options?.enabled ?? true,
  });