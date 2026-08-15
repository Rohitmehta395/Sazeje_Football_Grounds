import * as React from "react";
import { getGrounds, getLatestGrounds, getScarves } from "@/lib/data";
import { HomeClientView } from "./HomeClientView";

export default async function HomePage() {
  const grounds = await getGrounds();
  const latestGrounds = await getLatestGrounds(6);
  const scarves = await getScarves();

  return (
    <HomeClientView
      grounds={grounds}
      latestGrounds={latestGrounds}
      scarvesCount={scarves.length}
    />
  );
}
