import * as React from "react";
import { notFound } from "next/navigation";
import { ScarfCategoryDirectoryView } from "./ScarfCategoryDirectoryView";
import { getCountriesWithScarfCounts } from "@/lib/data";

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

  const countries = getCountriesWithScarfCounts(category);

  return (
    <ScarfCategoryDirectoryView category={category} countries={countries} />
  );
}
