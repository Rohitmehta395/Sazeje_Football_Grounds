"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
}

export interface MobileNavSocial {
  key: string;
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose?: () => void;
  items: NavItem[];
  activeHref?: string;
  socials?: MobileNavSocial[];
}

export function MobileNav({
  isOpen,
  onClose,
  items,
  activeHref,
  socials,
}: MobileNavProps) {
  const pathname = usePathname();
  const currentPath = activeHref ?? pathname;

  // Close when pressing Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 top-[72px] bg-black/40 backdrop-blur-xs transition-opacity duration-200 min-[901px]:hidden z-[998] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className={`fixed top-[72px] left-0 right-0 max-h-[calc(100dvh-72px)] overflow-y-auto bg-surface border-b border-border flex flex-col items-start p-5 gap-3.5 transition-all duration-200 ease-in-out min-[901px]:hidden z-[999] shadow-card ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/60 w-full mb-1">
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border flex-shrink-0">
            <Image
              src="/Sazaje_groundhopping_logo.jpg"
              alt="SaZeJe Football"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <span className="font-bebas text-lg text-text">SaZeJe Football</span>
        </div>
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? currentPath === "/"
              : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
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

        {socials && socials.length > 0 && (
          <div className="flex items-center gap-2 pt-3 mt-1 border-t border-border/60 w-full">
            {socials.map((item) => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="w-[34px] h-[34px] rounded-full bg-surface-2 border border-border/50 flex items-center justify-center text-text-muted hover:bg-accent-soft hover:text-accent transition-colors"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

