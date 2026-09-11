"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { ScarfCategoryChooser } from "@/components/scarves/ScarfCategoryChooser";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Scarf, ScarvesPageContent } from "@/types";
import { ScarfIcon, ClubBadgeIcon } from "@/components/ui/Icons";
import { Flag } from "lucide-react";

export interface ScarvesClientViewProps {
  scarves: Scarf[];
  scarvesPageContent: ScarvesPageContent;
}

export function ScarvesClientView({
  scarves,
  scarvesPageContent,
}: ScarvesClientViewProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  // Dynamic Localized Hero Content from CMS
  const heroTitle =
    (isEn && scarvesPageContent.hero.titleEn
      ? scarvesPageContent.hero.titleEn
      : scarvesPageContent.hero.title) || t.scarves.heroTitle;

  const heroSubtitle =
    (isEn && scarvesPageContent.hero.subtitleEn
      ? scarvesPageContent.hero.subtitleEn
      : scarvesPageContent.hero.subtitle) || t.scarves.heroSubtitle;

  const heroEyebrow =
    (isEn && scarvesPageContent.hero.eyebrowEn
      ? scarvesPageContent.hero.eyebrowEn
      : scarvesPageContent.hero.eyebrow) || t.scarves.heroEyebrow;

  const heroImage = scarvesPageContent.hero.heroImage || "/Hero_Image.jpg";

  // Dynamic Localized Intro Content from CMS
  const showIntro = scarvesPageContent.intro?.showIntro ?? true;
  const introBadge = isEn
    ? scarvesPageContent.intro?.badgeEn
    : scarvesPageContent.intro?.badge;
  const introHeading = isEn
    ? scarvesPageContent.intro?.headingEn
    : scarvesPageContent.intro?.heading;
  const introText = isEn
    ? scarvesPageContent.intro?.textEn
    : scarvesPageContent.intro?.text;

  // Category Overrides from CMS
  const categories = scarvesPageContent.categories;
  const newTitle = isEn ? categories?.newTitleEn : categories?.newTitle;
  const newDesc = isEn ? categories?.newDescEn : categories?.newDesc;
  const secondhandTitle = isEn
    ? categories?.secondhandTitleEn
    : categories?.secondhandTitle;
  const secondhandDesc = isEn
    ? categories?.secondhandDescEn
    : categories?.secondhandDesc;

  // Dynamic Live Stats
  const showStats = scarvesPageContent.stats?.showStats ?? true;
  const stats = React.useMemo(() => {
    const newCount = scarves.filter((s) => s.category === "new").length;
    const secondhandCount = scarves.filter(
      (s) => s.category === "secondhand"
    ).length;
    const clubsCount = new Set(scarves.map((s) => s.club).filter(Boolean)).size;
    const countriesCount = new Set(
      scarves.map((s) => s.country).filter(Boolean)
    ).size;

    return {
      totalCount: scarves.length,
      newCount,
      secondhandCount,
      clubsCount,
      countriesCount,
    };
  }, [scarves]);

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
        {/* 2. Dynamic Live Stats Ribbon */}
        {showStats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent flex-shrink-0">
                <ScarfIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bebas text-2xl sm:text-3xl text-text leading-none">
                  {stats.totalCount}
                </div>
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                  {isEn ? "Total Scarves" : "Totale Sjaals"}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent flex-shrink-0">
                <ClubBadgeIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bebas text-2xl sm:text-3xl text-text leading-none">
                  {stats.clubsCount}
                </div>
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                  {isEn ? "Clubs Represented" : "Clubs Vertegenwoordigd"}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent-2 flex-shrink-0">
                <Flag className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bebas text-2xl sm:text-3xl text-text leading-none">
                  {stats.countriesCount}
                </div>
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                  {isEn ? "Countries" : "Landen"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Editorial Intro Card from CMS */}
        {showIntro && (introHeading || introText) && (
          <div className="p-6 sm:p-7 rounded-2xl bg-surface border border-border/80 border-l-4 border-l-azg shadow-card relative overflow-hidden">
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
          </div>
        )}

        {/* 4. Category Chooser Grid */}
        <ScarfCategoryChooser
          newTitle={newTitle}
          newDesc={newDesc}
          secondhandTitle={secondhandTitle}
          secondhandDesc={secondhandDesc}
          newCount={stats.newCount}
          secondhandCount={stats.secondhandCount}
        />
      </div>
    </div>
  );
}
