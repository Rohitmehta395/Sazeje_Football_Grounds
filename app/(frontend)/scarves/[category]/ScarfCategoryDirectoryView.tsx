"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { CountryDirectory } from "@/components/scarves/CountryDirectory";
import { Country } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface ScarfCategoryDirectoryViewProps {
  category: string;
  countries: Country[];
}

export function ScarfCategoryDirectoryView({
  category,
  countries,
}: ScarfCategoryDirectoryViewProps) {
  const { t } = useTranslation();

  const categoryLabel =
    category === "new"
      ? t.scarves.categoryNewTitle
      : t.scarves.categorySecondhandTitle;

  return (
    <div>
      <PageHero
        title={`${t.scarves.heroTitle} — ${categoryLabel}`}
        description={t.scarves.selectCountrySubtitle}
        eyebrow={`${t.scarves.heroEyebrow} • ${categoryLabel.toUpperCase()}`}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
        <Link
          href="/scarves"
          className="inline-flex items-center gap-1 font-semibold text-[14px] text-accent hover:underline mb-[24px]"
        >
          ← {t.scarves.selectCountryTitle}
        </Link>

        <CountryDirectory
          countries={countries}
          baseHref={`/scarves/${category}`}
          heading={`${categoryLabel.toUpperCase()} — ${t.scarves.selectCountryTitle.toUpperCase()}`}
        />
      </div>
    </div>
  );
}
