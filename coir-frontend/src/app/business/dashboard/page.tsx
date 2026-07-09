"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ApplicationHeader } from "@/components/applicant/applications/layout/ApplicationHeader";
import { ApplicationFooter } from "@/components/applicant/applications/layout/ApplicationFooter";
import * as showroomService from "@/services/showroom.service";
import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { ROUTES } from "@/constants/routes";
import { getCurrentUser } from "@/services/auth.service";
import { clearAuthStorage, getAccessToken } from "@/store/authStore";
import type { UserProfile } from "@/types/user.types";

const demandPipeline = [
  {
    id: "DEM-2026-089",
    category: "Mats & Rugs",
    productName: "Premium Door Mat",
    qty: "5,000 m2",
    date: "11/04/2026",
    raisedOn: "Raised 31 Mar, 2026",
    quantityType: "Square Meter (m²)",
    specification: "",
    remarks: "",
    deliveryPinCode: "682030",
  },
  {
    id: "DEM-2026-091",
    category: "Premium Coir Pith",
    productName: "Coir Pith Compost Block",
    qty: "250 Units",
    date: "10/04/2026",
    raisedOn: "Raised 30 Mar, 2026",
    quantityType: "Units",
    specification: "Compressed eco-grade blocks",
    remarks: "Urgent lot preferred",
    deliveryPinCode: "695582",
  },
  {
    id: "DEM-2026-078",
    category: "Rubberized Mattresses",
    productName: "Rubberized Coir Mattress",
    qty: "1,200 Units",
    date: "09/04/2026",
    raisedOn: "Raised 29 Mar, 2026",
    quantityType: "Units",
    specification: "Medium-firm with cotton top",
    remarks: "",
    deliveryPinCode: "560066",
  },
  {
    id: "DEM-2026-095",
    category: "Curled Coir Rope",
    productName: "Marine Grade Coir Rope",
    qty: "10 Tons",
    date: "08/04/2026",
    raisedOn: "Raised 18 Mar, 2026",
    quantityType: "Tons",
    specification: "8mm braided rope",
    remarks: "Moisture resistant packing",
    deliveryPinCode: "600119",
  },
];

type DemandItem = (typeof demandPipeline)[number];

type ResponseFormState = {
  quantity: string;
  basePrice: string;
  transportationPrice: string;
  taxPrice: string;
  deliveryDate: string;
  remarks: string;
  deliveryPinCode: string;
};

const initialResponseState: ResponseFormState = {
  quantity: "",
  basePrice: "",
  transportationPrice: "",
  taxPrice: "",
  deliveryDate: "",
  remarks: "",
  deliveryPinCode: "",
};

