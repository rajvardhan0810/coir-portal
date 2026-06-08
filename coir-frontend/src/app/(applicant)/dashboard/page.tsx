"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";

import { ROUTES } from "@/constants/routes";

import { getCurrentUser } from "@/services/auth.service";

import {
  clearAuthStorage,
  getAccessToken,
} from "@/store/authStore";

import type { UserProfile } from "@/types/user.types";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [message, setMessage] =
    useState("Loading account...");

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.replace(ROUTES.login);
      return;
    }

    void getCurrentUser()
      .then((profile) => {
        setUser(profile);
        setMessage("");
      })
      .catch(() => {
        clearAuthStorage();
        router.replace(ROUTES.login);
      });
  }, [router]);

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header />
        <Sidebar />

        {message ? (
          <p className="auth-message">
            {message}
          </p>
        ) : null}

        {user ? (
          <DashboardCard
            eyebrow="Applicant Dashboard"
            title={`Welcome, ${user.fullName ?? "User"}`}
          >
            <div className="dashboard-grid">
              <p>
                <strong>Mobile</strong>
                <br />
                {user.mobile}
              </p>

              <p>
                <strong>Email</strong>
                <br />
                {user.email ??
                  "Not provided"}
              </p>

              <p>
                <strong>User Type</strong>
                <br />
                {user.userType}
              </p>

              <p>
                <strong>Status</strong>
                <br />
                {user.isActive
                  ? "Active"
                  : "Inactive"}
              </p>

              <p>
                <strong>Location</strong>
                <br />
                {[
                  user.city,
                  user.district,
                  user.state,
                ]
                  .filter(Boolean)
                  .join(", ") ||
                  "Not provided"}
              </p>

              <p>
                <strong>Registered On</strong>
                <br />
                {user.createdAt
                  ? new Date(
                      user.createdAt,
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </DashboardCard>
        ) : null}
      </section>
    </main>
  );
}