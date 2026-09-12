"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import { sanitizeInput, escapeHtml } from "@/lib/security/sanitize";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

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
  let clientIp = "127.0.0.1";
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const realIp = headerList.get("x-real-ip");
    const cfIp = headerList.get("cf-connecting-ip");
    clientIp = (forwardedFor?.split(",")[0] || realIp || cfIp || "127.0.0.1").trim();
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
  const cleanName = sanitizeInput(rawData.name);
  const cleanEmail = sanitizeInput(rawData.email).toLowerCase();
  const cleanTopic = rawData.topic ? sanitizeInput(rawData.topic) : "general";
  const cleanMessage = sanitizeInput(rawData.message);

  const safeHtmlName = escapeHtml(cleanName);
  const safeHtmlEmail = escapeHtml(cleanEmail);
  const safeHtmlTopic = escapeHtml(cleanTopic);
  const safeHtmlMessage = escapeHtml(cleanMessage);

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
        message: cleanMessage,
      });
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

    const topicLabel = cleanTopic ? `[${cleanTopic.toUpperCase()}] ` : "";
    const emailSubject = `[SaZeJe Football] ${topicLabel}Nieuw bericht van ${cleanName}`;

    const { error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: emailSubject,
      text: `Nieuw contactbericht via SaZeJe Football\n\nOnderwerp: ${cleanTopic}\nNaam: ${cleanName}\nE-mail: ${cleanEmail}\n\nBericht:\n${cleanMessage}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DCD2BE; border-radius: 12px; background-color: #FBF9F4; color: #20241F;">
          <div style="border-bottom: 2px solid #2E8B84; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #20241F; margin: 0; font-size: 20px; letter-spacing: 0.5px;">SaZeJe Football — Contact</h2>
            <span style="display: inline-block; margin-top: 8px; font-size: 11px; text-transform: uppercase; font-family: monospace; font-weight: bold; background: #e6f4f1; color: #1e6b65; padding: 4px 10px; border-radius: 9999px; border: 1px solid #b3ded8;">${safeHtmlTopic}</span>
          </div>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Afzender:</strong> ${safeHtmlName}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>E-mailadres:</strong> <a href="mailto:${safeHtmlEmail}" style="color: #2E8B84; text-decoration: none;">${safeHtmlEmail}</a></p>
          <hr style="border: 0; border-top: 1px solid #DCD2BE; margin: 20px 0;" />
          <h3 style="color: #20241F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Bericht:</h3>
          <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #20241F; background: #F0ECE3; padding: 16px; border-radius: 8px; border: 1px solid #DCD2BE;">${safeHtmlMessage}</div>
          <p style="font-size: 11px; color: #6B716A; margin-top: 24px; text-align: center;">Verzonden via het beveiligde contactformulier op sazejefootball.nl</p>
        </div>
      `,
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
