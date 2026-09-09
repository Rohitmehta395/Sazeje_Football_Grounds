"use client";

import * as React from "react";
import Link from "next/link";
import { Ground } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { StadiumMap } from "@/components/map/StadiumMap";
import { ArrowRight, MapPin, Navigation } from "lucide-react";

export interface HomeMapSectionProps {
  grounds: Ground[];
}

export function HomeMapSection({ grounds }: HomeMapSectionProps) {
  const { t } = useTranslation();
  const countriesCount = new Set(grounds.map((g) => g.country)).size;

  return (
    <section id="map-section" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-azg font-semibold flex items-center gap-1.5 mb-1.5">
            <Navigation className="w-3.5 h-3.5" />
            {t.home.mapSectionEyebrow}
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
            {t.home.mapSectionTitle}
          </h2>
          <p className="font-inter text-sm text-text-muted m-0 mt-1 max-w-2xl">
            {t.home.mapSectionSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-mono text-text-muted">
            <MapPin className="w-3.5 h-3.5 text-azg" />
            <span>{grounds.length} Stadions • {countriesCount} Landen</span>
          </div>
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 hover:underline shrink-0"
          >
            <span>{t.home.mapSectionCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Embedded Interactive Map Card */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-surface shadow-card">
        <StadiumMap grounds={grounds} className="h-[460px] sm:h-[500px] w-full border-0 rounded-none" />
      </div>
    </section>
  );
}
