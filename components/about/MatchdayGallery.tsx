"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { AboutGalleryItem } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface MatchdayGalleryProps {
  items: AboutGalleryItem[];
}

const AUTOPLAY_INTERVAL = 2500; // Faster auto-advance (2.5 seconds)

/**
 * Individual Gallery Card with atmospheric lighting, hover zoom, and drag-safe click.
 */
function GalleryCard({
  ref,
  item,
  index,
  lang,
  onOpenLightbox,
}: {
  ref?: React.Ref<HTMLDivElement>;
  item: AboutGalleryItem;
  index: number;
  lang: string;
  onOpenLightbox: () => void;
}) {
  const [hasError, setHasError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
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
      ref={ref}
      role="group"
      aria-roledescription="slide"
      aria-label={caption || `Matchday photo ${index + 1}`}
      tabIndex={0}
      onClick={onOpenLightbox}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative aspect-[4/3] w-[82vw] max-w-[340px] sm:max-w-none sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] shrink-0 snap-center sm:snap-start rounded-2xl overflow-hidden border border-border/80 bg-surface-2 shadow-card hover:border-accent/60 hover:shadow-lg transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
    >
      {/* High-Resolution Main Image */}
      <img
        src={imageSrc}
        alt={caption || `Gallery photo ${index + 1}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
      />

      {/* Atmospheric Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 pointer-events-none" />

      {/* Floating Expand Hint Badge */}
      <div
        className={`absolute top-3 right-3 z-10 transition-all duration-200 pointer-events-none ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-md">
          <Maximize2 className="w-3 h-3 text-accent" />
          <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-white/95 whitespace-nowrap">
            {lang === "en" ? "Expand" : "Vergroten"}
          </span>
        </div>
      </div>

      {/* Clean Caption at Bottom */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 p-4 z-10 pointer-events-none">
          <p className="font-inter text-sm text-white font-medium leading-snug m-0 line-clamp-2 drop-shadow-md">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

export function MatchdayGallery({ items }: MatchdayGalleryProps) {
  const { lang } = useTranslation();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Navigation States
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isInteracting, setIsInteracting] = React.useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = React.useState(false);

  // Drag & Swipe Detection
  const isDraggingRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftStartRef = React.useRef(0);
  const isPointerDownRef = React.useRef(false);

  // Mobile Touch Swipe Tracking
  const touchStartXRef = React.useRef(0);
  const touchStartYRef = React.useRef(0);
  const touchEndXRef = React.useRef(0);
  const touchEndYRef = React.useRef(0);
  const touchStartTimeRef = React.useRef(0);

  // Lightbox State
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState<number | null>(null);
  const [lightboxImgError, setLightboxImgError] = React.useState(false);

  React.useEffect(() => {
    setLightboxImgError(false);
  }, [activeLightboxIndex]);

  // Handle Tab visibility to pause timer when user switches away
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Update currentIndex on scroll (passive & throttled)
  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!container) {
            ticking = false;
            return;
          }

          const scrollLeft = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;

          if (maxScroll <= 0) {
            setCurrentIndex(0);
            ticking = false;
            return;
          }

          if (scrollLeft >= maxScroll - 15) {
            setCurrentIndex(items.length - 1);
            ticking = false;
            return;
          }

          const containerCenter = scrollLeft + container.clientWidth / 2;
          let closestIdx = 0;
          let minDistance = Infinity;

          cardRefs.current.forEach((card, idx) => {
            if (!card) return;
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestIdx = idx;
            }
          });

          setCurrentIndex(closestIdx);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  // Programmatic scroll to index
  const scrollToIndex = React.useCallback(
    (index: number) => {
      const container = scrollRef.current;
      const targetCard = cardRefs.current[index];
      if (!container || !targetCard) return;

      const cardOffset = targetCard.offsetLeft;
      const isMobile = window.innerWidth < 640;
      const targetScroll = isMobile
        ? cardOffset - (container.clientWidth - targetCard.offsetWidth) / 2
        : cardOffset;

      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({
        left: Math.max(0, Math.min(targetScroll, maxScroll)),
        behavior: "smooth",
      });
      setCurrentIndex(index);
    },
    []
  );

  const handleNext = React.useCallback(() => {
    if (items.length <= 1) return;
    const container = scrollRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 640;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (!isMobile && container.scrollLeft >= maxScroll - 20) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      setCurrentIndex(0);
      return;
    }

    const nextIndex = (currentIndex + 1) % items.length;
    scrollToIndex(nextIndex);
  }, [currentIndex, items.length, scrollToIndex]);

  const handlePrev = React.useCallback(() => {
    if (items.length <= 1) return;
    const container = scrollRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 640;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (!isMobile && container.scrollLeft <= 20) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
      setCurrentIndex(items.length - 1);
      return;
    }

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    scrollToIndex(prevIndex);
  }, [currentIndex, items.length, scrollToIndex]);

  // Autoplay Effect (faster interval, paused on hover/interaction/modal)
  React.useEffect(() => {
    if (
      isHovered ||
      isInteracting ||
      activeLightboxIndex !== null ||
      isDocumentHidden ||
      items.length <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [
    isHovered,
    isInteracting,
    activeLightboxIndex,
    isDocumentHidden,
    items.length,
    handleNext,
  ]);

  // Desktop Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = e.clientX;
    scrollLeftStartRef.current = container.scrollLeft;
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const container = scrollRef.current;
    if (!container) return;

    const walk = e.clientX - startXRef.current;
    if (Math.abs(walk) > 6) {
      isDraggingRef.current = true;
      container.scrollLeft = scrollLeftStartRef.current - walk;
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsInteracting(false);

    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  // Mobile Touch Swipe Handlers (supports smooth swipe left & right)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchEndXRef.current = touch.clientX;
    touchEndYRef.current = touch.clientY;
    touchStartTimeRef.current = Date.now();
    isDraggingRef.current = false;
    setIsInteracting(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchEndXRef.current = touch.clientX;
    touchEndYRef.current = touch.clientY;
    const deltaX = Math.abs(touch.clientX - touchStartXRef.current);

    if (deltaX > 8) {
      isDraggingRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    const deltaY = touchEndYRef.current - touchStartYRef.current;
    const elapsedTime = Date.now() - touchStartTimeRef.current;

    // Detect horizontal swipe gesture: dominant horizontal motion and sufficient threshold
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 0.7;
    const isSignificantDistance = Math.abs(deltaX) > 35;
    const isQuickFlick = elapsedTime < 350 && Math.abs(deltaX) > 20;

    if (isHorizontal && (isSignificantDistance || isQuickFlick)) {
      if (deltaX < 0) {
        // Swiped left -> move forward
        handleNext();
      } else {
        // Swiped right -> move backward
        handlePrev();
      }
    }

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  // Safe open lightbox (ignores drag/swipe)
  const handleCardClick = (idx: number) => {
    if (isDraggingRef.current) return;
    setActiveLightboxIndex(idx);
  };

  // Lightbox Modal Controls
  const handleLightboxPrev = React.useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : items.length - 1;
    });
  }, [items.length]);

  const handleLightboxNext = React.useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev < items.length - 1 ? prev + 1 : 0;
    });
  }, [items.length]);

  const handleLightboxClose = React.useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox modal
  React.useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleLightboxClose();
      } else if (e.key === "ArrowLeft") {
        handleLightboxPrev();
      } else if (e.key === "ArrowRight") {
        handleLightboxNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, handleLightboxClose, handleLightboxPrev, handleLightboxNext]);

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

  if (!items || items.length === 0) {
    return null;
  }

  const activeItem = activeLightboxIndex !== null ? items[activeLightboxIndex] : null;
  const activeCaption = activeItem
    ? lang === "en" && activeItem.captionEn
      ? activeItem.captionEn
      : activeItem.caption
    : "";

  return (
    <section
      aria-label="Matchday Gallery"
      className="pt-4 border-t border-border space-y-5"
    >
      {/* Section Header with Clean Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
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

        {/* Clean Prev / Next Navigation Buttons */}
        {items.length > 1 && (
          <div className="flex items-center gap-2 self-start sm:self-end shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo slide"
              className="w-9 h-9 rounded-xl bg-surface-2 hover:bg-accent/10 border border-border/80 hover:border-accent/50 text-text hover:text-accent flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo slide"
              className="w-9 h-9 rounded-xl bg-surface-2 hover:bg-accent/10 border border-border/80 hover:border-accent/50 text-text hover:text-accent flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Moving Carousel Track Container */}
      <div
        className="relative group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Horizontal Scroll Track with Full Touch & Mouse Swipe Support */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Matchday photos slider"
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1 cursor-grab active:cursor-grabbing select-none overscroll-x-contain touch-pan-x touch-pan-y"
        >
          {items.map((item, idx) => (
            <GalleryCard
              key={item.id || idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              item={item}
              index={idx}
              lang={lang}
              onOpenLightbox={() => handleCardClick(idx)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Dot Pagination Indicators */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to photo slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-7 bg-accent shadow-xs"
                  : "w-2 bg-border hover:bg-text-muted/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {activeItem !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200"
          onClick={handleLightboxClose}
        >
          {/* Top Bar: Counter & Close Button */}
          <header
            className="w-full h-16 px-4 sm:px-8 flex items-center justify-between z-30 shrink-0 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo Counter Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
              <span className="font-mono text-xs text-white/90 font-medium">
                {activeLightboxIndex! + 1} / {items.length}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleLightboxClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Middle Stage: Constrained Image Viewport with Previous/Next controls */}
          <main
            className="flex-1 min-h-0 relative w-full flex items-center justify-center px-4 sm:px-16 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button (if multiple images) */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={handleLightboxPrev}
                className="absolute left-2 sm:left-6 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white flex items-center justify-center transition-colors shadow-xl cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image Container strictly constrained to middle stage flex height */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={lightboxImgError ? "/Hero_Image.jpg" : activeItem.image}
                alt={activeCaption || "Gallery expanded view"}
                onError={() => setLightboxImgError(true)}
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl select-none"
              />
            </div>

            {/* Next Button (if multiple images) */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={handleLightboxNext}
                className="absolute right-2 sm:right-6 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white flex items-center justify-center transition-colors shadow-xl cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </main>

          {/* Bottom Bar: Caption & Keyboard Navigation Hints */}
          <footer
            className="w-full min-h-[60px] py-3 px-4 sm:px-8 flex flex-col items-center justify-center shrink-0 z-30 text-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {activeCaption && (
              <p className="font-inter text-base sm:text-lg text-white font-medium m-0 max-w-2xl drop-shadow">
                {activeCaption}
              </p>
            )}
            {items.length > 1 && (
              <span className="font-mono text-[11px] text-white/50 block mt-1">
                {lang === "en"
                  ? "Use ← and → arrow keys to navigate • Esc to close"
                  : "Gebruik ← en → pijltjestoetsen om te bladeren • Esc om te sluiten"}
              </span>
            )}
          </footer>
        </div>
      )}
    </section>
  );
}
