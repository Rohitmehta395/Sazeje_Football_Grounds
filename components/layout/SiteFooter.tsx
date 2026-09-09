"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-10 mt-10 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-[13px] text-text-muted">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/Sazaje_groundhopping_logo.jpg"
                alt="SaZeJe Groundhopping Logo"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span className="font-bebas text-xl text-text tracking-wide group-hover:text-azg transition-colors">
              SaZeJe Football
            </span>
          </Link>
          <span className="text-border hidden sm:inline">•</span>
          <p className="m-0 font-inter text-xs text-text-muted">
            © {currentYear} SaZeJe Football. {t.footer.copyright}
          </p>
        </div>

        <p className="m-0 font-mono text-xs text-text-muted text-center sm:text-right">
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  );
}
