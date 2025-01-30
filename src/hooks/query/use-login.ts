import { API_END_POINT } from '@/static/api';
import { ZarinattaAxios } from '@/utils/axios/ZarinattaInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: () =>
      fetch(`${API_END_POINT}/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      }),
  });

export const useLoginRedirectCodeQuery = () =>
  useQuery({
    queryKey: ['loginRedirectQuery'],
    queryFn: async () => {
      const response = await fetch(`${API_END_POINT}/v1/auth/redirect`);
      const value = await response.json();

      return value.redirectUri;
    },
  });

export const useLoginQuery = (code: string) =>
  useQuery<
    { data: { refreshToken: string; userEmail: string; userNick: string } },
    { status: number }
  >({
    queryKey: ['loginQuery'],
    queryFn: async () => await ZarinattaAxios.securedApiInstance.get(`/v1/auth/login?code=${code}`),
    retry: false,
  });
