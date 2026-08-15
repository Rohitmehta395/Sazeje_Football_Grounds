import { Ground } from "@/types";
import { getPayload } from "payload";
import config from "@payload-config";

function mapPayloadGround(doc: any): Ground {
  const photoUrl =
    typeof doc.photo === "object" && doc.photo?.url
      ? doc.photo.url
      : typeof doc.photo === "string"
      ? doc.photo
      : "";

  const images = Array.isArray(doc.images)
    ? doc.images
        .map((item: any) =>
          typeof item?.image === "object" ? item.image?.url : item?.image
        )
        .filter(Boolean)
    : [];

  return {
    id: doc.slug || String(doc.id),
    name: doc.name || "",
    club: doc.club || "",
    country: doc.country || "",
    competition: doc.competition || "",
    lat: Number(doc.lat) || 0,
    lng: Number(doc.lng) || 0,
    description: doc.description || "",
    story: doc.story || "",
    matchInfo: doc.matchInfo || "",
    visitDate: doc.visitDate || "",
    extra: doc.extra || undefined,
    photo: photoUrl,
    images: images.length > 0 ? images : photoUrl ? [photoUrl] : [],
    dateAdded: doc.dateAdded || doc.createdAt || new Date().toISOString(),
  };
}

export async function getGrounds(): Promise<Ground[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "grounds",
      where: {
        published: {
          equals: true,
        },
      },
      depth: 1,
      limit: 1000,
      sort: "-dateAdded",
    });
    return docs.map(mapPayloadGround);
  } catch (error) {
    console.error("Error fetching grounds from Payload:", error);
    return [];
  }
}

export async function getGroundById(idOrSlug: string): Promise<Ground | undefined> {
  try {
    const payload = await getPayload({ config });
    const isNum = !isNaN(Number(idOrSlug)) && Number.isInteger(Number(idOrSlug));
    const { docs } = await payload.find({
      collection: "grounds",
      where: {
        and: [
          {
            published: {
              equals: true,
            },
          },
          {
            or: [
              {
                slug: {
                  equals: idOrSlug,
                },
              },
              ...(isNum
                ? [
                    {
                      id: {
                        equals: Number(idOrSlug),
                      },
                    },
                  ]
                : []),
            ],
          },
        ],
      },
      depth: 1,
      limit: 1,
    });
    return docs[0] ? mapPayloadGround(docs[0]) : undefined;
  } catch (error) {
    console.error(`Error fetching ground ${idOrSlug} from Payload:`, error);
    return undefined;
  }
}

export async function getLatestGrounds(limit = 10): Promise<Ground[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "grounds",
      where: {
        published: {
          equals: true,
        },
      },
      depth: 1,
      limit,
      sort: "-dateAdded",
    });
    return docs.map(mapPayloadGround);
  } catch (error) {
    console.error("Error fetching latest grounds from Payload:", error);
    return [];
  }
}
