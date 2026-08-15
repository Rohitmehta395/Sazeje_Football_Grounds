import * as React from "react";
import { getGrounds } from "@/lib/data";
import { MapClientView } from "./MapClientView";

export default async function MapPage() {
  const grounds = await getGrounds();
  return <MapClientView grounds={grounds} />;
}
