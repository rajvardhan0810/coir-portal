"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { axiosInstance } from "@/lib/axios";

import { clearAuthStorage } from "@/store/authStore";

export function Header() {
  const router = useRouter();

  async function logout() {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.auth.logout,
      );
    } catch {
      // ignore api errors
    } finally {
      clearAuthStorage();

      router.replace(
        ROUTES.login,
      );
    }
  }

  return (
    <div className="dashboard-topbar">
      <Link
        className="auth-logo dashboard-logo"
        href={ROUTES.home}
      >
        COIR BOARD
      </Link>

      <button
        className="auth-secondary dashboard-logout"
        onClick={logout}
        type="button"
      >
        Logout
      </button>
    </div>
  );
}