"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function ScarfCategoryChooser() {
  const { t } = useTranslation();

  const options = [
    {
      id: "new",
      title: t.scarves.categoryNewTitle,
      description: t.scarves.categoryNewDesc,
      href: "/scarves/new",
      icon: <Sparkles className="w-8 h-8 text-azg mb-3" />,
    },
    {
      id: "secondhand",
      title: t.scarves.categorySecondhandTitle,
      description: t.scarves.categorySecondhandDesc,
      href: "/scarves/secondhand",
      icon: <ShoppingBag className="w-8 h-8 text-accent mb-3" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px] mb-[10px]">
      {options.map((opt) => (
        <Link key={opt.id} href={opt.href} className="group">
          <div className="bg-surface border border-border rounded shadow-card p-[38px_30px] transition-all duration-150 ease-in-out hover:-translate-y-[3px] hover:border-accent flex flex-col justify-between h-full">
            <div>
              {opt.icon}
              <h3 className="font-bebas text-[30px] text-text m-0 mb-[8px] group-hover:text-accent transition-colors">
                {opt.title}
              </h3>
              <p className="font-inter text-text-muted text-[14px] m-0 mb-[16px] leading-relaxed">
                {opt.description}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-border/40">
              <span className="font-mono text-[12px] text-azg uppercase tracking-[0.06em]">
                {opt.title}
              </span>
              <span className="text-accent flex items-center gap-1 font-semibold text-xs group-hover:translate-x-1 transition-transform">
                {t.grounds.viewDetails} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
