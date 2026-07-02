import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export function DashboardCard({
  title,
  eyebrow,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <section
      className={`dashboard-card ${className}`}
    >
      <div className="dashboard-card__header">
        {eyebrow ? (
          <span className="dashboard-card__eyebrow">
            {eyebrow}
          </span>
        ) : null}

        <h2 className="dashboard-card__title">
          {title}
        </h2>
      </div>

      <div className="dashboard-card__body">
        {children}
      </div>
    </section>
  );
}