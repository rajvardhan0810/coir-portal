"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    toast.success("Logged out successfully.");
    router.push("/");
  };

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        {/* Shield Logo Icon */}
        <div className="admin-header__logo-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#af8b54"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="admin-header__logo-text">
          <h2>Verifier Committee Portal</h2>
          <p>Coir Board Schemes Digitization</p>
        </div>
      </div>

      <div className="admin-header__right">
        <div className="admin-header__user-info">
          <strong>verifier@coirboard.gov.in</strong>
          <p>Verifier Role</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="admin-header__logout-btn"
          aria-label="Logout"
        >
          <i className="bx bx-log-out" />
        </button>
      </div>
    </header>
  );
}