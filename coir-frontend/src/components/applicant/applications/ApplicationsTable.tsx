"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { getMyApplications } from "@/services/application.service";

type Application = {
  id: number;
  applicationNo: string;
  status: string;
  createdAt: string;

  scheme: {
    name: string;
  };

  program?: {
    title: string;
  };
};

export function ApplicationsTable() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data =
          await getMyApplications();

        setApplications(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadApplications();
  }, []);

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
              <th>Scheme / Program</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(
              (application) => (
                <tr
                  key={application.id}
                >
                  <td>
                    {
                      application.applicationNo
                    }
                  </td>

                  <td>
                    <div><strong>{application.scheme?.name}</strong></div>
                    {application.program?.title && (
                      <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted, #666)" }}>
                        {application.program.title}
                      </div>
                    )}
                  </td>

                  <td>
                    {new Date(
                      application.createdAt,
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`application-status application-status--${application.status.toLowerCase()}`}
                    >
                      {
                        application.status
                      }
                    </span>
                  </td>

                  <td>
                    <div className="application-actions">

                      <Link
                        href={`/applications/${application.id}/view`}
                        className="application-btn application-btn--view"
                      >
                        View
                      </Link>

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