import { DashboardCard } from "@/components/applicant/cards/DashboardCard";
import { Header } from "@/components/applicant/layout/Header";
import { Sidebar } from "@/components/applicant/layout/Sidebar";

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
