import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coir Board Portal",
  description:
    "Coir Board portal homepage with schemes, registration, leadership and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
