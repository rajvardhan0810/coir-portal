"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "@/services/auth.service";

import {
  clearAuthStorage,
  getAccessToken,
} from "@/store/authStore";

import type { UserProfile } from "@/types/user.types";

export function useAuth() {
  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState<boolean>(() =>
      Boolean(getAccessToken()),
    );

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      setLoading(false);
      return;
    }

    void getCurrentUser()
      .then((profile) => {
        setUser(profile);
      })
      .catch(() => {
        clearAuthStorage();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
  };
}