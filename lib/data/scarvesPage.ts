import { ScarvesPageContent } from "@/types";
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

export const DEFAULT_SCARVES_PAGE_CONTENT: ScarvesPageContent = {
  hero: {
    eyebrow: "SJAALCOLLECTIE • EST. 2024",
    eyebrowEn: "SCARF COLLECTION • EST. 2024",
    title: "Europese Sjaalcollectie",
    titleEn: "European Scarf Collection",
    subtitle:
      "Een levend overzicht van officiële en historische voetbalsjaals verzameld tijdens Europese groundhop-reizen. Van officiële clubfanshops tot unieke vintage ruilsjaals.",
    subtitleEn:
      "A curated archive of official and historic football scarves gathered across European stadium expeditions. From official matchday club stores to rare vintage collector trades.",
    heroImage: "/Hero_Image.jpg",
  },
  intro: {
    showIntro: true,
    badge: "DRAAG JE KLEUREN",
    badgeEn: "WEAR YOUR COLOURS",
    heading: "De Traditie van het Sjaals Verzamelen",
    headingEn: "The Tradition of Collecting Scarves",
    text: "Elke voetbalsjaal vertelt zijn eigen verhaal: aangeschaft onder de lichtmasten bij een memorabele Europese avond, of geruild met supporters na afloop van de wedstrijd. Kies hieronder tussen onze nieuwe officiële sjaals en vintage ruilexemplaren.",
    textEn:
      "Every football scarf holds an authentic memory: purchased under towering stadium floodlights on a memorable matchday, or traded with supporters after the match. Choose below to browse our direct club acquisitions or vintage collector trades.",
  },
  categories: {
    newTitle: "Nieuwe Sjaals",
    newTitleEn: "New Scarves",
    newDesc: "Rechtstreeks aangeschaft bij stadionbezoeken, officiële fanshops en clubwinkels.",
    newDescEn: "Purchased directly during stadium visits, club superstores, and matchday fanshops.",
    secondhandTitle: "Tweedehands / Ruil",
    secondhandTitleEn: "Secondhand / Swaps",
    secondhandDesc: "Vintage vondsten, supporterssjaals en unieke exemplaren geruild met verzamelaars.",
    secondhandDescEn: "Vintage finds, collector scarves, and unique pieces acquired through trades.",
  },
  stats: {
    showStats: true,
  },
  seo: {
    metaTitle: "Sjaalcollectie | SaZeJe Football",
    metaTitleEn: "Scarf Collection | SaZeJe Football",
    metaDescription:
      "Bekijk de complete verzameling officiële en tweedehands voetbalsjaals van SaZeJe Football uit heel Europa.",
    metaDescriptionEn:
      "Explore SaZeJe Football's complete collection of official and vintage football scarves from across Europe.",
  },
};

export async function getScarvesPageContent(): Promise<ScarvesPageContent> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({
      slug: "scarves-page",
      depth: 2,
    });

    if (!doc) {
      return DEFAULT_SCARVES_PAGE_CONTENT;
    }

    const heroDoc = (doc.hero as Record<string, unknown>) || {};
    const introDoc = (doc.intro as Record<string, unknown>) || {};
    const catDoc = (doc.categories as Record<string, unknown>) || {};
    const statsDoc = (doc.stats as Record<string, unknown>) || {};
    const seoDoc = (doc.seo as Record<string, unknown>) || {};

    const heroImage = extractMediaUrl(heroDoc.heroImage) || DEFAULT_SCARVES_PAGE_CONTENT.hero.heroImage;

    const hero = {
      eyebrow: (heroDoc.eyebrow as string) || DEFAULT_SCARVES_PAGE_CONTENT.hero.eyebrow,
      eyebrowEn: (heroDoc.eyebrowEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.hero.eyebrowEn,
      title: (heroDoc.title as string) || DEFAULT_SCARVES_PAGE_CONTENT.hero.title,
      titleEn: (heroDoc.titleEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.hero.titleEn,
      subtitle: (heroDoc.subtitle as string) || DEFAULT_SCARVES_PAGE_CONTENT.hero.subtitle,
      subtitleEn: (heroDoc.subtitleEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.hero.subtitleEn,
      heroImage,
    };

    const intro = {
      showIntro:
        typeof introDoc.showIntro === "boolean"
          ? introDoc.showIntro
          : DEFAULT_SCARVES_PAGE_CONTENT.intro?.showIntro ?? true,
      badge: (introDoc.badge as string) || DEFAULT_SCARVES_PAGE_CONTENT.intro?.badge,
      badgeEn: (introDoc.badgeEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.intro?.badgeEn,
      heading: (introDoc.heading as string) || DEFAULT_SCARVES_PAGE_CONTENT.intro?.heading,
      headingEn: (introDoc.headingEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.intro?.headingEn,
      text: (introDoc.text as string) || DEFAULT_SCARVES_PAGE_CONTENT.intro?.text,
      textEn: (introDoc.textEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.intro?.textEn,
    };

    const categories = {
      newTitle: (catDoc.newTitle as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.newTitle,
      newTitleEn: (catDoc.newTitleEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.newTitleEn,
      newDesc: (catDoc.newDesc as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.newDesc,
      newDescEn: (catDoc.newDescEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.newDescEn,
      secondhandTitle:
        (catDoc.secondhandTitle as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.secondhandTitle,
      secondhandTitleEn:
        (catDoc.secondhandTitleEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.secondhandTitleEn,
      secondhandDesc:
        (catDoc.secondhandDesc as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.secondhandDesc,
      secondhandDescEn:
        (catDoc.secondhandDescEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.categories?.secondhandDescEn,
    };

    const stats = {
      showStats:
        typeof statsDoc.showStats === "boolean"
          ? statsDoc.showStats
          : DEFAULT_SCARVES_PAGE_CONTENT.stats?.showStats ?? true,
    };

    const seo = {
      metaTitle: (seoDoc.metaTitle as string) || DEFAULT_SCARVES_PAGE_CONTENT.seo?.metaTitle,
      metaTitleEn: (seoDoc.metaTitleEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.seo?.metaTitleEn,
      metaDescription:
        (seoDoc.metaDescription as string) || DEFAULT_SCARVES_PAGE_CONTENT.seo?.metaDescription,
      metaDescriptionEn:
        (seoDoc.metaDescriptionEn as string) || DEFAULT_SCARVES_PAGE_CONTENT.seo?.metaDescriptionEn,
    };

    return {
      hero,
      intro,
      categories,
      stats,
      seo,
    };
  } catch (error) {
    console.error("Error fetching Scarves Page content from Payload:", error);
    return DEFAULT_SCARVES_PAGE_CONTENT;
  }
}
