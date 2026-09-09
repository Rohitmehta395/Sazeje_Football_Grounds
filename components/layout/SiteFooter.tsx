"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ArrowUp, ChevronRight, Compass, Mail, MapPin, Send } from "lucide-react";
import { ScarfIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.grounds, href: "/grounds" },
    { label: t.nav.map, href: "/map" },
    { label: t.nav.scarves, href: "/scarves" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const collectionLinks = [
    { label: "Nederland Grounds", href: "/grounds?country=Netherlands" },
    { label: "Duitsland Grounds", href: "/grounds?country=Germany" },
    { label: "Engeland Grounds", href: "/grounds?country=England" },
    { label: "België Grounds", href: "/grounds?country=Belgium" },
    { label: t.home.featuredScarvesTitle, href: "/scarves" },
    { label: t.home.goalsSectionTitle, href: "/about#goals" },
  ];

  return (
    <footer className="border-t border-border bg-surface text-text mt-20 transition-colors">
      {/* Main Footer Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-10">
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group h-10">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Image
                  src="/Sazaje_groundhopping_logo.jpg"
                  alt="SaZeJe Groundhopping Logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl text-text tracking-wider leading-none group-hover:text-accent transition-colors">
                  SaZeJe Football
                </span>
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest mt-0.5">
                  European Groundhopping Archive
                </span>
              </div>
            </Link>

            <p className="font-inter text-xs sm:text-[13px] text-text-muted leading-relaxed m-0">
              {t.footer.aboutText}
            </p>

            {/* Social & Contact Shortcuts */}
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6L17.7 20Z" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                aria-label="Contact"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bebas text-lg text-text tracking-wider uppercase m-0 flex items-center gap-1.5 h-10 whitespace-nowrap">
              <Compass className="w-4 h-4 text-azg shrink-0" />
              <span>{t.footer.navHeading}</span>
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-text-muted hover:text-accent transition-colors duration-150 group"
                  >
                    <ChevronRight className="w-3 h-3 text-border group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Collections & Regions */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bebas text-lg text-text tracking-wider uppercase m-0 flex items-center gap-1.5 h-10 whitespace-nowrap">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>{t.footer.collectionsHeading}</span>
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {collectionLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-text-muted hover:text-accent transition-colors duration-150 group"
                  >
                    <ChevronRight className="w-3 h-3 text-border group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Community & Scarf Swap */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bebas text-lg text-text tracking-wider uppercase m-0 flex items-center gap-1.5 h-10 whitespace-nowrap">
              <ScarfIcon className="w-4 h-4 text-accent-2 shrink-0" />
              <span>{t.footer.communityHeading}</span>
            </h3>
            <p className="font-inter text-xs sm:text-[13px] text-text-muted leading-relaxed m-0">
              {t.footer.communityText}
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 border border-border hover:border-accent text-text text-xs font-semibold transition-all duration-200 hover:shadow-sm group"
              >
                <Send className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 transition-transform" />
                <span>{t.footer.ctaShareTip}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer Bar */}
      <div className="border-t border-border/80 bg-surface-2/40">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted font-inter">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span>© {currentYear} SaZeJe Football. {t.footer.copyright}</span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="font-mono text-[11px] text-text-muted/80">{t.footer.privacy}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-2 cursor-pointer border border-transparent hover:border-border"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
