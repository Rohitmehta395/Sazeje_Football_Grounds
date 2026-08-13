"use client";

import * as React from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";

export interface GroundsFilterValues {
  country: string;
  competition: string;
  club: string;
  sort: string;
}

export interface GroundsFilterBarProps {
  values: GroundsFilterValues;
  onChange: (newValues: GroundsFilterValues) => void;
  countries?: string[];
  competitions?: string[];
  clubs?: string[];
}

export function GroundsFilterBar({
  values,
  onChange,
  countries = ["Alle landen", "Nederland", "Duitsland", "Engeland", "Spanje"],
  competitions = ["Alle competities", "Eredivisie", "Bundesliga", "Premier League", "La Liga"],
  clubs = ["Alle clubs"],
}: GroundsFilterBarProps) {
  const { t, lang } = useTranslation();

  const handleChange = (field: keyof GroundsFilterValues, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div className="flex gap-[12px] flex-wrap mb-[26px] p-[16px] bg-surface-2 border border-border rounded-[12px]">
      {/* Country Select */}
      <div className="flex-1 min-w-[160px]">
        <label
          htmlFor="grounds-filter-country"
          className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-[4px]"
        >
          {t.grounds.filterCountry}
        </label>
        <select
          id="grounds-filter-country"
          value={values.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="w-full bg-surface border border-border text-text px-[12px] py-[9px] rounded-[8px] font-inter text-[13.5px] outline-none focus:border-accent"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c === "Alle landen" ? t.grounds.allCountries : getCountryDisplayName(c, lang)}
            </option>
          ))}
        </select>
      </div>

      {/* Competition Select */}
      <div className="flex-1 min-w-[160px]">
        <label
          htmlFor="grounds-filter-competition"
          className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-[4px]"
        >
          {t.grounds.filterCompetition}
        </label>
        <select
          id="grounds-filter-competition"
          value={values.competition}
          onChange={(e) => handleChange("competition", e.target.value)}
          className="w-full bg-surface border border-border text-text px-[12px] py-[9px] rounded-[8px] font-inter text-[13.5px] outline-none focus:border-accent"
        >
          {competitions.map((comp) => (
            <option key={comp} value={comp}>
              {comp === "Alle competities" ? t.grounds.allCompetitions : comp}
            </option>
          ))}
        </select>
      </div>

      {/* Club Select */}
      <div className="flex-1 min-w-[160px]">
        <label
          htmlFor="grounds-filter-club"
          className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-[4px]"
        >
          {t.grounds.filterClub}
        </label>
        <select
          id="grounds-filter-club"
          value={values.club}
          onChange={(e) => handleChange("club", e.target.value)}
          className="w-full bg-surface border border-border text-text px-[12px] py-[9px] rounded-[8px] font-inter text-[13.5px] outline-none focus:border-accent"
        >
          {clubs.map((cl) => (
            <option key={cl} value={cl}>
              {cl === "Alle clubs" ? t.grounds.allClubs : cl}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Select */}
      <div className="flex-1 min-w-[160px]">
        <label
          htmlFor="grounds-filter-sort"
          className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-[4px]"
        >
          {t.grounds.filterSort}
        </label>
        <select
          id="grounds-filter-sort"
          value={values.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="w-full bg-surface border border-border text-text px-[12px] py-[9px] rounded-[8px] font-inter text-[13.5px] outline-none focus:border-accent"
        >
          <option value="date-desc">{t.grounds.sortDateDesc}</option>
          <option value="date-asc">{t.grounds.sortDateAsc}</option>
          <option value="name-asc">{t.grounds.sortNameAsc}</option>
        </select>
      </div>
    </div>
  );
}
