"use client";

import * as React from "react";
import Link from "next/link";
import { Goal } from "@/types";
import { GoalDetail } from "@/components/about/GoalDetail";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";

export interface GoalDetailViewProps {
  goal: Goal;
  prevGoal?: Goal;
  nextGoal?: Goal;
  totalGoals?: number;
}

export function GoalDetailView({
  goal,
  prevGoal,
  nextGoal,
  totalGoals,
}: GoalDetailViewProps) {
  const { t, lang } = useTranslation();

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-6 pb-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-text-muted overflow-x-auto whitespace-nowrap py-1">
        <Link
          href="/"
          className="hover:text-accent flex items-center gap-1 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-border shrink-0" />
        <Link
          href="/about#goals"
          className="hover:text-accent transition-colors"
        >
          {lang === "en" ? "About & Goals" : "Over & Doelen"}
        </Link>
        <ChevronRight className="w-3 h-3 text-border shrink-0" />
        <span className="text-text font-bold truncate max-w-[200px] sm:max-w-none">
          {lang === "en" ? "Goal" : "Doel"} #{goal.number}: {lang === "en" && goal.titleEn ? goal.titleEn : goal.title}
        </span>
      </nav>

      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/about#goals"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent bg-surface border border-border px-3.5 py-1.5 rounded-full transition-all hover:shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.about.backToGoals}</span>
        </Link>
      </div>

      <GoalDetail
        goal={goal}
        prevGoal={prevGoal}
        nextGoal={nextGoal}
        totalGoals={totalGoals}
      />
    </div>
  );
}
