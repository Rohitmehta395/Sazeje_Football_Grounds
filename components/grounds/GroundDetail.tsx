"use client";

import * as React from "react";
import { Ground } from "@/types";
import { InfoBox } from "@/components/ui/InfoBox";
import { GroundGallery } from "./GroundGallery";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";

export interface GroundDetailProps {
  ground: Ground;
}

export function GroundDetail({ ground }: GroundDetailProps) {
  const { t, lang } = useTranslation();

  return (
    <div className="space-y-[26px]">
      {/* Detail Hero Photo Header */}
      <div
        className="h-[340px] bg-cover bg-center rounded mb-[26px] relative overflow-hidden shadow-card"
        style={{ backgroundImage: `url('${ground.photo}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 rounded flex items-end p-[24px]">
          <h1 className="font-bebas text-white text-[46px] leading-[1.05] m-0 drop-shadow-md">
            {ground.name}
          </h1>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-[34px]">
        {/* Story / Description Column */}
        <div className="space-y-4">
          <h2 className="font-bebas text-[28px] text-text m-0">{t.grounds.storyHeading}</h2>
          
          {lang === "en" && (
            <div className="font-mono text-[11px] text-azg uppercase tracking-[0.06em] bg-surface-2 border border-border px-3 py-1.5 rounded-md inline-block">
              {t.common.originalDutchNotice}
            </div>
          )}

          <p className="font-inter text-[15px] text-text-muted leading-[1.75] m-0">
            {ground.story || ground.description}
          </p>

          {ground.matchInfo && (
            <div className="bg-surface border border-border rounded-xl p-5 mt-4">
              <h3 className="font-bebas text-xl text-azg m-0 mb-1">
                {lang === "en" ? "Match Information" : "Wedstrijdinformatie"}
              </h3>
              <p className="font-inter text-xs text-text-muted leading-relaxed m-0">
                {ground.matchInfo}
              </p>
            </div>
          )}

          {ground.images && ground.images.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bebas text-[24px] text-text m-0 mb-2">
                {t.grounds.galleryHeading}
              </h3>
              <GroundGallery images={ground.images} alt={ground.name} />
            </div>
          )}
        </div>

        {/* InfoBox Column */}
        <div>
          <h2 className="font-bebas text-[28px] text-text m-0 mb-3">
            {lang === "en" ? "Information" : "Informatie"}
          </h2>
          <InfoBox
            items={[
              { label: t.grounds.filterClub, value: ground.club },
              { label: t.grounds.filterCountry, value: getCountryDisplayName(ground.country, lang) },
              { label: t.grounds.filterCompetition, value: ground.competition },
              { label: t.grounds.visitDate, value: ground.visitDate },
              { label: lang === "en" ? "Coordinates" : "Coördinaten", value: `${ground.lat.toFixed(2)}, ${ground.lng.toFixed(2)}` },
              ...(ground.extra ? [{ label: lang === "en" ? "Special Feature" : "Bijzonderheid", value: ground.extra }] : []),
            ]}
          />
        </div>
      </div>
    </div>
  );
}
