import { Goal } from "@/types";
import { getPayload } from "payload";
import config from "@payload-config";

function mapPayloadGoal(doc: Record<string, unknown>): Goal {
  return {
    id: String(doc.number ?? doc.id),
    number: Number(doc.number) || 0,
    title: String(doc.title || ""),
    description: String(doc.description || ""),
    targetCount: Number(doc.targetCount) || 0,
    currentCount: Number(doc.currentCount) || 0,
    status: (doc.status as "in_progress" | "completed") || "in_progress",
    details: doc.details ? String(doc.details) : undefined,
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
