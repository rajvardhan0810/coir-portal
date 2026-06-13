"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAuthUser, clearAuthStorage }
from "@/store/authStore";

import { axiosInstance }
from "@/lib/axios";

import { API_ENDPOINTS }
from "@/constants/api-endpoints";

import { ROUTES }
from "@/constants/routes";

export function ApplicationHeader() {
  const router = useRouter();

  const [userName, setUserName] =
    useState("Applicant");

  useEffect(() => {
    const user = getAuthUser();

    if (user?.fullName) {
      setUserName(user.fullName);
    }
  }, []);

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
    <header className="application-header">
      <h2>
        Digitization of Skill Upgradation &
        Mahila Coir Yojana
      </h2>

      <div className="application-header__right">
        <button className="notification-btn">
          <i className="bx bx-bell"></i>
        </button>

        <div className="user-info">
          <i className="bx bx-user-circle"></i>

          <span>{userName}</span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          | Logout
        </button>
      </div>
    </header>
  );
}