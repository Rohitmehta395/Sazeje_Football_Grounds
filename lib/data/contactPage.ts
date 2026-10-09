import { ContactPageContent, ContactReasonItem } from "@/types";
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

export const DEFAULT_CONTACT_PAGE_CONTENT: ContactPageContent = {
  hero: {
    eyebrow: "COMMUNITY & VERBINDING",
    eyebrowEn: "COMMUNITY & CONNECT",
    title: "Neem Contact Op",
    titleEn: "Get in Touch",
    subtitle:
      "Vraag, tip voor een stadion, of een sjaal om te ruilen? Stuur ons een bericht en deel je passie voor voetbalcultuur.",
    subtitleEn:
      "Have a question, ground tip, or scarf swap proposal? Send us a message and share your passion for European football culture.",
    heroImage: "/Hero_Image.jpg",
  },
  directInfo: {
    badge: "DIRECT CONTACT",
    badgeEn: "DIRECT CHANNELS",
    title: "Direct Contact & Matchday Vragen",
    titleEn: "Direct Contact & Matchday Inquiries",
    description:
      "Heb je een snelle vraag of tip? Neem rechtstreeks contact op via e-mail of volg onze actuele bezoeken via sociale media.",
    descriptionEn:
      "Have a quick question or tip? Contact us directly via email or follow our ongoing matchday travels across social channels.",
    email: "info@sazejefootball.nl",
    responseTime: "Binnen 24-48 uur",
    responseTimeEn: "Within 24-48 hours",
    location: "Nederland (Reizend door Europa)",
    locationEn: "Netherlands (Traveling Europe)",
  },
  socials: {
    showSocials: true,
    title: "Volg SaZeJe Groundhopping",
    titleEn: "Follow SaZeJe Groundhopping",
    subtitle: "Foto's, matchday video's en sfeerverslagen",
    subtitleEn: "Photos, matchday videos, and ground reports",
  },
  reasons: {
    showReasons: true,
    sectionTitle: "Waarom Contact Opnemen?",
    sectionTitleEn: "Why Connect With Us?",
    sectionSubtitle:
      "SaZeJe Groundhopping verbindt supporters, groundhoppers en verzamelaars uit heel Europa.",
    sectionSubtitleEn:
      "SaZeJe Groundhopping connects supporters, groundhoppers, and collectors from across Europe.",
    items: [
      {
        tag: "GROUNDHOPPING",
        tagEn: "GROUNDHOPPING",
        title: "Stadiontips & Verborgen Parels",
        titleEn: "Ground Tips & Hidden Gems",
        description:
          "Ken je een authentiek amateurstadion, een vergeten traditie of een derby die we moeten bezoeken? Laat het ons weten!",
        descriptionEn:
          "Know an authentic non-league ground, a forgotten tradition, or a derby we must experience? Let us know!",
        icon: "ground",
        defaultTopic: "ground_tip",
      },
      {
        tag: "VINTAGE SCARF SWAP",
        tagEn: "VINTAGE SCARF SWAP",
        title: "Sjaals Ruilen & Verzamelen",
        titleEn: "Scarf Swapping & Collecting",
        description:
          "Heb je een zeldzame club- of vriendschapssjaal om te ruilen? Wij staan altijd open voor een goed ruilvoorstel.",
        descriptionEn:
          "Have a rare club or friendship scarf to trade? We are always open to fair swaps with fellow passionate collectors.",
        icon: "scarf",
        defaultTopic: "scarf_swap",
      },
      {
        tag: "MATCHDAY STORIES",
        tagEn: "MATCHDAY STORIES",
        title: "Samenwerkingen & Matchday Verhalen",
        titleEn: "Collaborations & Match Reports",
        description:
          "Interesse in een gezamenlijke reportage, fotoreeks, gastbijdrage of podcast? We gaan graag in gesprek.",
        descriptionEn:
          "Interested in a joint match report, photography exchange, guest article, or podcast? We'd love to chat.",
        icon: "camera",
        defaultTopic: "collaboration",
      },
    ],
  },
  seo: {
    metaTitle: "Contact & Community | SaZeJe Groundhopping",
    metaTitleEn: "Contact & Community | SaZeJe Groundhopping",
    metaDescription:
      "Neem contact op met SaZeJe Groundhopping voor stadiontips, sjaalruil voorstellen of samenwerkingen rondom Europese voetbalcultuur.",
    metaDescriptionEn:
      "Get in touch with SaZeJe Groundhopping for ground recommendations, scarf swap proposals, or collaborations celebrating European football culture.",
  },
};

