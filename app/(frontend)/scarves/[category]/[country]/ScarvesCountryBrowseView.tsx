"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { ScarvesBrowseView } from "./ScarvesBrowseView";
import { Scarf, Country } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";

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

  const countryDisplayName = getCountryDisplayName(decodedCountryName, lang);
  const categoryLabel =
    category === "new"
      ? t.scarves.categoryNewTitle
      : t.scarves.categorySecondhandTitle;

  return (
    <div>
      <PageHero
        title={`${countryObj ? countryObj.flag : ""} ${countryDisplayName}`}
        description={`${categoryLabel} — ${countryDisplayName}`}
        eyebrow={`${t.scarves.heroEyebrow} • ${categoryLabel.toUpperCase()}`}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
        <Link
          href={`/scarves/${category}`}
          className="inline-flex items-center gap-1 font-semibold text-[14px] text-accent hover:underline mb-[24px]"
        >
          {t.scarves.backToScarves}
        </Link>

        <React.Suspense
          fallback={
            <div className="p-12 text-center border border-border rounded-xl bg-surface-2 text-text-muted font-mono text-sm shadow-card">
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
