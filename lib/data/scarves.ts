import { Scarf } from "@/types";

export const SEED_SCARVES: Scarf[] = [
  {
    id: "s1",
    category: "new",
    club: "FC Barcelona",
    country: "Spanje",
    type: "Matchday sjaal",
    description: "Gekocht bij de fanshop rond Camp Nou, editie seizoen 2024/25.",
    stadium: "Camp Nou",
    founded: "1899",
    trophies: "5x Champions League, 27x Spaans landskampioen",
    funFact: "Het clublied wordt in het Catalaans gezongen, ongeacht waar de speler vandaan komt.",
    photo: "https://picsum.photos/seed/scarf-barca/500/400",
    purchaseDate: "2025-03-14",
    dateAdded: "2025-03-15",
  },
  {
    id: "s2",
    category: "new",
    club: "Liverpool FC",
    country: "Engeland",
    type: "Dubbelzijdige sjaal",
    description: "Straatverkoper net buiten Anfield Road, klassiek rood-geel ontwerp.",
    stadium: "Anfield",
    founded: "1892",
    trophies: "6x Champions League, 19x Engels landskampioen",
    funFact: "Spelers raken bij het betreden van het veld het bord 'This Is Anfield' aan.",
    photo: "https://picsum.photos/seed/scarf-lfc/500/400",
    purchaseDate: "2025-01-20",
    dateAdded: "2025-01-21",
  },
  {
    id: "s3",
    category: "secondhand",
    club: "Borussia Dortmund",
    country: "Duitsland",
    type: "Vintage sjaal",
    description: "Gevonden op een ruilbeurs, jaren '90 ontwerp met oud logo.",
    stadium: "Signal Iduna Park",
    founded: "1909",
    trophies: "1x Champions League, 8x Duits landskampioen",
    funFact: "De Zuidtribune, de Gele Muur, biedt plaats aan bijna 25.000 staanplaatsen.",
    photo: "https://picsum.photos/seed/scarf-bvb/500/400",
    dateAdded: "2024-11-05",
  },
  {
    id: "s4",
    category: "secondhand",
    club: "Ajax",
    country: "Nederland",
    type: "Retro sjaal",
    description: "Tweedehands via een fanclub-ruilbeurs, seizoen 2010/11.",
    stadium: "Johan Cruijff ArenA",
    founded: "1900",
    trophies: "4x Europacup I / Champions League, 36x landskampioen",
    funFact: "Ajax was in 1971 de eerste Nederlandse club die de Europacup I won.",
    photo: "https://picsum.photos/seed/scarf-ajax/500/400",
    dateAdded: "2024-10-02",
  },
  {
    id: "s5",
    category: "new",
    club: "AC Milan",
    country: "Italië",
    type: "Winter sjaal",
    description: "Officiële fanshop bij San Siro, dik gebreid model.",
    stadium: "San Siro",
    founded: "1899",
    trophies: "7x Champions League, 19x Italiaans landskampioen",
    funFact: "San Siro wordt gedeeld met stadsrivaal Inter, elk met een eigen kleedkamergang.",
    photo: "https://picsum.photos/seed/scarf-milan/500/400",
    purchaseDate: "2024-04-11",
    dateAdded: "2024-04-12",
  },
  {
    id: "s6",
    category: "secondhand",
    club: "Club Brugge",
    country: "België",
    type: "Vintage sjaal",
    description: "Gekocht op een kringloopmarkt in Brugge, jaren '80 stijl.",
    stadium: "Jan Breydelstadion",
    founded: "1891",
    trophies: "18x Belgisch landskampioen",
    funFact: "Club Brugge is vernoemd naar de stad, niet naar een persoon of dier.",
    photo: "https://picsum.photos/seed/scarf-brugge/500/400",
    dateAdded: "2024-02-20",
  },
];

export interface ScarfFilterParams {
  category?: "new" | "secondhand" | string;
  country?: string;
  club?: string;
  search?: string;
}

export function getScarves(filter?: ScarfFilterParams): Scarf[] {
  let list = SEED_SCARVES;
  if (!filter) return list;

  if (filter.category) {
    list = list.filter((s) => s.category === filter.category);
  }
  if (filter.country) {
    list = list.filter(
      (s) => s.country.toLowerCase() === filter.country?.toLowerCase()
    );
  }
  if (filter.club) {
    list = list.filter((s) => s.club === filter.club);
  }
  if (filter.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (s) =>
        s.club.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
    );
  }
  return list;
}

export function getScarfById(id: string): Scarf | undefined {
  return SEED_SCARVES.find((s) => s.id === id);
}

export function getScarfCountsByCategory(): { new: number; secondhand: number } {
  return {
    new: SEED_SCARVES.filter((s) => s.category === "new").length,
    secondhand: SEED_SCARVES.filter((s) => s.category === "secondhand").length,
  };
}
