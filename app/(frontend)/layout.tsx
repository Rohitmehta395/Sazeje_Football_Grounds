import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-next",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono-next",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaZeJe Football — Voetbalreizen & Sjaalcollectie",
  description: "Persoonlijke reisverslagen van stadionbezoeken en sjaalcollectie door heel Europa.",
};

const BLOCKING_INIT_SCRIPT = `(function(){try{var t=document.cookie.match(/(?:^|; )theme=([^;]*)/);var m=t?t[1]:"light";document.documentElement.setAttribute("data-theme",m);var l=document.cookie.match(/(?:^|; )lang=([^;]*)/);var n=l?l[1]:"nl";document.documentElement.setAttribute("data-lang",n);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${spaceMono.variable} ${inter.variable} font-inter antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BLOCKING_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-bg text-text transition-colors duration-200 flex flex-col justify-between">
        <LanguageProvider>
          <SiteHeader />
          <main className="pt-[72px] flex-1">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
