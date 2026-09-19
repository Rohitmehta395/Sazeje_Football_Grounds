import { Scarf, ScarfCategory } from "@/types";
import { getPayload } from "payload";
import config from "@payload-config";

export interface ScarfFilterParams {
  category?: "new" | "secondhand" | string;
  country?: string;
  club?: string;
  search?: string;
}

function mapPayloadScarf(doc: Record<string, unknown>): Scarf {
  const photo = doc.photo as Record<string, unknown> | string | undefined;
  const photoUrl =
    typeof photo === "object" && photo && "url" in photo && typeof photo.url === "string"
      ? photo.url
      : typeof photo === "string"
      ? photo
      : "";

  return {
    id: String(doc.id),
    category: doc.category as ScarfCategory,
    club: String(doc.club || ""),
    country: String(doc.country || ""),
    type: String(doc.type || ""),
    description: String(doc.description || ""),
    descriptionEn: doc.descriptionEn ? String(doc.descriptionEn) : undefined,
    stadium: String(doc.stadium || ""),
    founded: String(doc.founded || ""),
    trophies: String(doc.trophies || ""),
    trophiesEn: doc.trophiesEn ? String(doc.trophiesEn) : undefined,
    funFact: String(doc.funFact || ""),
    funFactEn: doc.funFactEn ? String(doc.funFactEn) : undefined,
    photo: photoUrl,
    dateAdded: String(doc.dateAdded || doc.createdAt || new Date().toISOString()),
  };
}

export const DEFAULT_SCARVES: Scarf[] = [
  {
    id: "s1",
    category: "new",
    club: "FC Barcelona",
    country: "Spanje",
    type: "Matchday Sjaal",
    description: "Officiële matchday-sjaal gekocht bij Camp Nou, editie seizoen 2024/25 in traditionele blaugrana-kleuren.",
    descriptionEn: "Official matchday scarf purchased at Camp Nou, 2024/25 edition featuring iconic blaugrana stripes.",
    stadium: "Camp Nou",
    founded: "1899",
    trophies: "5x Champions League, 27x Spaans landskampioen",
    trophiesEn: "5x Champions League, 27x La Liga Champions",
    funFact: "Het clublied 'Cant del Barça' wordt voorafgaand aan elke thuiswedstrijd uit volle borst meegezongen.",
    funFactEn: "The anthem 'Cant del Barça' is sung in Catalan by the entire stadium before every home fixture.",
    photo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
    dateAdded: "2025-03-15",
  },
  {
    id: "s2",
    category: "new",
    club: "Liverpool FC",
    country: "Engeland",
    type: "Klassieke Jacquard Sjaal",
    description: "Straatverkoper net buiten Anfield Road, klassiek rood-geel ontwerp met 'You'll Never Walk Alone'.",
    descriptionEn: "Acquired outside Anfield Road, classic red and gold jacquard design featuring 'You'll Never Walk Alone'.",
    stadium: "Anfield",
    founded: "1892",
    trophies: "6x Champions League, 19x Engels landskampioen",
    trophiesEn: "6x Champions League, 19x Premier League Champions",
    funFact: "De Kop tribune staat wereldwijd bekend om de indrukwekkende sjaalzee tijdens het clublied.",
    funFactEn: "The Kop stand is famous worldwide for the sea of raised scarves during 'You'll Never Walk Alone'.",
    photo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
    dateAdded: "2025-01-21",
  },
  {
    id: "s3",
    category: "secondhand",
    club: "Borussia Dortmund",
    country: "Duitsland",
    type: "Vintage Südtribüne Sjaal",
    description: "Gevonden op een ruilbeurs in het Ruhrgebied, jaren '90 ontwerp met het historische BVB logo.",
    descriptionEn: "Traded at a Ruhr collectors fair, 90s vintage design with the historic BVB crest.",
    stadium: "Signal Iduna Park",
    founded: "1909",
    trophies: "1x Champions League, 8x Duits landskampioen",
    trophiesEn: "1x Champions League, 8x Bundesliga Champions",
    funFact: "De Gele Muur biedt plaats aan 25.000 staande supporters die massaal met sjaals zwaaien.",
    funFactEn: "The Yellow Wall hosts 25,000 standing fans who wave scarves in unison on matchdays.",
    photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    dateAdded: "2024-11-05",
  },
  {
    id: "s4",
    category: "secondhand",
    club: "Ajax",
    country: "Nederland",
    type: "Retro Kampioenssjaal",
    description: "Klassieke retro sjaal verkregen via een mede-groundhopper, herinnering aan historische Europese avonden.",
    descriptionEn: "Classic retro scarf obtained through a fellow groundhopper, commemorating European cup nights.",
    stadium: "Johan Cruijff ArenA",
    founded: "1900",
    trophies: "4x Champions League, 36x Nederlands landskampioen",
    trophiesEn: "4x Champions League, 36x Eredivisie Champions",
    funFact: "In Amsterdam is het traditie om retro sjaals generaties lang door te geven aan jonge fans.",
    funFactEn: "In Amsterdam retro scarves are often cherished family heirlooms passed down to young supporters.",
    photo: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80",
    dateAdded: "2024-10-02",
  },
  {
    id: "s5",
    category: "new",
    club: "AC Milan",
    country: "Italië",
    type: "Curva Sud Winter Sjaal",
    description: "Officiële dik gebreide rossoneri sjaal gekocht voor de Curva Sud bij San Siro op een ijskoude decemberavond.",
    descriptionEn: "Heavy-knit official rossoneri scarf bought for the Curva Sud at San Siro on a chilly December evening.",
    stadium: "San Siro",
    founded: "1899",
    trophies: "7x Champions League, 19x Italiaans landskampioen",
    trophiesEn: "7x Champions League, 19x Serie A Champions",
    funFact: "De rood-zwarte banen symboliseren vuur en de angst die tegenstanders moeten voelen.",
    funFactEn: "The red and black stripes originally symbolized fire and the fear opponents would feel.",
    photo: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=800&q=80",
    dateAdded: "2024-04-12",
  },
  {
    id: "s6",
    category: "secondhand",
    club: "Club Brugge",
    country: "België",
    type: "Vintage Blauw-Zwart Sjaal",
    description: "Klassieke vintage sjaal geruild met een lokale fan bij café 't Gezelleke in Brugge.",
    descriptionEn: "Classic vintage scarf traded with a local supporter at a Bruges pub near the ground.",
    stadium: "Jan Breydelstadion",
    founded: "1891",
    trophies: "18x Belgisch landskampioen",
    trophiesEn: "18x Belgian Pro League Champions",
    funFact: "De blauw-zwarte clubkleuren dateren al uit 1902 toen twee Brugse clubs fuseerden.",
    funFactEn: "The blue-and-black colors date back to 1902 following a local club merger.",
    photo: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
    dateAdded: "2024-02-20",
  },
];

