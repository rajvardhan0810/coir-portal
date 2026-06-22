"use client";

import { useEffect, useState } from "react";

import { DashboardLayout } from "@/components/applicant/dashboards/layout/DashboardLayout";

import { WelcomeSection } from "@/components/applicant/dashboards/sections/WelcomeSection";
import { AlertsSection } from "@/components/applicant/dashboards/sections/AlertsSection";
import { StatsSection } from "@/components/applicant/dashboards/sections/StatsSection";
import { ApplicationsSection } from "@/components/applicant/dashboards/sections/ApplicationsSection";

import { getCurrentUser } from "@/services/auth.service";
import { getAuthUser } from "@/store/authStore";

export default function DashboardPage() {
  const [userName, setUserName] =
    useState<string>("");

  useEffect(() => {
    const storedUser =
      getAuthUser();

    if (storedUser?.fullName) {
      setUserName(
        storedUser.fullName,
      );
    }

    async function loadUser() {
      try {
        const user =
          await getCurrentUser();

        setUserName(
          user.fullName ?? "",
        );
      } catch (error) {
        console.error(error);
      }
    }

    void loadUser();
  }, []);

  return (
    <DashboardLayout>
      <WelcomeSection
        userName={userName}
      />

      <AlertsSection />

      <StatsSection />

      <ApplicationsSection />
    </DashboardLayout>
  );
}