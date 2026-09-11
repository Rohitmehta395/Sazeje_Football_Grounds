"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { StadiumMap } from "@/components/map/StadiumMap";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Ground, MapPageContent } from "@/types";
import { Compass, ArrowRight } from "lucide-react";

export interface MapClientViewProps {
  grounds: Ground[];
  mapPageContent: MapPageContent;
}

export function MapClientView({ grounds, mapPageContent }: MapClientViewProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  // Dynamic Localized Hero Content from CMS
  const heroTitle =
    (isEn && mapPageContent.hero.titleEn
      ? mapPageContent.hero.titleEn
      : mapPageContent.hero.title) || t.map.heroTitle;

  const heroSubtitle =
    (isEn && mapPageContent.hero.subtitleEn
      ? mapPageContent.hero.subtitleEn
      : mapPageContent.hero.subtitle) || t.map.heroSubtitle;

  const heroEyebrow =
    (isEn && mapPageContent.hero.eyebrowEn
      ? mapPageContent.hero.eyebrowEn
      : mapPageContent.hero.eyebrow) || t.map.heroEyebrow;

  const heroImage = mapPageContent.hero.heroImage || "/Hero_Image.jpg";

  // Dynamic Localized Intro Content from CMS
  const showIntro = mapPageContent.intro?.showIntro ?? true;
  const introBadge =
    (isEn && mapPageContent.intro?.badgeEn
      ? mapPageContent.intro.badgeEn
      : mapPageContent.intro?.badge) || t.map.editorialTag;

  const introHeading =
    isEn && mapPageContent.intro?.headingEn
      ? mapPageContent.intro.headingEn
      : mapPageContent.intro?.heading;

  const introText =
    isEn && mapPageContent.intro?.textEn
      ? mapPageContent.intro.textEn
      : mapPageContent.intro?.text;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Dynamic Hero Banner from CMS */}
      <PageHero
        title={heroTitle}
        description={heroSubtitle}
        eyebrow={heroEyebrow}
        backgroundImage={heroImage}
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-8 pt-2">
        {/* 2. Editorial Intro Card from CMS */}
        {showIntro && (introHeading || introText) && (
          <div className="p-6 sm:p-7 rounded-2xl bg-surface border border-border/80 border-l-4 border-l-azg shadow-card relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                {introBadge && (
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-azg font-bold px-2 py-0.5 rounded bg-surface-2 border border-border inline-block">
                    {introBadge}
                  </span>
                )}
                {introHeading && (
                  <h2 className="font-bebas text-2xl sm:text-3xl text-text m-0 tracking-wide">
                    {introHeading}
                  </h2>
                )}
                {introText && (
                  <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
                    {introText}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0 pt-2 sm:pt-0">
                <Link
                  href="/grounds"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs font-mono text-text hover:text-accent hover:border-accent/40 transition-all shadow-sm"
                >
                  <Compass className="w-4 h-4 text-azg" />
                  <span>{t.map.viewGroundsList}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. Interactive Stadium Map */}
        <div className="space-y-3">
          <StadiumMap grounds={grounds} />
        </div>
      </div>
    </div>
  );
}
