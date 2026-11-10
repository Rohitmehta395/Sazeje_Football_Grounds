"use client";

import * as React from "react";
import { Scarf } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName, resolveScarfLeagueAndFlag } from "@/lib/data/countries";
import { StadiumIcon, ClubBadgeIcon } from "@/components/ui/Icons";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { Calendar, Trophy, MapPin, Clock, Tag, Maximize2 } from "lucide-react";

export interface ScarfCardProps {
  scarf: Scarf;
  onOpenLightbox?: (scarf: Scarf) => void;
}

export function ScarfCard({ scarf, onOpenLightbox }: ScarfCardProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  const countryDisplayName = getCountryDisplayName(scarf.country, lang);
  const displayDescription =
    (isEn && scarf.descriptionEn ? scarf.descriptionEn : scarf.description) || scarf.description;
  const displayType =
    (isEn && scarf.typeEn ? scarf.typeEn : scarf.type) || scarf.type;
  const displayTrophies =
    (isEn && scarf.trophiesEn ? scarf.trophiesEn : scarf.trophies) || scarf.trophies;
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
    <div
      className="group bg-surface rounded-2xl border border-border/80 hover:border-text-muted/40 hover:shadow-lg transition-all duration-300 overflow-hidden shadow-card flex flex-col justify-between relative h-full"
    >

      <div>
        {/* 1. Scarf Photo Banner with Ambient Blurred Background and Click to Expand */}
        <div className="relative w-full aspect-[21/8] bg-surface-2 overflow-hidden border-b border-border/80">
          {scarf.photo ? (
            <>
              {/* Ambient blurred backdrop so letterboxing blends seamlessly */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${scarf.photo})` }}
                aria-hidden="true"
              />

              {/* Crisp foreground image: fitted with object-contain to preserve full width, with border radius */}
              <div className="relative z-[1] w-full h-full flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scarf.photo}
                  alt={`${scarf.club} scarf`}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.03] cursor-pointer"
                  onClick={() => onOpenLightbox?.(scarf)}
                />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-text-muted">
              No scarf photo
            </div>
          )}

          {/* Quick Inspect Button */}
          {scarf.photo && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox?.(scarf);
                }}
                className="w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-md"
                title={isEn ? "Inspect photo in full screen" : "Vergroot foto op volledig scherm"}
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* 2. Card Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Header: Club Identity (Logo + Name) & Country Flag Tag */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3.5">
                {scarf.clubLogo ? (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surface border border-border/80 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
                <h3 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide group-hover:text-accent transition-colors leading-tight truncate">
                  {scarf.club}
                </h3>
              </div>

              {/* League & Country Flag under Club Identity (only when leagueName is present) */}
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
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-xs font-inter font-medium text-text shrink-0 shadow-xs">
              <CountryFlag
                countryName={scarf.country}
                customFlagUrl={scarf.countryFlag}
                className="w-4 h-3 object-cover rounded-[2px] shadow-2xs shrink-0"
                fallbackToEmoji={false}
              />
              <span>{countryDisplayName}</span>
            </span>
          </div>

          {/* Details Rows: Seven Vertically Stacked Items in Exact Order (no capacity, no empty fields) */}
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
      </div>

      {/* 3. Card Footer Action Bar */}
      <div className="px-4 sm:px-5 py-3 border-t border-border/60 bg-surface-2/30 flex items-center justify-between gap-3">
        {scarf.category === "secondhand" ? (
          <>
            <div className="font-mono text-[11px] text-text-muted">
              <span className="text-text font-semibold">
                {isEn ? "Vintage & Secondhand" : "Vintage & Tweedehands"}
              </span>
            </div>

            {scarf.photo && (
              <button
                type="button"
                onClick={() => onOpenLightbox?.(scarf)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isEn ? "View Photo" : "Vergroot"}</span>
              </button>
            )}
          </>
        ) : scarf.category === "special-editions" ? (
          <>
            <div className="font-mono text-[11px] text-text-muted">
              <span className="text-text font-semibold">
                {isEn ? "Special Collector Edition" : "Speciale Verzamelaarseditie"}
              </span>
            </div>

            {scarf.photo && (
              <button
                type="button"
                onClick={() => onOpenLightbox?.(scarf)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isEn ? "View Photo" : "Vergroot"}</span>
              </button>
            )}
          </>
        ) : scarf.category === "matchdays" ? (
          <>
            <div className="font-mono text-[11px] text-text-muted">
              <span className="text-text font-semibold">
                {isEn ? "Official Matchday Edition" : "Officiële Wedstrijdeditie"}
              </span>
            </div>

            {scarf.photo && (
              <button
                type="button"
                onClick={() => onOpenLightbox?.(scarf)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isEn ? "View Photo" : "Vergroot"}</span>
              </button>
            )}
          </>
        ) : (
          <>
            <div className="font-mono text-[11px] text-text-muted">
              <span className="text-text font-semibold">
                {isEn ? "Matchday Acquisition" : "Matchday Aankoop"}
              </span>
            </div>

            {scarf.photo && (
              <button
                type="button"
                onClick={() => onOpenLightbox?.(scarf)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isEn ? "View Photo" : "Vergroot"}</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { ScarfCardSkeleton, ScarvesGridSkeleton } from "@/components/ui/CardSkeleton";
