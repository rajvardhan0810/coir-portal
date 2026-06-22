"use client";

import { DashboardLayout } from "@/components/applicant/dashboards/layout/DashboardLayout";
import { ProfileForm } from "@/components/applicant/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <ProfileForm />
    </DashboardLayout>
  );
}