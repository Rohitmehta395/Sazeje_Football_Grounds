import * as React from "react";
import { getGoals } from "@/lib/data";
import { AboutClientView } from "./AboutClientView";

export default async function AboutPage() {
  const goals = await getGoals();
  return <AboutClientView goals={goals} />;
}
