"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Header } from "@/components/dashboard/Header";
import { ROUTES } from "@/constants/routes";
import { getCurrentUser } from "@/services/auth.service";
import { clearAuthStorage, getAccessToken } from "@/store/authStore";
import type { UserProfile } from "@/types/user.types";

const businessActions = [
  "Business profile verification",
  "Product catalog setup",
  "Scheme eligibility review",
  "Market linkage request",
];

export default function BusinessDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState("Loading business account...");

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.replace(ROUTES.businessLogin);
      return;
    }

    void getCurrentUser()
      .then((profile) => {
        if (profile.userType !== "BUSINESS") {
          clearAuthStorage();
          router.replace(ROUTES.businessLogin);
          return;
        }

        setUser(profile);
        setMessage("");
      })
      .catch(() => {
        clearAuthStorage();
        router.replace(ROUTES.businessLogin);
      });
  }, [router]);

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header logoutHref={ROUTES.businessLogin} />

        {message ? <p className="auth-message">{message}</p> : null}

        {user ? (
          <>
            <DashboardCard
              eyebrow="Business Dashboard"
              title={`Welcome, ${user.fullName ?? "Business User"}`}
            >
              <div className="dashboard-grid">
                <p>
                  <strong>Mobile</strong>
                  <br />
                  {user.mobile}
                </p>

                <p>
                  <strong>Account Type</strong>
                  <br />
                  {user.userType}
                </p>

                <p>
                  <strong>Status</strong>
                  <br />
                  {user.isActive ? "Active" : "Inactive"}
                </p>

                <p>
                  <strong>Location</strong>
                  <br />
                  {[user.city, user.district, user.state]
                    .filter(Boolean)
                    .join(", ") || "Not provided"}
                </p>
              </div>
            </DashboardCard>

            <div className="business-dashboard-grid">
              <div className="dashboard-card">
                <span className="auth-eyebrow">Next Steps</span>
                <h2>Business services</h2>
                <ul className="business-action-list">
                  {businessActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>

              <div className="dashboard-card">
                <span className="auth-eyebrow">Support</span>
                <h2>Guidance cell</h2>
                <p className="business-dashboard-copy">
                  Submit business details, track scheme support, and manage
                  ecosystem connect requests from this dashboard.
                </p>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
