import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";

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
