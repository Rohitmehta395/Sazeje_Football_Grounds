"use client";

import * as React from "react";
import Link from "next/link";
import { Goal } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GoalCardProps {
  goal: Goal;
  href?: string;
}

export function GoalCard({ goal, href }: GoalCardProps) {
  const { t } = useTranslation();

  const percentage = Math.min(
    100,
    Math.round((goal.currentCount / goal.targetCount) * 100)
  );

  const cardContent = (
    <Card className="p-5 flex flex-col justify-between h-full group">
      <div>
        <div className="flex justify-between items-center mb-3">
          <Badge variant="azg">Goal #{goal.number}</Badge>
          {goal.status === "completed" ? (
            <Badge variant="accent" className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {t.about.statusCompleted}
            </Badge>
          ) : (
            <Badge variant="surface" className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-azg" /> {t.about.statusInProgress} ({percentage}%)
            </Badge>
          )}
        </div>

        <h3 className="font-bebas text-2xl text-text m-0 mb-2 group-hover:text-accent transition-colors">
          {goal.title}
        </h3>
        <p className="font-inter text-xs text-text-muted m-0 line-clamp-3 leading-relaxed">
          {goal.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border/60">
        <div className="flex justify-between text-xs font-mono mb-1.5">
          <span className="text-text-muted">{t.about.target}</span>
          <span className="text-azg font-bold">
            {goal.currentCount} / {goal.targetCount}
          </span>
        </div>
        <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden border border-border/40">
          <div
            className="bg-azg h-full transition-all duration-300 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {href && (
          <div className="flex justify-end items-center gap-1 text-xs font-semibold text-accent mt-3 group-hover:translate-x-1 transition-transform">
            {t.grounds.viewDetails} <ArrowRight className="w-3 h-3" />
          </div>
        )}
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