export default function BusinessDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState("Loading business account...");
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedDemand, setSelectedDemand] = useState<any | null>(null);
  const [responseForm, setResponseForm] = useState<ResponseFormState>(initialResponseState);

  // Dynamic Demands and Response states
  const [demands, setDemands] = useState<any[]>([]);
  const [respondedDemandIds, setRespondedDemandIds] = useState<string[]>(["DEM-2026-089"]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const refreshDemandsData = async () => {
    try {
      const demandsData = await showroomService.getBusinessDemands();
      const mapped = demandsData.map((item: any) => ({
        id: item.id,
        category: item.category,
        productName: item.productName,
        qty: item.qty,
        date: item.dateText.replace("Raised ", ""),
        raisedOn: item.dateText,
        quantityType: item.category.includes("Geo")
          ? "Square Meter (m²)"
          : item.category.includes("Rope")
          ? "Tons"
          : "Units",
        specification: item.specification || "compressed eco-grade blocks",
        remarks: item.remarks || "",
        deliveryPinCode: item.pinCode || "682030",
        status: item.status,
        rawResponses: item.responses
      }));
      setDemands(mapped);

      // We default to "sup-2" (Alleppey Weaves) as the supplier for the logged-in Business partner
      const respondedIds = demandsData
        .filter((d: any) => d.responses.some((r: any) => r.supplierId === "sup-2"))
        .map((d: any) => d.id);
      setRespondedDemandIds(respondedIds);
    } catch (e) {
      console.error("Failed to load demands from backend database", e);
    }
  };

  useEffect(() => {
    refreshDemandsData();
  }, []);

  const confirmResponseSubmission = async () => {
    if (!selectedDemand) return;
    const targetId = selectedDemand.id;

    try {
      await showroomService.submitBusinessResponse(targetId, {
        supplierId: "sup-2",
        basePrice: responseForm.basePrice,
        transportationPrice: responseForm.transportationPrice,
        taxPrice: responseForm.taxPrice,
      });

      setShowConfirmPopup(false);
      setShowSuccessPopup(true);
      closeResponseModal();
      await refreshDemandsData();
    } catch (e) {
      console.error(e);
      alert("Failed to submit supplier response to PostgreSQL.");
    }
  };

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

  async function handleBusinessLogout() {
    try {
      await axiosInstance.post(API_ENDPOINTS.auth.logout);
    } catch {
      // ignore api errors on logout
    } finally {
      clearAuthStorage();
      router.replace(ROUTES.businessLogin);
    }
  }

  function openResponseModal(demand: any) {
    setSelectedDemand(demand);
    
    // Check if there is an existing response for this demand from this supplier
    const existingResponse = demand.rawResponses?.find((r: any) => r.supplierId === "sup-2");
    if (existingResponse) {
      setResponseForm({
        quantity: demand.qty ? demand.qty.replace(/[^0-9]/g, "") : "3200",
        basePrice: String(parseFloat(existingResponse.base) || 0),
        transportationPrice: String(parseFloat(existingResponse.trans) || 0),
        taxPrice: String(parseFloat(existingResponse.tax) || 0),
        deliveryDate: demand.date,
        remarks: "Submitted via database portal.",
        deliveryPinCode: demand.deliveryPinCode || "682030",
      });
      return;
    }

    // Default prefilled values
    const cleanQty = demand.qty ? demand.qty.replace(/[^0-9]/g, "") : "3200";
    setResponseForm({
      quantity: cleanQty,
      basePrice: demand.category.includes("Mats") ? "145" : demand.category.includes("Geo") ? "150" : "200",
      transportationPrice: "15",
      taxPrice: "20",
      deliveryDate: demand.date,
      remarks: "Ready to fulfill from warehouse.",
      deliveryPinCode: demand.deliveryPinCode || "682030",
    });
  }

  function closeResponseModal() {
    setSelectedDemand(null);
    setResponseForm(initialResponseState);
  }

  function handleResponseInputChange(field: keyof ResponseFormState, value: string) {
    setResponseForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const priceAllInclusive =
    (Number(responseForm.basePrice) || 0) +
    (Number(responseForm.transportationPrice) || 0) +
    (Number(responseForm.taxPrice) || 0);

  useEffect(() => {
    if (!selectedDemand) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeResponseModal();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [selectedDemand]);

  const normalizedQuery = filterQuery.trim().toLowerCase();

  const filteredDemandPipeline = normalizedQuery
    ? demands.filter((item) => {
        const searchable = `${item.id} ${item.category} ${item.qty} ${item.date} ${item.raisedOn}`.toLowerCase();
        return searchable.includes(normalizedQuery);
      })
    : demands;

  return (
    <main className="dashboard-page business-dashboard-page">
      <section className="dashboard-shell business-dashboard-shell">
        <ApplicationHeader onLogout={handleBusinessLogout} />

        {message ? <p className="auth-message">{message}</p> : null}

        {user ? (
          <section className="business-demand-view">
            <div className="business-layout">
              <aside className="business-side-menu">
                <div className="business-side-menu__brand">
                  <h3>COIR BOARD</h3>
                  <p>MINISTRY OF MSME</p>
                </div>

                <nav className="business-side-menu__nav" aria-label="Business navigation">
                  <a className="active" href="#">
                    <i className="bx bx-grid-alt" aria-hidden="true" />
                    Dashboard
                  </a>
                  <a href="#">
                    <i className="bx bx-package" aria-hidden="true" />
                    Inventory
                  </a>
                  <button type="button" onClick={handleBusinessLogout}>
                    <i className="bx bx-log-out" aria-hidden="true" />
                    Logout
                  </button>
                </nav>
              </aside>

              <div className="business-layout__main">
                <div className="business-demand-view__header">
                  <div>
                    <p>Supplier System</p>
                    <h2>List of Demand from COIR</h2>
                  </div>

                  <div className="business-demand-view__identity">
                    <span>{user.fullName ?? "Business User"}</span>
                    <small>
                      {user.mobile} - {[user.city, user.state].filter(Boolean).join(", ") || "Location Pending"}
                    </small>
                  </div>
                </div>

                <section className="business-demand-card">
                  <div className="business-demand-card__topbar">
                    <h3>Active Demand Pipeline</h3>

                    <input
                      type="text"
                      placeholder="Filter IDs..."
                      aria-label="Filter demand IDs"
                      value={filterQuery}
                      onChange={(event) => setFilterQuery(event.target.value)}
                    />
                  </div>

                  <div className="business-demand-card__tableWrap">
                    <table className="business-demand-table">
                      <thead>
                        <tr>
                          <th>Demand ID</th>
                          <th>Product Category</th>
                          <th>Required Qty.</th>
                          <th>Exp. Delivery Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDemandPipeline.map((item) => {
                          const isResponded = respondedDemandIds.includes(item.id);
                          return (
                            <tr key={item.id}>
                              <td>
                                <strong style={{ color: "#8b642b" }}>{item.id}</strong>
                              </td>
                              <td>
                                <span style={{ fontWeight: "700", color: "#2d3748" }}>{item.category}</span>
                                <small style={{ fontSize: "11px", color: "#a0aec0", display: "block", marginTop: "2px" }}>{item.raisedOn}</small>
                              </td>
                              <td style={{ fontWeight: "700" }}>{item.qty}</td>
                              <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <span style={{ fontWeight: "700" }}>{item.date}</span>
                                  {isResponded && (
                                    <i className="bx bxs-check-circle" style={{ color: "#38a169", fontSize: "18px" }} aria-label="Responded check" />
                                  )}
                                </div>
                              </td>
                              <td>
                                <button type="button" onClick={() => openResponseModal(item)}>
                                  {isResponded ? "View Details" : "View Details & Respond"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredDemandPipeline.length === 0 ? (
                          <tr>
                            <td colSpan={5}>No matching demand found.</td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>

            {selectedDemand ? (
              <div
                className="response-demand-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="response-demand-title"
                onClick={closeResponseModal}
              >
                <div className="response-demand-modal__panel" onClick={(event) => event.stopPropagation()}>
                  <div className="response-demand-modal__top">
                    <h2 id="response-demand-title">Response to Demand</h2>
                    <p>Demand id: {selectedDemand.id}</p>
                    <button type="button" aria-label="Close response modal" onClick={closeResponseModal}>
                      ×
                    </button>
                  </div>

                  <div className="response-demand-modal__grid">
                    <section className="response-demand-card">
                      <h3>Demand Details</h3>

                      <label>
                        <span>Product Category</span>
                        <input type="text" value={selectedDemand.category} readOnly />
                      </label>

                      <label>
                        <span>Product Name</span>
                        <input type="text" value={selectedDemand.productName} readOnly />
                      </label>

                      <label>
                        <span>Required Quantity</span>
                        <input type="text" value={selectedDemand.qty} readOnly />
                      </label>

                      <label>
                        <span>Quantity Type</span>
                        <input type="text" value={selectedDemand.quantityType} readOnly />
                      </label>

                      <label>
                        <span>Expected Delivery Date</span>
                        <input type="text" value={selectedDemand.date} readOnly />
                      </label>

                      <label>
                        <span>Product Specification</span>
                        <textarea value={selectedDemand.specification} readOnly />
                      </label>

                      <label>
                        <span>Remarks (Optional)</span>
                        <textarea value={selectedDemand.remarks} readOnly />
                      </label>

                      <label>
                        <span>Delivery Pin Code</span>
                        <input type="text" value={selectedDemand.deliveryPinCode} readOnly />
                      </label>

                      <button type="button" className="response-demand-card__ghost" onClick={closeResponseModal}>
                        Back
                      </button>
                    </section>
                    <section className="response-demand-card">
                      <h3>Response to Demand</h3>

                      {(() => {
                        const isResponded = respondedDemandIds.includes(selectedDemand.id);
                        return (
                          <>
                            <label>
                              <span>Quantity</span>
                              <div className="response-input-wrap">
                                <input
                                  type="text"
                                  value={responseForm.quantity}
                                  onChange={(event) => handleResponseInputChange("quantity", event.target.value)}
                                  readOnly={isResponded}
                                  style={{
                                    backgroundColor: isResponded ? "#faf8f4" : "#ffffff",
                                    cursor: isResponded ? "not-allowed" : "text"
                                  }}
                                />
                                <small>Square Meter (m²)</small>
                              </div>
                            </label>

                            <label>
                              <span>Base Price (₹)</span>
                              <div className="response-input-wrap">
                                <input
                                  type="text"
                                  value={responseForm.basePrice}
                                  onChange={(event) => handleResponseInputChange("basePrice", event.target.value)}
                                  readOnly={isResponded}
                                  style={{
                                    backgroundColor: isResponded ? "#faf8f4" : "#ffffff",
                                    cursor: isResponded ? "not-allowed" : "text"
                                  }}
                                />
                                <small>Square Meter (m²)</small>
                              </div>
                            </label>

                            <label>
                              <span>Transportation Price (₹)</span>
                              <div className="response-input-wrap">
                                <input
                                  type="text"
                                  value={responseForm.transportationPrice}
                                  onChange={(event) => handleResponseInputChange("transportationPrice", event.target.value)}
                                  readOnly={isResponded}
                                  style={{
                                    backgroundColor: isResponded ? "#faf8f4" : "#ffffff",
                                    cursor: isResponded ? "not-allowed" : "text"
                                  }}
                                />
                                <small>Square Meter (m²)</small>
                              </div>
                            </label>

                            <label>
                              <span>Tax Price (₹)</span>
                              <div className="response-input-wrap">
                                <input
                                  type="text"
                                  value={responseForm.taxPrice}
                                  onChange={(event) => handleResponseInputChange("taxPrice", event.target.value)}
                                  readOnly={isResponded}
                                  style={{
                                    backgroundColor: isResponded ? "#faf8f4" : "#ffffff",
                                    cursor: isResponded ? "not-allowed" : "text"
                                  }}
                                />
                                <small>Square Meter (m²)</small>
                              </div>
                            </label>

                            <p className="response-demand-card__inclusive">Price all inclusive : ₹{priceAllInclusive.toFixed(2)}</p>

                            <label>
                              <span>Delivery Date</span>
                              <input
                                type="text"
                                value={responseForm.deliveryDate}
                                onChange={(event) => handleResponseInputChange("deliveryDate", event.target.value)}
                                readOnly={isResponded}
                                style={{
                                  backgroundColor: isResponded ? "#faf8f4" : "#ffffff",
                                  cursor: isResponded ? "not-allowed" : "text"
                                }}
                              />
                            </label>

                            <label>
                              <span>Remarks (Optional)</span>
                              <input
                                type="text"
                                value={responseForm.remarks}
                                onChange={(event) => handleResponseInputChange("remarks", event.target.value)}
                                readOnly={isResponded}
                                style={{
                                  backgroundColor: isResponded ? "#faf8f4" : "#ffffff",
                                  cursor: isResponded ? "not-allowed" : "text"
                                }}
                              />
                            </label>

                            <label>
                              <span>Delivery Pin Code</span>
                              <input
                                type="text"
                                value={responseForm.deliveryPinCode}
                                onChange={(event) => handleResponseInputChange("deliveryPinCode", event.target.value)}
                                readOnly={isResponded}
                                style={{
                                  backgroundColor: isResponded ? "#faf8f4" : "#ffffff",
                                  cursor: isResponded ? "not-allowed" : "text"
                                }}
                              />
                            </label>

                            {isResponded ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                                <div style={{
                                  background: "#def7ec",
                                  color: "#03543f",
                                  border: "1px solid #bdf2d5",
                                  padding: "12px",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  fontWeight: "800",
                                  textAlign: "center"
                                }}>
                                  ✓ Response Submitted (Read-Only)
                                </div>
                                <button
                                  type="button"
                                  className="response-demand-card__ghost"
                                  style={{ width: "100%", justifyContent: "center", display: "flex", padding: "12px 0", fontWeight: "800", border: "1px solid #cbd5e0" }}
                                  onClick={closeResponseModal}
                                >
                                  Close Details
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                                <button
                                  type="button"
                                  className="response-demand-card__submit"
                                  onClick={() => setShowConfirmPopup(true)}
                                >
                                  Submit Response
                                </button>
                                <button
                                  type="button"
                                  className="response-demand-card__ghost"
                                  onClick={closeResponseModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </section>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <ApplicationFooter />
      </section>

      {/* Confirmation Alert Popup */}
      {showConfirmPopup && (
        <div className="alert-popup-overlay">
          <div className="alert-popup-panel">
            <div className="alert-icon-circle gold">
              <i className="bx bxs-badge-check" />
            </div>
            <h2 className="alert-title">Confirmation Alert</h2>
            <p className="alert-text">
              Are you sure you want to submit the <br />
              <strong>"Demand"</strong>
            </p>
            <button className="alert-btn-full gold" onClick={confirmResponseSubmission}>
              Yes, Submit
            </button>
            <button className="alert-btn-cancel" onClick={() => setShowConfirmPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Successful Submission Popup */}
      {showSuccessPopup && (
        <div className="alert-popup-overlay">
          <div className="alert-popup-panel">
            <div className="alert-icon-circle green">
              <i className="bx bx-check" style={{ color: "#0e9f6e", fontSize: "40px" }} />
            </div>
            <h2 className="alert-title">Successful</h2>
            <p className="alert-text">
              Order Response to <br />
              Demand has been submitted
            </p>
            <button
              className="alert-btn-full gold"
              onClick={() => setShowSuccessPopup(false)}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Alert Popup Modal Styling */
        .alert-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeInOverlay 0.25s ease-out;
        }
        .alert-popup-panel {
          background-color: #ffffff;
          border-radius: 16px;
          width: 90%;
          max-width: 440px;
          padding: 32px 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: slideUpPanel 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .alert-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .alert-icon-circle.gold {
          background-color: #fef3c7;
          color: #b88f51;
        }
        .alert-icon-circle.green {
          background-color: #def7ec;
          color: #0e9f6e;
        }
        .alert-icon-circle i {
          font-size: 36px;
        }
        .alert-title {
          font-size: 24px;
          font-weight: 800;
          color: #2d3748;
          margin: 0 0 12px 0;
        }
        .alert-text {
          font-size: 15px;
          color: #718096;
          line-height: 1.5;
          margin: 0 0 28px 0;
          font-weight: 600;
        }
        .alert-btn-full {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          font-weight: 800;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .alert-btn-full.gold {
          background-color: #b88f51;
          color: #ffffff;
        }
        .alert-btn-full.gold:hover {
          background-color: #a07840;
        }
        .alert-btn-cancel {
          background: none;
          border: none;
          color: #8b642b;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 16px;
          transition: color 0.2s;
        }
        .alert-btn-cancel:hover {
          color: #4b2822;
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpPanel {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </main>
  );
}
