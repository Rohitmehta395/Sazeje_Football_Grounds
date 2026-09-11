import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScarfCategoryDirectoryView } from "./ScarfCategoryDirectoryView";
import {
  getCountriesWithScarfCounts,
  getScarves,
  getScarvesPageContent,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export interface ScarfCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return [{ category: "new" }, { category: "secondhand" }];
}

export async function generateMetadata({
  params,
}: ScarfCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (category !== "new" && category !== "secondhand") {
    return { title: "Scarf Collection | SaZeJe Football" };
  }

  const isNew = category === "new";
  const title = isNew
    ? "Nieuwe Sjaals & Fanshop Collectie | SaZeJe Football"
    : "Tweedehands Sjaals & Ruilcollectie | SaZeJe Football";
  const description = isNew
    ? "Bekijk alle nieuwe voetbalsjaals rechtstreeks gekocht in fanshops tijdens groundhop-reizen door Europa."
    : "Bekijk alle tweedehands en ruilsjaals van SaZeJe Football, beschikbaar voor ruil met verzamelaars.";

  return {
    title,
    description,
  };
}

export default async function ScarfCategoryPage({ params }: ScarfCategoryPageProps) {
  const { category } = await params;

  if (category !== "new" && category !== "secondhand") {
    notFound();
  }

  const [scarves, scarvesPageContent] = await Promise.all([
    getScarves({ category }),
    getScarvesPageContent(),
  ]);

  const countries = getCountriesWithScarfCounts(category, scarves);

  return (
    <ScarfCategoryDirectoryView
      category={category}
      countries={countries}
      scarves={scarves}
      scarvesPageContent={scarvesPageContent}
    />
  );
}
