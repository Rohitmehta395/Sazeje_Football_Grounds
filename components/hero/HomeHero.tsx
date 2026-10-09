"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { HeroSlide } from "@/types";
import {
  ArrowRight,
  Flag,
  MapPin,
  Trophy,
} from "lucide-react";
import { FootballPitchIcon, ScarfIcon } from "@/components/ui/Icons";

export interface HomeHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  backgroundImage?: string;
  slides?: HeroSlide[];
  interval?: number; // seconds
  enableAutoplay?: boolean;
  topbarLabel?: string;
  groundsCount?: number;
  countriesCount?: number;
  scarvesCount?: number;
  activeGoalsCount?: number;
}

export function HomeHero({
  eyebrow,
  title = "SAZEJE GROUNDHOPPING ARCHIVE",
  description,
  backgroundImage = "/Hero_Image.jpg",
  slides: initialSlides,
  interval = 4,
  enableAutoplay = true,
  topbarLabel = "SAZEJE GROUNDHOPPING ARCHIVE • 2024–2026",
  groundsCount = 10,
  countriesCount = 7,
  scarvesCount = 6,
  activeGoalsCount = 8,
}: HomeHeroProps) {
  const { t, lang } = useTranslation();

  // Normalize slides: if slides array is passed and has items, use it. Otherwise fallback to backgroundImage.
  const slides: HeroSlide[] = React.useMemo(() => {
    if (initialSlides && initialSlides.length > 0) {
      return initialSlides;
    }
    return [
      {
        image: backgroundImage,
        caption: "MHPArena, Stuttgart • UEFA Europa League",
        captionEn: "MHPArena, Stuttgart • UEFA Europa League",
        alt: title || "Hero stadium background",
      },
    ];
  }, [initialSlides, backgroundImage, title]);

  const slideInterval = Math.max(Number(interval) || 4, 1);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(enableAutoplay);
  const [isControlsHovered, setIsControlsHovered] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const touchStartX = React.useRef<number | null>(null);

  // Sync isPlaying whenever enableAutoplay prop updates
  React.useEffect(() => {
    setIsPlaying(enableAutoplay);
  }, [enableAutoplay]);

  // Pause slideshow when page tab is hidden / out of view to avoid queuing or timer drift
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const heroEyebrow = eyebrow || t.home.heroEyebrow;
  const heroTitle = title;
  const heroDescription = description || t.home.heroSubtitle;

  const totalSlides = slides.length;
  const hasMultipleSlides = totalSlides > 1;

  // Auto-advance loop timer: resets cleanly whenever currentIndex changes
  React.useEffect(() => {
    if (!hasMultipleSlides || !isPlaying || isControlsHovered || !isVisible) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, slideInterval * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, hasMultipleSlides, isPlaying, isControlsHovered, isVisible, slideInterval, totalSlides]);

  const handleNext = React.useCallback(() => {
    if (!hasMultipleSlides) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [hasMultipleSlides, totalSlides]);

  const handlePrev = React.useCallback(() => {
    if (!hasMultipleSlides) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [hasMultipleSlides, totalSlides]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Current slide caption based on selected language
  const activeSlide = slides[currentIndex] || slides[0];
  const slideCaption =
    lang === "en"
      ? activeSlide?.captionEn || activeSlide?.caption
      : activeSlide?.caption || activeSlide?.captionEn;

  const stats = [
    {
      value: groundsCount,
      label: t.home.statsGrounds,
      icon: <FootballPitchIcon className="w-5 h-5 text-azg" />,
    },
    {
      value: countriesCount,
      label: t.home.statsCountries,
      icon: <Flag className="w-5 h-5 text-azg" />,
    },
    {
      value: scarvesCount,
      label: t.home.statsScarves,
      icon: <ScarfIcon className="w-5 h-5 text-accent" />,
    },
    {
      value: activeGoalsCount,
      label: t.home.statsNextTarget,
      icon: <Trophy className="w-5 h-5 text-accent" />,
    },
  ];

  const isTimerActive = isPlaying && !isControlsHovered && isVisible;

  return (
    <section
      aria-label="Homepage Hero Slideshow"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[calc(100vh-72px)] flex flex-col justify-between text-white overflow-hidden border-b border-border/40 select-none outline-none"
    >
      {/* Background Slides Stack with Crossfade & Cinematic Ken Burns Effect */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-1" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              <div
                className="relative w-full h-full transform transition-transform ease-out"
                style={{
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                  transitionDuration: `${Math.max(slideInterval + 2, 6)}s`,
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt || slideCaption || heroTitle || "Stadium hero background"}
                  fill
                  priority={idx <= 1}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,19,25,0.4)] via-[rgba(15,19,25,0.6)] to-[rgba(15,19,25,0.92)] z-2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10 pointer-events-none" />

      {/* Top Floating Stadium Location Tag (If available) */}
      {slideCaption && (
        <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono shadow-lg transition-all duration-500 animate-fade-in">
          <MapPin className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span className="truncate max-w-[280px] sm:max-w-[400px]">{slideCaption}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-16 pb-6 w-full flex-1 flex flex-col justify-center">
        {/* Archive Badge Pill */}
        <div className="flex items-center gap-3 mb-5 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono tracking-wider uppercase shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <span>{topbarLabel}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-[820px]">
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#63A4E8] font-bold mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {heroEyebrow}
          </div>

          <h1 className="font-bebas text-[clamp(44px,7vw,80px)] leading-[0.95] tracking-wide text-white uppercase m-0 drop-shadow-md">
            {heroTitle}
          </h1>

          <p className="font-inter text-base sm:text-lg text-white/90 mt-4 mb-7 leading-relaxed max-w-[680px] drop-shadow">
            {heroDescription}
          </p>

          {/* Action CTA & Mobile Location Tag */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#grounds-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-btn hover:bg-btn-hover text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-btn/30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{t.home.heroCtaGrounds}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {slideCaption && (
              <div className="flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 text-[11px] font-mono">
                <MapPin className="w-3 h-3 text-accent shrink-0" />
                <span className="truncate max-w-[220px]">{slideCaption}</span>
              </div>
            )}
          </div>
        </div>

        {/* Slideshow Progress Indicators (Shown when multiple slides exist) */}
        {hasMultipleSlides && (
          <div
            className="mt-8 sm:mt-10 inline-flex items-center gap-2 max-w-[820px] p-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15 shadow-lg w-fit"
            onMouseEnter={() => setIsControlsHovered(true)}
            onMouseLeave={() => setIsControlsHovered(false)}
          >
            {slides.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`${t.home.slideshowSlide} ${idx + 1}`}
                  className={`group relative h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                    isActive ? "w-12 sm:w-16 bg-white/25" : "w-5 sm:w-7 bg-white/20 hover:bg-white/40"
                  }`}
                >
                  {isActive && (
                    <div
                      key={`progress-${currentIndex}-${isTimerActive}`}
                      className={`absolute inset-0 bg-accent rounded-full ${
                        isTimerActive ? "origin-left animate-slide-progress" : "w-full"
                      }`}
                      style={{
                        animationDuration: `${slideInterval}s`,
                        animationPlayState: isTimerActive ? "running" : "paused",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Glassmorphic Stats Dock */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 w-full pb-6">
        <div className="bg-surface/85 dark:bg-surface/90 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl p-4 sm:p-5 text-text grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 pt-3 sm:pt-0 ${
                idx === 0 ? "pt-0" : ""
              } sm:px-4 first:pl-0 last:pr-0`}
            >
              <div className="w-11 h-11 rounded-xl bg-surface-2 border border-border/70 flex items-center justify-center shrink-0 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <div className="font-bebas text-3xl sm:text-4xl text-text leading-none">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
