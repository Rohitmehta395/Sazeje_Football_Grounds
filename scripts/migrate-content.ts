import { Payload, getPayload } from "payload";
import configPromise from "../payload.config";

// Source Seed Data (10 Grounds, 6 Scarves, 8 Goals)
const SOURCE_GROUNDS = [
  {
    id: "g1",
    name: "Camp Nou",
    club: "FC Barcelona",
    country: "Spanje",
    competition: "La Liga",
    lat: 41.3809,
    lng: 2.1228,
    description: "Een van de grootste stadions van Europa, met een adembenemende drie-laags tribune.",
    story: "Aankomst twee uur voor aftrap om de sfeer rond het stadion mee te maken. De laatste bocht van de metro naar buiten, en dan opent het stadion zich in volle omvang. Binnen overweldigt de schaal: drie ringen tribunes die tot in de wolken lijken te reiken. Bij de aftrap golft het geluid van boven naar beneden.",
    matchInfo: "FC Barcelona — Girona FC, 3-1",
    visitDate: "2025-03-14",
    extra: "Tip: koop het stadiontoegangsbewijs vooraf online, de rij aan de kassa is enorm.",
    images: [
      "https://picsum.photos/seed/campnou1/600/400",
      "https://picsum.photos/seed/campnou2/600/400",
      "https://picsum.photos/seed/campnou3/600/400",
    ],
    photo: "https://picsum.photos/seed/campnoumain/700/500",
    dateAdded: "2025-03-15",
  },
  {
    id: "g2",
    name: "Anfield",
    club: "Liverpool FC",
    country: "Engeland",
    competition: "Premier League",
    lat: 53.4308,
    lng: -2.9608,
    description: "Thuis van The Kop, waar 'You'll Never Walk Alone' voor de aftrap door het stadion galmt.",
    story: "Al vanaf Anfield Road hoor je de fans zingen. Binnen is het Kop-vak een muur van geluid. Het moment vlak voor aftrap, als het hele stadion het clublied zingt, is iets wat je zelf moet meemaken om te geloven.",
    matchInfo: "Liverpool FC — Everton FC, 2-0",
    visitDate: "2025-01-20",
    extra: "Het Anfield-museum en de stadiontour zijn de moeite waard als je vroeg bent.",
    images: [
      "https://picsum.photos/seed/anfield1/600/400",
      "https://picsum.photos/seed/anfield2/600/400",
    ],
    photo: "https://picsum.photos/seed/anfieldmain/700/500",
    dateAdded: "2025-01-21",
  },
  {
    id: "g3",
    name: "Signal Iduna Park",
    club: "Borussia Dortmund",
    country: "Duitsland",
    competition: "Bundesliga",
    lat: 51.4926,
    lng: 7.4518,
    description: "Thuis van de Gele Muur, de grootste staantribune van Europa.",
    story: "De Gele Muur zien vullen vanaf de eerste minuut is een spektakel op zich. Duizenden sjaals gaan de lucht in bij de clubhymne, en het stadion trilt letterlijk mee met het gezang.",
    matchInfo: "Borussia Dortmund — RB Leipzig, 1-1",
    visitDate: "2024-11-02",
    extra: "Kaartjes voor de Südtribüne zijn schaars — vroeg boeken is een must.",
    images: [
      "https://picsum.photos/seed/dortmund1/600/400",
      "https://picsum.photos/seed/dortmund2/600/400",
      "https://picsum.photos/seed/dortmund3/600/400",
    ],
    photo: "https://picsum.photos/seed/dortmundmain/700/500",
    dateAdded: "2024-11-03",
  },
  {
    id: "g4",
    name: "Johan Cruijff ArenA",
    club: "Ajax",
    country: "Nederland",
    competition: "Eredivisie",
    lat: 52.3143,
    lng: 4.9416,
    description: "Modern stadion met schuifdak, thuisbasis van Ajax.",
    story: "Een efficiënte reis vanaf station Bijlmer ArenA, direct het stadion in zicht. De akoestiek onder het dak zorgt voor een verrassend luide sfeer, ook bij een doordeweekse competitiewedstrijd.",
    matchInfo: "Ajax — FC Twente, 2-2",
    visitDate: "2024-09-28",
    extra: "De ArenA Boulevard heeft genoeg eetgelegenheden voor en na de wedstrijd.",
    images: [
      "https://picsum.photos/seed/ajax1/600/400",
      "https://picsum.photos/seed/ajax2/600/400",
    ],
    photo: "https://picsum.photos/seed/ajaxmain/700/500",
    dateAdded: "2024-09-29",
  },
  {
    id: "g5",
    name: "San Siro",
    club: "AC Milan / Inter",
    country: "Italië",
    competition: "Serie A",
    lat: 45.4781,
    lng: 9.124,
    description: "Iconisch stadion gedeeld door twee grootmachten, met karakteristieke torens.",
    story: "De spiraalvormige torens aan de buitenkant maken San Siro herkenbaar van ver. Binnen is het geluid rauwer dan verwacht — een San Siro-avond voelt als theater met tweeduizend jaar traditie in de lucht.",
    matchInfo: "AC Milan — Juventus, 1-2",
    visitDate: "2024-04-11",
    extra: "Bezoek ook het museum onder de tribune voor de clubgeschiedenis van beide ploegen.",
    images: [
      "https://picsum.photos/seed/sansiro1/600/400",
      "https://picsum.photos/seed/sansiro2/600/400",
    ],
    photo: "https://picsum.photos/seed/sansiromain/700/500",
    dateAdded: "2024-04-12",
  },
  {
    id: "g6",
    name: "Jan Breydelstadion",
    club: "Club Brugge",
    country: "België",
    competition: "Jupiler Pro League",
    lat: 51.195,
    lng: 3.18,
    description: "Compact en luidruchtig stadion in het hart van Vlaanderen.",
    story: "Kleiner dan de andere gronds op deze lijst, maar met een intimiteit die je dichter bij het veld brengt. De harde kern zingt het hele duel door, zelfs bij een achterstand.",
    matchInfo: "Club Brugge — KAA Gent, 2-1",
    visitDate: "2024-02-18",
    extra: "Vlak bij het station, dus goed te combineren met een dagje Brugge.",
    images: [
      "https://picsum.photos/seed/brugge1/600/400",
      "https://picsum.photos/seed/brugge2/600/400",
    ],
    photo: "https://picsum.photos/seed/bruggemain/700/500",
    dateAdded: "2024-02-19",
  },
  {
    id: "g7",
    name: "Allianz Arena",
    club: "Bayern München",
    country: "Duitsland",
    competition: "Bundesliga",
    lat: 48.2188,
    lng: 11.6247,
    description: "Het opblaasbandje van München, oplichtend in clubkleuren op wedstrijddagen.",
    story: "Al vanaf de metro-uitgang zie je de gevel oplichten in rood. Binnen is alles strak georganiseerd, van de rondlopende catering tot de vloeiende instroom — Duitse stadionlogistiek op zijn best, met net zoveel sfeer als efficiëntie.",
    matchInfo: "Bayern München — VfB Stuttgart, 4-0",
    visitDate: "2024-08-24",
    extra: "Neem de U6 richting Fröttmaning, de wandeling naar het stadion is een attractie op zich.",
    images: [
      "https://picsum.photos/seed/allianz1/600/400",
      "https://picsum.photos/seed/allianz2/600/400",
    ],
    photo: "https://picsum.photos/seed/allianzmain/700/500",
    dateAdded: "2024-08-25",
  },
  {
    id: "g8",
    name: "Estádio da Luz",
    club: "SL Benfica",
    country: "Portugal",
    competition: "Primeira Liga",
    lat: 38.7527,
    lng: -9.1846,
    description: "Het 'Stadion van het Licht', met een dakconstructie die het hele veld bedekt.",
    story: "De adelaar die voor aftrap een ronde over het veld vliegt, is alleen al de reis waard. De akoestiek onder het overkapte dak zorgt dat elk doelpunt met een enorme dreun binnenkomt.",
    matchInfo: "SL Benfica — FC Porto, 1-1",
    visitDate: "2023-12-03",
    extra: "Combineer het bezoek met het clubmuseum onder de hoofdtribune.",
    images: [
      "https://picsum.photos/seed/benfica1/600/400",
      "https://picsum.photos/seed/benfica2/600/400",
    ],
    photo: "https://picsum.photos/seed/benficamain/700/500",
    dateAdded: "2023-12-04",
  },
  {
    id: "g9",
    name: "De Kuip",
    club: "Feyenoord",
    country: "Nederland",
    competition: "Eredivisie",
    lat: 51.8935,
    lng: 4.5233,
    description: "Klassiek Nederlands stadion zonder hoeken, waar de tribunes bovenop het veld staan.",
    story: "Geen enkele hoek in de constructie, waardoor elke tribune het gevoel geeft bovenop de actie te zitten. Bij een avondwedstrijd zorgt het geluid van 'Hand in Hand' voor kippenvel, ongeacht welke club je zelf steunt.",
    matchInfo: "Feyenoord — FC Utrecht, 3-0",
    visitDate: "2023-10-22",
    extra: "Koop een sjaal bij de kraampjes rond het stadion, niet bij de officiële shop — goedkoper en net zo origineel.",
    images: [
      "https://picsum.photos/seed/kuip1/600/400",
      "https://picsum.photos/seed/kuip2/600/400",
    ],
    photo: "https://picsum.photos/seed/kuipmain/700/500",
    dateAdded: "2023-10-23",
  },
  {
    id: "g10",
    name: "Stade Vélodrome",
    club: "Olympique Marseille",
    country: "Frankrijk",
    competition: "Ligue 1",
    lat: 43.2697,
    lng: 5.3958,
    description: "Open, winderig stadion aan de Middellandse Zee met een van de luidruchtigste aanhangen van Frankrijk.",
    story: "De wind vanaf zee waait dwars door het stadion, wat de sfeer alleen maar ruiger maakt. Het Virage Sud blijft van de eerste tot de laatste minuut in beweging — bengaals vuur incluis.",
    matchInfo: "Olympique Marseille — OGC Nice, 2-1",
    visitDate: "2023-05-14",
    extra: "Ga vroeg voor het stadion aankomen, de sfeer buiten begint al uren voor aftrap.",
    images: [
      "https://picsum.photos/seed/marseille1/600/400",
      "https://picsum.photos/seed/marseille2/600/400",
    ],
    photo: "https://picsum.photos/seed/marseillemain/700/500",
    dateAdded: "2023-05-15",
  },
];

