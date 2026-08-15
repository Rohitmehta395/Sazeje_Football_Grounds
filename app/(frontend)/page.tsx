import * as React from "react";
import { getGrounds, getLatestGrounds } from "@/lib/data";
import { HomeClientView } from "./HomeClientView";

export default async function HomePage() {
  const grounds = await getGrounds();
  const latestGrounds = await getLatestGrounds(6);

  return <HomeClientView grounds={grounds} latestGrounds={latestGrounds} />;
}
