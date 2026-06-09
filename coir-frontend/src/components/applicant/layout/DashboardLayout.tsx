// Ye sidebar + header ko har page me reuse karega.


"use client";

import type { ReactNode } from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
  userName?: string;
};

export function DashboardLayout({
  children,
  userName,
}: DashboardLayoutProps) {
  return (
    <main className="dashboard-layout">
      <Sidebar />

      <section className="dashboard-main">
        <Header userName={userName} />

        <div className="dashboard-content">
          {children}
        </div>
      </section>
    </main>
  );
}