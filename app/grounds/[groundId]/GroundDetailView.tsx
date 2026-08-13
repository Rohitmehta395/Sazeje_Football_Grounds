"use client";

import * as React from "react";
import Link from "next/link";
import { Ground } from "@/types";
import { GroundDetail } from "@/components/grounds/GroundDetail";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface GroundDetailViewProps {
  ground: Ground;
}

export function GroundDetailView({ ground }: GroundDetailViewProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
      <Link
        href="/grounds"
        className="inline-flex items-center gap-1 font-semibold text-[14px] text-accent hover:underline mb-[24px]"
      >
        {t.grounds.backToGrounds}
      </Link>

      <GroundDetail ground={ground} />
    </div>
  );
}
