import { DashboardLayout } from "@/components/applicant/dashboards/layout/DashboardLayout";
import { SchemesSection } from "@/components/applicant/schemes/sections/SchemeSection";

export default function SchemesPage() {
  return (
    <DashboardLayout>
      <SchemesSection />
    </DashboardLayout>
  );
}