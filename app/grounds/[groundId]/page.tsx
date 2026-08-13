import * as React from "react";
import { notFound } from "next/navigation";
import { GroundDetailView } from "./GroundDetailView";
import { getGrounds, getGroundById } from "@/lib/data";

export interface GroundDetailPageProps {
  params: Promise<{
    groundId: string;
  }>;
}

export async function generateStaticParams() {
  const grounds = getGrounds();
  return grounds.map((ground) => ({
    groundId: ground.id,
  }));
}

export default async function GroundDetailPage({ params }: GroundDetailPageProps) {
  const { groundId } = await params;
  const ground = getGroundById(groundId);

  if (!ground) {
    notFound();
  }

  return <GroundDetailView ground={ground} />;
}
