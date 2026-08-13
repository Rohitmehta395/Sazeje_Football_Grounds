"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface ScarvesFilterValues {
  search: string;
  club: string;
}

export interface ScarvesFilterBarProps {
  values: ScarvesFilterValues;
  onChange: (newValues: ScarvesFilterValues) => void;
  clubs?: string[];
}

export function ScarvesFilterBar({
  values,
  onChange,
  clubs = ["Alle clubs", "Ajax", "Feyenoord", "PSV", "Go Ahead Eagles", "Borussia Dortmund"],
}: ScarvesFilterBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-[12px] flex-wrap mb-[26px] p-[16px] bg-surface-2 border border-border rounded-[12px]">
      {/* Search Input */}
      <div className="flex-1 min-w-[220px]">
        <label
          htmlFor="scarves-search-input"
          className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-[4px]"
        >
          {t.scarves.filterSearch}
        </label>
        <div className="relative">
          <input
            id="scarves-search-input"
            type="text"
            placeholder={t.scarves.filterSearchPlaceholder}
            value={values.search}
            onChange={(e) => onChange({ ...values, search: e.target.value })}
            className="w-full bg-surface border border-border text-text pl-[36px] pr-[12px] py-[9px] rounded-[8px] font-inter text-[13.5px] outline-none focus:border-accent"
          />
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-[10px]" />
        </div>
      </div>

      {/* Club Select */}
      <div className="w-[200px]">
        <label
          htmlFor="scarves-filter-club"
          className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-[4px]"
        >
          {t.scarves.filterClub}
        </label>
        <select
          id="scarves-filter-club"
          value={values.club}
          onChange={(e) => onChange({ ...values, club: e.target.value })}
          className="w-full bg-surface border border-border text-text px-[12px] py-[9px] rounded-[8px] font-inter text-[13.5px] outline-none focus:border-accent"
        >
          {clubs.map((c) => (
            <option key={c} value={c}>
              {c === "Alle clubs" ? t.scarves.allClubs : c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
