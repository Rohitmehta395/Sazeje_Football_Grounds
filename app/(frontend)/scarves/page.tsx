import * as React from "react";
import type { Metadata } from "next";
import { getScarves, getScarvesPageContent } from "@/lib/data";
import { ScarvesClientView } from "./ScarvesClientView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getScarvesPageContent();
  const title =
    pageContent.seo?.metaTitle ||
    pageContent.hero.title ||
    "Sjaalcollectie | SaZeJe Football";
  const description =
    pageContent.seo?.metaDescription ||
    pageContent.hero.subtitle ||
    "Verzameling van officiële en tweedehands voetbalsjaals uit de hele wereld.";

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

export default async function ScarvesPage() {
  const [scarves, scarvesPageContent] = await Promise.all([
    getScarves(),
    getScarvesPageContent(),
  ]);

  return (
    <ScarvesClientView
      scarves={scarves}
      scarvesPageContent={scarvesPageContent}
    />
  );
}
