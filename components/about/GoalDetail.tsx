"use client";

import * as React from "react";
import Link from "next/link";
import { Goal } from "@/types";
import { CheckCircle2, Clock, Target, Compass, ArrowLeft, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GoalDetailProps {
  goal: Goal;
  prevGoal?: Goal;
  nextGoal?: Goal;
  totalGoals?: number;
}

export function GoalDetail({ goal, prevGoal, nextGoal, totalGoals }: GoalDetailProps) {
  const { t, lang } = useTranslation();

  const title = lang === "en" && goal.titleEn ? goal.titleEn : goal.title;
  const description = lang === "en" && goal.descriptionEn ? goal.descriptionEn : goal.description;
  const details = lang === "en" && goal.detailsEn ? goal.detailsEn : goal.details;

  const percentage = Math.min(
    100,
    Math.round((goal.currentCount / goal.targetCount) * 100)
  );
  const isCompleted = goal.status === "completed" || percentage >= 100;
  const remaining = Math.max(0, goal.targetCount - goal.currentCount);
  const formattedNumber = String(goal.number).padStart(2, "0");

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-card relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-surface-2 border border-border text-azg font-bold">
              Goal #{formattedNumber} {totalGoals ? `/ ${String(totalGoals).padStart(2, "0")}` : ""}
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/15 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.about.statusCompleted}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-surface-2 text-text-muted border border-border">
              <Clock className="w-4 h-4 text-azg" />
              <span>{t.about.statusInProgress} ({percentage}%)</span>
            </span>
          )}
        </div>

        <h1 className="font-bebas text-3xl sm:text-5xl text-text m-0 mb-3 tracking-wide leading-tight">
          {title}
        </h1>

        <p className="font-inter text-base sm:text-lg text-text-muted m-0 leading-relaxed max-w-2xl">
          {description}
        </p>

        {lang === "en" && !goal.titleEn && (
          <div className="font-mono text-[11px] text-azg uppercase tracking-[0.06em] bg-surface-2 border border-border px-3 py-1.5 rounded-md inline-block mt-4">
            {t.common.originalDutchNotice}
          </div>
        )}
      </div>

      {/* Progress & Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Visual Progress Card */}
        <div className="md:col-span-1 bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-card relative overflow-hidden">
          <div className="w-full">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted font-semibold block mb-4">
              {lang === "en" ? "Progress Rate" : "Voortgang Percentage"}
            </span>

            {/* Circular Progress Display */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-surface-2"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ${
                    isCompleted ? "text-emerald-500" : "text-azg"
                  }`}
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bebas text-4xl text-text leading-none">{percentage}%</span>
                <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">
                  {isCompleted ? (lang === "en" ? "Done" : "Voltooid") : (lang === "en" ? "Active" : "Lopend")}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-5 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs font-mono text-text-muted">
              <span>{lang === "en" ? "Remaining:" : "Nog te gaan:"}</span>
              <span className="font-bold text-text">{remaining}</span>
            </div>
          </div>
        </div>

        {/* Breakdown Stats Cards */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                {t.about.current}
              </span>
              <Target className="w-4 h-4 text-azg" />
            </div>
            <div className="font-bebas text-4xl text-text leading-none my-1">
              <span className="text-azg">{goal.currentCount}</span>
            </div>
            <span className="font-inter text-xs text-text-muted">
              {lang === "en" ? "Current verified milestone count" : "Huidig behaald aantal"}
            </span>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                {t.about.target}
              </span>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="font-bebas text-4xl text-text leading-none my-1">
              {goal.targetCount}
            </div>
            <span className="font-inter text-xs text-text-muted">
              {lang === "en" ? "Total target objective" : "Totaal gewenste aantal"}
            </span>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                {t.about.goalCode}
              </span>
              <ShieldAlert className="w-4 h-4 text-text-muted" />
            </div>
            <div className="font-mono text-xl font-bold text-text leading-none my-1">
              #GOAL-{goal.number}
            </div>
            <span className="font-inter text-xs text-text-muted">
              {lang === "en" ? "Permanent database key" : "Unieke archiefcode"}
            </span>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                Status
              </span>
              <Clock className="w-4 h-4 text-text-muted" />
            </div>
            <div className="font-mono text-sm font-bold text-text uppercase leading-none my-1">
              {isCompleted ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  {lang === "en" ? "COMPLETED" : "BEHAALD"}
                </span>
              ) : (
                <span className="text-azg">
                  {lang === "en" ? "IN PROGRESS" : "IN UITVOERING"}
                </span>
              )}
            </div>
            <span className="font-inter text-xs text-text-muted">
              {isCompleted
                ? (lang === "en" ? "Objective reached" : "Mijlpaal behaald")
                : (lang === "en" ? "Visits ongoing" : "Bezoeken in planning")}
            </span>
          </div>
        </div>
      </div>

      {/* Details & Notes Section */}
      {details && (
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-card space-y-3">
          <div className="flex items-center gap-2 text-azg">
            <Compass className="w-4 h-4" />
            <h2 className="font-bebas text-xl sm:text-2xl text-text m-0 tracking-wide">
              {lang === "en" ? "Milestones & Groundhopping Notes" : "Mijlpalen & Notities"}
            </h2>
          </div>
          <p className="font-inter text-[15px] text-text-muted leading-relaxed m-0 whitespace-pre-line">
            {details}
          </p>
        </div>
      )}

      {/* Related Actions */}
      <div className="bg-surface-2/60 border border-border rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bebas text-xl text-text m-0">
            {lang === "en" ? "Explore Visited Stadiums" : "Ontdek Bezochte Stadions"}
          </h3>
          <p className="font-inter text-xs text-text-muted m-0">
            {lang === "en"
              ? "See the grounds and matches that contribute toward this goal."
              : "Bekijk de verslagen en stadions die meetellen voor dit doel."}
          </p>
        </div>
        <Link
          href="/grounds"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-inter text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm shrink-0"
        >
          <span>{lang === "en" ? "Browse Grounds" : "Bekijk Grounds"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Next & Previous Goal Navigation */}
      {(prevGoal || nextGoal) && (
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevGoal ? (
            <Link
              href={`/about/goals/${prevGoal.id}`}
              className="bg-surface border border-border rounded-2xl p-4 hover:border-accent/40 hover:shadow-md transition-all group flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-text-muted group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-text-muted uppercase block">
                  {lang === "en" ? "Previous Goal" : "Vorig Doel"} #{prevGoal.number}
                </span>
                <span className="font-bebas text-lg text-text truncate block group-hover:text-accent transition-colors">
                  {lang === "en" && prevGoal.titleEn ? prevGoal.titleEn : prevGoal.title}
                </span>
              </div>
            </Link>
          ) : <div className="hidden sm:block" />}

          {nextGoal && (
            <Link
              href={`/about/goals/${nextGoal.id}`}
              className="bg-surface border border-border rounded-2xl p-4 hover:border-accent/40 hover:shadow-md transition-all group flex items-center justify-end text-right gap-3 sm:col-start-2"
            >
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-text-muted uppercase block">
                  {lang === "en" ? "Next Goal" : "Volgend Doel"} #{nextGoal.number}
                </span>
                <span className="font-bebas text-lg text-text truncate block group-hover:text-accent transition-colors">
                  {lang === "en" && nextGoal.titleEn ? nextGoal.titleEn : nextGoal.title}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center text-text-muted group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
