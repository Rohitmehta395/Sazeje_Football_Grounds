"use client";

import dynamic from "next/dynamic";
import { Ground } from "@/types";

export interface StadiumMapProps {
  grounds: Ground[];
  className?: string;
}

const StadiumMapInnerDynamic = dynamic(
  () => import("./StadiumMapInner").then((mod) => mod.StadiumMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-[560px] rounded border border-border bg-surface-2 flex items-center justify-center text-text-muted font-mono text-xs shadow-card">
        Loading Stadium Map...
      </div>
    ),
  }
);

export function StadiumMap(props: StadiumMapProps) {
  return <StadiumMapInnerDynamic {...props} />;
}
