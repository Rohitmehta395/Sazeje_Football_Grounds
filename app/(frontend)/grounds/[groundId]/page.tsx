import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GroundDetailView } from "./GroundDetailView";
import { getGrounds, getGroundById, getRelatedGrounds } from "@/lib/data";

export const dynamicParams = true;

export interface GroundDetailPageProps {
  params: Promise<{
    groundId: string;
  }>;
}

export async function generateMetadata({
  params,
}: GroundDetailPageProps): Promise<Metadata> {
  const { groundId } = await params;
  const ground = await getGroundById(groundId);

  if (!ground) {
    return {
      title: "Ground Not Found | SaZeJe Football",
    };
  }

  const title = `${ground.name} (${ground.club}) | SaZeJe Football`;
  const description =
    ground.description ||
    `Groundhopping expedition report for ${ground.name} in ${ground.country}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ground.photo ? [{ url: ground.photo }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const grounds = await getGrounds();
  return grounds.map((ground) => ({
    groundId: ground.id,
  }));
}

export default async function GroundDetailPage({ params }: GroundDetailPageProps) {
  const { groundId } = await params;
  const ground = await getGroundById(groundId);

  if (!ground) {
    notFound();
  }

  const relatedGrounds = await getRelatedGrounds(ground, 3);

  return (
    <GroundDetailView ground={ground} relatedGrounds={relatedGrounds} />
  );
}
