"use client";

import { notFound } from "next/navigation";
import * as React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomeHero } from "@/components/hero/HomeHero";
import { PageHero } from "@/components/hero/PageHero";
import { GroundCard } from "@/components/grounds/GroundCard";
import { GroundsFilterBar, GroundsFilterValues } from "@/components/grounds/GroundsFilterBar";
import { GroundDetail } from "@/components/grounds/GroundDetail";
import { GoalCard } from "@/components/about/GoalCard";
import { GoalDetail } from "@/components/about/GoalDetail";
import { ScarfEntry } from "@/components/scarves/ScarfEntry";
import { ScarvesFilterBar, ScarvesFilterValues } from "@/components/scarves/ScarvesFilterBar";
import { ScarfCategoryChooser } from "@/components/scarves/ScarfCategoryChooser";
import { CountryDirectory } from "@/components/scarves/CountryDirectory";
import { ScarfPagination } from "@/components/scarves/ScarfPagination";
import { StadiumMap } from "@/components/map/StadiumMap";
import { Ground, Scarf, Goal, Country } from "@/types";
import { AlertTriangle, Moon, Sun } from "lucide-react";

// Mock Data
const MOCK_GROUNDS: Ground[] = [
  {
    id: "go-ahead-eagles",
    name: "De Adelaarshorst",
    club: "Go Ahead Eagles",
    country: "🇳🇱 Nederland",
    competition: "Eredivisie",
    lat: 52.2564,
    lng: 6.1722,
    description: "Sfeervol avondje Deventer in de karakteristieke Adelaarshorst met authentieke lichtmasten.",
    story: "Bezoek aan de Eredivisie kraker in Deventer. Een fantastische sfeer vanaf Vak B en authentieke Engelse uitstraling van het stadion met tribune dicht op het veld.",
    matchInfo: "Go Ahead Eagles vs. FC Utrecht (2-1) • 12 Oktober 2024 • 10.400 toeschouwers",
    visitDate: "12 OKT 2024",
    photo: "https://picsum.photos/seed/adelaarshorst/800/500",
    images: [
      "https://picsum.photos/seed/adelaarshorst-1/400/300",
      "https://picsum.photos/seed/adelaarshorst-2/400/300",
      "https://picsum.photos/seed/adelaarshorst-3/400/300",
    ],
    dateAdded: "2024-10-13",
  },
  {
    id: "borussia-dortmund",
    name: "Signal Iduna Park",
    club: "Borussia Dortmund",
    country: "🇩🇪 Duitsland",
    competition: "Bundesliga",
    lat: 51.4926,
    lng: 7.4519,
    description: "De Gelbe Wand in volle glorie met 25.000 uitzinnige fans op de Südtribüne.",
    story: "Bundesliga topwedstrijd meegemaakt vanaf de legendarische Gelbe Wand. Onvergetelijke geluidsmuur en indrukwekkende Tifo show vooraf.",
    matchInfo: "Borussia Dortmund vs. RB Leipzig (3-1) • 02 November 2024 • 81.365 toeschouwers",
    visitDate: "02 NOV 2024",
    photo: "https://picsum.photos/seed/dortmund/800/500",
    images: [
      "https://picsum.photos/seed/dortmund-1/400/300",
      "https://picsum.photos/seed/dortmund-2/400/300",
    ],
    dateAdded: "2024-11-03",
  },
  {
    id: "arsenal",
    name: "Emirates Stadium",
    club: "Arsenal FC",
    country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Engeland",
    competition: "Premier League",
    lat: 51.5549,
    lng: -0.1084,
    description: "Modern voetbaltempel in Noord-Londen met een prachtige architectuur en historisch gevoel.",
    story: "Londen voetbaltrip naar het Emirates Stadium. Fantastisch veld en bezoek aan het Arsenal museum voorafgaand aan de wedstrijd.",
    matchInfo: "Arsenal vs. Chelsea (2-0) • 15 December 2024 • 60.218 toeschouwers",
    visitDate: "15 DEC 2024",
    photo: "https://picsum.photos/seed/emirates/800/500",
    images: [
      "https://picsum.photos/seed/emirates-1/400/300",
    ],
    dateAdded: "2024-12-16",
  },
];

const MOCK_SCARF: Scarf = {
  id: "SCF-042",
  category: "new",
  club: "Go Ahead Eagles",
  country: "🇳🇱 Nederland",
  type: "Officiële Fanshop Sjaal",
  description: "Zware gebreide dubbelzijdige rood-gele supporters sjaal aangeschaft bij de officiële fanshop in Deventer.",
  stadium: "De Adelaarshorst",
  founded: "1920",
  trophies: "4x Landskampioen",
  funFact: "De Adelaarshorst is een van de oudste nog gebruikte stadions van Nederland op dezelfde plek.",
  purchaseDate: "12 Oktober 2024",
  photo: "https://picsum.photos/seed/gae-scarf/1200/400",
  dateAdded: "2024-10-13",
};

const MOCK_GOALS: Goal[] = [
  {
    id: "goal-1",
    number: 1,
    title: "50 Stadions Bezoeken in Europa",
    description: "Mijn hoofddoel is om minstens 50 unieke professionele voetbalstadions te bezoeken in Europa.",
    targetCount: 50,
    currentCount: 48,
    status: "in_progress",
    details: "Nog slechts 2 stadions te gaan! Gepland: Rayo Vallecano in Madrid en Celtic Park in Glasgow.",
  },
  {
    id: "goal-2",
    number: 2,
    title: "100 Sjaals Verzamelen",
    description: "Verzameling uitbreiden naar 100 officiële club sjaals uit minstens 15 verschillende landen.",
    targetCount: 100,
    currentCount: 100,
    status: "completed",
    details: "Behaald in november 2024 met het toevoegen van de Borussia Dortmund supporters sjaal!",
  },
];

