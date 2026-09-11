import * as React from "react";

export function FootballIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="12 7.2 16.6 10.5 14.8 15.9 9.2 15.9 7.4 10.5" />
      <line x1="12" y1="2" x2="12" y2="7.2" />
      <line x1="21.5" y1="8.9" x2="16.6" y2="10.5" />
      <line x1="17.9" y1="20.1" x2="14.8" y2="15.9" />
      <line x1="6.1" y1="20.1" x2="9.2" y2="15.9" />
      <line x1="2.5" y1="8.9" x2="7.4" y2="10.5" />
    </svg>
  );
}

export function FootballPitchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 8.5h2.5v7H3" />
      <path d="M21 8.5h-2.5v7H21" />
    </svg>
  );
}

export function ScarfIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Horizontal wrapped loop */}
      <rect x="3" y="5" width="18" height="5" rx="1.5" />
      <line x1="8" y1="5" x2="8" y2="10" />
      <line x1="13" y1="5" x2="13" y2="10" />
      {/* Primary hanging tail with stripe and fringe */}
      <path d="M6 10v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7" />
      <line x1="6" y1="13.5" x2="11" y2="13.5" />
      <line x1="7.5" y1="18" x2="7.5" y2="20.5" />
      <line x1="9.5" y1="18" x2="9.5" y2="20.5" />
      {/* Secondary hanging tail with stripe and fringe */}
      <path d="M13 10v5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-5" />
      <line x1="13" y1="13" x2="18" y2="13" />
      <line x1="14.5" y1="16" x2="14.5" y2="18.5" />
      <line x1="16.5" y1="16" x2="16.5" y2="18.5" />
    </svg>
  );
}

export function StadiumIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Stadium outer arena structure */}
      <path d="M2 10.5C2 7.2 6.5 4.5 12 4.5s10 2.7 10 6v3c0 3.3-4.5 6-10 6s-10-2.7-10-6v-3z" />
      {/* Inner field pitch */}
      <ellipse cx="12" cy="12" rx="5.5" ry="2.2" />
      <line x1="12" y1="9.8" x2="12" y2="14.2" />
      {/* Grandstand structural pillar ribs */}
      <path d="M4 12.5v3" />
      <path d="M7.5 14.5v2.8" />
      <path d="M16.5 14.5v2.8" />
      <path d="M20 12.5v3" />
    </svg>
  );
}

export function ClubBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Classic football club crest shield */}
      <path d="M12 22s8-4 8-10V4.5L12 2 4 4.5V12c0 6 8 10 8 10z" />
      {/* Inner diagonal sash stripe */}
      <path d="M8 8.5l8 8" />
      {/* Club star */}
      <circle cx="12" cy="7.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function OfficialScarfIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Horizontal wrapped loop */}
      <rect x="3" y="4" width="18" height="5" rx="1.5" />
      <line x1="8" y1="4" x2="8" y2="9" />
      <line x1="13" y1="4" x2="13" y2="9" />
      {/* Left hanging tail with woven bar stripes */}
      <path d="M6 9v8a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V9" />
      <line x1="6" y1="12.5" x2="11" y2="12.5" />
      <line x1="7.5" y1="18" x2="7.5" y2="20.5" />
      <line x1="9.5" y1="18" x2="9.5" y2="20.5" />
      {/* Right hanging tail with woven bar stripes */}
      <path d="M13 9v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V9" />
      <line x1="13" y1="12.5" x2="18" y2="12.5" />
      <line x1="14.5" y1="16" x2="14.5" y2="18.5" />
      <line x1="16.5" y1="16" x2="16.5" y2="18.5" />
      {/* Official Matchday Rosette / Star Tag */}
      <polygon
        points="19 2 19.8 3.8 21.8 4 20.3 5.4 20.7 7.4 19 6.4 17.3 7.4 17.7 5.4 16.2 4 18.2 3.8"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function SwapScarvesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* First scarf crossing from top-left to bottom-right */}
      <path d="M3.5 5.5l14 14" strokeWidth="3" />
      <line x1="16" y1="21" x2="18" y2="23" strokeWidth="2" />
      <line x1="18" y1="19" x2="20" y2="21" strokeWidth="2" />
      {/* Second scarf crossing from top-right to bottom-left */}
      <path d="M20.5 5.5l-14 14" strokeWidth="3" />
      <line x1="8" y1="21" x2="6" y2="23" strokeWidth="2" />
      <line x1="6" y1="19" x2="4" y2="21" strokeWidth="2" />
      {/* Center trade badge with swap arrows */}
      <circle cx="12" cy="12" r="4.5" fill="var(--surface)" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.8 10.5h4.4m0 0l-1.5-1.5M14.2 10.5l-1.5 1.5" strokeWidth="1.4" />
      <path d="M14.2 13.5H9.8m0 0l1.5-1.5M9.8 13.5l1.5 1.5" strokeWidth="1.4" />
    </svg>
  );
}

