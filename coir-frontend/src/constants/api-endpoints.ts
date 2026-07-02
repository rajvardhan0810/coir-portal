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

  applications: {
    create: "/applications",

    my: "/applications/my",

    details: (id: number) =>
      `/applications/${id}/details`,

    byId: (id: number) =>
      `/applications/${id}`,

    submit: (id: number) =>
      `/applications/${id}/submit`,
  },

  upload: {
    file: "/upload",
  },
} as const;