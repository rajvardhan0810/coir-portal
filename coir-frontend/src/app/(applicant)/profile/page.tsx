import { DashboardCard } from "@/components/applicant/cards/DashboardCard";
import { Header } from "@/components/applicant/layout/Header";
import { Sidebar } from "@/components/applicant/layout/Sidebar";

export default function ProfilePage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header />
        <Sidebar />
        <DashboardCard eyebrow="Applicant" title="Profile">
          <p className="auth-message">Profile details will appear here after login.</p>
        </DashboardCard>
      </section>
    </main>
  );
}
