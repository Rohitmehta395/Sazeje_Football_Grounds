"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { ScarfCategoryChooser } from "@/components/scarves/ScarfCategoryChooser";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function ScarvesPage() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        title={t.scarves.heroTitle}
        description={t.scarves.heroSubtitle}
        eyebrow={t.scarves.heroEyebrow}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
        <ScarfCategoryChooser />
      </div>
    </div>
  );
}
