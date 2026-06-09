"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { clearAuthStorage } from "@/store/authStore";

const menuItems = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    icon: "bx-grid-alt",
  },
  {
    label: "Schemes",
    href: ROUTES.schemes,
    icon: "bx-archive",
  },
  {
    label: "My Profile",
    href: ROUTES.profile,
    icon: "bx-user",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearAuthStorage();
    router.replace(ROUTES.login);
  }

  return (
    <aside className="dashboard-sidebar">
      {/* Logo Section */}

      <div className="dashboard-sidebar__brand">
        <Image
          src="/assets/images/logo-footer.svg"
          alt="Coir Board"
          width={220}
          height={70}
          priority
        />
      </div>

      {/* Menu */}

      <nav className="dashboard-sidebar__menu">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`dashboard-sidebar__link ${
                isActive ? "active" : ""
              }`}
            >
              <i className={`bx ${item.icon}`} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="dashboard-sidebar__footer">
        <button
          type="button"
          onClick={handleLogout}
          className="dashboard-sidebar__logout"
        >
          <i className="bx bx-log-out" aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}
