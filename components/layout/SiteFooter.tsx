"use client";

import * as React from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-[36px] mt-[40px] bg-surface">
      <div className="max-w-[1160px] mx-auto px-[24px] flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-text-muted">
        <p className="m-0 font-inter">
          © {currentYear} SaZeJe Football. {t.footer.copyright}
        </p>
        <p className="m-0 font-mono text-azg text-center sm:text-right">
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  );
}
