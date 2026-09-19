"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Link from "next/link";
import { Ground } from "@/types";
import { formatDate } from "@/lib/utils/formatDate";
import { getCountryDisplayName } from "@/lib/data/countries";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  Calendar,
  MapPin,
  Trophy,
  Flag,
  ExternalLink,
  Map as MapIcon,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ClubBadgeIcon } from "@/components/ui/Icons";

export interface GroundTicketStubProps {
  ground: Ground;
}

export function GroundTicketStub({ ground }: GroundTicketStubProps) {
  const { t, lang } = useTranslation();
  const formattedVisitDate = formatDate(ground.visitDate, lang);
  const countryName = getCountryDisplayName(ground.country, lang);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${ground.lat},${ground.lng}`;
  const interactiveMapUrl = `/map?lat=${ground.lat}&lng=${ground.lng}&ground=${ground.id}`;

  return (
    <div className="relative bg-surface-2 border border-border rounded-2xl overflow-hidden shadow-card">
      {/* Ticket Top Header Bar */}
      <div className="bg-surface px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-azg animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-azg font-bold">
            {t.grounds.officialMatchLog.toUpperCase()}
          </span>
        </div>
        <span className="font-mono text-[10px] text-text-muted/70 uppercase">
          ID: #{ground.id.slice(0, 8)}
        </span>
      </div>

      {/* Ticket Body Details */}
      <div className="p-5 space-y-4">
        {/* Club Affiliation */}
        <div className="flex items-center gap-3 pb-3.5 border-b border-border/70">
          {ground.clubLogo ? (
            <img
              src={ground.clubLogo}
              alt={ground.club}
              className="w-10 h-10 object-contain rounded-lg bg-surface p-1 border border-border/60"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-accent-soft border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
              <ClubBadgeIcon className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
              {t.grounds.homeClub}
            </div>
            <div className="font-bebas text-2xl text-text leading-tight truncate">
              {ground.club || "—"}
            </div>
          </div>
        </div>

        {/* Specifications List */}
        <div className="space-y-3 font-inter text-xs text-text">
          {/* Country */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-text-muted">
              <Flag className="w-3.5 h-3.5 text-azg" />
              <span>{t.grounds.filterCountry}</span>
            </span>
            <span className="font-semibold text-text">{countryName}</span>
          </div>

          {/* Competition */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-text-muted">
              <Trophy className="w-3.5 h-3.5 text-accent-2" />
              <span>{t.grounds.filterCompetition}</span>
            </span>
            <span className="font-semibold text-text truncate max-w-[170px] text-right">
              {ground.competition}
            </span>
          </div>

          {/* Visit Date */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-text-muted">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>{t.grounds.visitDate}</span>
            </span>
            <span className="font-mono font-semibold text-azg">
              {formattedVisitDate || ground.visitDate}
            </span>
          </div>

          {/* GPS Coordinates */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-text-muted">
              <MapPin className="w-3.5 h-3.5 text-text-muted" />
              <span>{t.grounds.coordinates}</span>
            </span>
            <span className="font-mono text-[11px] text-text-muted">
              {ground.lat.toFixed(4)}°, {ground.lng.toFixed(4)}°
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Perforation Dashed Divider with Notches */}
      <div className="relative my-1">
        <div className="border-t-2 border-dashed border-border/80 mx-4" />
        <div className="absolute -top-[10px] -left-[10px] w-5 h-5 rounded-full bg-bg border-r border-border" />
        <div className="absolute -top-[10px] -right-[10px] w-5 h-5 rounded-full bg-bg border-l border-border" />
      </div>

      {/* Ticket Bottom Actions & Verification Stamp */}
      <div className="p-5 space-y-4">
        {/* Navigation Action Buttons */}
        <div className="space-y-2">
          <Link
            href={interactiveMapUrl}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-azg hover:bg-azg/90 text-white font-medium text-xs shadow-sm hover:shadow transition-all"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>{t.grounds.viewOnEuropeMap}</span>
          </Link>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-surface-2 border border-border text-text-muted hover:text-text font-medium text-xs transition-colors"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Vintage Groundhopper Verification Stamp */}
        <div className="pt-2">
          <div className="border-2 border-dashed border-azg/50 rounded-xl p-3 text-center rotate-[-1.5deg] bg-azg/5">
            <div className="flex items-center justify-center gap-1.5 text-azg mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
                {t.grounds.verifiedGroundhop.toUpperCase()}
              </span>
            </div>
            <div className="font-mono text-[9px] text-text-muted tracking-wider uppercase">
              SAZEJE FOOTBALL ARCHIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
