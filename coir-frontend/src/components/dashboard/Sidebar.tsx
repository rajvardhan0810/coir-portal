import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const dashboardLinks = [
  { label: "Dashboard", href: ROUTES.dashboard },
  { label: "Profile", href: ROUTES.profile },
  { label: "Applications", href: ROUTES.applications },
  { label: "Schemes", href: ROUTES.schemes },
];

export function Sidebar() {
  return (
    <nav className="dashboard-sidebar" aria-label="Dashboard navigation">
      {dashboardLinks.map((item) => (
        <Link href={item.href} key={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
