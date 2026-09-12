"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/hero/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoCard } from "@/components/contact/ContactInfoCard";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ContactReasonsGrid } from "@/components/contact/ContactReasonsGrid";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ContactPageContent, SiteSettings } from "@/types";
import { ArrowLeft } from "lucide-react";

export interface ContactClientViewProps {
  contactContent: ContactPageContent;
  settings: SiteSettings | null;
}

export function ContactClientView({
  contactContent,
  settings,
}: ContactClientViewProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";

  const [activeTopic, setActiveTopic] = React.useState<string>("general");

  // Localized Hero Content
  const heroTitle =
    isEn && contactContent.hero.titleEn
      ? contactContent.hero.titleEn
      : contactContent.hero.title || t.contact.heroTitle;
  const heroSubtitle =
    isEn && contactContent.hero.subtitleEn
      ? contactContent.hero.subtitleEn
      : contactContent.hero.subtitle || t.contact.heroSubtitle;
  const heroEyebrow =
    isEn && contactContent.hero.eyebrowEn
      ? contactContent.hero.eyebrowEn
      : contactContent.hero.eyebrow || t.contact.heroEyebrow;
  const heroImage = contactContent.hero.heroImage || "/Hero_Image.jpg";

  const handleSelectTopic = (topic: string) => {
    setActiveTopic(topic);
  };

  return (
    <div className="space-y-10 pb-24">
      {/* 1. Hero Banner with CMS Background Image */}
      <PageHero
        title={heroTitle}
        description={heroSubtitle}
        eyebrow={heroEyebrow}
        backgroundImage={heroImage}
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-10">
        {/* 2. Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 text-xs pt-1 font-mono text-text-muted">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-text transition-colors flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-text font-semibold">{heroTitle}</span>
          </nav>
        </div>

        {/* 1. Contact Form Full Width */}
        <React.Suspense
          fallback={
            <div className="p-12 text-center rounded-2xl bg-surface border border-border text-text-muted font-mono text-sm shadow-card">
              Loading contact form...
            </div>
          }
        >
          <ContactForm
            selectedTopicOverride={activeTopic}
            onTopicChange={handleSelectTopic}
          />
        </React.Suspense>

        {/* 2. Direct Contact (Left) & Follow SaZeJe Football (Right) */}
        <ContactInfoCard
          directInfo={contactContent.directInfo}
          socials={contactContent.socials}
          settings={settings}
          onSelectTopic={handleSelectTopic}
        />

        {/* 4. Groundhopper Highlights / Why Connect Cards */}
        <ContactReasonsGrid
          reasons={contactContent.reasons}
          onSelectTopic={handleSelectTopic}
        />

        {/* 5. Dedicated Full-Width FAQ Section */}
        <ContactFaq faq={contactContent.faq} />
      </div>
    </div>
  );
}
