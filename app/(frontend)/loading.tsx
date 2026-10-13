import * as React from "react";
import { GroundsGridSkeleton } from "@/components/ui/CardSkeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Slideshow Skeleton */}
      <div className="w-full h-[400px] sm:h-[480px] bg-surface-2 animate-pulse flex items-center justify-center border-b border-border">
        <div className="max-w-[1160px] w-full mx-auto px-4 sm:px-6 space-y-4">
          <div className="h-4 w-36 bg-surface rounded-full" />
          <div className="h-12 w-96 max-w-full bg-surface rounded-lg" />
          <div className="h-5 w-80 max-w-full bg-surface rounded-full" />
        </div>
      </div>

      {/* Recent Grounds Section Skeleton */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-border animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-surface-2 rounded-md" />
            <div className="h-4 w-80 bg-surface-2 rounded-full" />
          </div>
          <div className="h-4 w-28 bg-surface-2 rounded-full" />
        </div>
        <GroundsGridSkeleton count={6} />
      </div>
    </div>
  );
}