export async function getContactPageContent(): Promise<ContactPageContent> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({
      slug: "contact-page",
      depth: 2,
    });

    if (!doc) {
      return DEFAULT_CONTACT_PAGE_CONTENT;
    }

    const heroDoc = (doc.hero as Record<string, unknown>) || {};
    const directInfoDoc = (doc.directInfo as Record<string, unknown>) || {};
    const socialsDoc = (doc.socials as Record<string, unknown>) || {};
    const reasonsDoc = (doc.reasons as Record<string, unknown>) || {};
    const seoDoc = (doc.seo as Record<string, unknown>) || {};

    const heroImage = extractMediaUrl(heroDoc.heroImage) || DEFAULT_CONTACT_PAGE_CONTENT.hero.heroImage;

    const hero = {
      eyebrow: (heroDoc.eyebrow as string) || DEFAULT_CONTACT_PAGE_CONTENT.hero.eyebrow,
      eyebrowEn: (heroDoc.eyebrowEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.hero.eyebrowEn,
      title: (heroDoc.title as string) || DEFAULT_CONTACT_PAGE_CONTENT.hero.title,
      titleEn: (heroDoc.titleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.hero.titleEn,
      subtitle: (heroDoc.subtitle as string) || DEFAULT_CONTACT_PAGE_CONTENT.hero.subtitle,
      subtitleEn: (heroDoc.subtitleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.hero.subtitleEn,
      heroImage,
    };

    const directInfo = {
      badge: (directInfoDoc.badge as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.badge,
      badgeEn: (directInfoDoc.badgeEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.badgeEn,
      title: (directInfoDoc.title as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.title,
      titleEn: (directInfoDoc.titleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.titleEn,
      description:
        (directInfoDoc.description as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.description,
      descriptionEn:
        (directInfoDoc.descriptionEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.descriptionEn,
      email: (directInfoDoc.email as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.email,
      responseTime:
        (directInfoDoc.responseTime as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.responseTime,
      responseTimeEn:
        (directInfoDoc.responseTimeEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.responseTimeEn,
      location: (directInfoDoc.location as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.location,
      locationEn:
        (directInfoDoc.locationEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.directInfo.locationEn,
    };

    const socials = {
      showSocials:
        typeof socialsDoc.showSocials === "boolean"
          ? socialsDoc.showSocials
          : (DEFAULT_CONTACT_PAGE_CONTENT.socials.showSocials ?? true),
      title: (socialsDoc.title as string) || DEFAULT_CONTACT_PAGE_CONTENT.socials.title,
      titleEn: (socialsDoc.titleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.socials.titleEn,
      subtitle: (socialsDoc.subtitle as string) || DEFAULT_CONTACT_PAGE_CONTENT.socials.subtitle,
      subtitleEn: (socialsDoc.subtitleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.socials.subtitleEn,
    };

    let reasonsItems = DEFAULT_CONTACT_PAGE_CONTENT.reasons.items;
    if (Array.isArray(reasonsDoc.items) && reasonsDoc.items.length > 0) {
      reasonsItems = reasonsDoc.items.map((item: Record<string, unknown>) => ({
        id: (item.id as string) || undefined,
        tag: (item.tag as string) || "",
        tagEn: (item.tagEn as string) || undefined,
        title: (item.title as string) || "",
        titleEn: (item.titleEn as string) || undefined,
        description: (item.description as string) || "",
        descriptionEn: (item.descriptionEn as string) || undefined,
        icon: (item.icon as ContactReasonItem["icon"]) || "ground",
        defaultTopic: (item.defaultTopic as ContactReasonItem["defaultTopic"]) || "ground_tip",
      }));
    }

    const reasons = {
      showReasons:
        typeof reasonsDoc.showReasons === "boolean"
          ? reasonsDoc.showReasons
          : (DEFAULT_CONTACT_PAGE_CONTENT.reasons.showReasons ?? true),
      sectionTitle:
        (reasonsDoc.sectionTitle as string) || DEFAULT_CONTACT_PAGE_CONTENT.reasons.sectionTitle,
      sectionTitleEn:
        (reasonsDoc.sectionTitleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.reasons.sectionTitleEn,
      sectionSubtitle:
        (reasonsDoc.sectionSubtitle as string) || DEFAULT_CONTACT_PAGE_CONTENT.reasons.sectionSubtitle,
      sectionSubtitleEn:
        (reasonsDoc.sectionSubtitleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.reasons.sectionSubtitleEn,
      items: reasonsItems,
    };

    const seo = {
      metaTitle: (seoDoc.metaTitle as string) || DEFAULT_CONTACT_PAGE_CONTENT.seo?.metaTitle,
      metaTitleEn: (seoDoc.metaTitleEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.seo?.metaTitleEn,
      metaDescription:
        (seoDoc.metaDescription as string) || DEFAULT_CONTACT_PAGE_CONTENT.seo?.metaDescription,
      metaDescriptionEn:
        (seoDoc.metaDescriptionEn as string) || DEFAULT_CONTACT_PAGE_CONTENT.seo?.metaDescriptionEn,
    };

    return {
      hero,
      directInfo,
      socials,
      reasons,
      seo,
    };
  } catch (error) {
    console.error("Error fetching ContactPage content from Payload:", error);
    return DEFAULT_CONTACT_PAGE_CONTENT;
  }
}
