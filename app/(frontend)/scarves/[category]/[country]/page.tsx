import * as React from "react";
import { notFound } from "next/navigation";
import { ScarvesCountryBrowseView } from "./ScarvesCountryBrowseView";
import { getCountries, getCountryByName, getScarves } from "@/lib/data";

export const dynamicParams = true;
export const revalidate = 60;

export interface ScarfCountryBrowsePageProps {
  params: Promise<{
    category: string;
    country: string;
  }>;
}

const VALID_CATEGORIES = [
  "new",
  "secondhand",
  "special-editions",
  "matchdays",
] as const;

export async function generateStaticParams() {
  const categories = VALID_CATEGORIES;
  const countries = getCountries();

  const paramsList: { category: string; country: string }[] = [];
  for (const cat of categories) {
    for (const c of countries) {
      paramsList.push({
        category: cat,
        country: encodeURIComponent(c.name),
      });
    }
  }
  return paramsList;
}

export default async function ScarfCountryBrowsePage({
  params,
}: ScarfCountryBrowsePageProps) {
  const { category, country } = await params;
  const decodedCountryName = decodeURIComponent(country);

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    notFound();
  }

  const countryObj = getCountryByName(decodedCountryName);
  const scarves = await getScarves({ category, country: decodedCountryName });

  return (
    <ScarvesCountryBrowseView
      category={category}
      decodedCountryName={decodedCountryName}
      countryObj={countryObj}
      scarves={scarves}
    />
  );
}
