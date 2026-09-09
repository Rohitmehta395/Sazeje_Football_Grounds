"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ArrowRight, Compass, Heart, Layers, Quote } from "lucide-react";

export function HomeStorySection() {
  const { t } = useTranslation();

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface via-surface to-surface-2 border border-border p-8 sm:p-12 shadow-card">
      {/* Decorative subtle football pitch lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-azg/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-2/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-azg text-xs font-mono uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-accent-2" />
            <span>{t.home.storySectionEyebrow}</span>
          </div>

          <h2 className="font-bebas text-3xl sm:text-5xl text-text tracking-wide m-0">
            {t.home.storySectionTitle}
          </h2>

          {/* Editorial Quote */}
          <div className="relative mt-6 max-w-2xl mx-auto">
            <Quote className="w-8 h-8 text-azg/30 absolute -top-4 -left-4 -scale-x-100 hidden sm:block" />
            <p className="font-inter text-base sm:text-lg text-text-muted italic leading-relaxed m-0 px-2 sm:px-6">
              &quot;{t.home.storyQuote}&quot;
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/80">
          <div className="bg-surface/80 dark:bg-surface/50 p-6 rounded-2xl border border-border/70 shadow-sm flex flex-col justify-between hover:border-azg/50 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-azg/10 text-azg flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bebas text-xl text-text m-0 mb-2">
                {t.home.storyPillar1Title}
              </h3>
              <p className="font-inter text-xs sm:text-sm text-text-muted leading-relaxed m-0">
                {t.home.storyPillar1Desc}
              </p>
            </div>
          </div>

          <div className="bg-surface/80 dark:bg-surface/50 p-6 rounded-2xl border border-border/70 shadow-sm flex flex-col justify-between hover:border-azg/50 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-2/15 text-accent-2 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bebas text-xl text-text m-0 mb-2">
                {t.home.storyPillar2Title}
              </h3>
              <p className="font-inter text-xs sm:text-sm text-text-muted leading-relaxed m-0">
                {t.home.storyPillar2Desc}
              </p>
            </div>
          </div>

          <div className="bg-surface/80 dark:bg-surface/50 p-6 rounded-2xl border border-border/70 shadow-sm flex flex-col justify-between hover:border-azg/50 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bebas text-xl text-text m-0 mb-2">
                {t.home.storyPillar3Title}
              </h3>
              <p className="font-inter text-xs sm:text-sm text-text-muted leading-relaxed m-0">
                {t.home.storyPillar3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Read more link */}
        <div className="text-center mt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-2 hover:bg-border text-text font-semibold text-sm transition-all border border-border hover:shadow-sm"
          >
            <span>{t.home.storyReadMore}</span>
            <ArrowRight className="w-4 h-4 text-azg" />
          </Link>
        </div>
      </div>
    </section>
  );
}
