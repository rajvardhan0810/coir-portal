export type UserProfile = {
  id: string;
  fullName: string;
  mobileNumber: string;
  email?: string | null;
  city?: string | null;
  district?: string | null;
  state?: string | null;
  isMobileVerified: boolean;
  status: string;
  lastLoginAt?: string | null;
};
