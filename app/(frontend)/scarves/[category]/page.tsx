import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScarfCategoryDirectoryView } from "./ScarfCategoryDirectoryView";
import {
  getCountriesWithScarfCounts,
  getScarves,
  getScarvesPageContent,
} from "@/lib/data";
import { ScarvesGridSkeleton } from "@/components/ui/CardSkeleton";

export const revalidate = 60;

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
    return { title: "Scarf Collection | SaZeJe Groundhopping" };
  }

  const isNew = category === "new";
  const title = isNew
    ? "Nieuwe Sjaals & Fanshop Collectie | SaZeJe Groundhopping"
    : "Tweedehands Sjaals & Ruilcollectie | SaZeJe Groundhopping";
  const description = isNew
    ? "Bekijk alle nieuwe voetbalsjaals rechtstreeks gekocht in fanshops tijdens groundhop-reizen door Europa."
    : "Bekijk alle tweedehands en ruilsjaals van SaZeJe Groundhopping, beschikbaar voor ruil met verzamelaars.";

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
    <React.Suspense
      fallback={
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-8">
          <ScarvesGridSkeleton count={8} />
        </div>
      }
    >
      <ScarfCategoryDirectoryView
        category={category}
        countries={countries}
        scarves={scarves}
        scarvesPageContent={scarvesPageContent}
      />
    </React.Suspense>
  );
}
