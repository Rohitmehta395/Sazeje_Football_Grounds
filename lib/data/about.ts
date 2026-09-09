import { AboutContent } from "@/types";
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

const DEFAULT_ABOUT_CONTENT: AboutContent = {
  hero: {
    eyebrow: "OVER & DOELEN",
    eyebrowEn: "ABOUT & GOALS",
    title: "Over SaZeJe Football",
    titleEn: "About SaZeJe Football",
    subtitle: "Achtergrondverhaal over de passie voor voetbalreizen, groundhopping en het verzamelen van sjaals.",
    subtitleEn: "Background story behind the passion for football trips, groundhopping, and collecting scarves.",
    heroImage: "/Hero_Image.jpg",
  },
  story: {
    badge: "GROUNDHOPPER & SJAALVERZAMELAAR",
    badgeEn: "GROUNDHOPPER & COLLECTOR",
    title: "Het Verhaal Achter SaZeJe",
    titleEn: "The Story Behind SaZeJe",
    lead: "SaZeJe Football is ontstaan uit een gepassioneerde liefde voor de pure voetbalsfeer in en rondom Europese stadions.",
    leadEn: "SaZeJe Football originated from a passionate love for pure football atmosphere in and around European stadiums.",
    paragraphs: [
      {
        paragraph: "Wat begon als een paar spontane uitstapjes naar wedstrijden over de grens, is uitgegroeid tot een gestructureerde passie voor groundhopping en verzamelen. Het doel is niet alleen om stadions af te vinken, maar vooral om de authentieke sfeer, architectuur en supporterscultuur van dichtbij te beleven.",
        paragraphEn: "What began as a few spontaneous trips to matches across the border has grown into a structured passion for groundhopping and collecting. The goal is not just to tick off grounds, but to experience authentic atmosphere, architecture, and supporter culture up close.",
      },
      {
        paragraph: "Elk stadionbezoek brengt unieke verhalen met zich mee — van monumentale lichtmasten tot de karakteristieke geur van wedstrijddagen en gezang op de tribunes. Als tastbare herinnering neem ik bij voorkeur uit elk bezocht stadion of stad een officiële sjaal mee.",
        paragraphEn: "Every stadium visit brings unique stories — from towering floodlights to the characteristic matchday sights and terrace anthems. As a lasting keepsake, I make a point of bringing home an official scarf from every visited stadium or host city.",
      },
    ],
    quote: "Geen wedstrijd te klein, geen stadion te ver: de magie van het spel leeft op elke tribune.",
    quoteAuthor: "SaZeJe Groundhopping",
  },
  media: {
    portraitImage: "/Sazaje_groundhopping_logo.jpg",
    secondaryImage: "/Hero_Image.jpg",
    tertiaryImage: "/cta-stadium-scarves.jpg",
    gallery: [],
  },
  pillars: [
    {
      title: "Stadionarchitectuur & Karakter",
      titleEn: "Stadium Architecture & Character",
      description: "Van rauwe Engelse bakstenen tribunes tot monumentale Europese betonkolossen. We documenteren de unieke ziel van elk bezocht stadion.",
      descriptionEn: "From gritty English brick stands to monumental European concrete arenas. We document the unique soul of every stadium visited.",
      icon: "stadium",
    },
    {
      title: "Authentieke Supporterscultuur",
      titleEn: "Authentic Supporter Culture",
      description: "Geen klinische commercie, maar de echte clubliefde van de lokale achterban. Het ritueel van de wedstrijddag staat centraal.",
      descriptionEn: "No plastic commercialism, but genuine supporter passion. The matchday ritual and terrace atmosphere take center stage.",
      icon: "passion",
    },
    {
      title: "Elk Stadion Een Sjaal",
      titleEn: "A Scarf From Every Ground",
      description: "Een groeiend fysiek archief van officiële matchday- en retro-sjaals als tastbare herinnering aan elke bezochte ground.",
      descriptionEn: "A growing physical archive of official matchday and vintage scarves as a tangible memory of each visited ground.",
      icon: "scarf",
    },
  ],
};

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({
      slug: "about",
      depth: 2,
    });

    if (!doc) {
      return DEFAULT_ABOUT_CONTENT;
    }

    const heroDoc = (doc.hero as Record<string, unknown>) || {};
    const storyDoc = (doc.story as Record<string, unknown>) || {};
    const mediaDoc = (doc.media as Record<string, unknown>) || {};
    const pillarsDoc = Array.isArray(doc.pillars) ? doc.pillars : [];

    // Map hero
    const heroImage = extractMediaUrl(heroDoc.heroImage) || DEFAULT_ABOUT_CONTENT.hero.heroImage;
    const hero = {
      eyebrow: (heroDoc.eyebrow as string) || DEFAULT_ABOUT_CONTENT.hero.eyebrow,
      eyebrowEn: (heroDoc.eyebrowEn as string) || DEFAULT_ABOUT_CONTENT.hero.eyebrowEn,
      title: (heroDoc.title as string) || DEFAULT_ABOUT_CONTENT.hero.title,
      titleEn: (heroDoc.titleEn as string) || DEFAULT_ABOUT_CONTENT.hero.titleEn,
      subtitle: (heroDoc.subtitle as string) || DEFAULT_ABOUT_CONTENT.hero.subtitle,
      subtitleEn: (heroDoc.subtitleEn as string) || DEFAULT_ABOUT_CONTENT.hero.subtitleEn,
      heroImage,
    };

    // Map story
    const rawParagraphs = Array.isArray(storyDoc.paragraphs) ? storyDoc.paragraphs : [];
    const paragraphs = rawParagraphs.length > 0
      ? rawParagraphs.map((p: Record<string, unknown>) => ({
          id: p.id ? String(p.id) : undefined,
          paragraph: String(p.paragraph || ""),
          paragraphEn: p.paragraphEn ? String(p.paragraphEn) : undefined,
        }))
      : DEFAULT_ABOUT_CONTENT.story.paragraphs;

    const story = {
      badge: (storyDoc.badge as string) || DEFAULT_ABOUT_CONTENT.story.badge,
      badgeEn: (storyDoc.badgeEn as string) || DEFAULT_ABOUT_CONTENT.story.badgeEn,
      title: (storyDoc.title as string) || DEFAULT_ABOUT_CONTENT.story.title,
      titleEn: (storyDoc.titleEn as string) || DEFAULT_ABOUT_CONTENT.story.titleEn,
      lead: (storyDoc.lead as string) || DEFAULT_ABOUT_CONTENT.story.lead,
      leadEn: (storyDoc.leadEn as string) || DEFAULT_ABOUT_CONTENT.story.leadEn,
      paragraphs,
      quote: (storyDoc.quote as string) || DEFAULT_ABOUT_CONTENT.story.quote,
      quoteAuthor: (storyDoc.quoteAuthor as string) || DEFAULT_ABOUT_CONTENT.story.quoteAuthor,
    };

    // Map media
    const portraitImage = extractMediaUrl(mediaDoc.portraitImage) || DEFAULT_ABOUT_CONTENT.media.portraitImage;
    const secondaryImage = extractMediaUrl(mediaDoc.secondaryImage) || DEFAULT_ABOUT_CONTENT.media.secondaryImage;
    const tertiaryImage = extractMediaUrl(mediaDoc.tertiaryImage) || DEFAULT_ABOUT_CONTENT.media.tertiaryImage;

    const rawGallery = Array.isArray(mediaDoc.gallery) ? mediaDoc.gallery : [];
    const gallery = rawGallery
      .map((item: Record<string, unknown>) => {
        const imgUrl = extractMediaUrl(item.image);
        if (!imgUrl) return null;
        return {
          id: item.id ? String(item.id) : undefined,
          image: imgUrl,
          caption: item.caption ? String(item.caption) : undefined,
          captionEn: item.captionEn ? String(item.captionEn) : undefined,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const media = {
      portraitImage,
      secondaryImage,
      tertiaryImage,
      gallery,
    };

    // Map pillars
    const pillars = pillarsDoc.length > 0
      ? pillarsDoc.map((p: Record<string, unknown>) => ({
          id: p.id ? String(p.id) : undefined,
          title: String(p.title || ""),
          titleEn: p.titleEn ? String(p.titleEn) : undefined,
          description: String(p.description || ""),
          descriptionEn: p.descriptionEn ? String(p.descriptionEn) : undefined,
          icon: (p.icon as AboutContent["pillars"] extends Array<infer T> ? T extends { icon: infer I } ? I : never : never) || "stadium",
        }))
      : DEFAULT_ABOUT_CONTENT.pillars;

    return {
      hero,
      story,
      media,
      pillars,
    };
  } catch (error) {
    console.error("Error fetching About content from Payload:", error);
    return DEFAULT_ABOUT_CONTENT;
  }
}
