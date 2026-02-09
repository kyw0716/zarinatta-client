import { API_END_POINT } from "@/static/api";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import { SessionStorage } from "../sessionStorage";

const coreAxiosConfig: CreateAxiosDefaults<any> = {
  baseURL: API_END_POINT,
};

export const ZarinattaAxios = {
  securedApiInstance: axios.create({
    ...coreAxiosConfig,
    withCredentials: true,
  }),
  noneSecuredApiInstance: axios.create({ ...coreAxiosConfig }),
};

ZarinattaAxios.securedApiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 로그인 페이지에서는 confirm을 띄우지 않고 에러 전파
      if (typeof window !== "undefined" && window.location.pathname === "/login") {
        return Promise.reject(error);
      }

      const isUserWantToLogin = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
      );

      if (isUserWantToLogin) {
        const response = await fetch(`${API_END_POINT}/v1/auth/redirect`);
        const value = await response.json();

        SessionStorage.set(
          "pathNameBeforeClickLoginButton",
          window.location.pathname
        );
        window.location.href = value.redirectUri;
      }
    }
  }
);
