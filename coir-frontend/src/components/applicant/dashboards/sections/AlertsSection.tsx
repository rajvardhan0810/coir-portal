import { dashboardAlerts } from "../data/dashboard-demo-data";

export function AlertsSection() {
  return (
    <details className="alerts-section">
      <summary className="alerts-section__header">
        <span className="alerts-section__title">
          <i className="bx bx-error" aria-hidden="true" />
          Important Alerts
          <span className="alerts-count">{dashboardAlerts.length}</span>
        </span>
        <i className="bx bx-chevron-down alerts-chevron" aria-hidden="true" />
      </summary>

      <div className="alerts-list">
        {dashboardAlerts.map((alert, index) => (
          <article key={alert.id} className="alert-card">
            <i
              className={`bx ${index === 0 ? "bx-error" : "bx-time"} alert-card__icon alert-card__icon--${index === 0 ? "urgent" : "warning"}`}
              aria-hidden="true"
            />

            <div className="alert-card__content">
              <div className="alert-card__title-row">
                <h3>{alert.title}</h3>

                <span className={`alert-card__badge alert-card__badge--${index === 0 ? "urgent" : "warning"}`}>
                  {alert.badge}
                </span>
              </div>

              <p>{alert.description}</p>
            </div>

            <button type="button" className="alert-card__action">
              {alert.action}
            </button>
          </article>
        ))}
      </div>
    </details>
  );
}
