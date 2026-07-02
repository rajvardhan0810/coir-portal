"use client";

import { useRouter } from "next/navigation";

import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

const applications = [
  {
    id: "APP-0031",
    course:
      "Training in Manufacturing",
    institute:
      "Thanjavoor Institute",
    submittedAt:
      "05 Apr 2026",
    status:
      "UNDER_REVIEW",
  },
  {
    id: "APP-0030",
    course:
      "Certificate Course",
    institute:
      "Talvoor Training Center",
    submittedAt:
      "02 Apr 2026",
    status:
      "UNDER_REVIEW",
  },
];

export function ApplicationsTable() {
  const router = useRouter();

  return (
    <div className="applications-page">

      <div className="applications-filters">

        <input
          placeholder="Search Applicant / Aadhaar / Application"
        />

        <select>
          <option>
            All Courses
          </option>
        </select>

        <select>
          <option>
            All Institutes
          </option>
        </select>

        <select>
          <option>
            Status
          </option>
        </select>

      </div>

      <div className="applications-table">

        <table>

          <thead>
            <tr>
              <th>
                Application ID
              </th>

              <th>
                Course
              </th>

              <th>
                Institute
              </th>

              <th>
                Submitted At
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {applications.map(
              (application) => (
                <tr
                  key={
                    application.id
                  }
                >
                  <td>
                    {
                      application.id
                    }
                  </td>

                  <td>
                    {
                      application.course
                    }
                  </td>

                  <td>
                    {
                      application.institute
                    }
                  </td>

                  <td>
                    {
                      application.submittedAt
                    }
                  </td>

                  <td>
                    <ApplicationStatusBadge
                      status={
                        application.status
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        router.push(
                          `/admin/applications/${application.id}`,
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ),
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}