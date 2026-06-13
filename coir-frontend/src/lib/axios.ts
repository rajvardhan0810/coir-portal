import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { apiBaseUrl } from "@/services/api";

import {
  clearAuthStorage,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from "@/store/authStore";
import type { RefreshTokenResponse } from "@/types/auth.types";

type RetryableRequestConfig =
  InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

let refreshRequest:
  Promise<RefreshTokenResponse> | null =
  null;

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError,
  ) => {
    const request =
      error.config as
        | RetryableRequestConfig
        | undefined;

    if (
      error.response?.status !== 401 ||
      !request ||
      request.url ===
        API_ENDPOINTS.auth.refresh
    ) {
      return Promise.reject(error);
    }

    if (request._retry) {
      clearAuthStorage();
      return Promise.reject(error);
    }

    if (!request.headers.Authorization) {
      return Promise.reject(error);
    }

    const refreshToken =
      getRefreshToken();

    if (!refreshToken) {
      clearAuthStorage();
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      refreshRequest ??= axios
        .post<RefreshTokenResponse>(
          `${apiBaseUrl}${API_ENDPOINTS.auth.refresh}`,
          {
            refreshToken,
          },
        )
        .then((response) => response.data)
        .finally(() => {
          refreshRequest = null;
        });

      const tokens =
        await refreshRequest;

      saveAuthTokens(
        tokens.accessToken,
        tokens.refreshToken,
      );

      request.headers.Authorization =
        `Bearer ${tokens.accessToken}`;

      return axiosInstance(request);
    } catch {
      clearAuthStorage();
      return Promise.reject(error);
    }
  },
);
