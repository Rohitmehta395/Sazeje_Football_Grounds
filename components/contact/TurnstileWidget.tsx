"use client";

import * as React from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: (errorCode?: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

// Cloudflare public test key (always passes, renders official Cloudflare badge)
const CLOUDFLARE_TEST_SITE_KEY = "1x00000000000000000000AA";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export function TurnstileWidget({
  onVerify,
  onExpire,
  className = "",
}: TurnstileWidgetProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | null>(null);

  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || CLOUDFLARE_TEST_SITE_KEY;

  React.useEffect(() => {
    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;

      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
          "expired-callback": () => {
            onExpire?.();
          },
          "error-callback": (err) => {
            console.warn("[Turnstile] Widget error:", err);
            if (process.env.NODE_ENV !== "production") {
              onVerify("dev-token-bypass");
            }
          },
          theme: "auto",
        });
        widgetIdRef.current = id;
      } catch (e) {
        console.warn("[Turnstile] Error rendering widget:", e);
      }
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existingScript = document.getElementById("cloudflare-turnstile-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderWidget();
      };
      document.head.appendChild(script);
    } else {
      const checkInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkInterval);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, [siteKey, onVerify, onExpire]);

  return (
    <div className={className}>
      <div ref={containerRef} id="cf-turnstile-container" />
    </div>
  );
}
