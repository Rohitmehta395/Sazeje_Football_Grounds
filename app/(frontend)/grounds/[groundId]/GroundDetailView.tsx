"use client";

import * as React from "react";
import { Ground } from "@/types";
import { GroundDetail } from "@/components/grounds/GroundDetail";

export interface GroundDetailViewProps {
  ground: Ground;
  relatedGrounds?: Ground[];
}

export function GroundDetailView({ ground, relatedGrounds }: GroundDetailViewProps) {
  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
      <GroundDetail ground={ground} relatedGrounds={relatedGrounds} />
    </div>
  );
}
