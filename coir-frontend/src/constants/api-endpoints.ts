export const API_ENDPOINTS = {
  auth: {
    captcha: "/auth/captcha",
    sendOtp: "/auth/send-otp",
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
} as const;