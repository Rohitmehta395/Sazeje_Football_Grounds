"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/hero/PageHero";
import { Country, Scarf, ScarvesPageContent } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import { ScarfCard } from "@/components/scarves/ScarfCard";
import { ScarfLightbox } from "@/components/scarves/ScarfLightbox";
import { CountryLink } from "@/components/scarves/CountryLink";
import {
  OfficialScarfIcon,
  SwapScarvesIcon,
  StadiumIcon,
  ClubBadgeIcon,
} from "@/components/ui/Icons";
import {
  ArrowLeft,
  Search,
  X,
  LayoutGrid,
  Globe2,
  ChevronDown,
  Check,
  ArrowRight,
  Flag,
  ArrowRightLeft,
  Sparkles,
} from "lucide-react";

const INITIAL_VISIBLE_SCARVES = 9;
const LOAD_MORE_STEP = 3;

export interface ScarfCategoryDirectoryViewProps {
  category: string;
  countries: Country[];
  scarves: Scarf[];
  scarvesPageContent?: ScarvesPageContent;
}

export function ScarfCategoryDirectoryView({
  category,
  countries,
  scarves,
  scarvesPageContent,
}: ScarfCategoryDirectoryViewProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
  const searchParams = useSearchParams();

  const isNew = category === "new";
  const otherCategory = isNew ? "secondhand" : "new";
  const otherCategoryLabel = isNew
    ? t.scarves.categorySecondhandTitle
    : t.scarves.categoryNewTitle;

  // Active view mode: 'showcase' (grid of scarves) or 'directory' (country list)
  const [viewMode, setViewMode] = React.useState<"showcase" | "directory">("showcase");

  // Filter state
  const [searchQuery, setSearchQuery] = React.useState<string>(
    searchParams.get("search") || ""
  );
  const [selectedCountry, setSelectedCountry] = React.useState<string>(
    searchParams.get("country") || "ALL"
  );

  // Progressive loading: start with 9 scarves, load next 3 per click
  const [visibleCount, setVisibleCount] = React.useState<number>(INITIAL_VISIBLE_SCARVES);

  // Reset pagination when search query or country filter changes
  React.useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_SCARVES);
  }, [searchQuery, selectedCountry]);

  // Handlers with performance optimization
  const handleResetFilters = React.useCallback(() => {
    setSearchQuery("");
    setSelectedCountry("ALL");
    setVisibleCount(INITIAL_VISIBLE_SCARVES);
  }, []);

  const handleLoadMore = React.useCallback(() => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  }, []);

  // Lightbox state
  const [activeLightboxScarf, setActiveLightboxScarf] = React.useState<Scarf | null>(null);

  // Resolved titles from CMS
  const categoriesDoc = scarvesPageContent?.categories;
  const categoryTitle = isNew
    ? (isEn ? categoriesDoc?.newTitleEn : categoriesDoc?.newTitle) || t.scarves.categoryNewTitle
    : (isEn ? categoriesDoc?.secondhandTitleEn : categoriesDoc?.secondhandTitle) ||
      t.scarves.categorySecondhandTitle;

  const categoryDesc = isNew
    ? (isEn ? categoriesDoc?.newDescEn : categoriesDoc?.newDesc) || t.scarves.categoryNewDesc
    : (isEn ? categoriesDoc?.secondhandDescEn : categoriesDoc?.secondhandDesc) ||
      t.scarves.categorySecondhandDesc;

  const heroImage = scarvesPageContent?.hero?.heroImage || "/Hero_Image.jpg";

  // Distinct category stats
  const stats = React.useMemo(() => {
    const uniqueClubs = new Set(scarves.map((s) => s.club).filter(Boolean)).size;
    const uniqueCountries = new Set(scarves.map((s) => s.country).filter(Boolean)).size;
    return {
      totalScarves: scarves.length,
      uniqueClubs,
      uniqueCountries,
    };
  }, [scarves]);

  // Countries that have at least 1 scarf in this category
  const populatedCountries = React.useMemo(() => {
    return countries.filter((c) => (c.count || 0) > 0);
  }, [countries]);

  // Other European countries in directory with 0 scarves
  const otherCountries = React.useMemo(() => {
    return countries
      .filter((c) => (c.count || 0) === 0)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [countries]);

  // Optimized in-memory filtering with property short-circuiting
  const filteredScarves = React.useMemo(() => {
    if (!scarves || scarves.length === 0) return [];
    const q = searchQuery.trim().toLowerCase();
    const hasCountryFilter = selectedCountry !== "ALL";

    return scarves.filter((scarf) => {
      // 1. Country filter check (fastest check)
      if (hasCountryFilter && scarf.country !== selectedCountry) {
        return false;
      }

      // 2. Search query check
      if (q) {
        const countryDisplay = getCountryDisplayName(scarf.country, lang).toLowerCase();
        const club = (scarf.club || "").toLowerCase();
        const stadium = (scarf.stadium || "").toLowerCase();
        const type = (scarf.type || "").toLowerCase();
        const desc = (scarf.description || "").toLowerCase();
        const descEn = (scarf.descriptionEn || "").toLowerCase();
        const fun = (scarf.funFact || "").toLowerCase();
        const funEn = (scarf.funFactEn || "").toLowerCase();

        const matches =
          club.includes(q) ||
          stadium.includes(q) ||
          scarf.country.toLowerCase().includes(q) ||
          countryDisplay.includes(q) ||
          type.includes(q) ||
          desc.includes(q) ||
          descEn.includes(q) ||
          fun.includes(q) ||
          funEn.includes(q);

        if (!matches) return false;
      }

      return true;
    });
  }, [scarves, selectedCountry, searchQuery, lang]);

  // Slice visible scarves according to progressive load state
  const visibleScarves = React.useMemo(() => {
    return filteredScarves.slice(0, visibleCount);
  }, [filteredScarves, visibleCount]);

  const hasMore = visibleCount < filteredScarves.length;
  const remainingCount = Math.max(0, filteredScarves.length - visibleCount);
  const nextBatchCount = Math.min(LOAD_MORE_STEP, remainingCount);

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Category Hero Banner */}
      <PageHero
        title={`${t.scarves.heroTitle} — ${categoryTitle}`}
        description={categoryDesc}
        eyebrow={`${t.scarves.heroEyebrow} • ${categoryTitle.toUpperCase()}`}
        backgroundImage={heroImage}
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-6">
        {/* 2. Top Navigation & Category Switcher Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap text-xs pt-1">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted font-inter">
            <Link
              href="/scarves"
              className="hover:text-text transition-colors flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.scarves.backToHub}</span>
            </Link>
            <span>/</span>
            <span className="text-text font-semibold">{categoryTitle}</span>
          </nav>

          <Link
            href={`/scarves/${otherCategory}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-text-muted hover:text-text hover:border-accent transition-colors font-mono text-xs"
          >
            <span>{isEn ? `Switch to ${otherCategoryLabel}` : `Wissel naar ${otherCategoryLabel}`}</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </Link>
        </div>

        {/* 3. Category Feature Banner Card */}
        <div
          className={`p-6 sm:p-7 rounded-2xl bg-surface border relative overflow-hidden shadow-card ${
            isNew
              ? "border-azg/30 bg-gradient-to-br from-azg/10 via-surface to-surface dark:from-emerald-950/30 dark:border-azg/40"
              : "border-accent-2/30 bg-gradient-to-br from-accent-2/10 via-surface to-surface dark:from-amber-950/30 dark:border-accent-2/40"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider font-bold border shadow-xs ${
                    isNew
                      ? "bg-azg/10 border-azg/30 text-teal-800 dark:bg-azg/20 dark:border-azg/40 dark:text-azg"
                      : "bg-accent-2/10 border-accent-2/30 text-amber-900 dark:bg-accent-2/20 dark:border-accent-2/40 dark:text-accent-2"
                  }`}
                >
                  {isNew ? (
                    <>
                      <OfficialScarfIcon className="w-3.5 h-3.5 text-teal-700 dark:text-azg" />
                      <span>{isEn ? "MATCHDAY EDITIONS • OFFICIAL" : "MATCHDAY EDITIES • OFFICIEEL"}</span>
                    </>
                  ) : (
                    <>
                      <SwapScarvesIcon className="w-3.5 h-3.5 text-amber-800 dark:text-accent-2" />
                      <span>{isEn ? "TERRACE SWAPS & TRADES" : "TERRACE RUIL & VINTAGE"}</span>
                    </>
                  )}
                </span>

                <span className="font-mono text-xs text-text-muted">
                  • {stats.totalScarves} {isEn ? "scarves cataloged" : "sjaals gecatalogiseerd"}
                </span>
              </div>

              <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
                {categoryTitle}
              </h2>

              <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
                {categoryDesc}
              </p>
            </div>

            {/* Quick stats pills or trade action */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-center">
                  <div className="font-bebas text-2xl text-text leading-none">{stats.totalScarves}</div>
                  <div className="font-mono text-[10px] text-text-muted uppercase mt-0.5">
                    {isEn ? "Scarves" : "Sjaals"}
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-center">
                  <div className="font-bebas text-2xl text-text leading-none">{stats.uniqueClubs}</div>
                  <div className="font-mono text-[10px] text-text-muted uppercase mt-0.5">
                    {isEn ? "Clubs" : "Clubs"}
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-center">
                  <div className="font-bebas text-2xl text-text leading-none">{stats.uniqueCountries}</div>
                  <div className="font-mono text-[10px] text-text-muted uppercase mt-0.5">
                    {isEn ? "Countries" : "Landen"}
                  </div>
                </div>
              </div>

              {!isNew && (
                <Link
                  href="/contact?subject=Scarf%20Swap"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#946A24] dark:bg-accent-2 hover:brightness-110 text-white dark:text-black font-mono text-xs font-bold transition-all shadow-md hover:scale-105"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>{isEn ? "Propose a Scarf Swap" : "Stuur een Ruilvoorstel"}</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 4. Toolbar: Search, Country Filters & View Switcher */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.scarves.searchPlaceholderCategory}
                className="w-full bg-surface border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors font-inter shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Country Dropdown Filter (Visible in Showcase Mode) */}
            {viewMode === "showcase" && (
              <div className="relative w-full sm:w-auto min-w-[210px] shrink-0">
                <Globe2
                  className={`w-4 h-4 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${
                    isNew ? "text-azg" : "text-accent-2"
                  }`}
                />
                <select
                  aria-label={t.scarves.filterCountryAll}
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className={`w-full appearance-none pl-9.5 pr-8 py-2.5 rounded-xl bg-surface border text-xs font-mono font-medium text-text outline-none cursor-pointer shadow-sm transition-all ${
                    selectedCountry !== "ALL"
                      ? isNew
                        ? "border-azg ring-1 ring-azg/40 font-bold"
                        : "border-accent-2 ring-1 ring-accent-2/40 font-bold"
                      : "border-border hover:border-border/80 focus:border-accent"
                  }`}
                >
                  <option value="ALL">
                    {t.scarves.filterCountryAll} ({scarves.length})
                  </option>
                  {populatedCountries.map((c) => {
                    const displayName = getCountryDisplayName(c.name, lang);
                    return (
                      <option key={c.name} value={c.name}>
                        {displayName} ({c.count})
                      </option>
                    );
                  })}
                  {otherCountries.length > 0 && (
                    <optgroup label={isEn ? "Other European Countries" : "Overige Europese Landen"}>
                      {otherCountries.map((c) => {
                        const displayName = getCountryDisplayName(c.name, lang);
                        return (
                          <option key={c.name} value={c.name}>
                            {displayName} (0)
                          </option>
                        );
                      })}
                    </optgroup>
                  )}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-text-muted pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            )}

            {/* View Mode Switcher Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-surface border border-border self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("showcase")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  viewMode === "showcase"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-muted hover:text-text"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{t.scarves.showcaseTab}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("directory")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  viewMode === "directory"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-muted hover:text-text"
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>{t.scarves.directoryTab}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Main Content Area */}
        {viewMode === "showcase" ? (
          <div>
            {/* Active Filter Results Counter & Reset */}
            <div className="flex items-center justify-between text-xs font-mono text-text-muted pb-3 mb-4 border-b border-border/60">
              <div>
                <strong className="text-text font-bold">{filteredScarves.length}</strong>{" "}
                {filteredScarves.length === 1
                  ? isEn
                    ? "scarf found"
                    : "sjaal gevonden"
                  : isEn
                  ? "scarves found"
                  : "sjaals gevonden"}
                {selectedCountry !== "ALL" && (
                  <span className="text-teal-800 dark:text-azg ml-1.5 font-semibold">
                    • {getCountryDisplayName(selectedCountry, lang)}
                  </span>
                )}
              </div>

              {(searchQuery || selectedCountry !== "ALL") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.scarves.resetFilters}</span>
                </button>
              )}
            </div>

            {/* Scarf Showcase Grid */}
            {filteredScarves.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleScarves.map((scarf) => (
                    <ScarfCard
                      key={scarf.id}
                      scarf={scarf}
                      onOpenLightbox={(s) => setActiveLightboxScarf(s)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="pt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="px-6 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text hover:border-accent hover:text-accent transition-colors cursor-pointer"
                    >
                      {isEn ? "Load more" : "Laad meer"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-surface border border-border shadow-card space-y-3">
                <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-text-muted mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-bebas text-2xl text-text m-0">
                  {isEn ? "No scarves match your filter" : "Geen sjaals gevonden"}
                </h3>
                <p className="font-inter text-sm text-text-muted max-w-md mx-auto">
                  {t.scarves.empty}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-mono text-text hover:text-accent transition-colors"
                >
                  {t.scarves.resetFilters}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Country Directory Tab View */
          <div className="space-y-8">
            {/* Populated Countries with Scarves */}
            <div className="space-y-4">
              <div className="font-mono text-xs tracking-wider uppercase text-teal-800 dark:text-azg font-bold flex items-center gap-2">
                <Flag className="w-3.5 h-3.5" />
                <span>{t.scarves.countriesWithScarves}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {populatedCountries.map((country) => (
                  <CountryLink
                    key={country.name}
                    country={country}
                    href={`/scarves/${category}/${encodeURIComponent(country.name)}`}
                  />
                ))}
              </div>
            </div>

            {/* Other European Countries */}
            <div className="space-y-4 pt-4 border-t border-border/60">
              <div className="font-mono text-xs tracking-wider uppercase text-text-muted flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5" />
                <span>{t.scarves.allCountriesList}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 opacity-80 hover:opacity-100 transition-opacity">
                {countries
                  .filter((c) => (c.count || 0) === 0)
                  .map((country) => (
                    <CountryLink
                      key={country.name}
                      country={country}
                      href={`/scarves/${category}/${encodeURIComponent(country.name)}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. High-Resolution Scarf Lightbox Modal */}
      <ScarfLightbox
        scarf={activeLightboxScarf}
        isOpen={Boolean(activeLightboxScarf)}
        onClose={() => setActiveLightboxScarf(null)}
      />
    </div>
  );
}
