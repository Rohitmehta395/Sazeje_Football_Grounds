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

  const { name, email, message } = validationResult.data;

  // 2. Fetch destination email from Payload Settings global (dynamic admin-editable)
  let toEmail = process.env.CONTACT_EMAIL || "info@sazejefootball.nl";
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
      "Could not read contactEmail from Settings global, using fallback:",
      err
    );
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

    const { error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[SaZeJe Football] Nieuw bericht van ${name}`,
      text: `Nieuw contactbericht via SaZeJe Football\n\nNaam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-top: 0;">Nieuw bericht via SaZeJe Football</h2>
          <p style="margin: 4px 0;"><strong>Afzender:</strong> ${name}</p>
          <p style="margin: 4px 0;"><strong>E-mailadres:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3 style="color: #334155; margin-bottom: 8px;">Bericht:</h3>
          <p style="white-space: pre-wrap; color: #1e293b; background: #f8fafc; padding: 15px; border-radius: 6px;">${message}</p>
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
