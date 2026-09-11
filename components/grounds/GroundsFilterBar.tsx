"use client";

import * as React from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import {
  Flag,
  Trophy,
  ArrowUpDown,
  ChevronDown,
  Search,
  X,
  RotateCcw,
} from "lucide-react";
import { ClubBadgeIcon } from "@/components/ui/Icons";

export interface GroundsFilterValues {
  search?: string;
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
  totalResults?: number;
}

export function GroundsFilterBar({
  values,
  onChange,
  countries = ["Alle landen", "Nederland", "Duitsland", "Engeland", "Spanje"],
  competitions = ["Alle competities", "Eredivisie", "Bundesliga", "Premier League", "La Liga"],
  clubs = ["Alle clubs"],
  totalResults,
}: GroundsFilterBarProps) {
  const { t, lang } = useTranslation();

  // Instant local state for search input to prevent input lockup/freezing
  const [searchInput, setSearchInput] = React.useState(values.search || "");

  // Sync internal input state when external values change (e.g. reset button)
  React.useEffect(() => {
    setSearchInput(values.search || "");
  }, [values.search]);

  // Debounce search update to parent (120ms) so typing is 100% fluid and non-blocking
  React.useEffect(() => {
    if (searchInput === (values.search || "")) return;

    const timer = setTimeout(() => {
      onChange({ ...values, search: searchInput });
    }, 120);

    return () => clearTimeout(timer);
  }, [searchInput, values, onChange]);

  const handleChange = (field: keyof GroundsFilterValues, value: string) => {
    onChange({ ...values, [field]: value });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onChange({ ...values, search: "" });
  };

  const handleReset = () => {
    setSearchInput("");
    onChange({
      search: "",
      country: "Alle landen",
      competition: "Alle competities",
      club: "Alle clubs",
      sort: "date-desc",
    });
  };

  const hasActiveFilters = Boolean(
    (searchInput && searchInput.trim()) ||
      (values.country && values.country !== "Alle landen") ||
      (values.competition && values.competition !== "Alle competities") ||
      (values.club && values.club !== "Alle clubs")
  );

  return (
    <div className="space-y-3 mb-6 p-4 sm:p-5 bg-surface-2 border border-border rounded-xl shadow-card">
      {/* 1. Prominent Search Bar */}
      <div className="relative w-full">
        <label
          htmlFor="grounds-search-input"
          className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted mb-1.5"
        >
          <Search className="w-3.5 h-3.5 text-azg" />
          <span>{t.grounds.searchLabel}</span>
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted/70 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="grounds-search-input"
            type="text"
            placeholder={t.grounds.searchPlaceholder}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            className="w-full bg-surface border border-border text-text pl-10 pr-10 py-2.5 rounded-lg font-inter text-[13.5px] outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/60"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text p-1 rounded-md transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Filter Dropdowns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
        {/* Country Select */}
        <div>
          <label
            htmlFor="grounds-filter-country"
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted mb-1.5"
          >
            <Flag className="w-3.5 h-3.5 text-azg" />
            <span>{t.grounds.filterCountry}</span>
          </label>
          <div className="relative">
            <Flag className="w-4 h-4 text-text-muted/70 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              id="grounds-filter-country"
              value={values.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full appearance-none bg-surface border border-border text-text pl-9 pr-8 py-2.5 rounded-lg font-inter text-[13.5px] outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer hover:border-border/80 transition-colors"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "Alle landen" ? t.grounds.allCountries : getCountryDisplayName(c, lang)}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-text-muted pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Competition Select */}
        <div>
          <label
            htmlFor="grounds-filter-competition"
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted mb-1.5"
          >
            <Trophy className="w-3.5 h-3.5 text-accent-2" />
            <span>{t.grounds.filterCompetition}</span>
          </label>
          <div className="relative">
            <Trophy className="w-4 h-4 text-text-muted/70 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              id="grounds-filter-competition"
              value={values.competition}
              onChange={(e) => handleChange("competition", e.target.value)}
              className="w-full appearance-none bg-surface border border-border text-text pl-9 pr-8 py-2.5 rounded-lg font-inter text-[13.5px] outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer hover:border-border/80 transition-colors"
            >
              {competitions.map((comp) => (
                <option key={comp} value={comp}>
                  {comp === "Alle competities" ? t.grounds.allCompetitions : comp}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-text-muted pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Club Select */}
        <div>
          <label
            htmlFor="grounds-filter-club"
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted mb-1.5"
          >
            <ClubBadgeIcon className="w-3.5 h-3.5 text-accent" />
            <span>{t.grounds.filterClub}</span>
          </label>
          <div className="relative">
            <ClubBadgeIcon className="w-4 h-4 text-text-muted/70 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              id="grounds-filter-club"
              value={values.club}
              onChange={(e) => handleChange("club", e.target.value)}
              className="w-full appearance-none bg-surface border border-border text-text pl-9 pr-8 py-2.5 rounded-lg font-inter text-[13.5px] outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer hover:border-border/80 transition-colors"
            >
              {clubs.map((cl) => (
                <option key={cl} value={cl}>
                  {cl === "Alle clubs" ? t.grounds.allClubs : cl}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-text-muted pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Sort Select */}
        <div>
          <label
            htmlFor="grounds-filter-sort"
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted mb-1.5"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
            <span>{t.grounds.filterSort}</span>
          </label>
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-text-muted/70 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              id="grounds-filter-sort"
              value={values.sort}
              onChange={(e) => handleChange("sort", e.target.value)}
              className="w-full appearance-none bg-surface border border-border text-text pl-9 pr-8 py-2.5 rounded-lg font-inter text-[13.5px] outline-none focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer hover:border-border/80 transition-colors"
            >
              <option value="date-desc">{t.grounds.sortDateDesc}</option>
              <option value="date-asc">{t.grounds.sortDateAsc}</option>
              <option value="name-asc">{t.grounds.sortNameAsc}</option>
            </select>
            <ChevronDown className="w-4 h-4 text-text-muted pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* 3. Filter Status & Reset Actions */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
          <div className="text-text-muted font-mono">
            {typeof totalResults === "number" && (
              <span>
                {totalResults}{" "}
                {lang === "en"
                  ? totalResults === 1
                    ? "stadium found"
                    : "stadiums found"
                  : totalResults === 1
                  ? "stadion gevonden"
                  : "stadions gevonden"}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 font-mono text-azg hover:text-azg/80 transition-colors font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.grounds.clearFilters}</span>
          </button>
        </div>
      )}
    </div>
  );
}
