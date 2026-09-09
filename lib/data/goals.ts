import { Goal } from "@/types";
import { getPayload } from "payload";
import config from "@payload-config";

function mapPayloadGoal(doc: Record<string, unknown>): Goal {
  return {
    id: String(doc.number ?? doc.id),
    number: Number(doc.number) || 0,
    title: String(doc.title || ""),
    titleEn: doc.titleEn ? String(doc.titleEn) : undefined,
    description: String(doc.description || ""),
    descriptionEn: doc.descriptionEn ? String(doc.descriptionEn) : undefined,
    targetCount: Number(doc.targetCount) || 0,
    currentCount: Number(doc.currentCount) || 0,
    status: (doc.status as "in_progress" | "completed") || "in_progress",
    details: doc.details ? String(doc.details) : undefined,
    detailsEn: doc.detailsEn ? String(doc.detailsEn) : undefined,
  };
}

export async function getGoals(): Promise<Goal[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "goals",
      depth: 0,
      limit: 100,
      sort: "number",
    });
    return docs.map(mapPayloadGoal);
  } catch (error) {
    console.error("Error fetching goals from Payload:", error);
    return [];
  }
}

export async function getGoalById(idOrNumber: string): Promise<Goal | undefined> {
  try {
    const payload = await getPayload({ config });
    // Handle "doel1", "1", or database ID
    const cleanNumStr = idOrNumber.toLowerCase().startsWith("doel")
      ? idOrNumber.toLowerCase().replace("doel", "")
      : idOrNumber;

    const num = Number(cleanNumStr);
    const isNum = !isNaN(num) && Number.isInteger(num);

    const { docs } = await payload.find({
      collection: "goals",
      where: isNum
        ? {
            or: [
              {
                number: {
                  equals: num,
                },
              },
              {
                id: {
                  equals: num,
                },
              },
            ],
          }
        : undefined,
      depth: 0,
      limit: 1,
    });

    return docs[0] ? mapPayloadGoal(docs[0]) : undefined;
  } catch (error) {
    console.error(`Error fetching goal ${idOrNumber} from Payload:`, error);
    return undefined;
  }
}

export async function getAdjacentGoals(currentNumber: number): Promise<{
  prevGoal?: Goal;
  nextGoal?: Goal;
  totalGoals: number;
}> {
  const allGoals = await getGoals();
  const sorted = [...allGoals].sort((a, b) => a.number - b.number);
  const currentIndex = sorted.findIndex((g) => g.number === currentNumber);

  return {
    prevGoal: currentIndex > 0 ? sorted[currentIndex - 1] : undefined,
    nextGoal: currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined,
    totalGoals: sorted.length,
  };
}

