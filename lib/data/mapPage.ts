import { MapPageContent } from "@/types";
import { getPayload } from "payload";
import config from "@payload-config";

function extractMediaUrl(media: unknown): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    const m = media as Record<string, unknown>;
    if (typeof m.url === "string" && m.url) return m.url;
    if (typeof m.cloudinaryUrl === "string" && m.cloudinaryUrl) return m.cloudinaryUrl;
    if (typeof m.originalUrl === "string" && m.originalUrl) return m.originalUrl;
  }
  return undefined;
}

export const DEFAULT_MAP_PAGE_CONTENT: MapPageContent = {
  hero: {
    eyebrow: "INTERACTIEVE KAART • EUROPA",
    eyebrowEn: "INTERACTIVE MAP • EUROPE",
    title: "Stadionkaart Europa",
    titleEn: "Stadium Map Europe",
    subtitle:
      "Overzicht van alle bezochte stadions op de interactieve kaart. Klik op een clubspeld om het stadion, de club en de bezochte wedstrijd te ontdekken.",
    subtitleEn:
      "Interactive geospatial overview of all visited football stadiums across Europe. Click any club badge to explore the stadium, home club, and visited matchday details.",
    heroImage: "/Hero_Image.jpg",
  },
  intro: {
    showIntro: true,
    badge: "GEOGRAFIE VAN HET VOETBAL",
    badgeEn: "FOOTBALL GEOGRAPHY",
    heading: "De Kaart van Onze Voetbalreizen",
    headingEn: "The Map of Our Football Journeys",
    text: "Van de sfeervolle velden in de Lage Landen tot Zuid-Europese voetbaltempels en legendarische stadions in heel Europa. Elk clublogo op de kaart markeert een bezochte ground. Zoom in op de regio's of klik direct op een clubspeld om de groundhopper log te openen.",
    textEn:
      "From atmospheric grounds across the Low Countries to roaring continental arenas and European football shrines. Every club crest on the map marks an authentic matchday visit. Zoom into your favourite region or click any marker to open the groundhopper report.",
  },
  seo: {
    metaTitle: "Stadionkaart Europa | SaZeJe Football",
    metaTitleEn: "Stadium Map Europe | SaZeJe Football",
    metaDescription:
      "Interactieve kaart van alle bezochte voetbalstadions in Nederland en Europa door SaZeJe Football met clublocaties en wedstrijdverslagen.",
    metaDescriptionEn:
      "Interactive map of all visited football stadiums across the Netherlands and Europe by SaZeJe Football, featuring club locations and match logs.",
  },
};

export async function getMapPageContent(): Promise<MapPageContent> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({
      slug: "map-page",
      depth: 2,
    });

    if (!doc) {
      return DEFAULT_MAP_PAGE_CONTENT;
    }

    const heroDoc = (doc.hero as Record<string, unknown>) || {};
    const introDoc = (doc.intro as Record<string, unknown>) || {};
    const seoDoc = (doc.seo as Record<string, unknown>) || {};

    const heroImage = extractMediaUrl(heroDoc.heroImage) || DEFAULT_MAP_PAGE_CONTENT.hero.heroImage;

    const hero = {
      eyebrow: (heroDoc.eyebrow as string) || DEFAULT_MAP_PAGE_CONTENT.hero.eyebrow,
      eyebrowEn: (heroDoc.eyebrowEn as string) || DEFAULT_MAP_PAGE_CONTENT.hero.eyebrowEn,
      title: (heroDoc.title as string) || DEFAULT_MAP_PAGE_CONTENT.hero.title,
      titleEn: (heroDoc.titleEn as string) || DEFAULT_MAP_PAGE_CONTENT.hero.titleEn,
      subtitle: (heroDoc.subtitle as string) || DEFAULT_MAP_PAGE_CONTENT.hero.subtitle,
      subtitleEn: (heroDoc.subtitleEn as string) || DEFAULT_MAP_PAGE_CONTENT.hero.subtitleEn,
      heroImage,
    };

    const intro = {
      showIntro:
        typeof introDoc.showIntro === "boolean"
          ? introDoc.showIntro
          : DEFAULT_MAP_PAGE_CONTENT.intro?.showIntro ?? true,
      badge: (introDoc.badge as string) || DEFAULT_MAP_PAGE_CONTENT.intro?.badge,
      badgeEn: (introDoc.badgeEn as string) || DEFAULT_MAP_PAGE_CONTENT.intro?.badgeEn,
      heading: (introDoc.heading as string) || DEFAULT_MAP_PAGE_CONTENT.intro?.heading,
      headingEn: (introDoc.headingEn as string) || DEFAULT_MAP_PAGE_CONTENT.intro?.headingEn,
      text: (introDoc.text as string) || DEFAULT_MAP_PAGE_CONTENT.intro?.text,
      textEn: (introDoc.textEn as string) || DEFAULT_MAP_PAGE_CONTENT.intro?.textEn,
    };

    const seo = {
      metaTitle: (seoDoc.metaTitle as string) || DEFAULT_MAP_PAGE_CONTENT.seo?.metaTitle,
      metaTitleEn: (seoDoc.metaTitleEn as string) || DEFAULT_MAP_PAGE_CONTENT.seo?.metaTitleEn,
      metaDescription:
        (seoDoc.metaDescription as string) || DEFAULT_MAP_PAGE_CONTENT.seo?.metaDescription,
      metaDescriptionEn:
        (seoDoc.metaDescriptionEn as string) || DEFAULT_MAP_PAGE_CONTENT.seo?.metaDescriptionEn,
    };

    return {
      hero,
      intro,
      seo,
    };
  } catch (error) {
    console.error("Error fetching Map Page content from Payload:", error);
    return DEFAULT_MAP_PAGE_CONTENT;
  }
}
