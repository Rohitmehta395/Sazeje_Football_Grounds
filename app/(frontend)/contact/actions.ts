"use server";

import { Resend } from "resend";
import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<ContactActionResult> {
  // 1. Server-side validation with Zod (defense-in-depth)
  const validationResult = contactSchema.safeParse(data);
  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Validation failed. Please check the fields and try again.",
      fieldErrors,
    };
  }

  const { name, email, message, topic } = validationResult.data;

  // 2. Fetch destination email (prioritize environment variable set by user, fallback to Payload Settings global)
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
      console.warn(
        "Could not read contactEmail from Settings global:",
        err
      );
    }
  }
  if (!toEmail) {
    toEmail = "info@sazejefootball.nl";
  }

  // 3. Check Resend API Key
  const apiKey = process.env.RESEND_API_KEY;
  if (
    !apiKey ||
    apiKey === "re_placeholder_key" ||
    apiKey === "your-resend-api-key" ||
    apiKey.startsWith("re_placeholder")
  ) {
    console.warn(
      "Resend API key is not configured or is a placeholder in .env.local."
    );
    return {
      success: false,
      error:
        "Resend API key is not configured. Please set RESEND_API_KEY in .env.local to enable email sending.",
    };
  }

  // 4. Send email via Resend
  try {
    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "SaZeJe Football <onboarding@resend.dev>";

    const topicLabel = topic ? `[${topic.toUpperCase()}] ` : "";
    const emailSubject = `[SaZeJe Football] ${topicLabel}Nieuw bericht van ${name}`;

    const { error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      text: `Nieuw contactbericht via SaZeJe Football\n\nOnderwerp: ${topic || "Algemeen"}\nNaam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DCD2BE; border-radius: 12px; background-color: #FBF9F4; color: #20241F;">
          <div style="border-bottom: 2px solid #2E8B84; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #20241F; margin: 0; font-size: 20px; letter-spacing: 0.5px;">SaZeJe Football — Contact</h2>
            ${topic ? `<span style="display: inline-block; margin-top: 8px; font-size: 11px; text-transform: uppercase; font-family: monospace; font-weight: bold; background: #e6f4f1; color: #1e6b65; padding: 4px 10px; border-radius: 9999px; border: 1px solid #b3ded8;">${topic}</span>` : ""}
          </div>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Afzender:</strong> ${name}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>E-mailadres:</strong> <a href="mailto:${email}" style="color: #2E8B84; text-decoration: none;">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #DCD2BE; margin: 20px 0;" />
          <h3 style="color: #20241F; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Bericht:</h3>
          <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #20241F; background: #F0ECE3; padding: 16px; border-radius: 8px; border: 1px solid #DCD2BE;">${message}</div>
          <p style="font-size: 11px; color: #6B716A; margin-top: 24px; text-align: center;">Verzonden via het contactformulier op sazejefootball.nl</p>
        </div>
      `,
    });

    if (resendError) {
      console.error("Resend API error:", resendError);
      return {
        success: false,
        error: `Failed to send email: ${resendError.message}`,
      };
    }

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (err: unknown) {
    console.error("Unexpected error sending email via Resend:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while sending your message.",
    };
  }
}
