import { HomePageContent, HeroSlide } from "@/types";
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

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    image: "/Hero_Image.jpg",
    caption: "MHPArena, Stuttgart • UEFA Europa League",
    captionEn: "MHPArena, Stuttgart • UEFA Europa League",
    alt: "MHPArena Stuttgart matchday view from the stands",
  },
  {
    image: "/hero-slides/hero_atmosphere.jpg",
    caption: "De Kuip, Rotterdam • Avondwedstrijd Sfeer",
    captionEn: "De Kuip, Rotterdam • Floodlit European Match Night",
    alt: "Atmospheric European football stadium under floodlights",
  },
  {
    image: "/hero-slides/hero_sunset.jpg",
    caption: "Estadio Santiago Bernabéu, Madrid • Schemering Sfeer",
    captionEn: "Santiago Bernabéu Stadium, Madrid • Twilight Matchday",
    alt: "Iconic European football stadium during twilight golden hour",
  },
];

export const DEFAULT_HOME_PAGE_CONTENT: HomePageContent = {
  hero: {
    eyebrow: "WELKOM BIJ SAZEJE GROUNDHOPPING",
    eyebrowEn: "WELCOME TO SAZEJE GROUNDHOPPING",
    title: "SAZEJE GROUNDHOPPING ARCHIEF",
    titleEn: "SAZEJE GROUNDHOPPING ARCHIVE",
    subtitle:
      "Persoonlijke reisverslagen van stadionbezoeken door heel Europa. Volg de reis, lees de verhalen achter elke tribune en ontdek welke ground er als volgende op de lijst staat.",
    subtitleEn:
      "Personal travelogues of stadium visits across Europe. Follow the journey, read the stories behind every stand, and discover which ground is next on the list.",
    topbarLabel: "SAZEJE GROUNDHOPPING ARCHIEF • 2024–2026",
    topbarLabelEn: "SAZEJE GROUNDHOPPING ARCHIVE • 2024–2026",
    slides: DEFAULT_HERO_SLIDES,
    interval: 6,
    enableAutoplay: true,
  },
  seo: {
    metaTitle: "SaZeJe Groundhopping | Europees Voetbal & Stadioncultuur",
    metaTitleEn: "SaZeJe Groundhopping | European Football & Groundhopping",
    metaDescription:
      "Persoonlijke reisverslagen van stadionbezoeken door heel Europa, complete sjaalcollectie en groundhopping doelen.",
    metaDescriptionEn:
      "Personal travelogues of stadium visits across Europe, complete scarf collection, and groundhopping goals.",
  },
};

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({
      slug: "home-page",
      depth: 2,
    });

    if (!doc) {
      return DEFAULT_HOME_PAGE_CONTENT;
    }

    const heroDoc = (doc.hero as Record<string, unknown>) || {};
    const slideshowSettings = (heroDoc.slideshowSettings as Record<string, unknown>) || {};
    const rawSlides = (heroDoc.slides as Array<Record<string, unknown>>) || [];
    const seoDoc = (doc.seo as Record<string, unknown>) || {};

    const configuredSlides: HeroSlide[] = [];
    for (const item of rawSlides) {
      const url = extractMediaUrl(item?.image);
      if (url) {
        configuredSlides.push({
          image: url,
          caption: typeof item.caption === "string" ? item.caption : undefined,
          captionEn: typeof item.captionEn === "string" ? item.captionEn : undefined,
          alt:
            (typeof item.caption === "string" && item.caption) ||
            (typeof item.captionEn === "string" && item.captionEn) ||
            "Stadion achtergrondfoto",
        });
      }
    }

    const slides = configuredSlides.length > 0 ? configuredSlides : DEFAULT_HERO_SLIDES;

    const interval =
      typeof slideshowSettings.interval === "number" && slideshowSettings.interval >= 2
        ? slideshowSettings.interval
        : DEFAULT_HOME_PAGE_CONTENT.hero.interval;

    const enableAutoplay =
      typeof slideshowSettings.enableAutoplay === "boolean"
        ? slideshowSettings.enableAutoplay
        : DEFAULT_HOME_PAGE_CONTENT.hero.enableAutoplay;

    const hero = {
      eyebrow: (heroDoc.eyebrow as string) || DEFAULT_HOME_PAGE_CONTENT.hero.eyebrow,
      eyebrowEn: (heroDoc.eyebrowEn as string) || DEFAULT_HOME_PAGE_CONTENT.hero.eyebrowEn,
      title: (heroDoc.title as string) || DEFAULT_HOME_PAGE_CONTENT.hero.title,
      titleEn: (heroDoc.titleEn as string) || DEFAULT_HOME_PAGE_CONTENT.hero.titleEn,
      subtitle: (heroDoc.subtitle as string) || DEFAULT_HOME_PAGE_CONTENT.hero.subtitle,
      subtitleEn: (heroDoc.subtitleEn as string) || DEFAULT_HOME_PAGE_CONTENT.hero.subtitleEn,
      topbarLabel: (heroDoc.topbarLabel as string) || DEFAULT_HOME_PAGE_CONTENT.hero.topbarLabel,
      topbarLabelEn: (heroDoc.topbarLabelEn as string) || DEFAULT_HOME_PAGE_CONTENT.hero.topbarLabelEn,
      slides,
      interval,
      enableAutoplay,
    };

    const seo = {
      metaTitle: (seoDoc.metaTitle as string) || DEFAULT_HOME_PAGE_CONTENT.seo?.metaTitle,
      metaTitleEn: (seoDoc.metaTitleEn as string) || DEFAULT_HOME_PAGE_CONTENT.seo?.metaTitleEn,
      metaDescription:
        (seoDoc.metaDescription as string) || DEFAULT_HOME_PAGE_CONTENT.seo?.metaDescription,
      metaDescriptionEn:
        (seoDoc.metaDescriptionEn as string) || DEFAULT_HOME_PAGE_CONTENT.seo?.metaDescriptionEn,
    };

    return {
      hero,
      seo,
    };
  } catch (error) {
    console.error("Error fetching Home Page content from Payload:", error);
    return DEFAULT_HOME_PAGE_CONTENT;
  }
}
