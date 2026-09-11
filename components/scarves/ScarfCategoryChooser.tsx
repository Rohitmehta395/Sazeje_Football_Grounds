"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { OfficialScarfIcon, SwapScarvesIcon } from "@/components/ui/Icons";

export interface ScarfCategoryChooserProps {
  newTitle?: string;
  newDesc?: string;
  secondhandTitle?: string;
  secondhandDesc?: string;
  newCount?: number;
  secondhandCount?: number;
}

export function ScarfCategoryChooser({
  newTitle,
  newDesc,
  secondhandTitle,
  secondhandDesc,
  newCount,
  secondhandCount,
}: ScarfCategoryChooserProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  const resolvedNewTitle = newTitle || t.scarves.categoryNewTitle;
  const resolvedNewDesc = newDesc || t.scarves.categoryNewDesc;

  const resolvedSecondhandTitle =
    secondhandTitle || t.scarves.categorySecondhandTitle;
  const resolvedSecondhandDesc =
    secondhandDesc || t.scarves.categorySecondhandDesc;

  const options = [
    {
      id: "new",
      title: resolvedNewTitle,
      description: resolvedNewDesc,
      href: "/scarves/new",
      count: newCount,
      eyebrow: (t.scarves as Record<string, string>).categoryNewTag || "MATCHDAY EDITIONS • FANSHOP NEW",
      ctaText: (t.scarves as Record<string, string>).categoryNewCta || (isEn ? "Browse New Scarves" : "Blader door Nieuwe Sjaals"),
      icon: <OfficialScarfIcon className="w-8 h-8 text-azg transition-transform duration-300 group-hover:scale-110" />,
      watermark: <OfficialScarfIcon className="w-44 h-44 text-azg/[0.04] group-hover:text-azg/[0.08] transition-all duration-500 group-hover:scale-110" />,
      accentBorder: "hover:border-azg/60",
      accentGlow: "from-azg/10 via-surface to-surface dark:from-emerald-950/20",
      iconBg: "bg-azg/10 border-azg/25 text-azg dark:bg-azg/20 dark:border-azg/40 shadow-sm",
      badgeBg: "bg-azg/10 text-teal-800 dark:bg-azg/20 dark:text-azg border-azg/30",
      dotColor: "bg-azg",
      pills: isEn
        ? ["100% Official", "Matchday Fanshop", "Mint Condition"]
        : ["100% Officieel", "Matchday Fanshop", "Nieuwstaat"],
    },
    {
      id: "secondhand",
      title: resolvedSecondhandTitle,
      description: resolvedSecondhandDesc,
      href: "/scarves/secondhand",
      count: secondhandCount,
      eyebrow: (t.scarves as Record<string, string>).categorySecondhandTag || "TERRACE SWAPS • VINTAGE FINDS",
      ctaText: (t.scarves as Record<string, string>).categorySecondhandCta || (isEn ? "Browse Swap Collection" : "Blader door Ruilsjaals"),
      icon: <SwapScarvesIcon className="w-8 h-8 text-accent-2 transition-transform duration-300 group-hover:scale-110" />,
      watermark: <SwapScarvesIcon className="w-44 h-44 text-accent-2/[0.04] group-hover:text-accent-2/[0.08] transition-all duration-500 group-hover:scale-110" />,
      accentBorder: "hover:border-accent-2/60",
      accentGlow: "from-accent-2/10 via-surface to-surface dark:from-amber-950/20",
      iconBg: "bg-accent-2/10 border-accent-2/25 text-accent-2 dark:bg-accent-2/20 dark:border-accent-2/40 shadow-sm",
      badgeBg: "bg-accent-2/10 text-amber-900 dark:bg-accent-2/20 dark:text-accent-2 border-accent-2/30",
      dotColor: "bg-accent-2",
      pills: isEn
        ? ["Supporter Trades", "Vintage Terrace Heritage", "Open for Swap"]
        : ["Supporter Ruil", "Vintage Terrace Historie", "Beschikbaar voor Ruil"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 mb-4">
      {options.map((opt) => (
        <Link key={opt.id} href={opt.href} className="group block focus:outline-none">
          <div
            className={`bg-surface bg-gradient-to-br ${opt.accentGlow} border border-border/80 ${opt.accentBorder} rounded-2xl shadow-card p-7 sm:p-9 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between h-full relative overflow-hidden`}
          >
            {/* Ambient Watermark Icon Background */}
            <div className="absolute -right-8 -bottom-8 pointer-events-none select-none">
              {opt.watermark}
            </div>

            <div className="relative z-10">
              {/* Header: Icon + Scarf Count Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${opt.iconBg}`}
                >
                  {opt.icon}
                </div>

                {typeof opt.count === "number" && (
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs font-semibold tracking-wider ${opt.badgeBg}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${opt.dotColor} animate-pulse`} />
                    <span>
                      {opt.count}{" "}
                      {isEn
                        ? opt.count === 1
                          ? "scarf"
                          : "scarves"
                        : opt.count === 1
                        ? "sjaal"
                        : "sjaals"}
                    </span>
                  </div>
                )}
              </div>

              {/* Eyebrow / Tag */}
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted mb-1.5 font-bold">
                {opt.eyebrow}
              </div>

              {/* Category Title */}
              <h3 className="font-bebas text-3xl sm:text-4xl text-text m-0 mb-3 tracking-wide group-hover:text-accent transition-colors">
                {opt.title}
              </h3>

              {/* Description */}
              <p className="font-inter text-text-muted text-[14.5px] leading-relaxed m-0 mb-6">
                {opt.description}
              </p>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {opt.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[11px] font-mono px-2.5 py-1 rounded-md bg-surface-2/80 border border-border/80 text-text/80"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Callout */}
            <div className="relative z-10 pt-5 border-t border-border/70 flex items-center justify-between gap-3">
              <span className="font-inter font-semibold text-sm text-text group-hover:text-accent transition-colors flex items-center gap-2">
                {opt.ctaText}
              </span>
              <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-accent group-hover:border-accent transition-all duration-200 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
