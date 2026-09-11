"use client";

import * as React from "react";
import Link from "next/link";
import { Scarf } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import { formatDate } from "@/lib/utils/formatDate";
import { StadiumIcon, OfficialScarfIcon, SwapScarvesIcon } from "@/components/ui/Icons";
import { Calendar, Trophy, Lightbulb, Maximize2, ArrowRightLeft } from "lucide-react";

export interface ScarfCardProps {
  scarf: Scarf;
  onOpenLightbox?: (scarf: Scarf) => void;
}

export function ScarfCard({ scarf, onOpenLightbox }: ScarfCardProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
  const isNew = scarf.category === "new";

  const countryDisplayName = getCountryDisplayName(scarf.country, lang);
  const displayDescription =
    (isEn && scarf.descriptionEn ? scarf.descriptionEn : scarf.description) || scarf.description;
  const displayTrophies =
    (isEn && scarf.trophiesEn ? scarf.trophiesEn : scarf.trophies) || scarf.trophies;
  const displayFunFact =
    (isEn && scarf.funFactEn ? scarf.funFactEn : scarf.funFact) || scarf.funFact;

  return (
    <div
      className={`group bg-surface rounded-2xl border transition-all duration-300 overflow-hidden shadow-card flex flex-col justify-between relative ${
        isNew
          ? "border-border/80 hover:border-azg/60 hover:shadow-[0_10px_30px_rgba(20,184,166,0.12)]"
          : "border-border/80 hover:border-accent-2/60 hover:shadow-[0_10px_30px_rgba(234,179,8,0.12)]"
      }`}
    >
      {/* Subtle ambient gradient overlay in top corner */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 pointer-events-none rounded-full blur-3xl opacity-10 transition-opacity duration-300 group-hover:opacity-20 ${
          isNew ? "bg-azg" : "bg-accent-2"
        }`}
      />

      <div>
        {/* 1. Scarf Photo Banner with Hover Zoom and Click to Expand */}
        <div className="relative w-full aspect-[28/9] bg-surface-2 overflow-hidden border-b border-border/80">
          {scarf.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={scarf.photo}
              alt={`${scarf.club} scarf`}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
              onClick={() => onOpenLightbox?.(scarf)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-text-muted">
              No scarf photo
            </div>
          )}

          {/* Top Floating Category Badge & Quick Inspect Button */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md font-mono text-[10.5px] uppercase tracking-wider font-bold border shadow-sm ${
                isNew
                  ? "bg-black/75 border-azg/40 text-azg"
                  : "bg-black/75 border-accent-2/40 text-accent-2"
              }`}
            >
              {isNew ? (
                <>
                  <OfficialScarfIcon className="w-3.5 h-3.5 text-azg" />
                  <span>{isEn ? "MATCHDAY FANSHOP" : "OFFICIEEL FANSHOP"}</span>
                </>
              ) : (
                <>
                  <SwapScarvesIcon className="w-3.5 h-3.5 text-accent-2" />
                  <span>{isEn ? "TERRACE TRADE / SWAP" : "TERRACE RUIL"}</span>
                </>
              )}
            </span>

            {scarf.photo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox?.(scarf);
                }}
                className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-md"
                title={isEn ? "Inspect photo in full screen" : "Vergroot foto op volledig scherm"}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Card Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Header: Club Title & Country Flag Tag */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-bebas text-2xl sm:text-3xl text-text m-0 tracking-wide group-hover:text-accent transition-colors leading-tight">
                {scarf.club}
              </h3>
              <div className="font-mono text-xs text-text-muted mt-0.5">
                {scarf.type}
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-xs font-inter font-medium text-text">
              <span>{countryDisplayName}</span>
            </span>
          </div>

          {/* Description */}
          {displayDescription && (
            <p className="font-inter text-sm text-text/85 leading-relaxed m-0 line-clamp-2">
              {displayDescription}
            </p>
          )}

          {/* Metadata Chips Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50 text-xs font-mono">
            <div className="flex items-center gap-2 text-text-muted truncate">
              <StadiumIcon className="w-3.5 h-3.5 text-azg shrink-0" />
              <span className="truncate" title={scarf.stadium}>
                {scarf.stadium || "—"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-text-muted truncate">
              <Calendar className="w-3.5 h-3.5 text-accent-2 shrink-0" />
              <span className="truncate">
                {isEn ? `Est. ${scarf.founded}` : `Opgericht ${scarf.founded}`}
              </span>
            </div>

            {displayTrophies && (
              <div className="col-span-2 flex items-center gap-2 text-text-muted truncate">
                <Trophy className="w-3.5 h-3.5 text-accent-2 shrink-0" />
                <span className="truncate text-[11.5px]" title={displayTrophies}>
                  {displayTrophies}
                </span>
              </div>
            )}
          </div>

          {/* "Wist Je Dat?" / Heritage Trivia Box */}
          {displayFunFact && (
            <div className="p-3.5 rounded-xl bg-surface-2/60 border border-border/70 text-xs relative">
              <div className={`flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider font-bold mb-1 ${
                isNew ? "text-azg" : "text-accent-2"
              }`}>
                <Lightbulb className={`w-3.5 h-3.5 ${isNew ? "text-azg" : "text-accent-2"}`} />
                <span>{t.scarves.funFact}</span>
              </div>
              <p className="font-inter text-text-muted italic leading-relaxed m-0 line-clamp-3 text-[12.5px]">
                &ldquo;{displayFunFact}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Card Footer Action Bar */}
      <div className="p-4 sm:p-5 pt-3 border-t border-border/60 bg-surface-2/30 flex items-center justify-between gap-3">
        {isNew ? (
          <>
            <div className="font-mono text-[11px] text-text-muted">
              {scarf.purchaseDate ? (
                <span>
                  {t.scarves.purchaseDate}:{" "}
                  <strong className="text-text font-bold">{formatDate(scarf.purchaseDate, lang)}</strong>
                </span>
              ) : (
                <span className="text-azg font-semibold">
                  {isEn ? "Matchday Acquisition" : "Matchday Aankoop"}
                </span>
              )}
            </div>

            {scarf.photo && (
              <button
                type="button"
                onClick={() => onOpenLightbox?.(scarf)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-azg hover:text-white transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isEn ? "View Photo" : "Vergroot"}</span>
              </button>
            )}
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
              <span>{isEn ? "Open for Swap" : "Beschikbaar voor Ruil"}</span>
            </div>

            <Link
              href={`/contact?swap=${encodeURIComponent(scarf.club)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-2/15 hover:bg-accent-2 text-accent-2 hover:text-black border border-accent-2/30 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{isEn ? "Propose Swap" : "Ruilvoorstel"}</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
