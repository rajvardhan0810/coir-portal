import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function DashboardCard({ title, eyebrow, children }: DashboardCardProps) {
  return (
    <div className="dashboard-card">
      {eyebrow ? <span className="auth-eyebrow">{eyebrow}</span> : null}
      <h1>{title}</h1>
      {children}
    </div>
  );
}
