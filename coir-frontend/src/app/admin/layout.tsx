import type { ReactNode } from "react";

import { AdminLayout }
from "@/components/admin/layout/AdminLayout";

type Props = {
  children: ReactNode;
};

export default function Layout({
  children,
}: Props) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}