import { GroundsPageContent } from "@/types";
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

export const DEFAULT_GROUNDS_PAGE_CONTENT: GroundsPageContent = {
  hero: {
    eyebrow: "GROUNDHOPPING ARCHIEF • EST. 2024",
    eyebrowEn: "GROUNDHOPPING ARCHIVE • EST. 2024",
    title: "Bezochte Grounds & Stadions",
    titleEn: "Visited Grounds & Stadiums",
    subtitle:
      "Een levend archief van bezochte voetbalstadions in Nederland en door heel Europa. Van sfeervolle dorpsvelden en historische staantribunes tot monumentale Europese voetbaltempels — filter op land, competitie of club.",
    subtitleEn:
      "A curated archive of visited football grounds across the Netherlands and Europe. From grassroots terrace culture and historic floodlit stands to monumental continental arenas — explore and filter by country, league, or club.",
    heroImage: "/Hero_Image.jpg",
  },
  intro: {
    showIntro: true,
    badge: "AUTHENTIEKE SUPPORTERSCULTUUR",
    badgeEn: "AUTHENTIC TERRACE CULTURE",
    heading: "De Ziel van het Europese Voetbal",
    headingEn: "The Soul of European Football",
    text: "Elk stadionbezoek is meer dan 90 minuten voetbal: de geur van wedstrijdsnacks onder torenhoge lichtmasten, het gezang op overdekte staantribunes en de rijke clubhistorie. Verken hier al onze bezochte locaties met wedstrijdlogs, sfeerverslagen en praktische reistips.",
    textEn:
      "Every groundhopping expedition is more than just 90 minutes: the scent of matchday food under towering floodlights, the anthems echoing from covered standing terraces, and unique club heritage. Explore all visited grounds with matchday logs, atmosphere reports, and travel details.",
  },
  stats: {
    showStats: true,
  },
  seo: {
    metaTitle: "Bezochte Grounds & Stadions | SaZeJe Football",
    metaTitleEn: "Visited Grounds & Stadiums | SaZeJe Football",
    metaDescription:
      "Ontdek het complete groundhopping archief van SaZeJe Football: bezochte stadions in Nederland en Europa met wedstrijdverslagen, sfeerbeoordelingen en foto's.",
    metaDescriptionEn:
      "Explore SaZeJe Football's complete groundhopping archive: visited grounds across the Netherlands and Europe with match reports, atmosphere ratings, and photos.",
  },
};

export async function getGroundsPageContent(): Promise<GroundsPageContent> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({
      slug: "grounds-page",
      depth: 2,
    });

    if (!doc) {
      return DEFAULT_GROUNDS_PAGE_CONTENT;
    }

    const heroDoc = (doc.hero as Record<string, unknown>) || {};
    const introDoc = (doc.intro as Record<string, unknown>) || {};
    const statsDoc = (doc.stats as Record<string, unknown>) || {};
    const seoDoc = (doc.seo as Record<string, unknown>) || {};

    const heroImage = extractMediaUrl(heroDoc.heroImage) || DEFAULT_GROUNDS_PAGE_CONTENT.hero.heroImage;

    const hero = {
      eyebrow: (heroDoc.eyebrow as string) || DEFAULT_GROUNDS_PAGE_CONTENT.hero.eyebrow,
      eyebrowEn: (heroDoc.eyebrowEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.hero.eyebrowEn,
      title: (heroDoc.title as string) || DEFAULT_GROUNDS_PAGE_CONTENT.hero.title,
      titleEn: (heroDoc.titleEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.hero.titleEn,
      subtitle: (heroDoc.subtitle as string) || DEFAULT_GROUNDS_PAGE_CONTENT.hero.subtitle,
      subtitleEn: (heroDoc.subtitleEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.hero.subtitleEn,
      heroImage,
    };

    const intro = {
      showIntro:
        typeof introDoc.showIntro === "boolean"
          ? introDoc.showIntro
          : DEFAULT_GROUNDS_PAGE_CONTENT.intro?.showIntro ?? true,
      badge: (introDoc.badge as string) || DEFAULT_GROUNDS_PAGE_CONTENT.intro?.badge,
      badgeEn: (introDoc.badgeEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.intro?.badgeEn,
      heading: (introDoc.heading as string) || DEFAULT_GROUNDS_PAGE_CONTENT.intro?.heading,
      headingEn: (introDoc.headingEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.intro?.headingEn,
      text: (introDoc.text as string) || DEFAULT_GROUNDS_PAGE_CONTENT.intro?.text,
      textEn: (introDoc.textEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.intro?.textEn,
    };

    const stats = {
      showStats:
        typeof statsDoc.showStats === "boolean"
          ? statsDoc.showStats
          : DEFAULT_GROUNDS_PAGE_CONTENT.stats?.showStats ?? true,
    };

    const seo = {
      metaTitle: (seoDoc.metaTitle as string) || DEFAULT_GROUNDS_PAGE_CONTENT.seo?.metaTitle,
      metaTitleEn: (seoDoc.metaTitleEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.seo?.metaTitleEn,
      metaDescription:
        (seoDoc.metaDescription as string) || DEFAULT_GROUNDS_PAGE_CONTENT.seo?.metaDescription,
      metaDescriptionEn:
        (seoDoc.metaDescriptionEn as string) || DEFAULT_GROUNDS_PAGE_CONTENT.seo?.metaDescriptionEn,
    };

    return {
      hero,
      intro,
      stats,
      seo,
    };
  } catch (error) {
    console.error("Error fetching Grounds Page content from Payload:", error);
    return DEFAULT_GROUNDS_PAGE_CONTENT;
  }
}
