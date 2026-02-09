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

let isHandling401 = false;

ZarinattaAxios.securedApiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      const isNoAlertPath =
        pathname === "/" ||
        pathname === "/login" ||
        pathname.startsWith("/search") ||
        pathname.startsWith("/help");

      if (isNoAlertPath) return Promise.reject(error);
      if (isHandling401) return Promise.reject(error);

      isHandling401 = true;
      const isUserWantToLogin = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
      );
      setTimeout(() => {
        isHandling401 = false;
      }, 300);

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
    return Promise.reject(error);
  }
);
