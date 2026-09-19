"use client";

import * as React from "react";
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Scarf } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getCountryDisplayName } from "@/lib/data/countries";

export interface ScarfLightboxProps {
  scarf: Scarf | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScarfLightbox({ scarf, isOpen, onClose }: ScarfLightboxProps) {
  const { lang } = useTranslation();
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const [rotation, setRotation] = React.useState<number>(0);

  // Reset zoom & rotation whenever modal opens or scarf changes
  React.useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setRotation(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, scarf]);

  // Keyboard controls
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((z) => Math.min(z + 0.25, 2.5));
      } else if (e.key === "-") {
        setZoomLevel((z) => Math.max(z - 0.25, 0.75));
      } else if (e.key === "0") {
        setZoomLevel(1);
        setRotation(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !scarf) return null;

  const countryDisplay = getCountryDisplayName(scarf.country, lang);
  const isNew = scarf.category === "new";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${scarf.club} scarf photo`}
      className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
    >
      {/* 1. Lightbox Header */}
      <div className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto text-white">
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold border ${
              isNew
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                : "bg-amber-950/80 border-amber-500/40 text-amber-300"
            }`}
          >
            {isNew ? "OFFICIAL MATCHDAY" : "VINTAGE TRADE"}
          </span>
          <div>
            <h2 className="font-bebas text-2xl sm:text-3xl m-0 leading-tight tracking-wide">
              {scarf.club}
            </h2>
            <div className="font-mono text-xs text-white/70">
              {scarf.type} • {countryDisplay}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/15">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer text-white"
              title="Zoom out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer text-white"
              title="Zoom in (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer text-white ml-1"
              title="Rotate image"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Photo Stage */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-4 overflow-hidden select-none">
        <div
          className="transition-transform duration-200 ease-out max-w-full max-h-full flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
          }}
        >
          {scarf.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={scarf.photo}
              alt={`${scarf.club} scarf`}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/15"
            />
          ) : (
            <div className="w-[500px] h-[160px] bg-surface-2 rounded-xl flex items-center justify-center text-text-muted font-mono text-sm border border-border">
              No scarf image available
            </div>
          )}
        </div>
      </div>

      {/* 3. Lightbox Footer Metadata */}
      <div className="w-full max-w-6xl mx-auto text-white/80 text-xs font-mono flex items-center justify-between gap-4 pt-2 border-t border-white/10">
        <div className="truncate">
          <span className="text-azg font-bold">{scarf.stadium}</span>
        </div>
        <div className="text-white/50 text-[11px] hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Esc</kbd> to close,{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">+</kbd>/
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">-</kbd> to zoom
        </div>
      </div>
    </div>
  );
}
