"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ArrowRight, Mail, MessageSquare, Sparkles } from "lucide-react";

export function HomeContactCta() {
  const { t } = useTranslation();

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-accent via-accent to-azg text-white p-8 sm:p-12 shadow-2xl">
      {/* Glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/95 text-xs font-mono uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-accent-2" />
          <span>COMMUNITY & GROUND TIPS</span>
        </div>

        <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide leading-tight m-0 drop-shadow">
          {t.home.ctaSectionTitle}
        </h2>

        <p className="font-inter text-sm sm:text-base text-white/85 mt-3 mb-8 leading-relaxed max-w-2xl">
          {t.home.ctaSectionSubtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-text font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-azg" />
            <span>{t.home.ctaButtonContact}</span>
            <ArrowRight className="w-4 h-4 text-azg" />
          </Link>

          <Link
            href="/scarves"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-accent-2" />
            <span>{t.home.ctaButtonScarves}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
