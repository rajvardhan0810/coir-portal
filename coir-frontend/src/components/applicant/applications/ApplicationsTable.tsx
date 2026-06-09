import { dashboardApplications } from "../data/dashboard-demo-data";

export function ApplicationsTable() {
  return (
    <section className="applications-section">
      <div className="applications-section__header">
        <h2>My Applications</h2>

        <button
          type="button"
          className="applications-section__view-all"
        >
          View All
        </button>
      </div>

      <div className="applications-table-wrapper">
        <table className="applications-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Scheme Name</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dashboardApplications.map(
              (application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>

                  <td>
                    {
                      application.schemeName
                    }
                  </td>

                  <td>
                    {
                      application.appliedDate
                    }
                  </td>

                  <td>
                    <span
                      className={`application-status application-status--${application.status
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          "-",
                        )}`}
                    >
                      {
                        application.status
                      }
                    </span>
                  </td>

                  <td>
                    <div className="application-actions">
                      <button
                        type="button"
                        className="application-btn application-btn--view"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="application-btn application-btn--track"
                      >
                        Track Status
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}