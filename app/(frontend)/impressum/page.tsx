import * as React from "react";
import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { ImpressumClientView } from "./ImpressumClientView";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Impressum & Developer | SaZeJe Groundhopping";
  const description =
    "Impressum, developer contact information (Rohit Mehta), legal notice, and liability disclaimer for SaZeJe Football.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: "/Hero_Image.jpg" }],
    },
    alternates: {
      canonical: "/impressum",
    },
  };
}

export default async function ImpressumPage() {
  const settings = await getSettings();

  return <ImpressumClientView settings={settings} />;
}
