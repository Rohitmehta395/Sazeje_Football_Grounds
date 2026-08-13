"use client";

import * as React from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { lang, setLang } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = lang === "nl" ? "en" : "nl";
    setLang(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className={`px-[10px] py-[6px] rounded-[20px] border border-border bg-surface-2 font-mono text-[12px] font-bold text-text cursor-pointer transition-colors hover:border-accent ${className}`.trim()}
    >
      <span className={lang === "nl" ? "text-accent" : "text-text-muted"}>NL</span>
      <span className="text-text-muted mx-[2px]">/</span>
      <span className={lang === "en" ? "text-accent" : "text-text-muted"}>EN</span>
    </button>
  );
}
