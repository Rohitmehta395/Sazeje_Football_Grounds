"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GroundImageItem } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GroundLightboxProps {
  images: (string | GroundImageItem)[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  groundName: string;
}

export function GroundLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  groundName,
}: GroundLightboxProps) {
  const { lang } = useTranslation();
  const isEn = lang === "en";

  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  // Normalize image list so it consistently holds { url, caption, captionEn }
  const normalizedImages = React.useMemo(() => {
    return images.map((item) => {
      if (typeof item === "string") {
        return { url: item };
      }
      return item;
    });
  }, [images]);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation: Escape to close, Left/Right arrows to step
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : normalizedImages.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < normalizedImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, normalizedImages.length, onClose]);

  if (!isOpen || normalizedImages.length === 0) return null;

  const currentItem = normalizedImages[currentIndex] || normalizedImages[0];
  const currentImageUrl = currentItem?.url || "";

  // Determine active caption based on current site language with fallback
  const activeCaption = isEn
    ? (currentItem?.captionEn?.trim() || currentItem?.caption?.trim() || "")
    : (currentItem?.caption?.trim() || currentItem?.captionEn?.trim() || "");

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : normalizedImages.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < normalizedImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${groundName} photo lightbox`}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar: Title, Counter & Close Button */}
      <div className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto text-white shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bebas text-xl sm:text-2xl tracking-wide text-white/90">
            {groundName}
          </span>
          <span className="font-mono text-xs text-azg bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
            {currentIndex + 1} / {normalizedImages.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close photo preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Display: Main Image & Prev/Next Arrows */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center my-1 sm:my-2 max-w-6xl mx-auto w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {normalizedImages.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 cursor-pointer shadow-xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={currentImageUrl}
          alt={activeCaption || `${groundName} photo ${currentIndex + 1}`}
          className="max-h-[64vh] sm:max-h-[68vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300 select-none"
        />

        {normalizedImages.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 cursor-pointer shadow-xl"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Dedicated Caption Bar: Positioned Below the Image, 80% screen width */}
      {activeCaption && (
        <div
          className="w-[80vw] max-w-[80vw] mx-auto my-1.5 sm:my-2 z-20 flex justify-center shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full bg-black/70 backdrop-blur-md border border-white/15 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-center shadow-lg">
            <p className="font-inter text-xs sm:text-sm text-white/95 font-medium leading-relaxed m-0 text-center select-text">
              {activeCaption}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Thumbnail Strip */}
      {normalizedImages.length > 1 && (
        <div
          className="flex items-center justify-center gap-2 overflow-x-auto py-1 sm:py-2 max-w-4xl mx-auto w-full z-10 scrollbar-none shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {normalizedImages.map((imgItem, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative rounded-md overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                idx === currentIndex
                  ? "ring-2 ring-azg scale-105 opacity-100"
                  : "opacity-40 hover:opacity-80"
              }`}
            >
              <img
                src={imgItem.url}
                alt=""
                className="w-14 h-11 sm:w-16 sm:h-12 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
