import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function SchemesPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header />
        <Sidebar />
        <DashboardCard eyebrow="Applicant" title="Schemes">
          <p className="auth-message">Eligible scheme information will appear here.</p>
        </DashboardCard>
      </section>
    </main>
  );
}
