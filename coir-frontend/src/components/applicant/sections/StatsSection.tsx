import { StatsCard } from "../cards/StatsCard";
import { dashboardStats } from "../data/dashboard-demo-data";

export function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-section__grid">
        {dashboardStats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            footer={stat.footer}
          />
        ))}
      </div>
    </section>
  );
}