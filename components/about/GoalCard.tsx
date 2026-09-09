"use client";

import * as React from "react";
import Link from "next/link";
import { Goal } from "@/types";
import { CheckCircle2, Clock, ArrowRight, Target } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GoalCardProps {
  goal: Goal;
  href?: string;
}

export function GoalCard({ goal, href }: GoalCardProps) {
  const { t, lang } = useTranslation();

  const title = lang === "en" && goal.titleEn ? goal.titleEn : goal.title;
  const description = lang === "en" && goal.descriptionEn ? goal.descriptionEn : goal.description;

  const percentage = Math.min(
    100,
    Math.round((goal.currentCount / goal.targetCount) * 100)
  );
  const isCompleted = goal.status === "completed" || percentage >= 100;

  const formattedNumber = String(goal.number).padStart(2, "0");

  const cardContent = (
    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full group hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Subtle background glow effect on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-colors" />

      <div>
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-2 border border-border text-azg font-bold">
              #{formattedNumber}
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.about.statusCompleted}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface-2 text-text-muted border border-border">
              <Clock className="w-3.5 h-3.5 text-azg" />
              <span>{percentage}%</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bebas text-2xl sm:text-[26px] text-text m-0 mb-2 leading-tight group-hover:text-accent transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="font-inter text-[13.5px] text-text-muted m-0 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Progress Footer */}
      <div className="mt-5 pt-4 border-t border-border/70">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-text-muted flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-azg" />
            <span>{t.about.target}:</span>
          </span>
          <span className="font-bold text-text">
            <span className="text-azg">{goal.currentCount}</span>
            <span className="text-text-muted mx-1">/</span>
            <span>{goal.targetCount}</span>
          </span>
        </div>

        {/* Progress Bar with rounded inner fill */}
        <div className="w-full bg-surface-2 h-2.5 rounded-full overflow-hidden border border-border/40 p-[1px]">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isCompleted
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                : "bg-azg shadow-[0_0_8px_rgba(46,139,132,0.3)]"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {href && (
          <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-accent mt-3 group-hover:translate-x-1 transition-transform">
            <span>{t.grounds.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
