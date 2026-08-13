"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface ScarfPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function ScarfPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ScarfPaginationProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center gap-[16px] my-[36px] mb-[10px]">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 px-[16px] py-[9px] rounded-[8px] border border-border bg-surface text-[13px] font-semibold text-text cursor-pointer disabled:opacity-40 disabled:cursor-default hover:not-disabled:border-accent transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> {t.scarves.prevPage}
      </button>

      <span className="font-mono text-[12.5px] text-text-muted">
        {t.scarves.pageOf
          .replace("{current}", String(currentPage))
          .replace("{total}", String(totalPages))}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 px-[16px] py-[9px] rounded-[8px] border border-border bg-surface text-[13px] font-semibold text-text cursor-pointer disabled:opacity-40 disabled:cursor-default hover:not-disabled:border-accent transition-colors"
      >
        {t.scarves.nextPage} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
