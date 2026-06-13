"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

import { getCurrentUser } from "@/services/auth.service";
import { getAuthUser } from "@/store/authStore";

type DashboardLayoutProps = {
  children: ReactNode;
  userName?: string;
};

export function DashboardLayout({
  children,
  userName,
}: DashboardLayoutProps) {

  const [displayName, setDisplayName] =
    useState(
      userName ??
      getAuthUser()?.fullName ??
      "Applicant",
    );

  useEffect(() => {
    async function loadUser() {
      try {
        const user =
          await getCurrentUser();

        setDisplayName(
          user.fullName ??
          "Applicant",
        );
      } catch (error) {
        console.error(error);
      }
    }

    void loadUser();
  }, []);

  return (
    <main className="dashboard-layout">
      <Sidebar />

      <section className="dashboard-main">
        <Header
          userName={displayName}
        />

        <div className="dashboard-content">
          {children}
        </div>
      </section>
    </main>
  );
}