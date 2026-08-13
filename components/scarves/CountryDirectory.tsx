import * as React from "react";
import { Country } from "@/types";
import { CountryLink } from "./CountryLink";

export interface CountryDirectoryProps {
  countries: Country[];
  baseHref?: string;
  heading?: string;
}

export function CountryDirectory({
  countries,
  baseHref = "/scarves/new",
  heading = "LANDEN OVERZICHT",
}: CountryDirectoryProps) {
  return (
    <div className="space-y-3">
      {heading && (
        <div className="font-mono text-[13px] tracking-[0.08em] uppercase text-azg my-[30px] pb-[8px] border-b border-border first:mt-0">
          {heading}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px_24px]">
        {countries.map((country) => (
          <CountryLink
            key={country.name}
            country={country}
            href={`${baseHref}/${encodeURIComponent(country.name)}`}
          />
        ))}
      </div>
    </div>
  );
}
