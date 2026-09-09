"use client";

import * as React from "react";
import Link from "next/link";
import { Scarf } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import { formatDate } from "@/lib/utils/formatDate";
import { ArrowRight, Building2, Calendar, Trophy } from "lucide-react";
import { ScarfIcon } from "@/components/ui/Icons";

export interface HomeScarvesSectionProps {
  scarves: Scarf[];
}

export function HomeScarvesSection({ scarves }: HomeScarvesSectionProps) {
  const { t, lang } = useTranslation();
  const [activeCategory, setActiveCategory] = React.useState<"all" | "new" | "secondhand">("all");

  const filteredScarves = React.useMemo(() => {
    if (activeCategory === "all") return scarves.slice(0, 3);
    return scarves.filter((s) => s.category === activeCategory).slice(0, 3);
  }, [scarves, activeCategory]);

  return (
    <section id="scarves-section" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-azg font-semibold flex items-center gap-1.5 mb-1.5">
            <ScarfIcon className="w-3.5 h-3.5 text-accent-2" />
            <span>SJAALCOLLECTIE ARCHIEF</span>
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
      </div>

      {/* Scarves Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScarves.map((scarf) => {
          const countryDisplay = getCountryDisplayName(scarf.country, lang);
          const isNew = scarf.category === "new";

          return (
            <article
              key={scarf.id}
              className="bg-surface border border-border rounded-2xl overflow-hidden shadow-card flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Photo Banner */}
              <div
                className="h-44 bg-cover bg-center relative bg-surface-2 overflow-hidden"
                style={{
                  backgroundImage: `url('${scarf.photo || "/placeholder-scarf.jpg"}')`,
                }}
                role="img"
                aria-label={`Foto van sjaal ${scarf.club}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold shadow-sm backdrop-blur-md ${
                      isNew
                        ? "bg-emerald-900/80 text-emerald-200 border border-emerald-500/30"
                        : "bg-amber-900/80 text-amber-200 border border-amber-500/30"
                    }`}
                  >
                    {isNew ? "Nieuw" : "Vintage"}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-mono text-white/90 bg-black/50 backdrop-blur-md border border-white/20">
                  {countryDisplay}
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-xs font-mono text-white/90 truncate">
                  {scarf.type}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bebas text-2xl text-text m-0 group-hover:text-accent transition-colors leading-tight">
                    {scarf.club}
                  </h3>

                  {scarf.description && (
                    <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed italic">
                      &quot;{scarf.description}&quot;
                    </p>
                  )}

                  {/* Metadata Specs */}
                  <div className="mt-4 pt-3 border-t border-dashed border-border/80 space-y-2 text-xs">
                    {scarf.stadium && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-azg" />
                          <span>{t.scarves.stadium}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {scarf.stadium}
                        </span>
                      </div>
                    )}

                    {scarf.trophies && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-accent-2" />
                          <span>{t.scarves.trophies}</span>
                        </span>
                        <span className="text-right truncate max-w-[170px] font-mono text-[11px]">
                          {scarf.trophies}
                        </span>
                      </div>
                    )}

                    {scarf.purchaseDate && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span>{t.scarves.purchaseDate}</span>
                        </span>
                        <span className="font-mono font-semibold text-accent">
                          {formatDate(scarf.purchaseDate, lang)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-text-muted uppercase text-[10px] tracking-wider">
                    Log #{scarf.id}
                  </span>
                  <Link
                    href={`/scarves?country=${encodeURIComponent(scarf.country)}`}
                    className="inline-flex items-center gap-1 font-semibold text-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Bekijk in Collectie</span>
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
