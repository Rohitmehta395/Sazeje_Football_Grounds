import * as React from "react";
import { getGrounds } from "@/lib/data";
import { GroundsClientView } from "./GroundsClientView";

export default async function GroundsPage() {
  const grounds = await getGrounds();
  return <GroundsClientView grounds={grounds} />;
}
