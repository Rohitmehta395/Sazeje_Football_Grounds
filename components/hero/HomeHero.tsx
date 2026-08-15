"use client";

import * as React from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface HeroStat {
  value: string | number;
  label: string;
}

export interface HomeHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  backgroundImage?: string;
  topbarLabel?: string;
  groundsCount?: number;
  countriesCount?: number;
  scarvesCount?: number;
}

export function HomeHero({
  eyebrow,
  title = "SAZEJE FOOTBALL ARCHIVE",
  description,
  backgroundImage = "https://picsum.photos/seed/sazeje-hero/1600/900",
  topbarLabel = "SAZEJE FOOTBALL ARCHIVE • 2024–2026",
  groundsCount = 48,
  countriesCount = 14,
  scarvesCount = 6,
}: HomeHeroProps) {
  const { t } = useTranslation();

  const heroEyebrow = eyebrow || t.home.heroEyebrow;
  const heroDescription = description || t.home.heroSubtitle;

  const stats: HeroStat[] = [
    { value: groundsCount, label: t.home.statsGrounds },
    { value: countriesCount, label: t.home.statsCountries },
    { value: scarvesCount, label: t.home.statsScarves },
  ];

  return (
    <div
      className="relative h-[400px] flex flex-col bg-cover bg-center text-white rounded-b-radius overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(20,25,20,0.1)] to-[rgba(15,18,15,0.72)] z-0" />

      {/* Topbar */}
      <div className="relative z-10 flex justify-between items-center px-[22px] py-[14px] bg-[rgba(15,18,15,0.28)]">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/80">
          {topbarLabel}
        </span>
      </div>

      {/* Hero Content Inner */}
      <div className="relative z-10 px-[24px] pb-[40px] max-w-[1160px] mx-auto w-full flex-1 flex flex-col justify-end">
        {/* Glass Panel */}
        <div className="relative bg-[linear-gradient(155deg,rgba(16,20,17,0.72),rgba(16,20,17,0.42))] backdrop-blur-[16px] border border-white/16 rounded-[18px] pt-[30px] px-[34px] pb-0 max-w-[600px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(85,196,182,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]">
          {/* Corner accent lines */}
          <div className="absolute top-0 left-0 w-[46px] h-[3px] bg-azg" />
          <div className="absolute top-0 left-0 w-[3px] h-[46px] bg-azg" />

          <div className="font-mono text-[13px] tracking-[0.15em] uppercase text-azg">
            {heroEyebrow}
          </div>
          <h1 className="font-bebas text-[clamp(32px,5vw,56px)] leading-[1.05] my-[6px] text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.4)]">
            {title}
          </h1>
          <p className="font-inter text-[15px] text-white/88 m-0 max-w-[560px]">
            {heroDescription}
          </p>

          <div className="h-[1px] bg-gradient-to-r from-white/22 to-transparent mt-[26px]" />

          {/* Stats Row */}
          <div className="flex flex-wrap gap-0">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`font-mono flex-1 py-[16px] pr-[22px] pb-[22px] pl-[22px] border-l border-white/14 first:border-l-0 first:pl-0`}
              >
                <b className="block text-[24px] text-white font-mono leading-none mb-1">
                  {stat.value}
                </b>
                <span className="text-[11px] uppercase tracking-[0.1em] text-white/70 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
