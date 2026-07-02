"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ApplicationHeader } from "@/components/applicant/applications/layout/ApplicationHeader";
import { ApplicationFooter } from "@/components/applicant/applications/layout/ApplicationFooter";
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
  const [selectedDemand, setSelectedDemand] = useState<DemandItem | null>(null);
  const [responseForm, setResponseForm] = useState<ResponseFormState>(initialResponseState);

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

  function openResponseModal(demand: DemandItem) {
    setSelectedDemand(demand);
    setResponseForm({
      quantity: "3200",
      basePrice: "150",
      transportationPrice: "15",
      taxPrice: "20",
      deliveryDate: demand.date,
      remarks: demand.remarks,
      deliveryPinCode: demand.deliveryPinCode,
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
    ? demandPipeline.filter((item) => {
        const searchable = `${item.id} ${item.category} ${item.qty} ${item.date} ${item.raisedOn}`.toLowerCase();
        return searchable.includes(normalizedQuery);
      })
    : demandPipeline;

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
                        {filteredDemandPipeline.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <strong>{item.id}</strong>
                            </td>
                            <td>
                              {item.category}
                              <small>{item.raisedOn}</small>
                            </td>
                            <td>{item.qty}</td>
                            <td>{item.date}</td>
                            <td>
                              <button type="button" onClick={() => openResponseModal(item)}>
                                View Details & Respond
                              </button>
                            </td>
                          </tr>
                        ))}

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

                      <label>
                        <span>Quantity</span>
                        <div className="response-input-wrap">
                          <input
                            type="text"
                            value={responseForm.quantity}
                            onChange={(event) => handleResponseInputChange("quantity", event.target.value)}
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
                        />
                      </label>

                      <label>
                        <span>Remarks (Optional)</span>
                        <input
                          type="text"
                          value={responseForm.remarks}
                          onChange={(event) => handleResponseInputChange("remarks", event.target.value)}
                        />
                      </label>

                      <label>
                        <span>Delivery Pin Code</span>
                        <input
                          type="text"
                          value={responseForm.deliveryPinCode}
                          onChange={(event) => handleResponseInputChange("deliveryPinCode", event.target.value)}
                        />
                      </label>

                      <button type="button" className="response-demand-card__submit">
                        Submit Response
                      </button>
                      <button type="button" className="response-demand-card__ghost">
                        Save Draft
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <ApplicationFooter />
      </section>
    </main>
  );
}
