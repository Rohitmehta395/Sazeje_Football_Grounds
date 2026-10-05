"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ArrowLeftRight, ArrowRight, MapPin, Send } from "lucide-react";
import { ScarfIcon } from "@/components/ui/Icons";

export function HomeContactCta() {
  const { t } = useTranslation();

  return (
    <section className="relative rounded-3xl overflow-hidden border border-[#2563A6]/40 dark:border-[#4A90E2]/25 text-white p-8 sm:p-12 shadow-2xl group">
      {/* Background Stadium & Scarves Image */}
      <div className="absolute inset-0">
        <Image
          src="/cta-stadium-scarves.jpg"
          alt="European football supporters holding club scarves in stadium"
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Directional Dark Gradient Overlay for Maximum Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E2E]/95 via-[#13283E]/90 to-[#0F1E2E]/60 dark:from-[#0B1520]/95 dark:via-[#101F30]/90 dark:to-[#0B1520]/65 z-0" />

      {/* Ambient subtle glow */}
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider mb-4 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>{t.home.communityEyebrow}</span>
        </div>

        <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide leading-tight m-0 drop-shadow-md">
          {t.home.ctaSectionTitle}
        </h2>

        <p className="font-inter text-sm sm:text-base text-white/90 dark:text-blue-50/90 mt-3 mb-8 leading-relaxed max-w-xl drop-shadow-sm">
          {t.home.ctaSectionSubtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4 text-accent" />
            <span>{t.home.ctaButtonContact}</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>

          <Link
            href="/scarves"
            className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white font-medium text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5"
          >
            <ScarfIcon className="w-4 h-4 text-accent" />
            <span>{t.home.ctaButtonScarves}</span>
            <ArrowLeftRight className="w-3.5 h-3.5 text-white/70" />
          </Link>
        </div>
      </div>
    </section>
  );
}
