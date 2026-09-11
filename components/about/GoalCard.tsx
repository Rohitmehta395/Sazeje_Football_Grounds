"use client";

import * as React from "react";
import Link from "next/link";
import { Goal } from "@/types";
import { CheckCircle2, ArrowRight, Target, Trophy, Compass } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GoalCardProps {
  goal: Goal;
  href?: string;
}

export function GoalCard({ goal, href }: GoalCardProps) {
  const { t, lang } = useTranslation();

  const title = lang === "en" && goal.titleEn ? goal.titleEn : goal.title;
  const description = lang === "en" && goal.descriptionEn ? goal.descriptionEn : goal.description;

  const percentage = goal.targetCount > 0
    ? Math.min(100, Math.round((goal.currentCount / goal.targetCount) * 100))
    : 0;
  const isCompleted = goal.status === "completed" || percentage >= 100;

  const cardContent = (
    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full group hover:border-azg/40 hover:shadow-xl hover:shadow-azg/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Top gradient highlight on hover */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-azg/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Subtle background glow effect on hover */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-azg/5 rounded-full blur-2xl pointer-events-none group-hover:bg-azg/10 transition-colors duration-300" />

      {/* Ambient watermark icon in background */}
      <div className="absolute -top-3 -right-3 w-28 h-28 text-text pointer-events-none opacity-[0.02] dark:opacity-[0.04] group-hover:opacity-[0.05] dark:group-hover:opacity-[0.08] group-hover:scale-105 transition-all duration-500">
        {isCompleted ? (
          <Trophy className="w-full h-full" strokeWidth={1.2} />
        ) : (
          <Target className="w-full h-full" strokeWidth={1.2} />
        )}
      </div>

      <div className="relative z-10">
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-inter font-medium bg-surface-2 border border-border text-azg shadow-xs">
            <Compass className="w-3.5 h-3.5 text-azg" />
            <span>{lang === "en" ? "Milestone" : "Mijlpaal"}</span>
          </span>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.about.statusCompleted}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-surface-2 text-text-muted border border-border group-hover:border-azg/30 group-hover:text-text transition-colors">
              {percentage > 0 ? (
                <span className="w-1.5 h-1.5 rounded-full bg-azg animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted/40" />
              )}
              <span>{t.about.statusInProgress}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bebas text-2xl sm:text-[27px] text-text m-0 mb-2 leading-tight tracking-wide group-hover:text-azg transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="font-inter text-[13.5px] text-text-muted m-0 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Progress & Footer Section */}
      <div className="mt-6 pt-4 border-t border-border/60 relative z-10 space-y-3.5">
        {/* Progress bar header: Clean label & percentage without raw count */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-text-muted flex items-center gap-1.5 font-medium">
              <Target className="w-3.5 h-3.5 text-azg" />
              <span>{lang === "en" ? "Progress" : "Voortgang"}</span>
            </span>
            <span className="font-bold font-mono text-xs">
              {isCompleted ? (
                <span className="text-emerald-500 font-bold">100%</span>
              ) : (
                <span className="text-azg">{percentage}%</span>
              )}
            </span>
          </div>

          {/* Progress Bar with rounded inner fill and glowing gradient */}
          <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden border border-border/50 p-[1px]">
            <div
              className={`h-full transition-all duration-700 rounded-full ${
                isCompleted
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                  : "bg-gradient-to-r from-azg to-teal-400 shadow-[0_0_10px_rgba(46,139,132,0.3)]"
              }`}
              style={{ width: `${isCompleted ? 100 : percentage}%` }}
            />
          </div>
        </div>

        {/* Action Link Footer */}
        {href && (
          <div className="flex items-center justify-end text-xs pt-1">
            <div className="flex items-center gap-1.5 font-semibold text-azg group-hover:text-accent transition-colors">
              <span>{t.grounds.viewDetails}</span>
              <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

