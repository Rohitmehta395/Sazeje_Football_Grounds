import * as React from "react";
import { notFound } from "next/navigation";
import { ScarvesCountryBrowseView } from "./ScarvesCountryBrowseView";
import { getCountries, getCountryByName, getScarves } from "@/lib/data";

export interface ScarfCountryBrowsePageProps {
  params: Promise<{
    category: string;
    country: string;
  }>;
}

export async function generateStaticParams() {
  const categories = ["new", "secondhand"];
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

export default async function ScarfCountryBrowsePage({ params }: ScarfCountryBrowsePageProps) {
  const { category, country } = await params;
  const decodedCountryName = decodeURIComponent(country);

  if (category !== "new" && category !== "secondhand") {
    notFound();
  }

  const countryObj = getCountryByName(decodedCountryName);
  const scarves = getScarves({ category, country: decodedCountryName });

  return (
    <ScarvesCountryBrowseView
      category={category}
      decodedCountryName={decodedCountryName}
      countryObj={countryObj}
      scarves={scarves}
    />
  );
}
