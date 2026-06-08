"use client";

import Image from "next/image";
import Link from "next/link";

export function AuthShell({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="auth-portal">
      <div className="auth-portal__header">
        <Link className="auth-portal__brand" href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="Coir Board"
            width={340}
            height={92}
            priority
          />
        </Link>
      </div>
      <div className="auth-portal__body">
        <h1 className="auth-title">{title}</h1>
        {children}
      </div>
    </section>
  );
}
