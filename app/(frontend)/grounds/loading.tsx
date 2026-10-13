import * as React from "react";
import { GroundsGridSkeleton } from "@/components/ui/CardSkeleton";

export default function GroundsLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Header Skeleton */}
      <div className="bg-surface border-b border-border py-10 md:py-14">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 animate-pulse">
          <div className="h-3.5 w-32 bg-surface-2 rounded-full mb-3" />
          <div className="h-9 w-72 bg-surface-2 rounded-lg mb-3" />
          <div className="h-4 w-96 max-w-full bg-surface-2 rounded-full" />
        </div>
      </div>

      {/* Grounds Grid Skeleton */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        <GroundsGridSkeleton count={6} />
      </div>
    </div>
  );
}
