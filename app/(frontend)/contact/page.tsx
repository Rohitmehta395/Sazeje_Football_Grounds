"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        title={t.contact.heroTitle}
        description={t.contact.heroSubtitle}
        eyebrow={t.contact.heroEyebrow}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
        <div className="max-w-[640px] mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
