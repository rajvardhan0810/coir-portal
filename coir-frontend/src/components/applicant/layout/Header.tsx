"use client";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { axiosInstance } from "@/lib/axios";

import { clearAuthStorage } from "@/store/authStore";

type HeaderProps = {
  userName?: string;
};

export function Header({
  userName = "Applicant",
}: HeaderProps) {
  const router = useRouter();

  async function logout() {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.auth.logout,
      );
    } catch {
      // ignore
    } finally {
      clearAuthStorage();
      router.replace(
        ROUTES.login,
      );
    }
  }

  return (
    <header className="dashboard-header">
      <div>
        <h1 className="dashboard-title">
          Digitization of COIR Vikas Yojna
        </h1>

        <p className="dashboard-subtitle">
          Welcome back, {userName}
        </p>
      </div>

      <div className="dashboard-actions">
        <i
          className="bx bx-bell dashboard-notification-icon"
          aria-label="Notifications"
        />

        <button
          type="button"
          className="dashboard-profile-btn"
        >
          <i className="bx bx-user-circle" aria-hidden="true" />
          {userName}
        </button>

        <button
          type="button"
          className="dashboard-logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
