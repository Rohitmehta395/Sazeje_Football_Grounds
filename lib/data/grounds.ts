import { Ground } from "@/types";
import { getPayload } from "payload";
import config from "@payload-config";

function mapPayloadGround(doc: Record<string, unknown>): Ground {
  const photo = doc.photo as Record<string, unknown> | string | undefined;
  const photoUrl =
    typeof photo === "object" && photo && "url" in photo && typeof photo.url === "string"
      ? photo.url
      : typeof photo === "string"
      ? photo
      : "";

  const rawImages = doc.images as Array<Record<string, unknown>> | undefined;
  const images = Array.isArray(rawImages)
    ? rawImages
        .map((item) => {
          const img = item?.image as Record<string, unknown> | string | undefined;
          return typeof img === "object" && img && "url" in img && typeof img.url === "string"
            ? img.url
            : typeof img === "string"
            ? img
            : undefined;
        })
        .filter((url): url is string => Boolean(url))
    : [];

  let clubName = "";
  let clubLogoUrl: string | undefined = undefined;

  const club = doc.club as Record<string, unknown> | string | undefined;
  if (typeof club === "object" && club !== null) {
    clubName = typeof club.name === "string" ? club.name : "";
    const logo = club.logo as Record<string, unknown> | string | undefined;
    if (typeof logo === "object" && logo !== null && "url" in logo && typeof logo.url === "string") {
      clubLogoUrl = logo.url;
    } else if (typeof logo === "string") {
      clubLogoUrl = logo;
    }
  } else if (typeof club === "string") {
    clubName = club;
  }

  return {
    id: String(doc.slug || doc.id),
    name: String(doc.name || ""),
    club: clubName,
    clubLogo: clubLogoUrl,
    country: String(doc.country || ""),
    competition: String(doc.competition || ""),
    lat: Number(doc.lat) || 0,
    lng: Number(doc.lng) || 0,
    description: String(doc.description || ""),
    descriptionEn: doc.descriptionEn ? String(doc.descriptionEn) : undefined,
    story: String(doc.story || ""),
    storyEn: doc.storyEn ? String(doc.storyEn) : undefined,
    matchInfo: String(doc.matchInfo || ""),
    matchInfoEn: doc.matchInfoEn ? String(doc.matchInfoEn) : undefined,
    visitDate: String(doc.visitDate || ""),
    extra: doc.extra ? String(doc.extra) : undefined,
    extraEn: doc.extraEn ? String(doc.extraEn) : undefined,
    photo: photoUrl,
    images: images.length > 0 ? images : photoUrl ? [photoUrl] : [],
    dateAdded: String(doc.dateAdded || doc.createdAt || new Date().toISOString()),
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
      depth: 2,
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
      depth: 2,
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
      depth: 2,
      limit,
      sort: "-dateAdded",
    });
    return docs.map(mapPayloadGround);
  } catch (error) {
    console.error("Error fetching latest grounds from Payload:", error);
    return [];
  }
}

export async function getRelatedGrounds(currentGround: Ground, limit = 3): Promise<Ground[]> {
  try {
    const allGrounds = await getGrounds();
    return allGrounds
      .filter((g) => g.id !== currentGround.id)
      .sort((a, b) => {
        // Priority 1: Same country
        const aCountry = a.country === currentGround.country ? 2 : 0;
        const bCountry = b.country === currentGround.country ? 2 : 0;
        // Priority 2: Same competition
        const aComp = a.competition === currentGround.competition ? 1 : 0;
        const bComp = b.competition === currentGround.competition ? 1 : 0;
        return bCountry + bComp - (aCountry + aComp);
      })
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching related grounds:", error);
    return [];
  }
}

