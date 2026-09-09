"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
      className={`fixed top-[72px] left-0 right-0 bg-surface border-b border-border flex flex-col items-start p-5 gap-3.5 transition-transform duration-200 ease-in-out min-[901px]:hidden z-50 ${
        isOpen ? "translate-y-0 shadow-card" : "-translate-y-[150%]"
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
    </nav>
  );
}
