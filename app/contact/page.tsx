"use client";

import * as React from "react";
import { PageHero } from "@/components/hero/PageHero";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const { t, lang } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactEmail = "jouw@email.com";
    const subject = encodeURIComponent(
      lang === "en"
        ? "Message via SaZeJe Football from " + name
        : "Bericht via SaZeJe Football van " + name
    );
    const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div>
      <PageHero
        title={t.contact.heroTitle}
        description={t.contact.heroSubtitle}
        eyebrow={t.contact.heroEyebrow}
      />

      <div className="max-w-[1160px] mx-auto px-[24px] pt-[40px] pb-[60px]">
        <div className="max-w-[640px] mx-auto space-y-6">
          {submitted ? (
            <div className="p-8 border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 rounded-xl space-y-2 text-center">
              <h3 className="font-bebas text-2xl m-0">{t.contact.successTitle}</h3>
              <p className="font-inter text-sm m-0">
                {t.contact.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-surface border border-border rounded-xl p-8 shadow-card">
              <div>
                <label
                  htmlFor="contact-name-input"
                  className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-1.5"
                >
                  {t.contact.labelName}
                </label>
                <input
                  id="contact-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full bg-surface-2 border border-border text-text px-3.5 py-2.5 rounded-lg font-inter text-[14px] outline-none focus:border-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email-input"
                  className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-1.5"
                >
                  {t.contact.labelEmail}
                </label>
                <input
                  id="contact-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full bg-surface-2 border border-border text-text px-3.5 py-2.5 rounded-lg font-inter text-[14px] outline-none focus:border-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message-input"
                  className="block text-[11px] font-mono uppercase tracking-[0.06em] text-text-muted mb-1.5"
                >
                  {t.contact.labelMessage}
                </label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full bg-surface-2 border border-border text-text px-3.5 py-2.5 rounded-lg font-inter text-[14px] outline-none focus:border-accent resize-y"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                {t.contact.submitButton}
              </Button>
            </form>
          )}

          <div className="bg-surface-2 border border-border rounded-xl p-5 text-xs text-text-muted leading-relaxed">
            <strong className="text-text">Note:</strong> {t.contact.mailtoNotice}
          </div>
        </div>
      </div>
    </div>
  );
}
