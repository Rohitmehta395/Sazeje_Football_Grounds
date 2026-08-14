import * as React from "react";
import { notFound } from "next/navigation";
import { GoalDetailView } from "./GoalDetailView";
import { getGoals, getGoalById } from "@/lib/data";

export interface GoalDetailPageProps {
  params: Promise<{
    goalId: string;
  }>;
}

export async function generateStaticParams() {
  const goals = getGoals();
  return goals.map((goal) => ({
    goalId: goal.id,
  }));
}

export default async function GoalDetailPage({ params }: GoalDetailPageProps) {
  const { goalId } = await params;
  const goal = getGoalById(goalId);

  if (!goal) {
    notFound();
  }

  return <GoalDetailView goal={goal} />;
}
