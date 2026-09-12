"use client";

import * as React from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { ContactPageContent, ContactFaqItem } from "@/types";

export interface ContactFaqProps {
  faq?: ContactPageContent["faq"];
}

export function ContactFaq({ faq }: ContactFaqProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
  const [openIndices, setOpenIndices] = React.useState<number[]>([0]);

  if (faq && faq.showFaq === false) {
    return null;
  }

  const sectionTitle = isEn && faq?.sectionTitleEn ? faq.sectionTitleEn : faq?.sectionTitle || t.contact.faqTitle;
  const sectionSubtitle = isEn && faq?.sectionSubtitleEn ? faq.sectionSubtitleEn : faq?.sectionSubtitle || t.contact.faqSubtitle;

  const faqs: ContactFaqItem[] = faq?.items && faq.items.length > 0
    ? faq.items
    : ((t.contact as unknown as { faqs: Array<{ q: string; a: string }> }).faqs || []).map((f) => ({
        question: f.q,
        answer: f.a,
      }));

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const scrollToForm = () => {
    const el = document.getElementById("contact-form-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="space-y-8 pt-10 border-t border-border/70">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
          {sectionTitle}
        </h2>
        <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
          {sectionSubtitle}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const question = isEn && item.questionEn ? item.questionEn : item.question;
          const answer = isEn && item.answerEn ? item.answerEn : item.answer;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                isOpen
                  ? "bg-surface border-accent/40 shadow-xs"
                  : "bg-surface/70 border-border/80 hover:border-border hover:bg-surface"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <span className="font-inter text-sm sm:text-base font-semibold text-text leading-snug">
                  {question}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? "bg-accent/15 text-accent" : "bg-surface-2 text-text-muted"
                }`}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-0 font-inter text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border/30">
                  <p className="m-0 pt-3">{answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Helpful Support Footer Card */}
      <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-surface-2/60 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-0.5">
          <div className="font-inter text-xs sm:text-sm font-bold text-text">
            {isEn ? "Have another question not answered here?" : "Heb je een andere vraag die hier niet tussen staat?"}
          </div>
          <div className="font-inter text-xs text-text-muted">
            {isEn ? "Feel free to drop us a note anytime." : "Stuur ons gerust een bericht via het formulier hierboven."}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white hover:bg-accent/90 font-mono text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isEn ? "Go to Form" : "Naar het formulier"}</span>
        </button>
      </div>
    </section>
  );
}
