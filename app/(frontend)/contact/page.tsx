import * as React from "react";
import type { Metadata } from "next";
import { getContactPageContent, getSettings } from "@/lib/data";
import { ContactClientView } from "./ContactClientView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getContactPageContent();
  const title =
    pageContent.seo?.metaTitle ||
    pageContent.hero.title ||
    "Contact & Community | SaZeJe Football";
  const description =
    pageContent.seo?.metaDescription ||
    pageContent.hero.subtitle ||
    "Neem contact op met SaZeJe Football voor stadiontips, sjaalruil voorstellen of samenwerkingen.";

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

export default async function ContactPage() {
  const [contactContent, settings] = await Promise.all([
    getContactPageContent(),
    getSettings(),
  ]);

  return (
    <ContactClientView
      contactContent={contactContent}
      settings={settings}
    />
  );
}
