"use client";

import * as React from "react";
import {
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  Handshake,
  MessageSquare,
} from "lucide-react";
import { StadiumIcon, SwapScarvesIcon } from "@/components/ui/Icons";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ContactPageContent, SiteSettings } from "@/types";

export interface ContactInfoCardProps {
  directInfo: ContactPageContent["directInfo"];
  socials?: ContactPageContent["socials"];
  settings?: SiteSettings | null;
  onSelectTopic?: (topic: string) => void;
}

export function ContactInfoCard({
  directInfo,
  socials,
  settings,
  onSelectTopic,
}: ContactInfoCardProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
  const [copied, setCopied] = React.useState(false);

  // Localized texts
  const badge = isEn && directInfo?.badgeEn ? directInfo.badgeEn : directInfo?.badge || t.contact.directInfoTitle;
  const title = isEn && directInfo?.titleEn ? directInfo.titleEn : directInfo?.title || t.contact.directInfoTitle;
  const description = isEn && directInfo?.descriptionEn ? directInfo.descriptionEn : directInfo?.description || t.contact.directInfoDesc;
  const contactEmail = directInfo?.email || settings?.contactEmail || "info@sazejefootball.nl";
  const responseTime = isEn && directInfo?.responseTimeEn ? directInfo.responseTimeEn : directInfo?.responseTime || t.contact.responseTimeValue;
  const location = isEn && directInfo?.locationEn ? directInfo.locationEn : directInfo?.location || t.contact.baseLocationValue;

  const socialsTitle = isEn && socials?.titleEn ? socials.titleEn : socials?.title || t.contact.socialsTitle;
  const socialsSubtitle = isEn && socials?.subtitleEn ? socials.subtitleEn : socials?.subtitle || t.contact.socialsSubtitle;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@sazejefootball",
      url: settings?.socialLinks?.instagram || "https://instagram.com/sazejefootball",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      ),
      badgeColor: "bg-azg/10 text-teal-800 dark:text-azg border-azg/20",
    },
    {
      name: "X / Twitter",
      handle: "@sazejefootball",
      url: settings?.socialLinks?.x || "https://x.com/sazejefootball",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6L17.7 20Z" />
        </svg>
      ),
      badgeColor: "bg-accent-2/10 text-amber-900 dark:text-accent-2 border-accent-2/20",
    },
    ...(settings?.socialLinks?.youtube
      ? [
          {
            name: "YouTube",
            handle: "SaZeJe Football",
            url: settings.socialLinks.youtube,
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            ),
            badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
          },
        ]
      : []),
    ...(settings?.socialLinks?.facebook
      ? [
          {
            name: "Facebook",
            handle: "SaZeJe Football",
            url: settings.socialLinks.facebook,
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            ),
            badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
          },
        ]
      : []),
  ];

  const quickTopics = [
    {
      id: "ground_tip",
      label: isEn ? "Ground tip" : "Stadiontip",
      icon: <StadiumIcon className="w-3.5 h-3.5 text-azg shrink-0" />,
    },
    {
      id: "scarf_swap",
      label: isEn ? "Scarf swap" : "Sjaalruil",
      icon: <SwapScarvesIcon className="w-3.5 h-3.5 text-accent-2 shrink-0" />,
    },
    {
      id: "collaboration",
      label: isEn ? "Collaboration" : "Samenwerking",
      icon: <Handshake className="w-3.5 h-3.5 text-accent shrink-0" />,
    },
    {
      id: "general",
      label: isEn ? "General" : "Algemeen",
      icon: <MessageSquare className="w-3.5 h-3.5 text-text-muted shrink-0" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
      {/* 1. Direct Contact & Matchday Inquiries (Left) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col justify-between space-y-6 relative overflow-hidden h-full">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-52 h-52 bg-azg/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bebas text-2xl sm:text-3xl text-text m-0 tracking-wide">
              {title}
            </h3>
            <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
              {description}
            </p>
          </div>

          {/* Email Click-to-Copy Pill */}
          <div className="p-3.5 rounded-xl bg-surface-2/70 border border-border flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-azg/10 border border-azg/20 flex items-center justify-center text-teal-800 dark:text-azg shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="font-mono text-xs sm:text-sm text-text font-bold hover:text-accent transition-colors truncate whitespace-nowrap"
                title={contactEmail}
              >
                {contactEmail}
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-border text-text hover:border-accent hover:text-accent transition-all shrink-0 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              aria-label={copied ? t.contact.copiedEmail : t.contact.copyEmail}
              title={copied ? t.contact.copiedEmail : t.contact.copyEmail}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-text-muted hover:text-text transition-colors" />
              )}
            </button>
          </div>

          {/* Location & Response Time Meta Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border/70 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-muted font-bold">
                <Clock className="w-3.5 h-3.5 text-azg" />
                <span>{t.contact.responseTime}</span>
              </div>
              <div className="font-inter text-xs text-text font-semibold">
                {responseTime}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border/70 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-muted font-bold">
                <MapPin className="w-3.5 h-3.5 text-accent-2" />
                <span>{t.contact.baseLocation}</span>
              </div>
              <div className="font-inter text-xs text-text font-semibold">
                {location}
              </div>
            </div>
          </div>

          {/* Quick Topic Jump Chips */}
          {onSelectTopic && (
            <div className="pt-2 border-t border-border/60 space-y-2">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider font-bold flex items-center gap-1.5">
                <MessageCircle className="w-3 h-3 text-accent" />
                <span>{isEn ? "Quick Topic Jump" : "Snel onderwerp kiezen"}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickTopics.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectTopic(item.id);
                      const el = document.getElementById("contact-form-card");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-[11px] font-mono text-text hover:border-accent hover:text-accent transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Social Channels Card (Right) */}
      {socials?.showSocials !== false && (
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col justify-between space-y-5 h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bebas text-2xl sm:text-3xl text-text m-0 tracking-wide">
                  {socialsTitle}
                </h4>
                <p className="font-inter text-sm text-text-muted m-0 mt-0.5">
                  {socialsSubtitle}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-text-muted shrink-0" />
            </div>

          <div className="grid grid-cols-1 gap-2.5">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-surface-2/60 border border-border hover:border-accent/60 hover:bg-surface-2 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${item.badgeColor} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-inter text-xs font-bold text-text group-hover:text-accent transition-colors">
                      {item.name}
                    </div>
                    <div className="font-mono text-[11px] text-text-muted">
                      {item.handle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
}
