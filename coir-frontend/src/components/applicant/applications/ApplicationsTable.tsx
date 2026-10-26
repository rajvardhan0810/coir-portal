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

const defaultApplications: Application[] = [
  {
    id: 1,
    applicationNo: "APP-2026-001",
    status: "Pending",
    createdAt: "2026-03-18",
    scheme: {
      name: "Training in Manufacturing of Value Added Products (VAP)",
    },
    program: {
      title: "Initial queue",
    },
  },
  {
    id: 2,
    applicationNo: "APP-2026-002",
    status: "Under Review",
    createdAt: "2026-03-10",
    scheme: {
      name: "Training in Spinning (MCY)",
    },
    program: {
      title: "Skill Upgradation Programme",
    },
  },
  {
    id: 3,
    applicationNo: "APP-2026-003",
    status: "Verified",
    createdAt: "2026-02-28",
    scheme: {
      name: "Coir Vikas Yojana - Mahila Coir Yojana (MCY)",
    },
    program: {
      title: "Self Employment Assistance",
    },
  },
];

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

function getStatusBadge(status: string) {
  const s = (status || "").toLowerCase();
  let dotColor = "#9ca3af";
  let bg = "#f3f4f6";
  let color = "#4b5563";
  let label = "Pending";

  if (s.includes("pending") || s.includes("draft")) {
    dotColor = "#9ca3af";
    bg = "#f3f4f6";
    color = "#4b5563";
    label = "Pending";
  } else if (s.includes("review") || s.includes("clarif") || s.includes("under")) {
    dotColor = "#eab308";
    bg = "#fef9c3";
    color = "#854d0e";
    label = "Under Review";
  } else if (s.includes("verified")) {
    dotColor = "#10b981";
    bg = "#def7ec";
    color = "#03543f";
    label = "Verified";
  } else if (s.includes("approv")) {
    dotColor = "#10b981";
    bg = "#def7ec";
    color = "#03543f";
    label = "Approved";
  } else if (s.includes("reject")) {
    dotColor = "#ef4444";
    bg = "#fee2e2";
    color = "#991b1b";
    label = "Rejected";
  } else {
    dotColor = "#9ca3af";
    bg = "#f3f4f6";
    color = "#4b5563";
    label = status || "Pending";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 14px",
        borderRadius: "6px",
        backgroundColor: bg,
        color: color,
        fontSize: "12px",
        fontWeight: "700",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: dotColor,
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
}

export function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [trackingApp, setTrackingApp] = useState<Application | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getMyApplications();
        if (Array.isArray(data) && data.length > 0) {
          setApplications(data);
        }
      } catch (error) {
        console.error("Could not fetch user applications, showing default list", error);
      }
    }

    loadApplications();
  }, []);

  const displayApplications = applications.length > 0 ? applications : defaultApplications;

  return (
    <div style={{ marginTop: "32px", marginBottom: "40px" }}>
      {/* Header with Title and View All History */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "800",
            color: "#4b2822",
            letterSpacing: "-0.2px",
          }}
        >
          My Applications
        </h2>

        <Link
          href="/applications"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: "700",
            color: "#8b642b",
            textDecoration: "none",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          className="view-all-history-link"
        >
          View All History &rarr;
        </Link>
      </div>

      {/* Table Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #f0eae1",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #f3ece0",
                  backgroundColor: "#ffffff",
                }}
              >
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#4b2822",
                    width: "70px",
                    lineHeight: "1.3",
                  }}
                >
                  Sr.<br />no
                </th>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#4b2822",
                  }}
                >
                  Course / Scheme Name
                </th>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#4b2822",
                    width: "150px",
                  }}
                >
                  Applied Date
                </th>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#4b2822",
                    width: "140px",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#4b2822",
                    textAlign: "center",
                    width: "150px",
                  }}
                >
                  Check Status
                </th>
                <th
                  style={{
                    padding: "16px 20px",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#4b2822",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  Actions/View
                </th>
              </tr>
            </thead>
            <tbody>
              {displayApplications.map((app, index) => (
                <tr
                  key={app.id || index}
                  style={{
                    borderBottom: index < displayApplications.length - 1 ? "1px solid #f3ece0" : "none",
                    transition: "background-color 0.15s ease",
                  }}
                  className="app-table-row"
                >
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#555",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td style={{ padding: "18px 20px" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#2d3748",
                        lineHeight: "1.4",
                      }}
                    >
                      {app.scheme?.name || "Coir Vikas Yojana"}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#8c827a",
                        marginTop: "3px",
                      }}
                    >
                      {app.program?.title || "Initial queue"}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: "13px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    {formatDate(app.createdAt)}
                  </td>
                  <td style={{ padding: "18px 20px" }}>
                    {getStatusBadge(app.status)}
                  </td>
                  <td style={{ padding: "18px 20px", textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => setTrackingApp(app)}
                      style={{
                        backgroundColor: "#a17a47",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontWeight: "700",
                        padding: "7px 18px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                        transition: "all 0.15s ease",
                      }}
                      className="track-status-btn"
                    >
                      Track Status
                    </button>
                  </td>
                  <td style={{ padding: "18px 20px", textAlign: "center" }}>
                    <Link
                      href={`/applications/${app.id}/view`}
                      title="View Application Details"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#8b642b",
                        fontSize: "22px",
                        textDecoration: "none",
                        transition: "transform 0.15s, color 0.15s",
                      }}
                      className="view-eye-link"
                    >
                      <i className="bx bx-show" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Track Status Interactive Modal */}
      {trackingApp && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setTrackingApp(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "520px",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "800",
                    color: "#8b642b",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Application Status Tracking
                </span>
                <h3
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "17px",
                    fontWeight: "800",
                    color: "#4b2822",
                  }}
                >
                  {trackingApp.scheme?.name || "Coir Vikas Yojana"}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "12px",
                    color: "#718096",
                  }}
                >
                  App ID:{" "}
                  <strong style={{ color: "#2d3748" }}>
                    {trackingApp.applicationNo || `#APP-2026-00${trackingApp.id}`}
                  </strong>{" "}
                  • Applied on {formatDate(trackingApp.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTrackingApp(null)}
                style={{
                  border: "none",
                  background: "#f7f3eb",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#4b2822",
                }}
              >
                &times;
              </button>
            </div>

            {/* Stepper Timeline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                margin: "24px 0",
              }}
            >
              {/* Step 1 */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#def7ec",
                    color: "#03543f",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#2d3748" }}>
                    Application Submitted
                  </div>
                  <div style={{ fontSize: "12px", color: "#718096" }}>
                    Successfully received on {formatDate(trackingApp.createdAt)}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#a17a47",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  2
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#a17a47" }}>
                    {trackingApp.status === "Pending" ? "Initial Queue (Current Stage)" : "Initial Queue Cleared"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#718096" }}>
                    {trackingApp.program?.title || "Verification under queue by Field Officer"}
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#f3f4f6",
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  3
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#718096" }}>
                    Document & Eligibility Verification
                  </div>
                  <div style={{ fontSize: "12px", color: "#a0aec0" }}>
                    Pending review by Regional Directorate
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#f3f4f6",
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  4
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#718096" }}>
                    Final Approval & Sanction
                  </div>
                  <div style={{ fontSize: "12px", color: "#a0aec0" }}>
                    Certificate / Subsidy issuance
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                onClick={() => setTrackingApp(null)}
                style={{
                  padding: "9px 22px",
                  backgroundColor: "#a17a47",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .track-status-btn:hover {
          background-color: #8b642b !important;
          transform: translateY(-1px);
        }
        .view-eye-link:hover {
          color: #4b2822 !important;
          transform: scale(1.15);
        }
        .app-table-row:hover {
          background-color: #fbf9f5 !important;
        }
        .view-all-history-link:hover {
          text-decoration: underline !important;
          color: #5d452f !important;
        }
      `}</style>
    </div>
  );
}