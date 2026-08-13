"use client";

import * as React from "react";
import Link from "next/link";
import { Country } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";

export interface CountryLinkProps {
  country: Country;
  href: string;
}

export function CountryLink({ country, href }: CountryLinkProps) {
  const { lang } = useTranslation();
  const displayName = getCountryDisplayName(country.name, lang);

  return (
    <Link href={href} className="group">
      <div className="flex items-center justify-between gap-[10px] p-[13px_16px] border border-border rounded-[10px] bg-surface text-[14.5px] font-semibold transition-all duration-150 ease-in-out hover:border-accent hover:translate-x-[3px]">
        <div className="flex items-center gap-[10px]">
          <span className="text-[19px] leading-none">{country.flag}</span>
          <span className="text-text group-hover:text-accent transition-colors font-inter">
            {displayName}
          </span>
        </div>
        {country.count !== undefined && (
          <span className="font-mono text-[11.5px] text-text-muted">
            {country.count} {country.count === 1 ? (lang === "en" ? "scarf" : "sjaal") : (lang === "en" ? "scarves" : "sjaals")}
          </span>
        )}
      </div>
    </Link>
  );
}
