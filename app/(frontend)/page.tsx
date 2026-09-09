import * as React from "react";
import { getGrounds, getLatestGrounds, getScarves, getGoals } from "@/lib/data";
import { UEFA_COUNTRIES } from "@/lib/data/countries";
import { HomeClientView } from "./HomeClientView";

export default async function HomePage() {
  const [grounds, latestGrounds, scarves, goals] = await Promise.all([
    getGrounds(),
    getLatestGrounds(8),
    getScarves(),
    getGoals(),
  ]);

  // Compute country counts for grounds
  const countriesWithGroundCounts = UEFA_COUNTRIES.map((c) => {
    const count = grounds.filter(
      (g) => g.country.toLowerCase() === c.name.toLowerCase()
    ).length;
    return {
      ...c,
      count,
    };
  }).sort((a, b) => b.count - a.count);

  return (
    <HomeClientView
      grounds={grounds}
      latestGrounds={latestGrounds}
      scarves={scarves}
      goals={goals}
      countries={countriesWithGroundCounts}
    />
  );
}