const SOURCE_SCARVES = [
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

const SOURCE_GOALS = [
  {
    id: "doel1",
    number: 1,
    title: "Alle 18 Eredivisie-stadions",
    description: "Nederland rond krijgen",
    targetCount: 18,
    currentCount: 12,
    status: "in_progress",
    details: "12 van de 18 gehad, de rest staat gepland voor komend seizoen.",
  },
  {
    id: "doel2",
    number: 2,
    title: "Een Europese finale",
    description: "Champions League of Europa League",
    targetCount: 1,
    currentCount: 0,
    status: "in_progress",
    details: "Live op de tribune staan bij een grote Europese finale.",
  },
  {
    id: "doel3",
    number: 3,
    title: "San Siro terug",
    description: "Milaan, Italië",
    targetCount: 2,
    currentCount: 1,
    status: "in_progress",
    details: "Nog een keer, maar dan bij de andere club uit de stad.",
  },
  {
    id: "doel4",
    number: 4,
    title: "Old Trafford",
    description: "Manchester United",
    targetCount: 1,
    currentCount: 0,
    status: "in_progress",
    details: "Staat al twee seizoenen op het lijstje, kaarten blijven lastig.",
  },
  {
    id: "doel5",
    number: 5,
    title: "Derde divisie ronde",
    description: "Kleinere Nederlandse clubs",
    targetCount: 10,
    currentCount: 4,
    status: "in_progress",
    details: "Ook de sfeer bij amateurvoetbal en lagere divisies meepakken.",
  },
  {
    id: "doel6",
    number: 6,
    title: "Alle Belgische topclubs",
    description: "Jupiler Pro League",
    targetCount: 5,
    currentCount: 3,
    status: "in_progress",
    details: "Nog Anderlecht en Standard te gaan.",
  },
  {
    id: "doel7",
    number: 7,
    title: "Schotland: Old Firm",
    description: "Celtic - Rangers",
    targetCount: 1,
    currentCount: 0,
    status: "in_progress",
    details: "De wedstrijd met misschien wel de zwaarste sfeer van Europa.",
  },
  {
    id: "doel8",
    number: 8,
    title: "100ste ground",
    description: "Mijlpaal",
    targetCount: 100,
    currentCount: 10,
    status: "in_progress",
    details: "Op naar de honderdste bezochte ground, waar dat ook wordt.",
  },
];

// Helper to download placeholder image from URL and upload to Payload Media
const imageCache = new Map<string, number>();

async function uploadImageFromUrl(
  payload: Payload,
  url: string,
  alt: string,
  filenamePrefix: string
): Promise<number | null> {
  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  try {
    console.log(`  Downloading image from ${url}...`);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.warn(`  Failed to fetch ${url} (status: ${res.status})`);
      return null;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `${filenamePrefix}-${Date.now()}.jpg`;

    const mediaDoc = await payload.create({
      collection: "media",
      data: {
        alt: alt || "Placeholder stock photo",
      },
      file: {
        data: buffer,
        name: filename,
        mimetype: "image/jpeg",
        size: buffer.length,
      },
    });

    console.log(
      `  Uploaded to Media ID: ${mediaDoc.id} (Cloudinary: ${mediaDoc.cloudinary_public_id || "ok"})`
    );
    const mediaId = Number(mediaDoc.id);
    imageCache.set(url, mediaId);
    return mediaId;
  } catch (err) {
    console.error(`  Error uploading image ${url}:`, err);
    return null;
  }
}

async function migrateContent() {
  console.log("==================================================");
  console.log("STARTING CONTENT MIGRATION (Phase 12)");
  console.log("==================================================");

  const config = await configPromise;
  const payload = await getPayload({ config });

  // 1. Migrate Goals (8 Goals)
  console.log(`\n--- Migrating ${SOURCE_GOALS.length} Goals ---`);
  for (const g of SOURCE_GOALS) {
    console.log(`Creating Goal: #${g.number} ${g.title}...`);
    const createdGoal = await payload.create({
      collection: "goals",
      data: {
        number: g.number,
        title: g.title,
        description: g.description,
        targetCount: g.targetCount,
        currentCount: g.currentCount,
        status: g.status as "in_progress" | "completed",
        details: g.details,
      },
    });
    console.log(`  Created Goal ID: ${createdGoal.id}`);
  }

  // 2. Migrate Scarves (6 Scarves)
  console.log(`\n--- Migrating ${SOURCE_SCARVES.length} Scarves ---`);
  for (const s of SOURCE_SCARVES) {
    console.log(`Creating Scarf: [${s.category}] ${s.club} - ${s.type}...`);
    let photoId: number | null = null;
    if (s.photo) {
      photoId = await uploadImageFromUrl(
        payload,
        s.photo,
        `${s.club} ${s.type}`,
        `scarf-${s.id}`
      );
    }

    const createdScarf = await payload.create({
      collection: "scarves",
      data: {
        category: s.category as "new" | "secondhand",
        club: s.club,
        country: s.country,
        type: s.type,
        description: s.description,
        stadium: s.stadium,
        founded: s.founded,
        trophies: s.trophies,
        funFact: s.funFact,
        purchaseDate: s.purchaseDate,
        dateAdded: s.dateAdded,
        photo: photoId || undefined,
      },
    });
    console.log(`  Created Scarf ID: ${createdScarf.id}`);
  }

  // 3. Migrate Grounds (10 Grounds)
  // 3. Migrate Grounds (10 Grounds) & Link Clubs
  console.log(`\n--- Migrating ${SOURCE_GROUNDS.length} Grounds & Clubs ---`);
  for (const g of SOURCE_GROUNDS) {
    console.log(`Creating Ground: ${g.name} (${g.country})...`);

    // Club relationship
    let clubId: number | undefined = undefined;
    if (g.club) {
      const existingClubs = await payload.find({
        collection: "clubs",
        where: {
          name: {
            equals: g.club,
          },
        },
        limit: 1,
      });

      if (existingClubs.docs[0]) {
        clubId = Number(existingClubs.docs[0].id);
      } else {
        const newClub = await payload.create({
          collection: "clubs",
          data: {
            name: g.club,
          },
        });
        clubId = Number(newClub.id);
        console.log(`  Created Club: ${newClub.name} (ID: ${newClub.id})`);
      }
    }

    // Main photo
    let mainPhotoId: number | null = null;
    if (g.photo) {
      mainPhotoId = await uploadImageFromUrl(
        payload,
        g.photo,
        `${g.name} main photo`,
        `ground-${g.id}-main`
      );
    }

    // Gallery images
    const galleryImageIds: { image: number }[] = [];
    if (Array.isArray(g.images)) {
      for (let i = 0; i < g.images.length; i++) {
        const imgUrl = g.images[i];
        const imgId = await uploadImageFromUrl(
          payload,
          imgUrl,
          `${g.name} gallery image ${i + 1}`,
          `ground-${g.id}-gallery-${i + 1}`
        );
        if (imgId) {
          galleryImageIds.push({ image: imgId });
        }
      }
    }

    const createdGround = await payload.create({
      collection: "grounds",
      data: {
        name: g.name,
        club: clubId,
        country: g.country,
        competition: g.competition,
        lat: g.lat,
        lng: g.lng,
        visitDate: g.visitDate,
        description: g.description,
        story: g.story,
        matchInfo: g.matchInfo,
        extra: g.extra,
        dateAdded: g.dateAdded,
        published: true,
        photo: mainPhotoId || undefined,
        images: galleryImageIds.length > 0 ? galleryImageIds : undefined,
      },
    });
    console.log(
      `  Created Ground ID: ${createdGround.id} (slug: ${createdGround.slug})`
    );
  }

  console.log("\n==================================================");
  console.log("MIGRATION COMPLETED SUCCESSFULLY!");
  console.log("==================================================");
  process.exit(0);
}

migrateContent().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
