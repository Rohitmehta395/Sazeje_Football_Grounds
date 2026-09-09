"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav, NavItem } from "./MobileNav";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { SocialLinks } from "@/types";

export interface SiteHeaderProps {
  navItems?: NavItem[];
  activeHref?: string;
  socialLinks?: SocialLinks | null;
}

export function SiteHeader({ activeHref, socialLinks }: SiteHeaderProps) {
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

  const hasConfiguredSocials = Boolean(
    socialLinks &&
      Object.values(socialLinks).some(
        (val) => typeof val === "string" && val.trim().length > 0
      )
  );

  const fallbackSocials = [
    {
      key: "instagram",
      href: "https://instagram.com",
      label: "Instagram",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      ),
    },
    {
      key: "x",
      href: "https://x.com",
      label: "X",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6L17.7 20Z" />
        </svg>
      ),
    },
    {
      key: "facebook",
      href: "https://facebook.com",
      label: "Facebook",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
  ];

  const configuredSocials = [
    socialLinks?.instagram?.trim()
      ? {
          key: "instagram",
          href: socialLinks.instagram.trim(),
          label: "Instagram",
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          ),
        }
      : null,
    socialLinks?.x?.trim()
      ? {
          key: "x",
          href: socialLinks.x.trim(),
          label: "X",
          icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6L17.7 20Z" />
            </svg>
          ),
        }
      : null,
    socialLinks?.facebook?.trim()
      ? {
          key: "facebook",
          href: socialLinks.facebook.trim(),
          label: "Facebook",
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          ),
        }
      : null,
    socialLinks?.youtube?.trim()
      ? {
          key: "youtube",
          href: socialLinks.youtube.trim(),
          label: "YouTube",
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
            </svg>
          ),
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  const visibleSocials = hasConfiguredSocials ? configuredSocials : fallbackSocials;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-surface/90 border-b border-border backdrop-blur-md">
      <div className="max-w-[1920px] mx-auto px-5 md:px-[40px] h-[72px] flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden border border-border shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/Sazaje_groundhopping_logo.jpg"
              alt="SaZeJe Groundhopping Logo"
              fill
              sizes="42px"
              className="object-cover"
              priority
            />
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
          {visibleSocials.length > 0 && (
            <div className="hidden lg:flex items-center gap-[10px]">
              {visibleSocials.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-[32px] h-[32px] rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:bg-accent-soft hover:text-accent transition-colors"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}

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
        socials={visibleSocials}
      />
    </header>
  );
}
