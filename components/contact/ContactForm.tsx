"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { sendContactEmail } from "@/app/(frontend)/contact/actions";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
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
      setServerError(
        err instanceof Error ? err.message : t.contact.errorMessage
      );
    }
  };

  return (
    <div className="space-y-6">
      {submitted ? (
        <div className="p-8 border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 rounded-xl space-y-4 text-center">
          <h3 className="font-bebas text-2xl m-0">{t.contact.successTitle}</h3>
          <p className="font-inter text-sm m-0">{t.contact.successMessage}</p>
          <div className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSubmitted(false)}
            >
              {t.contact.sendAnother}
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 bg-surface border border-border rounded-xl p-8 shadow-card"
        >
          {serverError && (
            <div className="p-4 border border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-200 rounded-lg text-sm font-inter space-y-1">
              <strong className="block font-medium">{t.contact.errorTitle}</strong>
              <p className="m-0 text-xs">{serverError}</p>
            </div>
          )}

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
              {...register("name")}
              placeholder={t.contact.namePlaceholder}
              className={`w-full bg-surface-2 border ${
                errors.name ? "border-rose-500" : "border-border"
              } text-text px-3.5 py-2.5 rounded-lg font-inter text-[14px] outline-none focus:border-accent`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500 font-inter">
                {errors.name.message}
              </p>
            )}
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
              {...register("email")}
              placeholder={t.contact.emailPlaceholder}
              className={`w-full bg-surface-2 border ${
                errors.email ? "border-rose-500" : "border-border"
              } text-text px-3.5 py-2.5 rounded-lg font-inter text-[14px] outline-none focus:border-accent`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500 font-inter">
                {errors.email.message}
              </p>
            )}
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
              rows={5}
              {...register("message")}
              placeholder={t.contact.messagePlaceholder}
              className={`w-full bg-surface-2 border ${
                errors.message ? "border-rose-500" : "border-border"
              } text-text px-3.5 py-2.5 rounded-lg font-inter text-[14px] outline-none focus:border-accent resize-y`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-rose-500 font-inter">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.contact.submittingButton : t.contact.submitButton}
          </Button>
        </form>
      )}

      <div className="bg-surface-2 border border-border rounded-xl p-5 text-xs text-text-muted leading-relaxed">
        <strong className="text-text">Note:</strong> {t.contact.mailtoNotice}
      </div>
    </div>
  );
}
