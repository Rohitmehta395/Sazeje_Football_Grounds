"use client";

import * as React from "react";
import Link from "next/link";
import { Scarf } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName, resolveScarfLeagueAndFlag } from "@/lib/data/countries";
import { ArrowRight, Trophy, Calendar, MapPin, Clock, Tag } from "lucide-react";
import { ClubBadgeIcon, StadiumIcon, ScarfIcon } from "@/components/ui/Icons";
import { CountryFlag } from "@/components/ui/CountryFlag";

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
          const displayTrophies =
            lang === "en" && scarf.trophiesEn ? scarf.trophiesEn : scarf.trophies;

          const { flag: leagueFlag, leagueName } = resolveScarfLeagueAndFlag(
            scarf.league,
            scarf.countryFlag,
            scarf.country
          );

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

                <div className="absolute top-3 right-3 z-[3] px-2.5 py-1 rounded-full text-[11px] font-mono text-white/90 bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <CountryFlag
                    countryName={scarf.country}
                    customFlagUrl={scarf.countryFlag}
                    className="w-4 h-3 object-cover rounded-[2px] shadow-2xs shrink-0"
                    fallbackToEmoji={false}
                  />
                  <span>{countryDisplay}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* 1. Club Identity: Larger Logo + Club Name side by side */}
                  <div className="flex items-center gap-3.5">
                    {scarf.clubLogo ? (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface border border-border/80 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                        <img
                          src={scarf.clubLogo}
                          alt={`${scarf.club} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-soft border border-accent/30 flex items-center justify-center text-accent shrink-0">
                        <ClubBadgeIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                    )}
                    <h3 className="font-bebas text-3xl sm:text-4xl text-text m-0 group-hover:text-accent transition-colors leading-tight truncate tracking-wide">
                      {scarf.club}
                    </h3>
                  </div>

                  {/* 2. League and Country Flag Information (only displayed when leagueName is present) */}
                  {Boolean(leagueName && leagueName.trim()) && (
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-[13px] text-text-muted mt-2 font-medium">
                      <CountryFlag
                        countryName={scarf.country}
                        customFlagUrl={scarf.countryFlag}
                        className="w-4 h-3 object-cover rounded-[2px] shadow-2xs shrink-0"
                        fallbackToEmoji={false}
                      />
                      <span className="truncate">{leagueName}</span>
                    </div>
                  )}

                  {/* 3. Seven Vertically Stacked Details Rows in Exact Order */}
                  <div className="mt-4 pt-3.5 border-t border-dashed border-border/80 space-y-2 text-xs">
                    {/* 1. League Name */}
                    {Boolean(leagueName && leagueName.trim()) && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{isEn ? "League" : "Competitie"}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {leagueName}
                        </span>
                      </div>
                    )}

                    {/* 2. Stadium */}
                    {Boolean(scarf.stadium && scarf.stadium.trim()) && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <StadiumIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{t.scarves.stadium}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {scarf.stadium}
                        </span>
                      </div>
                    )}

                    {/* 3. Town */}
                    {Boolean(scarf.town && scarf.town.trim()) && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{isEn ? "Town" : "Stad"}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {scarf.town}
                        </span>
                      </div>
                    )}

                    {/* 4. Founded */}
                    {Boolean(scarf.founded && scarf.founded.trim()) && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{t.scarves.founded}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {scarf.founded}
                        </span>
                      </div>
                    )}

                    {/* 5. Prizes */}
                    {Boolean(displayTrophies && displayTrophies.trim()) && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{isEn ? "Prizes" : "Prijzenkast"}</span>
                        </span>
                        <span className="text-right truncate max-w-[170px] font-mono text-[11px] font-medium">
                          {displayTrophies}
                        </span>
                      </div>
                    )}

                    {/* 6. Seasons in Top Division */}
                    {Boolean(scarf.seasonsInTopDivision && scarf.seasonsInTopDivision.trim()) && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{isEn ? "Seasons in Top Division" : "Seizoenen op hoogste niveau"}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {scarf.seasonsInTopDivision}
                        </span>
                      </div>
                    )}

                    {/* 7. Category */}
                    {Boolean((scarf.clubCategory && scarf.clubCategory.trim()) || categoryBadge) && (
                      <div className="flex items-center justify-between text-text">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span>{isEn ? "Category" : "Categorie"}</span>
                        </span>
                        <span className="font-mono text-right truncate max-w-[170px] font-medium">
                          {scarf.clubCategory || categoryBadge}
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
