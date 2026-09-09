"use client";

import * as React from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ChevronDown, Globe2, Search, X } from "lucide-react";

export interface CountryItem {
  name: string;
  nameEn?: string;
  flag?: string;
  count: number;
}

export interface HomeCountryFilterProps {
  countries: CountryItem[];
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  totalGrounds: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function HomeCountryFilter({
  countries,
  selectedCountry,
  onSelectCountry,
  totalGrounds,
  searchQuery = "",
  onSearchChange,
}: HomeCountryFilterProps) {
  const { t, lang } = useTranslation();

  // Filter countries to only those that actually have visited grounds
  const activeCountries = countries.filter((c) => c.count > 0);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-surface-2/40 border border-border/60">
      {/* Left: All Countries Dropdown */}
      <div className="relative inline-flex items-center">
        <Globe2 className="w-4 h-4 text-azg absolute left-3.5 pointer-events-none z-10" />
        <select
          aria-label={t.home.allCountries}
          value={selectedCountry}
          onChange={(e) => onSelectCountry(e.target.value)}
          className="appearance-none pl-9 pr-9 py-2 rounded-xl text-xs font-mono uppercase tracking-wider bg-surface text-text border border-border hover:border-azg/70 focus:outline-none focus:ring-2 focus:ring-azg/30 focus:border-azg cursor-pointer shadow-sm transition-all font-semibold"
        >
          <option value="">
            {t.home.allCountries} ({totalGrounds})
          </option>
          {activeCountries.map((c) => {
            const displayName = lang === "nl" ? c.name : c.nameEn || c.name;
            return (
              <option key={c.name} value={c.name}>
                {displayName} ({c.count})
              </option>
            );
          })}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-3 pointer-events-none" />
      </div>

      {/* Right: Search Input & Button Next to Dropdown */}
      {onSearchChange && (
        <div className="relative flex items-center w-full sm:w-[260px] md:w-[320px]">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.home.heroSearchPlaceholder}
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs font-inter bg-surface text-text border border-border placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-azg/30 focus:border-azg transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 text-text-muted hover:text-text"
              aria-label={t.home.heroSearchClear}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
