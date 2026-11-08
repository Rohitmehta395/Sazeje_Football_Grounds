"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface ScarfCategoryChooserProps {
  newTitle?: string;
  newDesc?: string;
  secondhandTitle?: string;
  secondhandDesc?: string;
  specialEditionsTitle?: string;
  specialEditionsDesc?: string;
  matchdaysTitle?: string;
  matchdaysDesc?: string;
  newCount?: number;
  secondhandCount?: number;
  specialEditionsCount?: number;
  matchdaysCount?: number;
}

export function ScarfCategoryChooser({
  newTitle,
  newDesc,
  secondhandTitle,
  secondhandDesc,
  specialEditionsTitle,
  specialEditionsDesc,
  matchdaysTitle,
  matchdaysDesc,
  newCount,
  secondhandCount,
  specialEditionsCount,
  matchdaysCount,
}: ScarfCategoryChooserProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  const resolvedNewTitle = newTitle || t.scarves.categoryNewTitle;
  const resolvedNewDesc = newDesc || t.scarves.categoryNewDesc;

  const resolvedSecondhandTitle =
    secondhandTitle || t.scarves.categorySecondhandTitle;
  const resolvedSecondhandDesc =
    secondhandDesc || t.scarves.categorySecondhandDesc;

  const resolvedSpecialEditionsTitle =
    specialEditionsTitle || t.scarves.categorySpecialEditionsTitle;
  const resolvedSpecialEditionsDesc =
    specialEditionsDesc || t.scarves.categorySpecialEditionsDesc;

  const resolvedMatchdaysTitle =
    matchdaysTitle || t.scarves.categoryMatchdaysTitle;
  const resolvedMatchdaysDesc =
    matchdaysDesc || t.scarves.categoryMatchdaysDesc;

  const options = [
    {
      id: "new",
      title: resolvedNewTitle,
      description: resolvedNewDesc,
      href: "/scarves/new",
      count: newCount,
      eyebrow:
        (t.scarves as Record<string, string>).categoryNewTag ||
        (isEn ? "MATCHDAY EDITIONS" : "MATCHDAY EDITIES"),
      ctaText:
        (t.scarves as Record<string, string>).categoryNewCta ||
        (isEn ? "Browse New Scarves" : "Blader door Nieuwe Sjaals"),
      // Styling: Soft warm cream / light gold
      panelBg:
        "bg-gradient-to-br from-[#FCFBF7] via-[#F9F5EC] to-[#F3EADB] dark:from-[#1D1B16] dark:via-[#1A1813] dark:to-[#14120D]",
      border:
        "border-[#E5D7BF] hover:border-[#D0BD97] dark:border-amber-900/35 dark:hover:border-amber-700/60",
      eyebrowStyle:
        "bg-amber-600/10 text-amber-900 border-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/25",
      badgeStyle:
        "bg-amber-700/10 text-amber-950 border-amber-700/20 dark:bg-amber-400/15 dark:text-amber-200 dark:border-amber-400/30",
      titleHover:
        "group-hover:text-amber-800 dark:group-hover:text-amber-300",
      ctaHover:
        "group-hover:text-amber-800 dark:group-hover:text-amber-300",
      arrowButton:
        "bg-amber-800/10 text-amber-900 border-amber-800/20 group-hover:bg-amber-700 group-hover:text-white group-hover:border-amber-700 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/30 dark:group-hover:bg-amber-500 dark:group-hover:text-stone-900",
      divider: "border-[#E5D7BF]/70 dark:border-amber-900/35",
      accentBar:
        "bg-gradient-to-r from-amber-500/70 via-amber-400/50 to-transparent",
    },
    {
      id: "secondhand",
      title: resolvedSecondhandTitle,
      description: resolvedSecondhandDesc,
      href: "/scarves/secondhand",
      count: secondhandCount,
      eyebrow:
        (t.scarves as Record<string, string>).categorySecondhandTag ||
        (isEn ? "VINTAGE & COLLECTOR FINDS" : "VINTAGE & VERZAMELAARSVONDSTEN"),
      ctaText:
        (t.scarves as Record<string, string>).categorySecondhandCta ||
        (isEn ? "Browse Secondhand Collection" : "Blader door Tweedehands Collectie"),
      // Styling: Soft sage green
      panelBg:
        "bg-gradient-to-br from-[#F6F9F6] via-[#EEF5EF] to-[#E1EFE3] dark:from-[#131B15] dark:via-[#111813] dark:to-[#0C120E]",
      border:
        "border-[#CFDFD0] hover:border-[#ADC7AF] dark:border-emerald-900/35 dark:hover:border-emerald-700/60",
      eyebrowStyle:
        "bg-emerald-700/10 text-emerald-900 border-emerald-700/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/25",
      badgeStyle:
        "bg-emerald-700/10 text-emerald-950 border-emerald-700/20 dark:bg-emerald-400/15 dark:text-emerald-200 dark:border-emerald-400/30",
      titleHover:
        "group-hover:text-emerald-800 dark:group-hover:text-emerald-300",
      ctaHover:
        "group-hover:text-emerald-800 dark:group-hover:text-emerald-300",
      arrowButton:
        "bg-emerald-800/10 text-emerald-900 border-emerald-800/20 group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30 dark:group-hover:bg-emerald-500 dark:group-hover:text-stone-900",
      divider: "border-[#CFDFD0]/70 dark:border-emerald-900/35",
      accentBar:
        "bg-gradient-to-r from-emerald-500/70 via-emerald-400/50 to-transparent",
    },
    {
      id: "special-editions",
      title: resolvedSpecialEditionsTitle,
      description: resolvedSpecialEditionsDesc,
      href: "/scarves/special-editions",
      count: specialEditionsCount,
      eyebrow:
        (t.scarves as Record<string, string>).categorySpecialEditionsTag ||
        (isEn ? "LIMITED RELEASES" : "GELIMITEERDE RELEASES"),
      ctaText:
        (t.scarves as Record<string, string>).categorySpecialEditionsCta ||
        (isEn ? "Browse Special Editions" : "Blader door Speciale Edities"),
      // Styling: Soft lavender / muted purple
      panelBg:
        "bg-gradient-to-br from-[#F9F7FC] via-[#F4F0F9] to-[#E9E0F3] dark:from-[#1B1522] dark:via-[#18131E] dark:to-[#120E17]",
      border:
        "border-[#DBCFE7] hover:border-[#BEA9D3] dark:border-purple-900/35 dark:hover:border-purple-700/60",
      eyebrowStyle:
        "bg-purple-700/10 text-purple-900 border-purple-700/20 dark:bg-purple-400/10 dark:text-purple-300 dark:border-purple-400/25",
      badgeStyle:
        "bg-purple-700/10 text-purple-950 border-purple-700/20 dark:bg-purple-400/15 dark:text-purple-200 dark:border-purple-400/30",
      titleHover:
        "group-hover:text-purple-800 dark:group-hover:text-purple-300",
      ctaHover:
        "group-hover:text-purple-800 dark:group-hover:text-purple-300",
      arrowButton:
        "bg-purple-800/10 text-purple-900 border-purple-800/20 group-hover:bg-purple-700 group-hover:text-white group-hover:border-purple-700 dark:bg-purple-400/15 dark:text-purple-300 dark:border-purple-400/30 dark:group-hover:bg-purple-500 dark:group-hover:text-stone-900",
      divider: "border-[#DBCFE7]/70 dark:border-purple-900/35",
      accentBar:
        "bg-gradient-to-r from-purple-500/70 via-purple-400/50 to-transparent",
    },
    {
      id: "matchdays",
      title: resolvedMatchdaysTitle,
      description: resolvedMatchdaysDesc,
      href: "/scarves/matchdays",
      count: matchdaysCount,
      eyebrow:
        (t.scarves as Record<string, string>).categoryMatchdaysTag ||
        (isEn ? "EUROPEAN CLASHES & FINALS" : "EUROPESE KRAKERS & FINALES"),
      ctaText:
        (t.scarves as Record<string, string>).categoryMatchdaysCta ||
        (isEn ? "Browse Matchday Scarves" : "Blader door Wedstrijddagen"),
      // Styling: Soft powder blue
      panelBg:
        "bg-gradient-to-br from-[#F4F8FB] via-[#ECF4F9] to-[#DFEDF6] dark:from-[#131B24] dark:via-[#111720] dark:to-[#0C1118]",
      border:
        "border-[#CADCEB] hover:border-[#A6C4DE] dark:border-sky-900/35 dark:hover:border-sky-700/60",
      eyebrowStyle:
        "bg-sky-700/10 text-sky-900 border-sky-700/20 dark:bg-sky-400/10 dark:text-sky-300 dark:border-sky-400/25",
      badgeStyle:
        "bg-sky-700/10 text-sky-950 border-sky-700/20 dark:bg-sky-400/15 dark:text-sky-200 dark:border-sky-400/30",
      titleHover:
        "group-hover:text-sky-800 dark:group-hover:text-sky-300",
      ctaHover:
        "group-hover:text-sky-800 dark:group-hover:text-sky-300",
      arrowButton:
        "bg-sky-800/10 text-sky-900 border-sky-800/20 group-hover:bg-sky-700 group-hover:text-white group-hover:border-sky-700 dark:bg-sky-400/15 dark:text-sky-300 dark:border-sky-400/30 dark:group-hover:bg-sky-500 dark:group-hover:text-stone-900",
      divider: "border-[#CADCEB]/70 dark:border-sky-900/35",
      accentBar:
        "bg-gradient-to-r from-sky-500/70 via-sky-400/50 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-4">
      {options.map((opt) => (
        <Link
          key={opt.id}
          href={opt.href}
          className="group block focus:outline-none h-full"
        >
          <div
            className={`${opt.panelBg} border ${opt.border} rounded-2xl shadow-card p-6 sm:p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-full relative overflow-hidden`}
          >
            {/* Top Subtle Color Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${opt.accentBar}`} />

            <div className="space-y-4">
              {/* Header: Eyebrow label + Scarf Count Badge */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-md border ${opt.eyebrowStyle}`}
                >
                  {opt.eyebrow}
                </span>

                {typeof opt.count === "number" && (
                  <span
                    className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border ${opt.badgeStyle}`}
                  >
                    {opt.count}{" "}
                    {isEn
                      ? opt.count === 1
                        ? "scarf"
                        : "scarves"
                      : opt.count === 1
                      ? "sjaal"
                      : "sjaals"}
                  </span>
                )}
              </div>

              {/* Main Title */}
              <h3
                className={`font-bebas text-3xl sm:text-4xl md:text-[42px] leading-tight text-text m-0 tracking-wide transition-colors ${opt.titleHover}`}
              >
                {opt.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-text-muted text-sm sm:text-[15px] leading-relaxed m-0 max-w-xl">
                {opt.description}
              </p>
            </div>

            {/* Bottom Navigation Area */}
            <div
              className={`pt-5 mt-6 border-t ${opt.divider} flex items-center justify-between gap-3`}
            >
              <span
                className={`font-inter font-semibold text-sm sm:text-[15px] text-text transition-colors flex items-center gap-1.5 ${opt.ctaHover}`}
              >
                {opt.ctaText}
              </span>
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 ${opt.arrowButton}`}
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
