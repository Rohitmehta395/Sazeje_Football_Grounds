"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav, NavItem } from "./MobileNav";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface SiteHeaderProps {
  navItems?: NavItem[];
  activeHref?: string;
}

export function SiteHeader({ activeHref }: SiteHeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const currentPath = activeHref ?? pathname;

  const dynamicNavItems: NavItem[] = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.grounds, href: "/grounds" },
    { label: t.nav.map, href: "/map" },
    { label: t.nav.scarves, href: "/scarves" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-surface/90 border-b border-border backdrop-blur-md">
      <div className="max-w-[1920px] mx-auto px-5 md:px-[40px] h-[72px] flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-[12px] flex-shrink-0">
          <div className="w-[38px] h-[38px] rounded-full bg-accent text-white flex items-center justify-center font-bebas text-[18px] flex-shrink-0 shadow-[inset_0_0_0_2px_var(--accent-2)]">
            SZJ
          </div>
          <div className="font-bebas text-[23px] tracking-[0.04em] whitespace-nowrap text-text">
            SaZeJe <span>Football</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden min-[901px]:flex items-center gap-[22px]">
          {dynamicNavItems.map((item) => {
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] font-semibold py-[6px] px-[2px] border-b-2 transition-colors ${
                  isActive
                    ? "text-accent border-accent"
                    : "text-text-muted border-transparent hover:text-text hover:border-accent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-[12px]">
          {/* Socials */}
          <div className="hidden lg:flex items-center gap-[10px]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-[32px] h-[32px] rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:bg-accent-soft hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-[32px] h-[32px] rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:bg-accent-soft hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1"/>
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-[32px] h-[32px] rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:bg-accent-soft hover:text-accent transition-colors"
              aria-label="X"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6L17.7 20Z"/>
              </svg>
            </a>
          </div>

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Burger Button */}
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={t.header.openMenu}
            className="min-[901px]:hidden w-[40px] h-[40px] border border-border rounded-[8px] bg-surface-2 flex items-center justify-center text-text cursor-pointer hover:border-accent transition-colors"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        items={dynamicNavItems}
        activeHref={currentPath}
      />
    </header>
  );
}
