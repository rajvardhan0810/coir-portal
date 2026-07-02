"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__logo">
        <h2>Verifier Committee</h2>
      </div>

      <nav className="admin-sidebar__nav">
        <Link
          href="/admin/applications"
          className={
            pathname.startsWith("/admin/applications",)
              ? "active"
              : ""
          }
        >
          <i className="bx bx-file" />
          <span>Applications</span>
        </Link>
      </nav>

      <div className="admin-sidebar__footer">
        <button
          type="button"
          className="admin-logout-btn"
        >
          <i className="bx bx-log-out" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}