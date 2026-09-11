"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { ScarvesBrowseView } from "./ScarvesBrowseView";
import { Scarf, Country } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import { ArrowLeft, Flag } from "lucide-react";

export interface ScarvesCountryBrowseViewProps {
  category: string;
  decodedCountryName: string;
  countryObj?: Country;
  scarves: Scarf[];
}

export function ScarvesCountryBrowseView({
  category,
  decodedCountryName,
  countryObj,
  scarves,
}: ScarvesCountryBrowseViewProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  const countryDisplayName = getCountryDisplayName(decodedCountryName, lang);
  const categoryLabel =
    category === "new"
      ? t.scarves.categoryNewTitle
      : t.scarves.categorySecondhandTitle;

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Country Page Hero */}
      <PageHero
        title={countryDisplayName}
        description={`${categoryLabel} — ${countryDisplayName}`}
        eyebrow={`${t.scarves.heroEyebrow} • ${categoryLabel.toUpperCase()}`}
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-6">
        {/* 2. Breadcrumbs & Return Link */}
        <div className="flex items-center justify-between gap-4 flex-wrap text-xs pt-1">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted font-inter">
            <Link
              href={`/scarves/${category}`}
              className="hover:text-text transition-colors flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{categoryLabel}</span>
            </Link>
            <span>/</span>
            <span className="text-text font-semibold flex items-center gap-1.5">
              <span>{countryDisplayName}</span>
            </span>
          </nav>

          <span className="font-mono text-xs text-text-muted">
            {scarves.length}{" "}
            {scarves.length === 1
              ? isEn
                ? "scarf"
                : "sjaal"
              : isEn
              ? "scarves"
              : "sjaals"}
          </span>
        </div>

        {/* 3. Scarf Showcase Grid with Filters and Lightbox */}
        <React.Suspense
          fallback={
            <div className="p-12 text-center border border-border rounded-2xl bg-surface text-text-muted font-mono text-sm shadow-card">
              {t.scarves.loading}
            </div>
          }
        >
          <ScarvesBrowseView
            initialScarves={scarves}
            categoryLabel={categoryLabel}
            countryName={decodedCountryName}
          />
        </React.Suspense>
      </div>
    </div>
  );
}
