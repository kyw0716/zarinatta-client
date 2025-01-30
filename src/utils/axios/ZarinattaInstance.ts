import { API_END_POINT } from '@/static/api';
import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

const coreAxiosConfig: CreateAxiosDefaults<any> = {
  baseURL: API_END_POINT,
};

export const ZarinattaAxios = {
  securedApiInstance: axios.create({ ...coreAxiosConfig, withCredentials: true }),
  noneSecuredApiInstance: axios.create({ ...coreAxiosConfig }),
};

ZarinattaAxios.securedApiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.status === 401) {
      const isUserWantToLogin = window.confirm(
        '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?'
      );

      if (isUserWantToLogin) {
        const response = await fetch(`${API_END_POINT}/v1/auth/redirect`);
        const value = await response.json();

        sessionStorage.setItem('pathNameBeforeClickLoginButton', window.location.pathname);
        window.location.href = value.redirectUri;
      }
    }
  }
);
