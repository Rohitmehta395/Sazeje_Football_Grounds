import { Scarf, ScarfCategory } from "@/types";
import { getPayload } from "payload";
import config from "@payload-config";

export interface ScarfFilterParams {
  category?: "new" | "secondhand" | string;
  country?: string;
  club?: string;
  search?: string;
}

function mapPayloadScarf(doc: any): Scarf {
  const photoUrl =
    typeof doc.photo === "object" && doc.photo?.url
      ? doc.photo.url
      : typeof doc.photo === "string"
      ? doc.photo
      : "";

  return {
    id: String(doc.id),
    category: doc.category as ScarfCategory,
    club: doc.club || "",
    country: doc.country || "",
    type: doc.type || "",
    description: doc.description || "",
    stadium: doc.stadium || "",
    founded: doc.founded || "",
    trophies: doc.trophies || "",
    funFact: doc.funFact || "",
    purchaseDate: doc.purchaseDate || undefined,
    photo: photoUrl,
    dateAdded: doc.dateAdded || doc.createdAt || new Date().toISOString(),
  };
}

export async function getScarves(filter?: ScarfFilterParams): Promise<Scarf[]> {
  try {
    const payload = await getPayload({ config });
    const where: any = {};

    if (filter?.category) {
      where.category = { equals: filter.category };
    }
    if (filter?.country) {
      where.country = { equals: filter.country };
    }
    if (filter?.club) {
      where.club = { equals: filter.club };
    }

    const { docs } = await payload.find({
      collection: "scarves",
      where: Object.keys(where).length > 0 ? where : undefined,
      depth: 1,
      limit: 1000,
      sort: "-dateAdded",
    });

    let list = docs.map(mapPayloadScarf);

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (s) =>
          s.club.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q))
      );
    }

    return list;
  } catch (error) {
    console.error("Error fetching scarves from Payload:", error);
    return [];
  }
}

export async function getScarfById(id: string): Promise<Scarf | undefined> {
  try {
    const payload = await getPayload({ config });
    const isNum = !isNaN(Number(id)) && Number.isInteger(Number(id));
    if (!isNum) return undefined;

    const doc = await payload.findByID({
      collection: "scarves",
      id: Number(id),
      depth: 1,
    });
    return doc ? mapPayloadScarf(doc) : undefined;
  } catch (error) {
    console.error(`Error fetching scarf ${id} from Payload:`, error);
    return undefined;
  }
}

export async function getScarfCountsByCategory(): Promise<{
  new: number;
  secondhand: number;
}> {
  try {
    const payload = await getPayload({ config });
    const newCount = await payload.count({
      collection: "scarves",
      where: {
        category: {
          equals: "new",
        },
      },
    });
    const secondhandCount = await payload.count({
      collection: "scarves",
      where: {
        category: {
          equals: "secondhand",
        },
      },
    });
    return {
      new: newCount.totalDocs,
      secondhand: secondhandCount.totalDocs,
    };
  } catch (error) {
    console.error("Error fetching scarf counts from Payload:", error);
    return { new: 0, secondhand: 0 };
  }
}
