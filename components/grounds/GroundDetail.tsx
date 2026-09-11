"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Link from "next/link";
import { Ground } from "@/types";
import { GroundLightbox } from "./GroundLightbox";
import { GroundTicketStub } from "./GroundTicketStub";
import { GroundCard } from "./GroundCard";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";
import { formatDate } from "@/lib/utils/formatDate";
import {
  Calendar,
  MapPin,
  Trophy,
  Flag,
  ArrowLeft,
  Camera,
  Maximize2,
  Lightbulb,
  Sparkles,
  Share2,
  Check,
} from "lucide-react";
import { ClubBadgeIcon, StadiumIcon, FootballIcon } from "@/components/ui/Icons";

export interface GroundDetailProps {
  ground: Ground;
  relatedGrounds?: Ground[];
}

export function GroundDetail({ ground, relatedGrounds = [] }: GroundDetailProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const countryName = getCountryDisplayName(ground.country, lang);
  const formattedDate = formatDate(ground.visitDate, lang);

  // Localized narrative copy from CMS with fallback
  const displayStory =
    (isEn && ground.storyEn ? ground.storyEn : ground.story) ||
    (isEn && ground.descriptionEn ? ground.descriptionEn : ground.description);

  const displayExtra = isEn && ground.extraEn ? ground.extraEn : ground.extra;
  const displayMatchInfo = isEn && ground.matchInfoEn ? ground.matchInfoEn : ground.matchInfo;

  // All gallery images
  const allImages = React.useMemo(() => {
    const list: string[] = [];
    if (ground.photo) list.push(ground.photo);
    if (ground.images && ground.images.length > 0) {
      ground.images.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list;
  }, [ground.photo, ground.images]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${ground.name} | SaZeJe Football`,
          text: `Groundhopping log at ${ground.name} (${ground.club})`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // User cancelled share
    }
  };

  // Helper to parse match info into fixture & score if available
  const parsedMatch = React.useMemo(() => {
    if (!displayMatchInfo) return null;
    const parts = displayMatchInfo.split(",");
    const fixture = parts[0]?.trim() || displayMatchInfo;
    const score = parts[1]?.trim() || "";

    // Split teams by "—" or "-"
    const teams = fixture.split(/[—–-]/).map((t) => t.trim());
    return {
      homeTeam: teams[0] || fixture,
      awayTeam: teams[1] || "",
      score,
      fullText: displayMatchInfo,
    };
  }, [displayMatchInfo]);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Breadcrumbs Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap text-xs">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted font-inter">
          <Link href="/grounds" className="hover:text-text transition-colors flex items-center gap-1.5 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.grounds.backToGrounds}</span>
          </Link>
          <span>/</span>
          <span className="text-text-muted">{countryName}</span>
          <span>/</span>
          <span className="text-text font-semibold truncate max-w-[200px]">{ground.name}</span>
        </nav>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-text-muted hover:text-text text-xs transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-azg" />
              <span className="text-azg font-mono">{isEn ? "Link Copied!" : "Gekopieerd!"}</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>{isEn ? "Share Ground" : "Deel Stadion"}</span>
            </>
          )}
        </button>
      </div>

      {/* 2. High-Impact Cinematic Hero Header */}
      <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl h-[340px] sm:h-[440px] lg:h-[480px]">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${ground.photo || "/placeholder-ground.jpg"}')` }}
          role="img"
          aria-label={ground.name}
        />

        {/* Cinematic multi-stop gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-wider">
              <Flag className="w-3 h-3 text-azg" />
              <span>{countryName}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-wider">
              <Trophy className="w-3 h-3 text-accent-2" />
              <span>{ground.competition}</span>
            </span>
          </div>

          {allImages.length > 0 && (
            <button
              type="button"
              onClick={() => handleOpenLightbox(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-azg" />
              <span>{allImages.length} {isEn ? "Photos" : "Foto's"}</span>
            </button>
          )}
        </div>

        {/* Hero Title and Subtitle Block */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 z-10 flex flex-col justify-end">
          <div className="flex items-center gap-2 text-azg font-mono text-xs uppercase tracking-[0.14em] font-semibold mb-1">
            <StadiumIcon className="w-4 h-4" />
            <span>EST. VISIT {ground.visitDate?.slice(0, 4)}</span>
          </div>

          <div className="flex items-center gap-4">
            {ground.clubLogo && (
              <img
                src={ground.clubLogo}
                alt={ground.club}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-xl bg-white/10 p-1.5 backdrop-blur-md border border-white/20 shadow-lg shrink-0 hidden xs:block"
              />
            )}
            <div>
              <h1 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-white m-0 leading-[0.95] drop-shadow-lg tracking-wide">
                {ground.name}
              </h1>
              <p className="font-inter text-sm sm:text-base text-white/85 mt-1.5 mb-0 max-w-2xl drop-shadow">
                {isEn ? `Home ground of ${ground.club}` : `Thuisbasis van ${ground.club}`} • {countryName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Columns: Story & Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column (8 cols): Matchday Scoreboard, Narrative & Gallery */}
        <div className="lg:col-span-8 space-y-8">
          {/* Matchday Scoreboard Card */}
          {parsedMatch && (
            <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-border/70 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-azg font-bold">
                  <FootballIcon className="w-4 h-4" />
                  <span>{isEn ? "MATCHDAY LOG" : "WEDSTRIJDFICHE"}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 py-2 flex-wrap">
                <div className="flex items-center gap-3">
                  <ClubBadgeIcon className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-bebas text-2xl sm:text-3xl text-text leading-tight">
                      {parsedMatch.homeTeam}
                    </div>
                    {parsedMatch.awayTeam && (
                      <div className="font-inter text-xs text-text-muted mt-0.5">
                        vs. {parsedMatch.awayTeam}
                      </div>
                    )}
                  </div>
                </div>

                {parsedMatch.score ? (
                  <div className="font-bebas text-3xl sm:text-4xl text-azg bg-accent-soft px-4 py-1.5 rounded-xl border border-accent/20 tracking-wider">
                    {parsedMatch.score}
                  </div>
                ) : (
                  <div className="font-mono text-xs text-text-muted">
                    {ground.competition}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Editorial Visit Report & Narrative */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/70 pb-3">
              <StadiumIcon className="w-5 h-5 text-azg" />
              <h2 className="font-bebas text-2xl sm:text-3xl text-text m-0 tracking-wide">
                {t.grounds.storyHeading}
              </h2>
            </div>

            <div className="prose prose-neutral max-w-none">
              <p className="font-inter text-[15.5px] sm:text-base text-text/90 leading-[1.8] m-0 whitespace-pre-line">
                {displayStory}
              </p>
            </div>

            {/* Groundhopper Insider Tip Box */}
            {displayExtra && (
              <div className="p-5 rounded-xl bg-surface border border-border border-l-4 border-l-accent-2 shadow-card mt-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-2 font-bold mb-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>{isEn ? "GROUNDHOPPER TIP & NOTES" : "GROUNDHOPPER TIP & BIJZONDERHEDEN"}</span>
                </div>
                <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
                  {displayExtra}
                </p>
              </div>
            )}
          </div>

          {/* Photo Gallery Showcase */}
          {allImages.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-azg" />
                  <h3 className="font-bebas text-2xl sm:text-3xl text-text m-0 tracking-wide">
                    {t.grounds.galleryHeading}
                  </h3>
                </div>
                <span className="font-mono text-xs text-text-muted">
                  {allImages.length} {isEn ? "Photos" : "Foto's"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOpenLightbox(idx)}
                    className="relative group h-36 sm:h-44 rounded-xl overflow-hidden border border-border bg-surface cursor-pointer shadow-sm hover:shadow-md transition-all"
                  >
                    <img
                      src={img}
                      alt={`${ground.name} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-azg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Groundhopper Passport / Ticket Stub */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <GroundTicketStub ground={ground} />
        </div>
      </div>

      {/* 4. Related Grounds in Same Country / Competition */}
      {relatedGrounds.length > 0 && (
        <div className="pt-12 border-t border-border/80 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-azg font-semibold mb-1">
                {isEn ? "EXPLORE MORE" : "VERDER ONTDEKKEN"}
              </div>
              <h2 className="font-bebas text-2xl sm:text-3xl text-text m-0">
                {isEn
                  ? `More Visited Grounds in ${countryName}`
                  : `Meer Bezochte Stadions in ${countryName}`}
              </h2>
            </div>

            <Link
              href={`/grounds?country=${encodeURIComponent(ground.country)}`}
              className="text-xs font-mono text-azg hover:underline flex items-center gap-1"
            >
              <span>{isEn ? "View all" : "Bekijk alles"}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedGrounds.map((rg) => (
              <GroundCard key={rg.id} ground={rg} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <GroundLightbox
        images={allImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        groundName={ground.name}
      />
    </div>
  );
}
