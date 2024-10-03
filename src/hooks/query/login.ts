import { API_END_POINT } from '@/static/api';
import { userStore } from '@/store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: () =>
      fetch(`${API_END_POINT}/v1/auth/logout`, { method: 'POST', credentials: 'include' }),
    onSuccess: () => {
      const reset = userStore((state) => state.resetUserInfo);
      reset();
    },
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
    queryFn: async () =>
      await axios.get(`${API_END_POINT}/v1/auth/login?code=${code}`, { withCredentials: true }),
    retry: false,
  });
