import { API_END_POINT } from '@/static/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useLogoutQuery = () =>
  useQuery({
    queryKey: ['logout'],
    queryFn: () => {},
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
    queryFn: async () => await axios.get(`${API_END_POINT}/v1/auth/login?code=${code}`),
    retry: false,
  });
