"use client";

import * as React from "react";
import Link from "next/link";
import { Goal } from "@/types";
import { GoalDetail } from "@/components/about/GoalDetail";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GoalDetailViewProps {
  goal: Goal;
}

export function GoalDetailView({ goal }: GoalDetailViewProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
      <Link
        href="/about"
        className="inline-flex items-center gap-1 font-semibold text-[14px] text-accent hover:underline mb-[24px]"
      >
        {t.about.backToGoals}
      </Link>

      <GoalDetail goal={goal} />
    </div>
  );
}
