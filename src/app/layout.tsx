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
      {/* ARIA: bg-slate-50/50 gives the entire app a faint warm tint —
          pages that use their own bg will override this naturally.
          This ensures even "bare" routes never show cold white. */}
      <body className="min-h-full flex flex-col bg-slate-50/50 pb-14 md:pb-0">
        <NavHeader />
        {children}
        <footer className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 text-center text-xs text-slate-400">
          <p>
            Árbol Genealógico Caamaño · Construido con datos de 9 archivos
            internacionales
          </p>
          <div className="mt-2">
            <a
              href="https://www.paypal.com/donate/?business=caamano.luismiguel%40gmail.com&currency_code=USD&item_name=Apoyo+al+%C3%81rbol+Geneal%C3%B3gico+Caama%C3%B1o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
            >
              ☕ Apoyar este proyecto
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
