"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { StadiumMap } from "@/components/map/StadiumMap";
import { getGrounds } from "@/lib/data";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function MapPage() {
  const grounds = getGrounds();
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        title={t.map.heroTitle}
        description={t.map.heroSubtitle}
        eyebrow={t.map.heroEyebrow}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
        <StadiumMap grounds={grounds} />
      </div>
    </div>
  );
}
