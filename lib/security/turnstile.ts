/**
 * Cloudflare Turnstile token verification on the server.
 * Documentation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

export interface TurnstileVerificationResult {
  success: boolean;
  error?: string;
  hostname?: string;
  action?: string;
  challengeTs?: string;
}

/**
 * Verifies a Cloudflare Turnstile response token.
 *
 * @param token The token string provided by the client-side Turnstile widget.
 * @param remoteIp Optional client IP address.
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string
): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  // If Turnstile secret key is not configured, gracefully pass in non-production
  if (!secretKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Security] TURNSTILE_SECRET_KEY is not configured. Bypassing Turnstile verification in non-production."
      );
      return { success: true };
    }
    console.warn(
      "[Security] TURNSTILE_SECRET_KEY is missing in production environment."
    );
    return { success: true };
  }

  if (!token) {
    return {
      success: false,
      error: "Missing security verification token.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp && remoteIp !== "unknown") {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    if (!res.ok) {
      console.error(
        `[Security] Turnstile verify API returned HTTP ${res.status}`
      );
      return {
        success: false,
        error: "Verification service temporarily unavailable.",
      };
    }

    const data = await res.json();

    if (!data.success) {
      console.warn(
        "[Security] Turnstile validation failed:",
        data["error-codes"]
      );
      return {
        success: false,
        error: "Security verification failed. Please try again.",
      };
    }

    return {
      success: true,
      hostname: data.hostname,
      action: data.action,
      challengeTs: data.challenge_ts,
    };
  } catch (err) {
    console.error("[Security] Error verifying Turnstile token:", err);
    return {
      success: false,
      error: "Unable to verify security challenge.",
    };
  }
}
