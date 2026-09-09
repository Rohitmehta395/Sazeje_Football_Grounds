"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  ArrowRight,
  Flag,
  Trophy,
} from "lucide-react";

// Tailored football groundhopping icons
function FootballPitchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 8.5h2.5v7H3" />
      <path d="M21 8.5h-2.5v7H21" />
    </svg>
  );
}

function ScarfIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="6" width="18" height="5" rx="1.5" />
      <line x1="7" y1="6" x2="7" y2="11" />
      <line x1="12" y1="6" x2="12" y2="11" />
      <line x1="17" y1="6" x2="17" y2="11" />
      <path d="M6 11v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-6" />
      <line x1="6" y1="14.5" x2="11" y2="14.5" />
      <line x1="7.5" y1="18" x2="7.5" y2="20" />
      <line x1="9.5" y1="18" x2="9.5" y2="20" />
    </svg>
  );
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
  activeGoalsCount?: number;
}

export function HomeHero({
  eyebrow,
  title = "SAZEJE FOOTBALL ARCHIVE",
  description,
  backgroundImage = "https://picsum.photos/seed/sazeje-hero/1600/900",
  topbarLabel = "SAZEJE FOOTBALL ARCHIVE • 2024–2026",
  groundsCount = 10,
  countriesCount = 7,
  scarvesCount = 6,
  activeGoalsCount = 8,
}: HomeHeroProps) {
  const { t } = useTranslation();

  const heroEyebrow = eyebrow || t.home.heroEyebrow;
  const heroTitle = title;
  const heroDescription = description || t.home.heroSubtitle;

  const stats = [
    {
      value: groundsCount,
      label: t.home.statsGrounds,
      icon: <FootballPitchIcon className="w-5 h-5 text-azg" />,
    },
    {
      value: countriesCount,
      label: t.home.statsCountries,
      icon: <Flag className="w-5 h-5 text-azg" />,
    },
    {
      value: scarvesCount,
      label: t.home.statsScarves,
      icon: <ScarfIcon className="w-5 h-5 text-accent-2" />,
    },
    {
      value: activeGoalsCount,
      label: t.home.statsNextTarget,
      icon: <Trophy className="w-5 h-5 text-accent" />,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex flex-col justify-between text-white overflow-hidden border-b border-border/40">
      {/* Background Stadium Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      {/* Transparent Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,20,16,0.35)] via-[rgba(15,20,16,0.55)] to-[rgba(15,20,16,0.85)] z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-16 pb-10 w-full flex-1 flex flex-col justify-center">
        {/* Archive Badge Pill */}
        <div className="flex items-center gap-3 mb-5 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono tracking-wider uppercase shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-accent-2" />
            <span>{topbarLabel}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-[820px]">
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-azg font-semibold mb-2">
            {heroEyebrow}
          </div>

          <h1 className="font-bebas text-[clamp(44px,7vw,80px)] leading-[0.95] tracking-wide text-white uppercase m-0 drop-shadow-md">
            {heroTitle}
          </h1>

          <p className="font-inter text-base sm:text-lg text-white/90 mt-4 mb-7 leading-relaxed max-w-[680px] drop-shadow">
            {heroDescription}
          </p>

          {/* Action CTA */}
          <div className="flex items-center gap-3.5">
            <Link
              href="#grounds-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-azg hover:bg-azg/90 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-azg/30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{t.home.heroCtaGrounds}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Stats Dock */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full pb-6">
        <div className="bg-surface/85 dark:bg-surface/90 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl p-4 sm:p-5 text-text grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 pt-3 sm:pt-0 ${
                idx === 0 ? "pt-0" : ""
              } sm:px-4 first:pl-0 last:pr-0`}
            >
              <div className="w-11 h-11 rounded-xl bg-surface-2 border border-border/70 flex items-center justify-center shrink-0 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <div className="font-bebas text-3xl sm:text-4xl text-text leading-none">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
