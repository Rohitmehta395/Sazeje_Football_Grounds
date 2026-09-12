"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { sendContactEmail } from "@/app/(frontend)/contact/actions";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import {
  User,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Handshake,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { StadiumIcon, SwapScarvesIcon } from "@/components/ui/Icons";
import { TurnstileWidget } from "./TurnstileWidget";

export interface ContactFormProps {
  selectedTopicOverride?: string;
  onTopicChange?: (topic: string) => void;
}

export function ContactForm({
  selectedTopicOverride,
  onTopicChange,
}: ContactFormProps) {
  const { t, lang } = useTranslation();
  const isEn = lang === "en";
  const searchParams = useSearchParams();

  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = React.useState(false);

  // Check URL parameters for pre-filling (e.g. from Scarf Swap or Ground detail)
  const urlSubject = searchParams.get("subject") || "";
  const urlSwapClub = searchParams.get("swap") || "";
  const urlGround = searchParams.get("ground") || "";

  const initialTopic = React.useMemo(() => {
    if (selectedTopicOverride) return selectedTopicOverride;
    if (urlSubject.toLowerCase().includes("swap") || urlSwapClub) return "scarf_swap";
    if (urlSubject.toLowerCase().includes("ground") || urlGround) return "ground_tip";
    return "general";
  }, [selectedTopicOverride, urlSubject, urlSwapClub, urlGround]);

  const initialMessage = React.useMemo(() => {
    if (urlSwapClub) {
      return isEn
        ? `Hello, I saw the ${urlSwapClub} scarf in your collection and would like to propose a swap.`
        : `Hallo, ik zag de sjaal van ${urlSwapClub} in jullie collectie en wil graag een ruilvoorstel doen.`;
    }
    if (urlGround) {
      return isEn
        ? `Hello, I have a tip regarding ${urlGround}: `
        : `Hallo, ik heb een tip over ${urlGround}: `;
    }
    return "";
  }, [urlSwapClub, urlGround, isEn]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: initialTopic,
      message: initialMessage,
      _hp_verification: "",
      turnstileToken: "",
    },
  });

  const selectedTopic = watch("topic") || "general";
  const messageValue = watch("message") || "";

  // React to external topic override changes
  React.useEffect(() => {
    if (selectedTopicOverride && selectedTopicOverride !== selectedTopic) {
      setValue("topic", selectedTopicOverride);
    }
  }, [selectedTopicOverride, selectedTopic, setValue]);

  // Pre-fill on mount or param changes
  React.useEffect(() => {
    if (initialTopic) setValue("topic", initialTopic);
    if (initialMessage) setValue("message", initialMessage);
  }, [initialTopic, initialMessage, setValue]);

  const topicOptions = [
    {
      id: "ground_tip",
      label: t.contact.topicGroundTip.replace(/^🏟️\s*/, ""),
      icon: (selected: boolean) => (
        <StadiumIcon className={`w-4 h-4 shrink-0 transition-colors ${selected ? "text-white" : "text-azg"}`} />
      ),
    },
    {
      id: "scarf_swap",
      label: t.contact.topicScarfSwap.replace(/^🧣\s*/, ""),
      icon: (selected: boolean) => (
        <SwapScarvesIcon className={`w-4 h-4 shrink-0 transition-colors ${selected ? "text-white" : "text-accent-2"}`} />
      ),
    },
    {
      id: "collaboration",
      label: t.contact.topicCollaboration.replace(/^🤝\s*/, ""),
      icon: (selected: boolean) => (
        <Handshake className={`w-4 h-4 shrink-0 transition-colors ${selected ? "text-white" : "text-accent"}`} />
      ),
    },
    {
      id: "general",
      label: t.contact.topicGeneral.replace(/^💬\s*/, ""),
      icon: (selected: boolean) => (
        <MessageSquare className={`w-4 h-4 shrink-0 transition-colors ${selected ? "text-white" : "text-text-muted"}`} />
      ),
    },
  ];

  const handleTopicSelect = (topicId: string) => {
    setValue("topic", topicId);
    if (onTopicChange) {
      onTopicChange(topicId);
    }
  };

  const getDynamicPlaceholder = () => {
    switch (selectedTopic) {
      case "ground_tip":
        return t.contact.messagePlaceholderGroundTip;
      case "scarf_swap":
        return t.contact.messagePlaceholderScarfSwap;
      case "collaboration":
        return t.contact.messagePlaceholderCollab;
      default:
        return t.contact.messagePlaceholderGeneral;
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    setIsRateLimited(false);

    try {
      const result = await sendContactEmail({
        ...data,
        lang: isEn ? "en" : "nl",
      });

      if (result.success) {
        setSubmitted(true);
        reset({
          name: "",
          email: "",
          topic: "general",
          message: "",
          _hp_verification: "",
          turnstileToken: "",
        });
      } else {
        if (result.code === "RATE_LIMITED") {
          setIsRateLimited(true);
        }

        if (result.fieldErrors) {
          if (result.fieldErrors.name?.[0]) {
            setError("name", { message: result.fieldErrors.name[0] });
          }
          if (result.fieldErrors.email?.[0]) {
            setError("email", { message: result.fieldErrors.email[0] });
          }
          if (result.fieldErrors.message?.[0]) {
            setError("message", { message: result.fieldErrors.message[0] });
          }
        }
        setServerError(result.error || t.contact.errorMessage);
      }
    } catch (err: unknown) {
      console.error("[Contact Form] Submit error:", err);
      setServerError(t.contact.errorMessage);
    }
  };

  return (
    <div id="contact-form-card" className="space-y-6">
      {submitted ? (
        /* Rich Confirmation Card */
        <div className="p-8 sm:p-12 border border-emerald-500/40 bg-surface rounded-2xl shadow-card text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-5 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-bebas text-3xl sm:text-4xl text-text m-0 tracking-wide">
                {t.contact.successTitle}
              </h3>
              <p className="font-inter text-sm text-text-muted leading-relaxed m-0">
                {t.contact.successMessage}
              </p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  reset({
                    name: "",
                    email: "",
                    topic: "general",
                    message: "",
                    _hp_verification: "",
                    turnstileToken: "",
                  });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-text hover:border-accent hover:text-accent font-mono text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.contact.sendAnother}</span>
              </button>

              <Link
                href="/grounds"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/90 font-mono text-xs font-bold transition-all shadow-sm"
              >
                <span>{t.contact.exploreGrounds}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/scarves"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-text hover:text-accent font-mono text-xs font-medium transition-all"
              >
                <span>{t.contact.exploreScarves}</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Form Card */
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-surface border border-border/80 rounded-2xl p-6 sm:p-8 shadow-card relative overflow-hidden space-y-6"
        >
          {/* Honeypot Field - Invisible Decoy for Automated Spam Bots */}
          <div
            className="opacity-0 absolute -top-[9999px] -left-[9999px] h-0 w-0 z-[-1] pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="contact-company-website">Please do not fill this field</label>
            <input
              id="contact-company-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("_hp_verification")}
            />
          </div>

          <div className="pb-2 border-b border-border/60 flex items-center justify-between">
            <h3 className="font-bebas text-2xl sm:text-3xl text-text m-0 tracking-wide">
              {isEn ? "Send a Message" : "Stuur een Bericht"}
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted bg-surface-2 px-2.5 py-1 rounded-md border border-border/60">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>{isEn ? "Protected & Encrypted" : "Beveiligd & Versleuteld"}</span>
            </div>
          </div>

          {serverError && (
            <div
              className={`p-4 border rounded-xl text-sm font-inter flex items-start gap-3 animate-in fade-in ${
                isRateLimited
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-200"
              }`}
            >
              {isRateLimited ? (
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <strong className="block font-medium">
                  {isRateLimited
                    ? isEn ? "Rate Limit Notice" : "Tijdelijke Wachttijd"
                    : t.contact.errorTitle}
                </strong>
                <p className="m-0 text-xs leading-relaxed">{serverError}</p>
              </div>
            </div>
          )}

          {/* Topic Selector: Responsive, Never Truncated */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted font-bold">
              {t.contact.topicLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {topicOptions.map((opt) => {
                const isSelected = selectedTopic === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleTopicSelect(opt.id)}
                    className={`px-3.5 py-3 rounded-xl text-xs font-inter font-medium border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-accent text-white border-accent shadow-sm ring-2 ring-accent/30 font-semibold"
                        : "bg-surface-2/60 border-border text-text hover:text-text hover:border-accent/40 hover:bg-surface-2"
                    }`}
                  >
                    {opt.icon(isSelected)}
                    <span className="leading-snug">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <input type="hidden" {...register("topic")} />
          </div>

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name-input"
                className="block text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted font-bold"
              >
                {t.contact.labelName} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="contact-name-input"
                  type="text"
                  maxLength={100}
                  {...register("name")}
                  placeholder={t.contact.namePlaceholder}
                  className={`w-full bg-surface-2/40 border ${
                    errors.name ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border"
                  } text-text pl-10 pr-3.5 py-2.5 rounded-xl font-inter text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all`}
                />
                <User className="w-4 h-4 text-text-muted pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-500 font-inter flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-email-input"
                className="block text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted font-bold"
              >
                {t.contact.labelEmail} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="contact-email-input"
                  type="email"
                  maxLength={255}
                  {...register("email")}
                  placeholder={t.contact.emailPlaceholder}
                  className={`w-full bg-surface-2/40 border ${
                    errors.email ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border"
                  } text-text pl-10 pr-3.5 py-2.5 rounded-xl font-inter text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all`}
                />
                <Mail className="w-4 h-4 text-text-muted pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 font-inter flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Message Textarea with Length Limit & Live Counter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contact-message-input"
                className="block text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted font-bold"
              >
                {t.contact.labelMessage} <span className="text-rose-500">*</span>
              </label>
              <span
                className={`font-mono text-[10px] transition-colors ${
                  messageValue.length >= 2000
                    ? "text-rose-500 font-bold"
                    : messageValue.length >= 1800
                    ? "text-amber-500 font-semibold"
                    : "text-text-muted"
                }`}
              >
                {messageValue.length} / 2000 {t.contact.charLimitLabel}
              </span>
            </div>
            <div className="relative">
              <textarea
                id="contact-message-input"
                rows={5}
                maxLength={2000}
                {...register("message")}
                placeholder={getDynamicPlaceholder()}
                className={`w-full bg-surface-2/40 border ${
                  errors.message ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border"
                } text-text pl-10 pr-3.5 py-3 rounded-xl font-inter text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-y leading-relaxed`}
              />
              <MessageSquare className="w-4 h-4 text-text-muted pointer-events-none absolute left-3.5 top-3.5" />
            </div>
            {errors.message && (
              <p className="text-xs text-rose-500 font-inter flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.message.message}</span>
              </p>
            )}
          </div>

          {/* Cloudflare Turnstile Widget (Badge Only) */}
          <TurnstileWidget
            onVerify={(token) => setValue("turnstileToken", token)}
            onExpire={() => setValue("turnstileToken", "")}
          />

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-accent text-white hover:bg-accent/90 focus:ring-4 focus:ring-accent/25 font-mono text-sm font-bold flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.contact.submittingButton}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitButton}</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center font-mono text-[11px] text-text-muted pt-1">
            {t.contact.mailtoNotice}
          </div>
        </form>
      )}
    </div>
  );
}
