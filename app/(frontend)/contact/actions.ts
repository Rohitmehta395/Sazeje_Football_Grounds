"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { sanitizeInput, sanitizeSingleLine, escapeHtml } from "@/lib/security/sanitize";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import {
  generateContactConfirmationEmail,
  generateAdminNotificationEmail,
} from "@/lib/email/contactEmails";

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    topic?: string[];
  };
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<ContactActionResult> {
  // 1. Resolve client IP securely from incoming request headers
  // Prioritizes trusted reverse-proxy headers to prevent spoofing
  let clientIp = "127.0.0.1";
  try {
    const headerList = await headers();
    const cfIp = headerList.get("cf-connecting-ip");
    const realIp = headerList.get("x-real-ip");
    const forwardedFor = headerList.get("x-forwarded-for");
    
    const resolved = cfIp || realIp || (forwardedFor ? forwardedFor.split(",")[0] : null);
    if (resolved && resolved.trim()) {
      clientIp = resolved.trim();
    }
  } catch (headerErr) {
    console.warn("[Security] Could not retrieve request headers for client IP:", headerErr);
  }

  // 2. Rate limiting check (max 5 submissions per 10 minutes per IP)
  const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000);
  if (!rateLimit.success) {
    const minutes = Math.max(1, Math.ceil(rateLimit.retryAfterSeconds / 60));
    console.warn(`[Security] Rate limit triggered for IP ${clientIp}. Remaining cooldown: ${rateLimit.retryAfterSeconds}s`);
    return {
      success: false,
      error: `Too many submissions from your network. Please wait ${minutes} minute(s) before trying again.`,
      code: "RATE_LIMITED",
    };
  }

  // 3. Honeypot check (defense against automated spam bots)
  // If the hidden decoy field has any content, silently discard without notifying the bot
  if (data._hp_verification && data._hp_verification.trim().length > 0) {
    console.warn(`[Security] Spam honeypot trap triggered from IP: ${clientIp}. Discarding silently.`);
    return {
      success: true,
      message: "Email sent successfully!",
    };
  }

  // 4. Cloudflare Turnstile token verification
  const turnstileCheck = await verifyTurnstileToken(data.turnstileToken, clientIp);
  if (!turnstileCheck.success) {
    console.warn(`[Security] Turnstile verification failed from IP ${clientIp}: ${turnstileCheck.error}`);
    return {
      success: false,
      error: turnstileCheck.error || "Security verification failed. Please try again.",
      code: "CAPTCHA_FAILED",
    };
  }

  // 5. Backend schema validation with Zod
  const validationResult = contactSchema.safeParse(data);
  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Validation failed. Please check the entered fields and try again.",
      fieldErrors,
    };
  }

  // 6. Input sanitization (strip control characters and prepare safe text & escaped HTML)
  const rawData = validationResult.data;
  const cleanName = sanitizeSingleLine(rawData.name);
  const cleanEmail = sanitizeSingleLine(rawData.email).toLowerCase();
  const cleanTopic = rawData.topic ? sanitizeSingleLine(rawData.topic) : "general";
  const cleanMessage = sanitizeInput(rawData.message);

  const safeHtmlName = escapeHtml(cleanName);
  const safeHtmlEmail = escapeHtml(cleanEmail);
  const safeHtmlTopic = escapeHtml(cleanTopic);
  const safeHtmlMessage = escapeHtml(cleanMessage);

  const userLang = rawData.lang === "en" ? "en" : "nl";

  // 7. Fetch destination email (prioritize environment variable, fallback to Payload Settings global)
  let toEmail = process.env.CONTACT_EMAIL?.trim() || "";
  if (!toEmail) {
    try {
      const payload = await getPayload({ config });
      const settings = await payload.findGlobal({ slug: "settings" });
      if (
        settings &&
        typeof settings.contactEmail === "string" &&
        settings.contactEmail.trim()
      ) {
        toEmail = settings.contactEmail.trim();
      }
    } catch (err) {
      console.warn("[Contact Action] Could not read contactEmail from Settings global:", err);
    }
  }
  if (!toEmail) {
    toEmail = "info@sazejefootball.nl";
  }

  // 8. Check Resend API Key
  const apiKey = process.env.RESEND_API_KEY;
  if (
    !apiKey ||
    apiKey === "re_placeholder_key" ||
    apiKey === "your-resend-api-key" ||
    apiKey.startsWith("re_placeholder")
  ) {
    console.warn(
      "[Contact Action] Resend API key is not configured or is a placeholder in .env.local."
    );
    // In development without email API configured, log the payload for developer inspection
    if (process.env.NODE_ENV !== "production") {
      console.info("[Dev Note] Message received in dev mode:", {
        from: `${cleanName} <${cleanEmail}>`,
        topic: cleanTopic,
        lang: userLang,
        message: cleanMessage,
      });
      console.info("[Dev Note] Simulated auto-responder delivery to:", cleanEmail);
      return {
        success: true,
        message: "Message processed successfully (Development mode: simulated delivery).",
      };
    }
    // Secure error message: don't reveal backend configuration details in production
    return {
      success: false,
      error: "The contact service is momentarily undergoing maintenance. Please email us directly or try again shortly.",
    };
  }

  // 9. Send email via Resend with sanitized and HTML-escaped content
  try {
    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "SaZeJe Football <onboarding@resend.dev>";

    // Generate admin notification email
    const adminEmailData = generateAdminNotificationEmail({
      name: cleanName,
      email: cleanEmail,
      topic: cleanTopic,
      message: cleanMessage,
      lang: userLang,
    });

    const { error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: adminEmailData.subject,
      text: adminEmailData.text,
      html: adminEmailData.html,
    });

    if (resendError) {
      // Log technical error securely on server
      console.error("[Security] Resend API rejected email sending:", resendError);
      // Return safe, sanitized message to client without leaking internal provider details
      return {
        success: false,
        error: "Unable to deliver your message at this time. Please try again later or reach out directly via email.",
      };
    }

    // 10. Send customer auto-reply confirmation email (custom themed)
    try {
      const confirmationEmailData = generateContactConfirmationEmail({
        name: cleanName,
        email: cleanEmail,
        topic: cleanTopic,
        message: cleanMessage,
        lang: userLang,
      });

      const { error: autoReplyError } = await resend.emails.send({
        from: fromEmail,
        to: [cleanEmail],
        replyTo: toEmail, // Replies to confirmation go directly to the SaZeJe Football admin inbox
        subject: confirmationEmailData.subject,
        text: confirmationEmailData.text,
        html: confirmationEmailData.html,
      });

      if (autoReplyError) {
        console.warn(
          "[Contact Action] Customer auto-responder email could not be sent:",
          autoReplyError
        );
      } else {
        console.info(`[Contact Action] Auto-responder confirmation sent successfully to ${cleanEmail}`);
      }
    } catch (autoReplyErr) {
      // Non-blocking catch: don't fail user submission if confirmation dispatch hits a third-party restriction
      console.warn("[Contact Action] Error dispatching auto-responder email:", autoReplyErr);
    }

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (err: unknown) {
    // Log complete stack trace internally
    console.error("[Security] Unexpected server error sending email:", err);
    // Return sanitized generic error
    return {
      success: false,
      error: "An unexpected error occurred while processing your request. Please try again later.",
    };
  }
}
