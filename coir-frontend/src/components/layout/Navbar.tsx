import Image from "next/image";
import Link from "next/link";

import { BiChevronDown } from "react-icons/bi";

import { Topbar } from "@/components/layout/Topbar";
import {
  navigationItems,
  ROUTES,
  type NavItem,
} from "@/constants/routes";

function NavMenu({
  items,
  nested = false,
}: {
  items: NavItem[];
  nested?: boolean;
}) {
  return (
    <ul
      className={
        nested
          ? "dropdown-list nested-dropdown"
          : "nav-list"
      }
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="nav-item"
        >
          {item.children ? (
            <details className="nav-details">
              <summary>
                <span>{item.label}</span>

                <BiChevronDown
                  aria-hidden
                />
              </summary>

              <NavMenu
                items={item.children}
                nested
              />
            </details>
          ) : (
            <Link
              href={
                item.href ?? "#"
              }
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Navbar() {
  return (
    <header
      className="site-header"
      id="accessibility"
    >
      <Topbar />

      <div className="main-header">
        <Link
          className="brand"
          href={ROUTES.home}
          aria-label="Coir Board home"
        >
          <Image
            src="/assets/images/logo.svg"
            alt="Coir Board"
            width={260}
            height={84}
            priority
          />
        </Link>

        <nav
          className="primary-nav"
          aria-label="Primary navigation"
        >
          <NavMenu
            items={navigationItems}
          />
        </nav>

        <div className="auth-actions">
          <details className="login-dropdown">
            <summary className="login-button">
              Login
            </summary>

            <div className="login-dropdown-menu">
              <Link
                href={ROUTES.login}
                className="dropdown-item"
              >
                User Login
              </Link>

              <Link
                href="/admin/login"
                className="dropdown-item"
              >
                Admin Login
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}