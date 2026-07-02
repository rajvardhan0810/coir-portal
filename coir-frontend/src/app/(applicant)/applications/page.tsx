import { DashboardCard } from "@/components/applicant/dashboards/cards/DashboardCard";
import { Header } from "@/components/applicant/dashboards/layout/Header";
import { Sidebar } from "@/components/applicant/dashboards/layout/Sidebar";

export default function ApplicationsPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header />
        <Sidebar />
        <DashboardCard eyebrow="Applicant" title="Applications">
          <p className="auth-message">Your submitted applications will appear here.</p>
        </DashboardCard>
      </section>
    </main>
  );
}
