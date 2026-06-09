import { DashboardLayout } from "@/components/applicant/layout/DashboardLayout";

import { WelcomeSection } from "@/components/applicant/sections/WelcomeSection";
import { AlertsSection } from "@/components/applicant/sections/AlertsSection";
import { StatsSection } from "@/components/applicant/sections/StatsSection";
import { ApplicationsSection } from "@/components/applicant/sections/ApplicationsSection";

export default function DashboardPage() {
  const userName = "Applicant";

  return (
    <DashboardLayout userName={userName}>
      <WelcomeSection userName={userName} />

      <AlertsSection />

      <StatsSection />

      <ApplicationsSection />
    </DashboardLayout>
  );
}
