"use client";

import * as React from "react";
import { Goal } from "@/types";
import { InfoBox } from "@/components/ui/InfoBox";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GoalDetailProps {
  goal: Goal;
}

export function GoalDetail({ goal }: GoalDetailProps) {
  const { t, lang } = useTranslation();

  const percentage = Math.min(
    100,
    Math.round((goal.currentCount / goal.targetCount) * 100)
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <Badge variant="azg" className="text-sm px-3 py-1">
          Goal #{goal.number}
        </Badge>
        {goal.status === "completed" ? (
          <Badge variant="accent" className="text-xs px-3 py-1 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {t.about.statusCompleted}
          </Badge>
        ) : (
          <Badge variant="surface" className="text-xs px-3 py-1 flex items-center gap-1">
            <Clock className="w-4 h-4 text-azg" /> {t.about.statusInProgress}
          </Badge>
        )}
      </div>

      <h1 className="font-bebas text-4xl text-text m-0">{goal.title}</h1>

      {lang === "en" && (
        <div className="font-mono text-[11px] text-azg uppercase tracking-[0.06em] bg-surface-2 border border-border px-3 py-1.5 rounded-md inline-block mb-1">
          {t.common.originalDutchNotice}
        </div>
      )}

      <p className="font-inter text-base text-text-muted leading-relaxed">
        {goal.description}
      </p>

      {goal.details && (
        <div className="bg-surface border border-border rounded-xl p-5 font-inter text-sm text-text leading-relaxed">
          {goal.details}
        </div>
      )}

      <InfoBox
        items={[
          { label: "Goal ID", value: `#GOAL-${goal.number}` },
          { label: t.about.current, value: `${goal.currentCount}` },
          { label: t.about.target, value: `${goal.targetCount}` },
          { label: lang === "en" ? "Progress Percentage" : "Voortgang Percentage", value: `${percentage}%` },
          {
            label: "Status",
            value: goal.status === "completed" ? (lang === "en" ? "COMPLETED" : "VOLTOOID") : "IN PROGRESS",
          },
        ]}
      />
    </div>
  );
}
