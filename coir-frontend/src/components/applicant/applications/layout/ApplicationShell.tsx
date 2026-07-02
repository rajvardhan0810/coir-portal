import { ReactNode } from "react";

import { ApplicationSidebar }
from "./ApplicationSidebar";

import { ApplicationHeader }
from "./ApplicationHeader";

import { ApplicationFooter }
from "./ApplicationFooter";


type Props = {
  children: ReactNode;
};

export function ApplicationShell({
  children,
}: Props) {
  return (
    <div className="application-shell">

      <ApplicationSidebar />

      <div className="application-shell__main">

        <ApplicationHeader />

        <main className="application-shell__content">
          {children}
        </main>

        <ApplicationFooter />

      </div>

    </div>
  );
}