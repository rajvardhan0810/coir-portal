import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "../../public/assets/css/boxicons.min.css";
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
      <body>
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
