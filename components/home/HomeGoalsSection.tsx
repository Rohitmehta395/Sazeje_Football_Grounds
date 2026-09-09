"use client";

import * as React from "react";
import Link from "next/link";
import { Goal } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ArrowRight, CheckCircle2, Clock, Target } from "lucide-react";

export interface HomeGoalsSectionProps {
  goals: Goal[];
}

export function HomeGoalsSection({ goals }: HomeGoalsSectionProps) {
  const { t } = useTranslation();

  // Highlight up to 4 primary goals
  const displayGoals = goals.slice(0, 4);

  return (
    <section id="goals-section" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-azg font-semibold flex items-center gap-1.5 mb-1.5">
            <Target className="w-3.5 h-3.5 text-accent" />
            <span>{t.home.goalsSectionEyebrow}</span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
            {t.home.goalsSectionTitle}
          </h2>
          <p className="font-inter text-sm text-text-muted m-0 mt-1 max-w-2xl">
            {t.home.goalsSectionSubtitle}
          </p>
        </div>

        <Link
          href="/about#goals"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 hover:underline shrink-0"
        >
          <span>{t.home.goalsViewAll}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {displayGoals.map((goal) => {
          const percentage = Math.min(
            100,
            Math.round((goal.currentCount / goal.targetCount) * 100)
          );
          const isCompleted = goal.status === "completed" || percentage >= 100;

          return (
            <div
              key={goal.id}
              className="bg-surface border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-surface-2 border border-border text-azg font-semibold">
                    Doel #{goal.number}
                  </span>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Behaald
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-surface-2 text-text-muted border border-border">
                      <Clock className="w-3 h-3 text-azg" /> {percentage}%
                    </span>
                  )}
                </div>

                <h3 className="font-bebas text-xl text-text m-0 group-hover:text-accent transition-colors leading-tight">
                  {goal.title}
                </h3>
                <p className="font-inter text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed">
                  {goal.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/70">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-text-muted text-[11px]">Huidige Stand:</span>
                  <span className="font-bold text-text">
                    <span className="text-azg">{goal.currentCount}</span> / {goal.targetCount}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden border border-border/50">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isCompleted ? "bg-emerald-500" : "bg-azg"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
