"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { getCountryByName, getCountryFlagUrl } from "@/lib/data/countries";

export interface CountryFlagProps {
  countryName: string;
  customFlagUrl?: string;
  className?: string;
  alt?: string;
  fallbackToEmoji?: boolean;
}

/**
 * CountryFlag Component
 *
 * Fallback priority:
 * 1. Custom uploaded flag image (`customFlagUrl`)
 * 2. Reliable country-code-based CDN flag asset (`https://flagcdn.com/w80/{code}.png`)
 * 3. Country emoji flag as graceful network/offline fallback
 * 4. Renders null if no flag can be resolved (preventing broken image icons)
 */
export function CountryFlag({
  countryName,
  customFlagUrl,
  className = "w-5 h-3.5 object-cover rounded-[2px] shadow-xs border border-white/20 shrink-0",
  alt,
  fallbackToEmoji = true,
}: CountryFlagProps) {
  const [customFailed, setCustomFailed] = React.useState(false);
  const [cdnFailed, setCdnFailed] = React.useState(false);

  // Reset error states if props change
  React.useEffect(() => {
    setCustomFailed(false);
    setCdnFailed(false);
  }, [countryName, customFlagUrl]);

  const country = React.useMemo(
    () => getCountryByName(countryName),
    [countryName]
  );

  const cdnUrl = React.useMemo(
    () => getCountryFlagUrl(countryName),
    [countryName]
  );

  const altText = alt || `${country?.nameEn || countryName} flag`;

  // 1. Try Custom Uploaded Flag
  if (customFlagUrl && !customFailed) {
    return (
      <img
        src={customFlagUrl}
        alt={altText}
        loading="lazy"
        decoding="async"
        onError={() => setCustomFailed(true)}
        className={className}
      />
    );
  }

  // 2. Try Country-Code Flag Asset (FlagCDN)
  if (cdnUrl && !cdnFailed) {
    return (
      <img
        src={cdnUrl}
        alt={altText}
        loading="lazy"
        decoding="async"
        onError={() => setCdnFailed(true)}
        className={className}
      />
    );
  }

  // 3. Fallback to Country Emoji if supported
  if (fallbackToEmoji && country?.flag) {
    return (
      <span
        role="img"
        aria-label={altText}
        className="text-base leading-none shrink-0 inline-block align-middle select-none"
      >
        {country.flag}
      </span>
    );
  }

  // 4. No flag resolvable -> return null gracefully
  return null;
}