function filterScarvesList(list: Scarf[], filter?: ScarfFilterParams): Scarf[] {
  let result = [...list];
  if (filter?.category) {
    result = result.filter((s) => s.category.toLowerCase() === filter.category?.toLowerCase());
  }
  if (filter?.country) {
    result = result.filter((s) => s.country.toLowerCase() === filter.country?.toLowerCase());
  }
  if (filter?.club) {
    result = result.filter((s) => s.club.toLowerCase() === filter.club?.toLowerCase());
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.club.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
    );
  }
  return result;
}

export async function getScarves(filter?: ScarfFilterParams): Promise<Scarf[]> {
  try {
    const payload = await getPayload({ config });
    const where: Record<string, Record<string, unknown>> = {};

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

    if (list.length === 0) {
      return filterScarvesList(DEFAULT_SCARVES, filter);
    }

    return list;
  } catch (error) {
    console.error("Error fetching scarves from Payload, falling back to temp data:", error);
    return filterScarvesList(DEFAULT_SCARVES, filter);
  }
}

export async function getScarfById(id: string): Promise<Scarf | undefined> {
  try {
    const payload = await getPayload({ config });
    const isNum = !isNaN(Number(id)) && Number.isInteger(Number(id));
    if (isNum) {
      const doc = await payload.findByID({
        collection: "scarves",
        id: Number(id),
        depth: 1,
      });
      if (doc) return mapPayloadScarf(doc);
    }
  } catch (error) {
    console.error(`Error fetching scarf ${id} from Payload:`, error);
  }
  return DEFAULT_SCARVES.find((s) => s.id === id);
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
    const n = newCount.totalDocs;
    const s = secondhandCount.totalDocs;
    if (n === 0 && s === 0) {
      return {
        new: DEFAULT_SCARVES.filter((item) => item.category === "new").length,
        secondhand: DEFAULT_SCARVES.filter((item) => item.category === "secondhand").length,
      };
    }
    return {
      new: n,
      secondhand: s,
    };
  } catch (error) {
    console.error("Error fetching scarf counts from Payload:", error);
    return {
      new: DEFAULT_SCARVES.filter((item) => item.category === "new").length,
      secondhand: DEFAULT_SCARVES.filter((item) => item.category === "secondhand").length,
    };
  }
}
