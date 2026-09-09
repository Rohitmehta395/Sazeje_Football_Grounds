"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { AboutGalleryItem } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  Camera,
  Maximize2,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_INCREMENT = 3;

export interface MatchdayGalleryProps {
  items: AboutGalleryItem[];
}

/**
 * Individual Gallery Card with smooth load transition and accessible triggers.
 */
function GalleryCard({
  item,
  index,
  lang,
  onOpenLightbox,
}: {
  item: AboutGalleryItem;
  index: number;
  lang: string;
  onOpenLightbox: () => void;
}) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const caption = lang === "en" && item.captionEn ? item.captionEn : item.caption;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenLightbox();
    }
  };

  const imageSrc = hasError ? "/Hero_Image.jpg" : item.image;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpenLightbox}
      onKeyDown={handleKeyDown}
      aria-label={caption || `Gallery photo ${index + 1}`}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-surface-2 shadow-card hover:border-accent/50 hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg animate-in fade-in duration-300"
    >
      {/* Skeleton / Placeholder Pulse */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-surface-2 animate-pulse" />
      )}

      {/* Main Image */}
      <img
        src={imageSrc}
        alt={caption || `Gallery photo ${index + 1}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Atmospheric Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity" />

      {/* Quick Expand Badge */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
        <Maximize2 className="w-4 h-4" />
      </div>

      {/* Caption & Indicator at Bottom */}
      <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
        {caption && (
          <p className="font-inter text-sm text-white font-medium leading-snug m-0 line-clamp-2 drop-shadow-md">
            {caption}
          </p>
        )}
        <span className="font-mono text-[10px] text-accent uppercase tracking-wider block font-semibold opacity-90">
          {lang === "en" ? "Click to expand" : "Klik om te vergroten"}
        </span>
      </div>
    </div>
  );
}

export function MatchdayGallery({ items }: MatchdayGalleryProps) {
  const { lang } = useTranslation();
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_COUNT);
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState<number | null>(null);
  const [lightboxImgError, setLightboxImgError] = React.useState(false);

  React.useEffect(() => {
    setLightboxImgError(false);
  }, [activeLightboxIndex]);

  if (!items || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_INCREMENT, items.length));
  };

  const handlePrev = React.useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : items.length - 1;
    });
  }, [items.length]);

  const handleNext = React.useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev < items.length - 1 ? prev + 1 : 0;
    });
  }, [items.length]);

  const handleClose = React.useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox modal
  React.useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, handleClose, handlePrev, handleNext]);

  // Lock background scroll when modal is open
  React.useEffect(() => {
    if (activeLightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeLightboxIndex]);

  const activeItem = activeLightboxIndex !== null ? items[activeLightboxIndex] : null;
  const activeCaption = activeItem
    ? lang === "en" && activeItem.captionEn
      ? activeItem.captionEn
      : activeItem.caption
    : "";

  return (
    <section aria-label="Matchday Gallery" className="pt-4 border-t border-border space-y-6">
      {/* Section Header */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-azg font-bold flex items-center gap-1.5 mb-1.5">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>{lang === "en" ? "PHOTO ARCHIVE & IMPRESSIONS" : "FOTO ARCHIEF & SFEER"}</span>
        </div>
        <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
          {lang === "en" ? "Matchday Gallery" : "Matchday Galerij"}
        </h2>
        <p className="font-inter text-sm text-text-muted m-0 mt-1 max-w-2xl">
          {lang === "en"
            ? "Atmospheric impressions, stadium details, and memorable grounds captured along the journey."
            : "Sfeerimpressies, stadiondetails en bijzondere momenten vastgelegd tijdens onze voetbalreizen."}
        </p>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleItems.map((item, idx) => (
          <GalleryCard
            key={item.id || idx}
            item={item}
            index={idx}
            lang={lang}
            onOpenLightbox={() => setActiveLightboxIndex(idx)}
          />
        ))}
      </div>

      {/* Progressive Load More Action Button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-surface border border-border hover:border-accent text-text hover:text-accent font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>
              {lang === "en" ? "Load More Photos" : "Laad Meer Foto's"}
            </span>
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Counter & Close Button */}
            <div className="w-full flex items-center justify-between pb-3 px-2 text-white">
              <span className="font-mono text-xs text-white/70">
                {activeLightboxIndex! + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage with Navigation Arrows */}
            <div className="relative w-full flex items-center justify-center">
              {/* Previous Button (if multiple images) */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:-left-12 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* High-Resolution Modal Image */}
              <div className="relative w-full max-h-[72vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/60">
                <img
                  src={lightboxImgError ? "/Hero_Image.jpg" : activeItem.image}
                  alt={activeCaption || "Gallery expanded view"}
                  onError={() => setLightboxImgError(true)}
                  className="max-h-[72vh] max-w-full object-contain"
                />
              </div>

              {/* Next Button (if multiple images) */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:-right-12 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Caption & Navigation Hint */}
            <div className="mt-4 text-center px-4 max-w-2xl space-y-1">
              {activeCaption && (
                <p className="font-inter text-base text-white font-medium m-0 drop-shadow">
                  {activeCaption}
                </p>
              )}
              {items.length > 1 && (
                <span className="font-mono text-[11px] text-white/50 block">
                  {lang === "en"
                    ? "Use ← and → arrow keys to navigate"
                    : "Gebruik ← en → pijltjestoetsen om te bladeren"}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