const MOCK_COUNTRIES: Country[] = [
  { name: "Nederland", flag: "🇳🇱", count: 28 },
  { name: "Duitsland", flag: "🇩🇪", count: 18 },
  { name: "Engeland", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", count: 14 },
  { name: "Spanje", flag: "🇪🇸", count: 8 },
  { name: "Italië", flag: "🇮🇹", count: 6 },
];

export default function DevComponentsPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [groundsFilters, setGroundsFilters] = React.useState<GroundsFilterValues>({
    country: "Alle landen",
    competition: "Alle competities",
    club: "Alle clubs",
    sort: "date-desc",
  });
  const [scarvesFilters, setScarvesFilters] = React.useState<ScarvesFilterValues>({
    search: "Go Ahead",
    club: "Alle clubs",
  });
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-200">
      <SiteHeader activeHref="/dev/components" />

      <main className="pt-[72px] pb-[60px] max-w-[1160px] mx-auto px-[24px] space-y-16">
        {/* Banner */}
        <div className="bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 p-4 rounded-xl flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold text-sm m-0">
                PHASE 3 SCAFFOLDING PREVIEW — DO NOT DEPLOY TO PRODUCTION
              </p>
              <p className="text-xs opacity-90 m-0">
                This page (`/dev/components`) is for reviewing Phase 3 isolated components.
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 border border-border text-text font-mono text-xs font-semibold hover:border-accent cursor-pointer transition-colors"
          >
            {theme === "light" ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" /> Active Theme: Light
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-accent" /> Active Theme: Dark
              </>
            )}
          </button>
        </div>

        {/* 1. Hero Components */}
        <section className="space-y-6">
          <h2 className="font-bebas text-3xl text-azg border-b border-border pb-2">
            1. Hero Components
          </h2>
          <div>
            <h3 className="font-bebas text-xl text-text mb-3">HomeHero (Glass Panel + Stats + Accents)</h3>
            <HomeHero />
          </div>
          <div className="mt-8">
            <h3 className="font-bebas text-xl text-text mb-3">PageHero (Compact Variant)</h3>
            <PageHero
              title="STADION OVERZICHT"
              description="Bekijk alle bezochte stadions in Europa met verhalen en fotogalerijen."
            />
          </div>
        </section>

        {/* 2. Cards & Ground Components */}
        <section className="space-y-6">
          <h2 className="font-bebas text-3xl text-azg border-b border-border pb-2">
            2. Card & Ground Components
          </h2>

          <div>
            <h3 className="font-bebas text-xl text-text mb-3">
              GroundCard (Ticket-stub Card with .stub-cut notch detail)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_GROUNDS.map((ground) => (
                <GroundCard key={ground.id} ground={ground} isStatic={true} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-bebas text-xl text-text mb-3">GroundDetail View</h3>
            <GroundDetail ground={MOCK_GROUNDS[0]} />
          </div>
        </section>

        {/* 3. About & Goals Components */}
        <section className="space-y-6">
          <h2 className="font-bebas text-3xl text-azg border-b border-border pb-2">
            3. About & Goal Components
          </h2>

          <div>
            <h3 className="font-bebas text-xl text-text mb-3">GoalCard Grid</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_GOALS.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bebas text-xl text-text mb-3">GoalDetail View</h3>
            <GoalDetail goal={MOCK_GOALS[0]} />
          </div>
        </section>

        {/* 4. Scarves Components */}
        <section className="space-y-6">
          <h2 className="font-bebas text-3xl text-azg border-b border-border pb-2">
            4. Scarves Components
          </h2>

          <div>
            <h3 className="font-bebas text-xl text-text mb-3">ScarfCategoryChooser</h3>
            <ScarfCategoryChooser />
          </div>

          <div>
            <h3 className="font-bebas text-xl text-text mb-3">CountryDirectory & CountryLink</h3>
            <CountryDirectory countries={MOCK_COUNTRIES} />
          </div>

          <div>
            <h3 className="font-bebas text-xl text-text mb-3">ScarvesFilterBar</h3>
            <ScarvesFilterBar values={scarvesFilters} onChange={setScarvesFilters} />
          </div>

          <div>
            <h3 className="font-bebas text-xl text-text mb-3">
              ScarfEntry (Receipt-style Card with dashed rows & icon badges)
            </h3>
            <ScarfEntry scarf={MOCK_SCARF} />
          </div>

          <div>
            <h3 className="font-bebas text-xl text-text mb-3">ScarfPagination</h3>
            <ScarfPagination currentPage={page} totalPages={5} onPageChange={setPage} />
          </div>
        </section>

        {/* 5. Filter Bar Components */}
        <section className="space-y-6">
          <h2 className="font-bebas text-3xl text-azg border-b border-border pb-2">
            5. Filter Bar Components
          </h2>
          <div>
            <h3 className="font-bebas text-xl text-text mb-3">GroundsFilterBar</h3>
            <GroundsFilterBar values={groundsFilters} onChange={setGroundsFilters} />
          </div>
        </section>

        {/* 6. Map Component */}
        <section className="space-y-6">
          <h2 className="font-bebas text-3xl text-azg border-b border-border pb-2">
            6. StadiumMap Component (react-leaflet wrapper with ssr:false boundary)
          </h2>
          <StadiumMap grounds={MOCK_GROUNDS} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
