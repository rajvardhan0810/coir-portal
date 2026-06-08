export type CaptchaResponse = {
  captchaId: string;
  question: string;
  expiresInSeconds: number;
  devCaptchaCode?: string;
};

export type AuthUser = {
  id: number;

  mobile: string;
  mobileNumber?: string;

  email?: string | null;

  userType: string;

  isActive: boolean;

  fullName?: string | null;

  dateOfBirth?: string | Date | null;

  gender?: string | null;

  addressLine?: string | null;

  city?: string | null;

  district?: string | null;

  state?: string | null;

  country?: string | null;

  pincode?: string | null;

  createdAt?: string;
  updatedAt?: string;
};

export type LoginResponse = {
  message: string;

  accessToken: string;

  refreshToken: string;

  user: AuthUser;
};

export type RegisterResponse = {
  message: string;

  user: AuthUser;
};

export type SendOtpResponse = {
  message: string;

  expiresInSeconds?: number;

  devOtp?: string;
};

export type RefreshTokenResponse = {
  accessToken: string;

  refreshToken: string;
};