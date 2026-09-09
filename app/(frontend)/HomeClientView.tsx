"use client";

import * as React from "react";
import Link from "next/link";
import { Ground, Scarf, Goal } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { HomeHero } from "@/components/hero/HomeHero";
import { GroundCard } from "@/components/grounds/GroundCard";
import { HomeCountryFilter, CountryItem } from "@/components/home/HomeCountryFilter";
import { HomeMapSection } from "@/components/home/HomeMapSection";
import { HomeScarvesSection } from "@/components/home/HomeScarvesSection";
import { HomeGoalsSection } from "@/components/home/HomeGoalsSection";
import { HomeStorySection } from "@/components/home/HomeStorySection";
import { HomeContactCta } from "@/components/home/HomeContactCta";
import { ArrowRight, Compass, RotateCcw, Search } from "lucide-react";
import { getCountryDisplayName } from "@/lib/data/countries";

export interface HomeClientViewProps {
  grounds: Ground[];
  latestGrounds: Ground[];
  scarves: Scarf[];
  goals: Goal[];
  countries: CountryItem[];
}

export function HomeClientView({
  grounds,
  latestGrounds,
  scarves,
  goals,
  countries,
}: HomeClientViewProps) {
  const { t } = useTranslation();

  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const groundsCount = grounds.length;
  const countriesCount = new Set(grounds.map((g) => g.country)).size;
  const activeGoalsCount = goals.filter((g) => g.status === "in_progress").length;

  // Filter grounds based on selected country and search query
  const filteredGrounds = React.useMemo(() => {
    let result = grounds;

    if (selectedCountry) {
      result = result.filter(
        (g) => g.country.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((g) => {
        const countryNL = g.country.toLowerCase();
        const countryEN = getCountryDisplayName(g.country, "en").toLowerCase();

        return (
          g.name.toLowerCase().includes(q) ||
          g.club.toLowerCase().includes(q) ||
          g.competition.toLowerCase().includes(q) ||
          countryNL.includes(q) ||
          countryEN.includes(q) ||
          (g.description && g.description.toLowerCase().includes(q))
        );
      });
    }

    return result;
  }, [grounds, selectedCountry, searchQuery]);

  // If user has not filtered, show the top recent grounds (limit 8), else show all matching results
  const isFiltering = Boolean(selectedCountry || searchQuery.trim());
  const displayGrounds = isFiltering ? filteredGrounds : latestGrounds.slice(0, 8);

  const handleClearFilters = () => {
    setSelectedCountry("");
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* High-impact cinematic Hero */}
      <HomeHero
        groundsCount={groundsCount}
        countriesCount={countriesCount}
        scarvesCount={scarves.length}
        activeGoalsCount={activeGoalsCount}
      />

      {/* Main Content Sections */}
      <div className="max-w-[1200px] mx-auto px-6 py-14 space-y-20 w-full">
        {/* Section 1: Recent Groundhopping Expeditions */}
        <section id="grounds-section" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-border">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-azg font-semibold flex items-center gap-1.5 mb-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>EXPEDITIES & VERSLAGEN</span>
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
                {t.home.recentGroundsTitle}
              </h2>
              <p className="font-inter text-sm text-text-muted m-0 mt-1 max-w-2xl">
                {t.home.recentGroundsSubtitle}
              </p>
            </div>

            <Link
              href="/grounds"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 hover:underline shrink-0"
            >
              <span>{t.home.viewAllGrounds}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Country Filters & Search Bar */}
          <div className="mb-6">
            <HomeCountryFilter
              countries={countries}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
              totalGrounds={grounds.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Active Filter Status Indicator */}
          {isFiltering && (
            <div className="mb-6 flex items-center justify-between bg-surface-2/60 border border-border px-4 py-2.5 rounded-xl text-xs font-mono">
              <span className="text-text">
                Filter resultaten: <strong>{filteredGrounds.length}</strong>{" "}
                {filteredGrounds.length === 1 ? "stadion" : "stadions"} gevonden
                {selectedCountry ? ` in "${selectedCountry}"` : ""}
                {searchQuery ? ` voor "${searchQuery}"` : ""}
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-accent font-semibold hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.home.clearSearch}</span>
              </button>
            </div>
          )}

          {/* Grounds Grid */}
          {displayGrounds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayGrounds.map((ground) => (
                <GroundCard key={ground.id} ground={ground} />
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-dashed border-border rounded-2xl p-12 text-center">
              <Search className="w-10 h-10 text-text-muted/40 mx-auto mb-3" />
              <h3 className="font-bebas text-2xl text-text m-0">
                {t.home.noGroundsFound}
              </h3>
              <p className="font-inter text-xs text-text-muted mt-1 mb-4">
                Probeer een andere zoekterm of wis de geselecteerde filters.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-azg text-white text-xs font-semibold hover:bg-azg/90 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.home.clearSearch}</span>
              </button>
            </div>
          )}
        </section>

        {/* Section 2: Interactive European Stadium Map */}
        <HomeMapSection grounds={grounds} />

        {/* Section 3: Curated Scarf Archive Showcase */}
        <HomeScarvesSection scarves={scarves} />

        {/* Section 4: Groundhopping Goals & Milestone Tracker */}
        <HomeGoalsSection goals={goals} />

        {/* Section 5: Editorial Ethos & Story */}
        <HomeStorySection />

        {/* Section 6: Community & Scarf Swap Callout */}
        <HomeContactCta />
      </div>
    </div>
  );
}
