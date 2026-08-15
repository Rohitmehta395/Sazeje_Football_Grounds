"use client";

import * as React from "react";
import Link from "next/link";
import { HomeHero } from "@/components/hero/HomeHero";
import { GroundCard } from "@/components/grounds/GroundCard";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Ground } from "@/types";

export interface HomeClientViewProps {
  grounds: Ground[];
  latestGrounds: Ground[];
}

export function HomeClientView({ grounds, latestGrounds }: HomeClientViewProps) {
  const { t } = useTranslation();

  const groundsCount = grounds.length;
  const countriesCount = new Set(grounds.map((g) => g.country)).size;
  const competitionsCount = new Set(grounds.map((g) => g.competition)).size;

  return (
    <div>
      {/* Hero with computed live stats */}
      <HomeHero
        groundsCount={groundsCount}
        countriesCount={countriesCount}
        competitionsCount={competitionsCount}
      />

      {/* Main Content Wrap */}
      <div className="max-w-[1160px] mx-auto px-[24px] py-[40px] space-y-12">
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-[26px] pb-[16px] border-b border-border">
            <div>
              <h2 className="font-bebas text-[34px] leading-tight text-text m-0">
                {t.home.recentGroundsTitle}
              </h2>
              <p className="font-inter text-[13.5px] text-text-muted m-0">
                {t.home.recentGroundsSubtitle}
              </p>
            </div>
            <Link
              href="/grounds"
              className="font-semibold text-[14px] text-accent hover:underline flex items-center gap-1"
            >
              {t.home.viewAllGrounds}
            </Link>
          </div>

          {/* Grounds Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
            {latestGrounds.map((ground) => (
              <GroundCard key={ground.id} ground={ground} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
