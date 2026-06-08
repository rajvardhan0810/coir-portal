import { getCurrentUser } from "@/services/auth.service";

export const userService = {
  getProfile: getCurrentUser,
};
