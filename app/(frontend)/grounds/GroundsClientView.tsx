"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { GroundsView } from "./GroundsView";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Ground, GroundsPageContent } from "@/types";
import { Flag, Trophy } from "lucide-react";
import { StadiumIcon, ClubBadgeIcon } from "@/components/ui/Icons";

export interface GroundsClientViewProps {
  grounds: Ground[];
  groundsPageContent: GroundsPageContent;
}

export function GroundsClientView({
  grounds,
  groundsPageContent,
}: GroundsClientViewProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  // Dynamic Localized Hero Content
  const heroTitle =
    (isEn && groundsPageContent.hero.titleEn
      ? groundsPageContent.hero.titleEn
      : groundsPageContent.hero.title) || t.grounds.heroTitle;

  const heroSubtitle =
    (isEn && groundsPageContent.hero.subtitleEn
      ? groundsPageContent.hero.subtitleEn
      : groundsPageContent.hero.subtitle) || t.grounds.heroSubtitle;

  const heroEyebrow =
    (isEn && groundsPageContent.hero.eyebrowEn
      ? groundsPageContent.hero.eyebrowEn
      : groundsPageContent.hero.eyebrow) || t.grounds.heroEyebrow;

  const heroImage = groundsPageContent.hero.heroImage || "/Hero_Image.jpg";

  // Dynamic Localized Intro Content
  const showIntro = groundsPageContent.intro?.showIntro ?? true;
  const introBadge =
    (isEn && groundsPageContent.intro?.badgeEn
      ? groundsPageContent.intro.badgeEn
      : groundsPageContent.intro?.badge) || t.grounds.editorialTag;

  const introHeading =
    isEn && groundsPageContent.intro?.headingEn
      ? groundsPageContent.intro.headingEn
      : groundsPageContent.intro?.heading;

  const introText =
    isEn && groundsPageContent.intro?.textEn
      ? groundsPageContent.intro.textEn
      : groundsPageContent.intro?.text;

  // Dynamic Stats
  const showStats = groundsPageContent.stats?.showStats ?? true;
  const stats = React.useMemo(() => {
    const countriesCount = new Set(
      grounds.map((g) => g.country).filter(Boolean)
    ).size;
    const competitionsCount = new Set(
      grounds.map((g) => g.competition).filter(Boolean)
    ).size;
    const clubsCount = new Set(
      grounds.map((g) => g.club).filter(Boolean)
    ).size;

    return {
      groundsCount: grounds.length,
      countriesCount,
      competitionsCount,
      clubsCount,
    };
  }, [grounds]);

  return (
    <div className="space-y-8 pb-16">
      <PageHero
        title={heroTitle}
        description={heroSubtitle}
        eyebrow={heroEyebrow}
        backgroundImage={heroImage}
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-8 pt-2">
        {/* Dynamic Live Stats Bar */}
        {showStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent flex-shrink-0">
                <StadiumIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bebas text-2xl sm:text-3xl text-text leading-none">
                  {stats.groundsCount}
                </div>
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                  {t.grounds.statGrounds}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-azg flex-shrink-0">
                <Flag className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bebas text-2xl sm:text-3xl text-text leading-none">
                  {stats.countriesCount}
                </div>
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                  {t.grounds.statCountries}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border/80 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent-2 flex-shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bebas text-2xl sm:text-3xl text-text leading-none">
                  {stats.competitionsCount}
                </div>
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                  {t.grounds.statCompetitions}
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
                  {t.grounds.statClubs}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Note Section (Optional / Configurable via CMS) */}
        {showIntro && (introHeading || introText) && (
          <div className="p-5 sm:p-6 rounded-xl bg-surface border border-border border-l-4 border-l-azg shadow-card">
            {introBadge && (
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-azg mb-1 font-semibold">
                {introBadge}
              </div>
            )}
            {introHeading && (
              <h2 className="font-bebas text-xl sm:text-2xl text-text tracking-wide mb-2">
                {introHeading}
              </h2>
            )}
            {introText && (
              <p className="font-inter text-sm sm:text-[14.5px] text-text-muted leading-relaxed max-w-4xl m-0">
                {introText}
              </p>
            )}
          </div>
        )}

        {/* Stadiums Filter & Grid */}
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
