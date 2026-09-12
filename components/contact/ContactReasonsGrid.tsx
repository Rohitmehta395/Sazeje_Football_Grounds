"use client";

import * as React from "react";
import { StadiumIcon, SwapScarvesIcon } from "@/components/ui/Icons";
import { Camera, Handshake, MessageSquare, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ContactPageContent, ContactReasonItem } from "@/types";

export interface ContactReasonsGridProps {
  reasons?: ContactPageContent["reasons"];
  onSelectTopic?: (topic: string) => void;
}

export function ContactReasonsGrid({
  reasons,
  onSelectTopic,
}: ContactReasonsGridProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  if (reasons && reasons.showReasons === false) {
    return null;
  }

  const sectionTitle = isEn && reasons?.sectionTitleEn ? reasons.sectionTitleEn : reasons?.sectionTitle || t.contact.reasonsTitle;
  const sectionSubtitle = isEn && reasons?.sectionSubtitleEn ? reasons.sectionSubtitleEn : reasons?.sectionSubtitle || t.contact.reasonsSubtitle;

  const items = reasons?.items && reasons.items.length > 0
    ? reasons.items
    : [
        {
          tag: "GROUNDHOPPING",
          tagEn: "GROUNDHOPPING",
          title: t.contact.reason1Title,
          titleEn: t.contact.reason1Title,
          description: t.contact.reason1Desc,
          descriptionEn: t.contact.reason1Desc,
          icon: "ground" as const,
          defaultTopic: "ground_tip" as const,
        },
        {
          tag: "VINTAGE SCARF SWAP",
          tagEn: "VINTAGE SCARF SWAP",
          title: t.contact.reason2Title,
          titleEn: t.contact.reason2Title,
          description: t.contact.reason2Desc,
          descriptionEn: t.contact.reason2Desc,
          icon: "scarf" as const,
          defaultTopic: "scarf_swap" as const,
        },
        {
          tag: "MATCHDAY STORIES",
          tagEn: "MATCHDAY STORIES",
          title: t.contact.reason3Title,
          titleEn: t.contact.reason3Title,
          description: t.contact.reason3Desc,
          descriptionEn: t.contact.reason3Desc,
          icon: "camera" as const,
          defaultTopic: "collaboration" as const,
        },
      ];

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "scarf":
        return <SwapScarvesIcon className="w-6 h-6 text-accent-2" />;
      case "camera":
        return <Camera className="w-6 h-6 text-accent" />;
      case "collab":
        return <Handshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "general":
        return <MessageSquare className="w-6 h-6 text-azg" />;
      case "ground":
      default:
        return <StadiumIcon className="w-6 h-6 text-azg" />;
    }
  };

  const getCardTheme = (index: number) => {
    switch (index % 3) {
      case 1:
        return {
          glow: "from-accent-2/10 via-surface to-surface dark:from-amber-950/20",
          border: "border-accent-2/30",
          ctaHover: "group-hover:text-accent-2",
        };
      case 2:
        return {
          glow: "from-accent/10 via-surface to-surface dark:from-emerald-950/20",
          border: "border-accent/30",
          ctaHover: "group-hover:text-accent",
        };
      case 0:
      default:
        return {
          glow: "from-azg/10 via-surface to-surface dark:from-teal-950/20",
          border: "border-azg/30",
          ctaHover: "group-hover:text-azg",
        };
    }
  };

  const handleCardClick = (item: ContactReasonItem) => {
    if (onSelectTopic && item.defaultTopic) {
      onSelectTopic(item.defaultTopic);
      const el = document.getElementById("contact-form-card");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section className="space-y-6 pt-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
          {sectionTitle}
        </h2>
        <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
          {sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {items.map((item, idx) => {
          const theme = getCardTheme(idx);
          const tag = isEn && item.tagEn ? item.tagEn : item.tag;
          const title = isEn && item.titleEn ? item.titleEn : item.title;
          const description = isEn && item.descriptionEn ? item.descriptionEn : item.description;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(item)}
              className={`p-6 sm:p-7 rounded-2xl bg-surface bg-gradient-to-br ${theme.glow} border ${theme.border} shadow-card flex flex-col justify-between space-y-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted font-bold">
                    {tag}
                  </span>
                </div>

                <h3 className="font-bebas text-2xl text-text m-0 tracking-wide">
                  {title}
                </h3>

                <p className="font-inter text-xs sm:text-[13px] text-text-muted leading-relaxed m-0">
                  {description}
                </p>
              </div>

              <div className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold text-text-muted ${theme.ctaHover} transition-colors pt-2 border-t border-border/40`}>
                <span>{isEn ? "Choose this topic" : "Selecteer onderwerp"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
