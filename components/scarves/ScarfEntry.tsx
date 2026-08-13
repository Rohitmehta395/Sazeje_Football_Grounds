"use client";

import * as React from "react";
import { Scarf } from "@/types";
import { Building2, Calendar, Flag, Sparkles, Trophy } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";

export interface ScarfEntryProps {
  scarf: Scarf;
}

export function ScarfEntry({ scarf }: ScarfEntryProps) {
  const { t, lang } = useTranslation();

  return (
    <article className="mb-[44px] pb-[44px] border-b border-border last:border-b-0 last:mb-0 last:pb-0 max-w-[640px] mx-auto">
      {/* Scarf Banner Photo */}
      <div
        className="w-full aspect-[32/9] bg-cover bg-center rounded-[12px] border border-border shadow-card bg-surface-2"
        style={{ backgroundImage: `url('${scarf.photo}')` }}
        role="img"
        aria-label={`Foto van ${scarf.club} sjaal`}
      />

      {/* Title & Meta */}
      <h3 className="font-bebas text-[24px] text-text mt-[16px] mb-[4px] text-center">
        {scarf.club}
      </h3>
      <div className="font-mono text-[12px] text-azg uppercase tracking-[0.06em] mb-[16px] text-center">
        {scarf.type} • {getCountryDisplayName(scarf.country, lang)}
      </div>

      {/* Receipt-style Scarf Info Box */}
      <div className="bg-surface shadow-card px-[26px] py-[8px] rounded border-t-[3px] border-t-azg text-left mb-[14px] relative">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-azg py-[18px] pb-[14px] border-b border-border mb-[2px]">
          {t.scarves.officialLog} #{scarf.id}
        </div>

        <div className="flex items-center justify-between py-[16px] border-b border-dashed border-border">
          <span className="inline-flex items-center gap-[12px] text-text font-semibold font-inter text-[13.5px]">
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-surface-2 border border-border text-[14px] flex-shrink-0 text-azg">
              <Building2 className="w-4 h-4" />
            </span>
            {t.scarves.stadium}
          </span>
          <span className="text-right max-w-[56%] text-[13px] leading-[1.5] text-text font-mono">
            {scarf.stadium}
          </span>
        </div>

        <div className="flex items-center justify-between py-[16px] border-b border-dashed border-border">
          <span className="inline-flex items-center gap-[12px] text-text font-semibold font-inter text-[13.5px]">
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-surface-2 border border-border text-[14px] flex-shrink-0 text-azg">
              <Calendar className="w-4 h-4" />
            </span>
            {t.scarves.founded}
          </span>
          <span className="text-right max-w-[56%] text-[13px] leading-[1.5] text-text font-mono">
            {scarf.founded}
          </span>
        </div>

        <div className="flex items-center justify-between py-[16px] border-b border-dashed border-border">
          <span className="inline-flex items-center gap-[12px] text-text font-semibold font-inter text-[13.5px]">
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-surface-2 border border-border text-[14px] flex-shrink-0 text-azg">
              <Trophy className="w-4 h-4" />
            </span>
            {t.scarves.trophies}
          </span>
          <span className="text-right max-w-[56%] text-[13px] leading-[1.5] text-text font-inter">
            {scarf.trophies}
          </span>
        </div>

        <div className="flex items-center justify-between py-[16px] border-b border-dashed border-border">
          <span className="inline-flex items-center gap-[12px] text-text font-semibold font-inter text-[13.5px]">
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-surface-2 border border-border text-[14px] flex-shrink-0 text-azg">
              <Sparkles className="w-4 h-4" />
            </span>
            {t.scarves.funFact}
          </span>
          <span className="text-right max-w-[56%] text-[13px] leading-[1.5] text-text-muted italic font-inter">
            {scarf.funFact}
          </span>
        </div>

        {scarf.purchaseDate && (
          <div className="flex items-center justify-between py-[16px]">
            <span className="inline-flex items-center gap-[12px] text-text font-semibold font-inter text-[13.5px]">
              <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-surface-2 border border-border text-[14px] flex-shrink-0 text-azg">
                <Flag className="w-4 h-4" />
              </span>
              {t.scarves.purchaseDate}
            </span>
            <span className="text-right max-w-[56%] text-[13px] leading-[1.5] text-text font-mono font-bold">
              {scarf.purchaseDate}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {scarf.description && (
        <p className="text-[13px] text-text-muted italic leading-[1.6] text-center m-0">
          &quot;{scarf.description}&quot;
        </p>
      )}
    </article>
  );
}
