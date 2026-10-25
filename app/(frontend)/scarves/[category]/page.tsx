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

const VALID_CATEGORIES = [
  "new",
  "secondhand",
  "special-editions",
  "matchdays",
] as const;

type ValidCategory = (typeof VALID_CATEGORIES)[number];

export async function generateStaticParams() {
  return [
    { category: "new" },
    { category: "secondhand" },
    { category: "special-editions" },
    { category: "matchdays" },
  ];
}

export async function generateMetadata({
  params,
}: ScarfCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ValidCategory)) {
    return { title: "Scarf Collection | SaZeJe Groundhopping" };
  }

  let title = "Sjaalcollectie | SaZeJe Groundhopping";
  let description = "Bekijk de complete voetbalsjaal collectie van SaZeJe Groundhopping.";

  if (category === "new") {
    title = "Nieuwe Sjaals & Fanshop Collectie | SaZeJe Groundhopping";
    description =
      "Bekijk alle nieuwe voetbalsjaals rechtstreeks gekocht in fanshops tijdens groundhop-reizen door Europa.";
  } else if (category === "secondhand") {
    title = "Tweedehands Sjaals & Ruilcollectie | SaZeJe Groundhopping";
    description =
      "Bekijk alle tweedehands en ruilsjaals van SaZeJe Groundhopping, beschikbaar voor ruil met verzamelaars.";
  } else if (category === "special-editions") {
    title = "Speciale Edities & Jubileumsjaals | SaZeJe Groundhopping";
    description =
      "Ontdek zeldzame en gelimiteerde speciale edities, jubileum- en herdenkingssjaals uit heel Europa.";
  } else if (category === "matchdays") {
    title = "Wedstrijddagen & Matchday Sjaals | SaZeJe Groundhopping";
    description =
      "Bekijk officiële wedstrijddag- en duelsjaals van historische Europese affiches, bekerfinales en derby's.";
  }

  return {
    title,
    description,
  };
}

export default async function ScarfCategoryPage({ params }: ScarfCategoryPageProps) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as ValidCategory)) {
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
