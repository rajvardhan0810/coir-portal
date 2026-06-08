import type { UserProfile } from "@/types/user.types";

const USER_KEY = "coir_user";

export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as UserProfile;
  } catch {
    return null;
  }
}
