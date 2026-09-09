import * as React from "react";
import { getGoals, getAboutContent, getGrounds, getScarves } from "@/lib/data";
import { AboutClientView } from "./AboutClientView";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [aboutContent, goals, grounds, scarves] = await Promise.all([
    getAboutContent(),
    getGoals(),
    getGrounds(),
    getScarves(),
  ]);

  // Compute live statistics for groundhopper profile
  const uniqueCountries = new Set(
    grounds.map((g) => g.country).filter(Boolean)
  );

  const completedGoals = goals.filter(
    (g) => g.status === "completed" || g.currentCount >= g.targetCount
  ).length;

  const stats = {
    groundsCount: grounds.length,
    countriesCount: uniqueCountries.size,
    scarvesCount: scarves.length,
    completedGoalsCount: completedGoals,
    totalGoalsCount: goals.length,
  };

  return (
    <AboutClientView
      aboutContent={aboutContent}
      goals={goals}
      stats={stats}
    />
  );
}
