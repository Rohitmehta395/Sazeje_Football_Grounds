"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { GroundsView } from "./GroundsView";
import { getGrounds } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function GroundsPage() {
  const grounds = getGrounds();
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        title={t.grounds.heroTitle}
        description={t.grounds.heroSubtitle}
        eyebrow={t.grounds.heroEyebrow}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
        <React.Suspense
          fallback={
            <div className="p-12 text-center border border-border rounded-xl bg-surface-2 text-text-muted font-mono text-sm shadow-card">
              {t.grounds.loading}
            </div>
          }
        >
          <GroundsView allGrounds={grounds} />
        </React.Suspense>
      </div>
    </div>
  );
}
