"use client";

import * as React from "react";
import Link from "next/link";
import { Scarf } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import { ArrowRight, Building2, Trophy } from "lucide-react";
import { ScarfIcon } from "@/components/ui/Icons";

export interface HomeScarvesSectionProps {
  scarves: Scarf[];
}

export function HomeScarvesSection({ scarves }: HomeScarvesSectionProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
  const [activeCategory, setActiveCategory] = React.useState<
    "all" | "new" | "secondhand" | "special-editions" | "matchdays"
  >("all");

  const filteredScarves = React.useMemo(() => {
    if (activeCategory === "all") return scarves.slice(0, 3);
    return scarves.filter((s) => s.category === activeCategory).slice(0, 3);
  }, [scarves, activeCategory]);

  return (
    <section id="scarves-section" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-1.5 mb-1.5">
            <ScarfIcon className="w-3.5 h-3.5 text-accent" />
            <span>{t.home.scarvesArchive}</span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
            {t.home.featuredScarvesTitle}
          </h2>
          <p className="font-inter text-sm text-text-muted m-0 mt-1 max-w-2xl">
            {t.home.featuredScarvesSubtitle}
          </p>
        </div>

        <Link
          href="/scarves"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 hover:underline shrink-0"
        >
          <span>{t.home.viewAllScarves}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 shrink-0 border ${
            activeCategory === "all"
              ? "bg-text text-bg border-text shadow-sm"
              : "bg-surface text-text-muted hover:text-text border-border"
          }`}
        >
          {t.home.scarvesTabAll} ({scarves.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("new")}
          className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 shrink-0 border ${
            activeCategory === "new"
              ? "bg-text text-bg border-text shadow-sm"
              : "bg-surface text-text-muted hover:text-text border-border"
          }`}
        >
          {t.home.scarvesTabNew} (
          {scarves.filter((s) => s.category === "new").length})
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("secondhand")}
          className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 shrink-0 border ${
            activeCategory === "secondhand"
              ? "bg-text text-bg border-text shadow-sm"
              : "bg-surface text-text-muted hover:text-text border-border"
          }`}
        >
          {t.home.scarvesTabSecondhand} (
          {scarves.filter((s) => s.category === "secondhand").length})
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("special-editions")}
          className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 shrink-0 border ${
            activeCategory === "special-editions"
              ? "bg-text text-bg border-text shadow-sm"
              : "bg-surface text-text-muted hover:text-text border-border"
          }`}
        >
          {t.home.scarvesTabSpecialEditions} (
          {scarves.filter((s) => s.category === "special-editions").length})
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory("matchdays")}
          className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 shrink-0 border ${
            activeCategory === "matchdays"
              ? "bg-text text-bg border-text shadow-sm"
              : "bg-surface text-text-muted hover:text-text border-border"
          }`}
        >
          {t.home.scarvesTabMatchdays} (
          {scarves.filter((s) => s.category === "matchdays").length})
        </button>
      </div>

      {/* Scarves Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScarves.map((scarf) => {
          const countryDisplay = getCountryDisplayName(scarf.country, lang);
          const displayType = lang === "en" && scarf.typeEn ? scarf.typeEn : scarf.type;
          const displayDescription =
            lang === "en" && scarf.descriptionEn ? scarf.descriptionEn : scarf.description;
          const displayTrophies =
            lang === "en" && scarf.trophiesEn ? scarf.trophiesEn : scarf.trophies;

          const categoryBadge =
            scarf.category === "new"
              ? isEn
                ? "New"
                : "Nieuw"
              : scarf.category === "special-editions"
              ? isEn
                ? "Special"
                : "Speciaal"
              : scarf.category === "matchdays"
              ? isEn
                ? "Matchday"
                : "Wedstrijd"
              : "Vintage";

          return (
            <article
              key={scarf.id}
              className="bg-surface border border-border rounded-2xl overflow-hidden shadow-card flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Photo Banner with Ambient Blurred Background */}
              <div
                className="h-44 relative bg-surface-2 overflow-hidden border-b border-border/80"
                role="img"
                aria-label={
                  lang === "en"
                    ? `Photo of ${scarf.club} scarf`
                    : `Foto van sjaal ${scarf.club}`
                }
              >
                {/* Ambient blurred backdrop so letterboxing blends seamlessly */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
                  style={{
                    backgroundImage: `url('${scarf.photo || "/placeholder-scarf.jpg"}')`,
                  }}
                  aria-hidden="true"
                />

                {/* Crisp foreground scarf image: full width with border-radius */}
                <div className="relative z-[1] w-full h-full flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={scarf.photo || "/placeholder-scarf.jpg"}
                    alt={
                      lang === "en"
                        ? `Photo of ${scarf.club} scarf`
                        : `Foto van sjaal ${scarf.club}`
                    }
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-3 left-3 z-[3] flex items-center gap-1.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold shadow-sm backdrop-blur-md bg-black/60 text-white/90 border border-white/20"
                  >
                    {categoryBadge}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-[3] px-2.5 py-1 rounded-full text-[11px] font-mono text-white/90 bg-black/50 backdrop-blur-md border border-white/20">
                  {countryDisplay}
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 z-[3] text-xs font-mono text-white/90 truncate">
                  {displayType}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bebas text-2xl text-text m-0 group-hover:text-accent transition-colors leading-tight">
                    {scarf.club}
                  </h3>

                  {displayDescription && (
                    <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed italic">
                      &quot;{displayDescription}&quot;
                    </p>
                  )}

                  {/* Metadata Specs */}
                  <div className="mt-4 pt-3 border-t border-dashed border-border/80 space-y-2 text-xs">
                    {scarf.stadium && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-text-muted" />
                          <span>{t.scarves.stadium}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {scarf.stadium}
                        </span>
                      </div>
                    )}

                    {displayTrophies && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-text-muted" />
                          <span>{t.scarves.trophies}</span>
                        </span>
                        <span className="text-right truncate max-w-[170px] font-mono text-[11px]">
                          {displayTrophies}
                        </span>
                      </div>
                    )}

                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-end text-xs">
                  <Link
                    href={`/scarves/${scarf.category}/${encodeURIComponent(scarf.country)}`}
                    className="inline-flex items-center gap-1 font-semibold text-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{t.home.viewInCollection}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
