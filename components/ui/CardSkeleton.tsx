import * as React from "react";

/**
 * Image Placeholder Icon (matching standard Flowbite / modern SVG image placeholder)
 */
export function ImageIcon({ className = "w-10 h-10 text-border" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      />
    </svg>
  );
}

/**
 * Horizontal Card Skeleton (matching user's exact specification)
 */
export function HorizontalCardSkeleton() {
  return (
    <div
      role="status"
      className="p-5 bg-surface border border-border rounded-2xl shadow-card space-y-6 animate-pulse md:space-y-0 md:space-x-6 md:flex md:items-center"
    >
      <div className="flex items-center justify-center w-full h-44 bg-surface-2 rounded-xl sm:w-80 shrink-0">
        <ImageIcon className="w-11 h-11 text-text-muted/40" />
      </div>
      <div className="w-full space-y-3">
        <div className="h-3 bg-surface-2 rounded-full w-44 mb-4" />
        <div className="h-2.5 bg-surface-2 rounded-full max-w-[480px]" />
        <div className="h-2.5 bg-surface-2 rounded-full max-w-[520px]" />
        <div className="h-2.5 bg-surface-2 rounded-full max-w-[440px]" />
        <div className="h-2.5 bg-surface-2 rounded-full max-w-[460px]" />
        <div className="h-2.5 bg-surface-2 rounded-full max-w-[320px]" />
      </div>
      <span className="sr-only">Laden...</span>
    </div>
  );
}

/**
 * GroundCard Skeleton matching GroundCard structure & ticket-stub styling
 */
export function GroundCardSkeleton() {
  return (
    <div
      role="status"
      className="bg-surface border border-border/80 rounded-2xl shadow-card overflow-hidden flex flex-col h-full animate-pulse"
    >
      {/* Stadium Photo Banner */}
      <div className="h-[185px] w-full bg-surface-2 flex items-center justify-center relative">
        <ImageIcon className="w-10 h-10 text-text-muted/40" />
        <div className="absolute top-3 left-3 h-5 w-20 rounded-full bg-border/80" />
        <div className="absolute bottom-2.5 left-3 right-3 h-6 rounded bg-border/60" />
      </div>

      {/* Ticket-stub Cut Detail */}
      <div className="h-0 relative border-t-2 border-dashed border-border mx-[14px]">
        <div className="absolute -top-[9px] -left-[23px] w-[18px] h-[18px] rounded-full bg-bg border border-border" />
        <div className="absolute -top-[9px] -right-[23px] w-[18px] h-[18px] rounded-full bg-bg border border-border" />
      </div>

      {/* Card Body */}
      <div className="p-[16px_18px_18px] flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Competition strip */}
          <div className="h-2.5 bg-surface-2 rounded-full w-24 mb-3" />
          {/* Stadium Title */}
          <div className="h-6 bg-surface-2 rounded-md w-3/4 mb-2" />
        </div>

        <div>
          {/* Club row */}
          <div className="pt-2.5 border-t border-dashed border-border/80 flex items-center justify-between">
            <div className="h-2.5 bg-surface-2 rounded-full w-12" />
            <div className="h-3 bg-surface-2 rounded-full w-28" />
          </div>

          {/* Date & Action footer */}
          <div className="flex justify-between items-center mt-3 pt-1">
            <div className="h-3 bg-surface-2 rounded-full w-20" />
            <div className="h-3 bg-surface-2 rounded-full w-24" />
          </div>
        </div>
      </div>
      <span className="sr-only">Laden...</span>
    </div>
  );
}

/**
 * ScarfCard Skeleton matching ScarfCard 21/8 photo aspect ratio and info layout
 */
export function ScarfCardSkeleton() {
  return (
    <div
      role="status"
      className="bg-surface rounded-2xl border border-border/80 shadow-card flex flex-col justify-between overflow-hidden h-full animate-pulse"
    >
      <div>
        {/* Scarf Photo Banner (21:8) */}
        <div className="relative w-full aspect-[21/8] bg-surface-2 flex items-center justify-center border-b border-border/80">
          <ImageIcon className="w-9 h-9 text-text-muted/40" />
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          {/* Header Row: Country badge + Type */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-5 w-24 bg-surface-2 rounded-full" />
            <div className="h-4 w-16 bg-surface-2 rounded-full" />
          </div>

          {/* Club Name */}
          <div className="h-6 bg-surface-2 rounded-md w-3/5" />

          {/* Scarf Description Lines */}
          <div className="space-y-2 pt-1">
            <div className="h-2 bg-surface-2 rounded-full max-w-[480px]" />
            <div className="h-2 bg-surface-2 rounded-full max-w-[420px]" />
            <div className="h-2 bg-surface-2 rounded-full max-w-[360px]" />
          </div>

          {/* Metadata pill box */}
          <div className="mt-2 p-3 rounded-xl bg-surface-2/60 border border-border/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-2.5 bg-surface-2 rounded-full w-16" />
              <div className="h-2.5 bg-surface-2 rounded-full w-24" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-2.5 bg-surface-2 rounded-full w-20" />
              <div className="h-2.5 bg-surface-2 rounded-full w-28" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="px-4 py-3 bg-surface-2/40 border-t border-border/70 flex items-center justify-between">
        <div className="h-2.5 bg-surface-2 rounded-full w-16" />
        <div className="h-3 bg-surface-2 rounded-full w-20" />
      </div>
      <span className="sr-only">Laden...</span>
    </div>
  );
}

/**
 * GoalCard Skeleton matching GoalCard milestone card styling
 */
export function GoalCardSkeleton() {
  return (
    <div
      role="status"
      className="bg-surface border border-border rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-card animate-pulse relative overflow-hidden"
    >
      <div>
        {/* Top meta strip */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="h-5 w-20 bg-surface-2 rounded-full" />
          <div className="h-5 w-16 bg-surface-2 rounded-full" />
        </div>

        {/* Goal Title */}
        <div className="h-6 bg-surface-2 rounded-md w-3/4 mb-3" />

        {/* Description Lines */}
        <div className="space-y-2 mb-5">
          <div className="h-2.5 bg-surface-2 rounded-full max-w-[400px]" />
          <div className="h-2.5 bg-surface-2 rounded-full max-w-[340px]" />
          <div className="h-2.5 bg-surface-2 rounded-full max-w-[280px]" />
        </div>

        {/* Progress Bar Container */}
        <div className="p-3.5 rounded-xl bg-surface-2/60 border border-border/60 mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-2.5 bg-surface-2 rounded-full w-14" />
            <div className="h-2.5 bg-surface-2 rounded-full w-10" />
          </div>
          <div className="h-2.5 w-full bg-surface-2 rounded-full" />
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-dashed border-border/80 flex items-center justify-between">
        <div className="h-3 bg-surface-2 rounded-full w-20" />
        <div className="h-3 bg-surface-2 rounded-full w-24" />
      </div>
      <span className="sr-only">Laden...</span>
    </div>
  );
}

/**
 * Grid of GroundCard skeletons
 */
export function GroundsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[26px]">
      {Array.from({ length: count }).map((_, i) => (
        <GroundCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Grid of ScarfCard skeletons
 */
export function ScarvesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ScarfCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Grid of GoalCard skeletons
 */
export function GoalsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <GoalCardSkeleton key={i} />
      ))}
    </div>
  );
}
