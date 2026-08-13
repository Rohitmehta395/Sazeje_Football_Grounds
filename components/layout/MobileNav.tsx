"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose?: () => void;
  items: NavItem[];
  activeHref?: string;
}

export function MobileNav({
  isOpen,
  onClose,
  items,
  activeHref,
}: MobileNavProps) {
  const pathname = usePathname();
  const currentPath = activeHref ?? pathname;

  return (
    <nav
      className={`fixed top-[72px] left-0 right-0 bg-surface border-b border-border flex flex-col items-start p-[14px_24px_20px] gap-[14px] transition-transform duration-200 ease-in-out min-[901px]:hidden z-50 ${
        isOpen ? "translate-y-0 shadow-card" : "-translate-y-[150%]"
      }`}
    >
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
    </nav>
  );
}
