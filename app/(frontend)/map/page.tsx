import * as React from "react";
import type { Metadata } from "next";
import { getGrounds, getMapPageContent } from "@/lib/data";
import { MapClientView } from "./MapClientView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getMapPageContent();
  const title =
    pageContent.seo?.metaTitle ||
    pageContent.hero.title ||
    "Stadionkaart Europa | SaZeJe Football";
  const description =
    pageContent.seo?.metaDescription ||
    pageContent.hero.subtitle ||
    "Interactieve kaart van alle bezochte voetbalstadions in Nederland en Europa door SaZeJe Football.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: pageContent.hero.heroImage
        ? [{ url: pageContent.hero.heroImage }]
        : undefined,
    },
  };
}

export default async function MapPage() {
  const [grounds, mapPageContent] = await Promise.all([
    getGrounds(),
    getMapPageContent(),
  ]);

  return (
    <MapClientView
      grounds={grounds}
      mapPageContent={mapPageContent}
    />
  );
}
