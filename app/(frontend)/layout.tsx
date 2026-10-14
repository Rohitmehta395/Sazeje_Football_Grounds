import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeInitScript } from "@/components/layout/ThemeInitScript";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { getSettings } from "@/lib/data/settings";
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
  subsets: ["latin"],
  variable: "--font-inter-next",
  display: "swap",
});

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://sazejefootball.vercel.app")
  ),
  title: "SaZeJe Groundhopping — Voetbalreizen & Sjaalcollectie",
  description: "Persoonlijke reisverslagen van stadionbezoeken en sjaalcollectie door heel Europa.",
  icons: {
    icon: "/Sazaje_groundhopping_logo.jpg",
    shortcut: "/Sazaje_groundhopping_logo.jpg",
    apple: "/Sazaje_groundhopping_logo.jpg",
  },
  openGraph: {
    title: "SaZeJe Groundhopping — Voetbalreizen & Sjaalcollectie",
    description: "Persoonlijke reisverslagen van stadionbezoeken en sjaalcollectie door heel Europa.",
    images: ["/Hero_Image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const socialLinks = settings?.socialLinks;

  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${spaceMono.variable} ${inter.variable} font-inter antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-bg text-text transition-colors duration-200 flex flex-col justify-between"
      >
        <ThemeInitScript />
        <LanguageProvider>
          <SiteHeader socialLinks={socialLinks} />
          <main className="pt-[72px] flex-1">{children}</main>
          <SiteFooter socialLinks={socialLinks} />
        </LanguageProvider>
      </body>
    </html>
  );
}
