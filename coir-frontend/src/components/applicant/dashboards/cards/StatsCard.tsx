type StatsCardProps = {
  title: string;
  value: string;
  footer: string;
};

export function StatsCard({
  title,
  value,
  footer,
}: StatsCardProps) {
  return (
    <div className="stats-card">
      <span className="stats-card__title">
        {title}
      </span>

      <h3 className="stats-card__value">
        {value}
      </h3>

      <p className="stats-card__footer">
        {footer}
      </p>
    </div>
  );
}