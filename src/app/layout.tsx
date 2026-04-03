import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavHeader } from "@/components/layout/nav-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genealogía Caamaño",
  description: "Árbol genealógico de la familia Caamaño",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* ARIA: bg-amber-50/30 gives the entire app a faint warm tint —
          pages that use their own bg will override this naturally.
          This ensures even "bare" routes never show cold white. */}
      <body className="min-h-full flex flex-col bg-amber-50/30">
        <NavHeader />
        {children}
      </body>
    </html>
  );
}
