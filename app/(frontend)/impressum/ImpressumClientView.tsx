"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SiteSettings } from "@/types";
import {
  ArrowLeft,
  GraduationCap,
  Laptop,
  Globe,
  Mail,
  Phone,
  Scale,
  ExternalLink,
  Check,
  Copy,
  MessageCircle,
} from "lucide-react";

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export interface ImpressumClientViewProps {
  settings?: SiteSettings | null;
}

export function ImpressumClientView({}: ImpressumClientViewProps = {}) {
  const { t, lang } = useTranslation();
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(t.impressum.emailValue);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-10 pb-24">
      {/* 1. Page Hero Banner with Theme Stadium Background */}
      <PageHero
        title={t.impressum.heroTitle}
        description={t.impressum.heroSubtitle}
        eyebrow={t.impressum.heroEyebrow}
        backgroundImage="/Hero_Image.jpg"
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-12">
        {/* 2. Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs pt-1 font-mono text-text-muted border-b border-border/70 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-text transition-colors flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.nav.home}</span>
            </Link>
            <span>/</span>
            <span className="text-text font-semibold">{t.impressum.breadcrumb}</span>
          </nav>
        </div>

        {/* 3. Main Two-Column Section (Who I Am & Contact Information) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Who I Am */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-bold tracking-wider uppercase mb-3">
                {t.impressum.whoIAmBadge}
              </div>

              {/* Developer Name */}
              <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wide text-text m-0">
                {t.impressum.devName}
              </h2>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 font-inter text-sm sm:text-[15px] text-text-muted leading-relaxed">
              <p className="m-0">{t.impressum.bioP1}</p>
              <p className="m-0">{t.impressum.bioP2}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-6 space-y-4">
              {/* Role */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                    {t.impressum.roleLabel}
                  </span>
                  <span className="font-inter text-sm font-semibold text-text">
                    {t.impressum.roleValue}
                  </span>
                </div>
              </div>

              {/* Specialisation */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block">
                    {t.impressum.specialisationLabel}
                  </span>
                  <span className="font-inter text-sm font-semibold text-text">
                    {t.impressum.specialisationValue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-bold tracking-wider uppercase mb-3">
                {t.impressum.contactBadge}
              </div>

              {/* Heading */}
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide text-text m-0">
                {t.impressum.contactHeading}
              </h2>
            </div>

            <div className="space-y-3 pt-1">
              {/* 1. Portfolio Card */}
              <a
                href={t.impressum.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface border border-border hover:border-accent hover:shadow-sm hover:-translate-y-0.5 transition-all text-inherit no-underline cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted block">
                    {t.impressum.portfolioLabel}
                  </span>
                  <span className="font-inter text-sm font-medium text-text group-hover:text-accent transition-colors truncate block">
                    {t.impressum.portfolioValue}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* 2. Email Card */}
              <div className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface border border-border hover:border-accent hover:shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href={t.impressum.emailUrl}
                  className="flex-1 min-w-0 text-inherit no-underline"
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted block">
                    {t.impressum.emailLabel}
                  </span>
                  <span className="font-inter text-sm font-medium text-text group-hover:text-accent transition-colors truncate block">
                    {t.impressum.emailValue}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title={lang === "en" ? "Copy Email" : "Kopieer E-mail"}
                  className="p-1.5 rounded-lg bg-surface-2 hover:bg-surface border border-border hover:border-accent text-text-muted hover:text-accent transition-colors cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* 3. Phone / WhatsApp Card */}
              <div className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface border border-border hover:border-accent hover:shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <a
                  href={t.impressum.phoneUrl}
                  className="flex-1 min-w-0 text-inherit no-underline"
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted block">
                    {t.impressum.phoneLabel}
                  </span>
                  <span className="font-inter text-sm font-medium text-text group-hover:text-accent transition-colors truncate block">
                    {t.impressum.phoneValue}
                  </span>
                </a>
                <a
                  href={t.impressum.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-accent/10 border border-border hover:border-accent text-accent text-xs font-mono font-medium transition-colors shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>

              {/* 4. LinkedIn Card */}
              <a
                href={t.impressum.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface border border-border hover:border-accent hover:shadow-sm hover:-translate-y-0.5 transition-all text-inherit no-underline cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  <LinkedInIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted block">
                    {t.impressum.linkedinLabel}
                  </span>
                  <span className="font-inter text-sm font-medium text-text group-hover:text-accent transition-colors truncate block">
                    {t.impressum.linkedinValue}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </a>

              {/* 5. Instagram Card */}
              <a
                href={t.impressum.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface border border-border hover:border-accent hover:shadow-sm hover:-translate-y-0.5 transition-all text-inherit no-underline cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-muted block">
                    {t.impressum.instagramLabel}
                  </span>
                  <span className="font-inter text-sm font-medium text-text group-hover:text-accent transition-colors truncate block">
                    {t.impressum.instagramValue}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* 4. Bottom Section: Liability & Disclaimer */}
        <div className="rounded-2xl bg-surface border border-border p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-bold tracking-wider uppercase">
              <Scale className="w-3.5 h-3.5" />
              <span>{t.impressum.legalNoticeBadge}</span>
            </div>
          </div>

          <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide text-text m-0">
            {t.impressum.legalHeading}
          </h2>

          <div className="space-y-3 font-inter text-sm sm:text-[14.5px] text-text-muted leading-relaxed">
            <p className="m-0">{t.impressum.disclaimerP1}</p>
            <p className="m-0">{t.impressum.disclaimerP2}</p>
            <p className="m-0">{t.impressum.disclaimerP3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
