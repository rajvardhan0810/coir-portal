import type { AuthUser } from "@/types/auth.types";

const ACCESS_TOKEN_KEY = "coir_access_token";
const REFRESH_TOKEN_KEY = "coir_refresh_token";
const USER_KEY = "coir_user";

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(
    ACCESS_TOKEN_KEY,
  );
}

export function getRefreshToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(
    REFRESH_TOKEN_KEY,
  );
}

export function getAuthUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const user =
    localStorage.getItem(USER_KEY);

  return user
    ? JSON.parse(user)
    : null;
}

export function saveAuthSession(
  accessToken: string,
  refreshToken: string,
  user: AuthUser,
) {
  saveAuthTokens(
    accessToken,
    refreshToken,
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user),
  );
}

export function saveAuthTokens(
  accessToken: string,
  refreshToken: string,
) {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    accessToken,
  );

  localStorage.setItem(
    REFRESH_TOKEN_KEY,
    refreshToken,
  );
}

export function saveAuthUser(
  user: AuthUser,
) {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user),
  );
}

export function clearAuthStorage() {
  localStorage.removeItem(
    ACCESS_TOKEN_KEY,
  );

  localStorage.removeItem(
    REFRESH_TOKEN_KEY,
  );

  localStorage.removeItem(
    USER_KEY,
  );
}
