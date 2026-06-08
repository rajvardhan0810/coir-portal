import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { axiosInstance } from "@/lib/axios";

import type {
  CaptchaResponse,
  LoginResponse,
  RegisterResponse,
  SendOtpResponse,
} from "@/types/auth.types";

import type { UserProfile } from "@/types/user.types";

export async function getCaptcha() {
  const response = await axiosInstance.get<CaptchaResponse>(
    API_ENDPOINTS.auth.captcha,
  );

  return response.data;
}

export async function sendOtp(mobile: string) {
  const response = await axiosInstance.post<SendOtpResponse>(
    API_ENDPOINTS.auth.sendOtp,
    {
      mobile,
    },
  );

  return response.data;
}

export async function loginWithOtp(payload: {
  mobile: string;
  otp: string;
  captchaId: string;
  captchaCode: string;
}) {
  const response = await axiosInstance.post<LoginResponse>(
    API_ENDPOINTS.auth.login,
    payload,
  );

  return response.data;
}

export async function registerUser(payload: {
  fullName: string;
  mobile: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  gender?: string;
  addressLine?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  pincode?: string;
}) {
  const response = await axiosInstance.post<RegisterResponse>(
    API_ENDPOINTS.auth.register,
    payload,
  );

  return response.data;
}

export async function getCurrentUser() {
  const response = await axiosInstance.get<UserProfile>(
    API_ENDPOINTS.auth.me,
  );

  return response.data;
}