"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { ScarfCategoryChooser } from "@/components/scarves/ScarfCategoryChooser";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Scarf, ScarvesPageContent } from "@/types";
import { Medal, ShieldCheck, Flag } from "lucide-react";

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
  const specialEditionsTitle = isEn
    ? categories?.specialEditionsTitleEn
    : categories?.specialEditionsTitle;
  const specialEditionsDesc = isEn
    ? categories?.specialEditionsDescEn
    : categories?.specialEditionsDesc;
  const matchdaysTitle = isEn
    ? categories?.matchdaysTitleEn
    : categories?.matchdaysTitle;
  const matchdaysDesc = isEn
    ? categories?.matchdaysDescEn
    : categories?.matchdaysDesc;

  // Dynamic Live Stats
  const showStats = scarvesPageContent.stats?.showStats ?? true;
  const stats = React.useMemo(() => {
    const newCount = scarves.filter((s) => s.category === "new").length;
    const secondhandCount = scarves.filter(
      (s) => s.category === "secondhand"
    ).length;
    const specialEditionsCount = scarves.filter(
      (s) => s.category === "special-editions"
    ).length;
    const matchdaysCount = scarves.filter(
      (s) => s.category === "matchdays"
    ).length;
    const clubsCount = new Set(scarves.map((s) => s.club).filter(Boolean)).size;
    const countriesCount = new Set(
      scarves.map((s) => s.country).filter(Boolean)
    ).size;

    return {
      totalCount: scarves.length,
      newCount,
      secondhandCount,
      specialEditionsCount,
      matchdaysCount,
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-stretch">
            {/* 1. Total Scarves (Gold/Orange accent) */}
            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3.5 h-full">
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 dark:border-amber-500/30 flex items-center justify-center shrink-0">
                <Medal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="font-bebas text-2xl sm:text-3xl text-text leading-none shrink-0">
                  {stats.totalCount}
                </span>
                <span className="font-mono text-xs sm:text-[13px] text-text-muted uppercase tracking-wider font-semibold truncate">
                  {isEn ? "Scarves" : "Sjaals"}
                </span>
              </div>
            </div>

            {/* 2. Clubs Represented (Blue accent) */}
            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3.5 h-full">
              <div className="w-11 h-11 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="font-bebas text-2xl sm:text-3xl text-text leading-none shrink-0">
                  {stats.clubsCount}
                </span>
                <span className="font-mono text-xs sm:text-[13px] text-text-muted uppercase tracking-wider font-semibold truncate">
                  {isEn ? "Clubs" : "Clubs"}
                </span>
              </div>
            </div>

            {/* 3. Countries (Green accent) */}
            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3.5 h-full">
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                <Flag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="font-bebas text-2xl sm:text-3xl text-text leading-none shrink-0">
                  {stats.countriesCount}
                </span>
                <span className="font-mono text-xs sm:text-[13px] text-text-muted uppercase tracking-wider font-semibold truncate">
                  {isEn ? "Countries" : "Landen"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Editorial Intro Card from CMS */}
        {showIntro && (introHeading || introText) && (
          <div className="p-6 sm:p-7 rounded-2xl bg-surface border border-border/80 border-l-4 border-l-accent shadow-card relative overflow-hidden">
            <div className="space-y-2 max-w-3xl">
              {introBadge && (
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-text font-bold px-2 py-0.5 rounded bg-surface-2 border border-border inline-block">
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
          specialEditionsTitle={specialEditionsTitle}
          specialEditionsDesc={specialEditionsDesc}
          matchdaysTitle={matchdaysTitle}
          matchdaysDesc={matchdaysDesc}
          newCount={stats.newCount}
          secondhandCount={stats.secondhandCount}
          specialEditionsCount={stats.specialEditionsCount}
          matchdaysCount={stats.matchdaysCount}
        />
      </div>
    </div>
  );
}
