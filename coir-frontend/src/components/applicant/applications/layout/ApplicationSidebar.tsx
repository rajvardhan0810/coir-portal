"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { axiosInstance }
from "@/lib/axios";

import { API_ENDPOINTS }
from "@/constants/api-endpoints";

import { ROUTES }
from "@/constants/routes";

import { clearAuthStorage }
from "@/store/authStore";

export function ApplicationSidebar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.auth.logout,
      );
    } catch (error) {
      console.error(error);
    } finally {
      clearAuthStorage();

      router.replace(
        ROUTES.login,
      );
    }
  }

  return (
    <aside className="application-sidebar">

      <div className="application-sidebar__logo">
        <img
          src="/assets/images/logo-footer.svg"
          alt="Coir Board"
        />
      </div>

      <nav className="application-sidebar__nav">

        <Link
          href="/dashboard"
          className="application-sidebar__item"
        >
          <i className="bx bxs-dashboard"></i>

          <span>Dashboard</span>
        </Link>

        <Link
          href="/schemes"
          className="application-sidebar__item"
        >
          <i className="bx bx-notepad"></i>

          <span>Schemes</span>
        </Link>

        <Link
          href="/profile"
          className="application-sidebar__item"
        >
          <i className="bx bx-user"></i>

          <span>My Profile</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="application-sidebar__item"
        >
          <i className="bx bx-log-out"></i>

          <span>Logout</span>
        </button>

      </nav>

    </aside>
  );
}