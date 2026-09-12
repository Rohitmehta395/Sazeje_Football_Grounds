import { escapeHtml } from "@/lib/security/sanitize";

export interface ContactEmailPayload {
  name: string;
  email: string;
  topic?: string;
  message: string;
  lang?: "nl" | "en";
  siteUrl?: string;
}

export interface GeneratedEmail {
  subject: string;
  text: string;
  html: string;
}

const TOPIC_LABELS: Record<string, { nl: string; en: string; icon: string }> = {
  ground_tip: { nl: "Stadiontip", en: "Ground Tip", icon: "🏟️" },
  scarf_swap: { nl: "Sjaalruil Voorstel", en: "Scarf Swap Proposal", icon: "🧣" },
  collaboration: { nl: "Samenwerking", en: "Collaboration", icon: "🤝" },
  general: { nl: "Algemeen Bericht", en: "General Inquiry", icon: "💬" },
};

function getTopicInfo(topicKey?: string) {
  const normalized = (topicKey || "general").toLowerCase();
  return TOPIC_LABELS[normalized] || TOPIC_LABELS.general;
}

/**
 * Generate a beautifully styled, custom-themed auto-responder confirmation email
 * matching SaZeJe Football's brand identity (forest green, warm sand, amber gold).
 */
export function generateContactConfirmationEmail(payload: ContactEmailPayload): GeneratedEmail {
  const isEn = payload.lang === "en";
  const siteUrl = (payload.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://sazejefootball.nl").replace(/\/+$/, "");
  
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message);

  const topicInfo = getTopicInfo(payload.topic);
  const topicLabel = isEn ? topicInfo.en : topicInfo.nl;
  const topicWithIcon = `${topicInfo.icon} ${topicLabel}`;

  const subject = isEn
    ? `Thank you for contacting SaZeJe Football, ${payload.name}!`
    : `Bedankt voor je bericht aan SaZeJe Football, ${payload.name}!`;

  const preheader = isEn
    ? `We have received your message regarding "${topicLabel}" and will get back to you shortly.`
    : `We hebben je bericht over "${topicLabel}" in goede orde ontvangen en nemen zo snel mogelijk contact met je op.`;

  const text = isEn
    ? `Hi ${payload.name},

Thank you for reaching out to SaZeJe Football! We have safely received your message.

--- YOUR SUBMISSION DETAILS ---
Topic: ${topicWithIcon}
Email: ${payload.email}

Message:
"${payload.message}"

--- WHAT TO EXPECT ---
We typically review and reply to messages within 24 to 48 hours (often faster on match days!).
If this is a scarf swap proposal or stadium recommendation, we can't wait to check it out!

Need to provide extra details or photos? You can reply directly to this email.

In the meantime, explore our latest groundhopping trips and scarf collection:
• Football Grounds: ${siteUrl}/grounds
• Scarf Collection: ${siteUrl}/scarves
• Interactive Map: ${siteUrl}/map

Best regards,
SaZeJe Football Team
${siteUrl}`
    : `Beste ${payload.name},

Bedankt voor je bericht aan SaZeJe Football! We hebben je inzending in goede orde ontvangen.

--- DETAILS VAN JE BERICHT ---
Onderwerp: ${topicWithIcon}
E-mailadres: ${payload.email}

Je bericht:
"${payload.message}"

--- WAT KUN JE VERWACHTEN? ---
We proberen elk bericht binnen 24 tot 48 uur te beantwoorden (op wedstrijddagen vaak nog sneller!).
Betreft het een sjaalruil of een tip voor een bijzonder stadion? Dan kijken we er extra naar uit!

Heb je aanvullende informatie of foto's? Je kunt direct antwoorden op deze e-mail.

Neem intussen gerust een kijkje tussen onze nieuwste stadionbezoeken en sjaalcollectie:
• Stadions & Verslagen: ${siteUrl}/grounds
• Sjaalcollectie: ${siteUrl}/scarves
• Interactieve Kaart: ${siteUrl}/map

Sportieve groet,
SaZeJe Football Team
${siteUrl}`;

  const html = `<!DOCTYPE html>
<html lang="${isEn ? "en" : "nl"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F0ECE3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #20241F;">
  <!-- Preheader text (hidden in visual, shown in inbox preview) -->
  <div style="display: none; font-size: 1px; color: #F0ECE3; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0ECE3; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FBF9F4; border: 1px solid #DCD2BE; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(32, 36, 31, 0.06);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #1E382B; border-top: 4px solid #B98B3E; padding: 28px 32px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <span style="font-size: 28px; line-height: 1; display: inline-block; margin-bottom: 6px;">⚽</span>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; font-family: 'Bebas Neue', 'Trebuchet MS', Arial, sans-serif;">
                      SaZeJe <span style="color: #D9A94F;">Football</span>
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #93A8A0; font-family: monospace;">
                      ${isEn ? "Groundhopping & Scarf Collection" : "Voetbalreizen & Sjaalcollectie"}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation Hero -->
          <tr>
            <td style="padding: 32px 32px 16px 32px;">
              <div style="display: inline-block; background-color: #e6f4f1; border: 1px solid #b3ded8; border-radius: 9999px; padding: 4px 12px; margin-bottom: 14px;">
                <span style="font-size: 12px; font-weight: 700; color: #1e6b65; font-family: monospace;">
                  ✓ ${isEn ? "MESSAGE RECEIVED" : "BERICHT ONTVANGEN"}
                </span>
              </div>
              <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #20241F; line-height: 1.3;">
                ${isEn ? `Thank you for reaching out, ${safeName}!` : `Bedankt voor je bericht, ${safeName}!`}
              </h2>
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #4A5049;">
                ${isEn
                  ? "We have successfully received your message via our website. A copy of your submission is detailed below for your records."
                  : "We hebben je bericht via onze website in goede orde ontvangen. Hieronder vind je een overzicht van je inzending voor je eigen administratie."}
              </p>
            </td>
          </tr>

          <!-- Submission Summary Card -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F0ECE3; border: 1px solid #DCD2BE; border-radius: 12px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px dashed #DCD2BE;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: #6B716A; font-family: monospace;">
                          ${isEn ? "Topic" : "Onderwerp"}
                        </td>
                        <td align="right">
                          <span style="font-size: 12px; font-weight: 700; background-color: #FFFFFF; color: #1E382B; border: 1px solid #DCD2BE; padding: 3px 10px; border-radius: 9999px; display: inline-block;">
                            ${escapeHtml(topicWithIcon)}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px dashed #DCD2BE;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: #6B716A; font-family: monospace;">
                          ${isEn ? "Sender Email" : "Jouw E-mailadres"}
                        </td>
                        <td align="right" style="font-size: 13px; font-weight: 600; color: #20241F;">
                          ${safeEmail}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <span style="display: block; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: #6B716A; font-family: monospace; margin-bottom: 8px;">
                      ${isEn ? "Your Message:" : "Jouw Bericht:"}
                    </span>
                    <div style="background-color: #FBF9F4; border-left: 3px solid #2E8B84; border-radius: 6px; padding: 12px 14px; font-size: 13px; line-height: 1.6; color: #20241F; white-space: pre-wrap; word-break: break-word;">
${safeMessage}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps Note -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(63, 93, 80, 0.08); border-left: 4px solid #3F5D50; border-radius: 8px; padding: 14px 16px;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #1E382B;">
                      ⏱️ ${isEn ? "What happens next?" : "Wat gebeurt er nu?"}
                    </h4>
                    <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #2F483A;">
                      ${isEn
                        ? "We typically review every message within <strong>24 to 48 hours</strong>. If your message is about a scarf swap or ground recommendation, we can't wait to review the details!"
                        : "We streven ernaar om elk bericht binnen <strong>24 tot 48 uur</strong> te beantwoorden. Gaat het om een sjaalruil of een stadiontip? Dan kijken we hier met extra veel plezier naar!"}
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 1.4; color: #536B61;">
                      ${isEn
                        ? "💡 <em>Have photos or extra info? Simply reply directly to this email.</em>"
                        : "💡 <em>Wil je nog foto's of extra info toevoegen? Beantwoord gerust direct deze e-mail.</em>"}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Discovery Links / CTAs -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <p style="margin: 0 0 14px 0; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; color: #6B716A; text-align: center; font-family: monospace;">
                ${isEn ? "Explore SaZeJe Football" : "Ontdek SaZeJe Football"}
              </p>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 4px;">
                          <a href="${siteUrl}/grounds" target="_blank" style="display: inline-block; background-color: #3F5D50; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 700; font-family: monospace; padding: 10px 18px; border-radius: 8px; text-align: center;">
                            🏟️ ${isEn ? "Explore Grounds" : "Stadions Bekijken"}
                          </a>
                        </td>
                        <td align="center" style="padding: 4px;">
                          <a href="${siteUrl}/scarves" target="_blank" style="display: inline-block; background-color: #B98B3E; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 700; font-family: monospace; padding: 10px 18px; border-radius: 8px; text-align: center;">
                            🧣 ${isEn ? "Scarf Collection" : "Sjaalcollectie"}
                          </a>
                        </td>
                        <td align="center" style="padding: 4px;">
                          <a href="${siteUrl}/map" target="_blank" style="display: inline-block; background-color: #E9E2D3; color: #20241F; border: 1px solid #DCD2BE; text-decoration: none; font-size: 12px; font-weight: 700; font-family: monospace; padding: 10px 18px; border-radius: 8px; text-align: center;">
                            🗺️ ${isEn ? "Groundhop Map" : "Stadionkaart"}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #141B19; border-top: 1px solid #31413B; padding: 24px 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #E7EDE9;">
                SaZeJe Football
              </p>
              <p style="margin: 0 0 14px 0; font-size: 11px; line-height: 1.5; color: #93A8A0;">
                ${isEn
                  ? "Personal matchday stories, groundhopping chronicles & authentic scarf collection from across Europe."
                  : "Persoonlijke reisverslagen van stadionbezoeken en sjaalcollectie door heel Europa."}
              </p>
              <p style="margin: 0; font-size: 11px; color: #62756E;">
                <a href="${siteUrl}" target="_blank" style="color: #74BC9E; text-decoration: none; font-weight: 600;">sazejefootball.nl</a>
                &nbsp;•&nbsp;
                <a href="${siteUrl}/contact" target="_blank" style="color: #74BC9E; text-decoration: none; font-weight: 600;">${isEn ? "Contact Page" : "Contactpagina"}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

/**
 * Generate a clean, branded email notification sent to the website administrator/owner.
 */
export function generateAdminNotificationEmail(payload: ContactEmailPayload): GeneratedEmail {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message);

  const topicInfo = getTopicInfo(payload.topic);
  const topicWithIcon = `${topicInfo.icon} ${topicInfo.nl}`;

  const subject = `[SaZeJe Football] [${(payload.topic || "general").toUpperCase()}] Nieuw bericht van ${payload.name}`;

  const text = `Nieuw contactbericht via SaZeJe Football\n\n` +
    `Afzender: ${payload.name}\n` +
    `E-mailadres: ${payload.email}\n` +
    `Onderwerp: ${topicWithIcon}\n\n` +
    `Bericht:\n${payload.message}\n\n` +
    `---\nVerzonden via het contactformulier op sazejefootball.nl`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F0ECE3; margin: 0; padding: 24px; color: #20241F;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DCD2BE; border-radius: 12px; background-color: #FBF9F4;">
    <div style="border-bottom: 2px solid #2E8B84; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="color: #20241F; margin: 0; font-size: 20px; letter-spacing: 0.5px;">SaZeJe Football — Nieuw Contactbericht</h2>
      <span style="display: inline-block; margin-top: 8px; font-size: 12px; font-family: monospace; font-weight: bold; background: #e6f4f1; color: #1e6b65; padding: 4px 10px; border-radius: 9999px; border: 1px solid #b3ded8;">
        ${escapeHtml(topicWithIcon)}
      </span>
    </div>
    
    <p style="margin: 6px 0; font-size: 14px;"><strong>Afzender:</strong> ${safeName}</p>
    <p style="margin: 6px 0; font-size: 14px;"><strong>E-mailadres:</strong> <a href="mailto:${safeEmail}" style="color: #2E8B84; text-decoration: none; font-weight: bold;">${safeEmail}</a></p>
    
    <hr style="border: 0; border-top: 1px solid #DCD2BE; margin: 20px 0;" />
    
    <h3 style="color: #20241F; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; font-family: monospace;">Bericht:</h3>
    <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #20241F; background: #F0ECE3; padding: 16px; border-radius: 8px; border: 1px solid #DCD2BE;">${safeMessage}</div>
    
    <p style="font-size: 11px; color: #6B716A; margin-top: 24px; text-align: center; font-family: monospace;">
      Verzonden via het beveiligde contactformulier op sazejefootball.nl
    </p>
  </div>
</body>
</html>`;

  return { subject, text, html };
}
