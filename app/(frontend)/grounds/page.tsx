import * as React from "react";
import type { Metadata } from "next";
import { getGrounds, getGroundsPageContent } from "@/lib/data";
import { GroundsClientView } from "./GroundsClientView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getGroundsPageContent();
  const title = pageContent.seo?.metaTitle || pageContent.hero.title || "Grounds & Stadiums Archive | SaZeJe Football";
  const description =
    pageContent.seo?.metaDescription ||
    pageContent.hero.subtitle ||
    "An extensive archive of visited football grounds across the Netherlands and Europe.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: pageContent.hero.heroImage ? [{ url: pageContent.hero.heroImage }] : undefined,
    },
  };
}

export default async function GroundsPage() {
  const [grounds, groundsPageContent] = await Promise.all([
    getGrounds(),
    getGroundsPageContent(),
  ]);

  return (
    <GroundsClientView
      grounds={grounds}
      groundsPageContent={groundsPageContent}
    />
  );
}
