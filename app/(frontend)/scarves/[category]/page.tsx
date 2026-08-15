import * as React from "react";
import { notFound } from "next/navigation";
import { ScarfCategoryDirectoryView } from "./ScarfCategoryDirectoryView";
import { getCountriesWithScarfCounts, getScarves } from "@/lib/data";

export interface ScarfCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return [{ category: "new" }, { category: "secondhand" }];
}

export default async function ScarfCategoryPage({ params }: ScarfCategoryPageProps) {
  const { category } = await params;

  if (category !== "new" && category !== "secondhand") {
    notFound();
  }

  const scarves = await getScarves({ category });
  const countries = getCountriesWithScarfCounts(category, scarves);

  return (
    <ScarfCategoryDirectoryView category={category} countries={countries} />
  );
}
