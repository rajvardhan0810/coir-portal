import { ReactNode } from "react";
import { AdminHeader } from "./AdminHeader";

type Props = {
  children: ReactNode;
};

export function AdminLayout({
  children,
}: Props) {
  return (
    <div className="admin-layout-container">
      <AdminHeader />
      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
}