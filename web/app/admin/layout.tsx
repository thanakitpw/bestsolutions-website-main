import type { Metadata } from "next";
import type { ReactNode } from "react";
import { lineSeedSansThai } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className={lineSeedSansThai.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
