import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <div className="dashboard-card">
          <h1>Page not found</h1>
          <p className="auth-message">The page you are looking for does not exist.</p>
          <Link className="primary-link" href={ROUTES.home}>
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
