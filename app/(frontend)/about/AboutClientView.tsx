"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { GoalCard } from "@/components/about/GoalCard";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Goal } from "@/types";

export interface AboutClientViewProps {
  goals: Goal[];
}

export function AboutClientView({ goals }: AboutClientViewProps) {
  const { t, lang } = useTranslation();

  return (
    <div>
      <PageHero
        title={t.about.heroTitle}
        description={t.about.heroSubtitle}
        eyebrow={t.about.heroEyebrow}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[70px] space-y-16">
        {/* About Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-[40px] items-start">
          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://picsum.photos/seed/groundhopper-main/700/500"
              alt="Portret op een tribune"
              className="col-span-2 w-full h-[260px] object-cover rounded-xl border border-border shadow-card"
            />
            <img
              src="https://picsum.photos/seed/groundhopper-2/400/300"
              alt="Bij een stadionpoort"
              className="w-full h-[140px] object-cover rounded-lg border border-border shadow-card"
            />
            <img
              src="https://picsum.photos/seed/groundhopper-3/400/300"
              alt="Met sjaal op de tribune"
              className="w-full h-[140px] object-cover rounded-lg border border-border shadow-card"
            />
          </div>

          <div className="space-y-4">
            <h2 className="font-bebas text-[34px] text-text m-0">{t.about.bioTitle}</h2>

            {lang === "en" && (
              <div className="font-mono text-[11px] text-azg uppercase tracking-[0.06em] bg-surface-2 border border-border px-3 py-1.5 rounded-md inline-block mb-1">
                {t.common.originalDutchNotice}
              </div>
            )}

            <p className="font-inter text-[15px] text-text-muted leading-[1.75] m-0">
              {t.about.bioParagraph1}
            </p>
            <p className="font-inter text-[15px] text-text-muted leading-[1.75] m-0">
              {t.about.bioParagraph2}
            </p>
          </div>
        </div>

        {/* Goals Section */}
        <section>
          <div className="mb-[26px] pb-[16px] border-b border-border">
            <h2 className="font-bebas text-[34px] leading-tight text-text m-0">
              {t.about.goalsTitle}
            </h2>
            <p className="font-inter text-[13.5px] text-text-muted m-0">
              {t.about.goalsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} href={`/about/goals/${goal.id}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
