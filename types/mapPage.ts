export interface MapPageContent {
  hero: {
    eyebrow?: string;
    eyebrowEn?: string;
    title: string;
    titleEn?: string;
    subtitle: string;
    subtitleEn?: string;
    heroImage?: string;
  };
  intro?: {
    showIntro?: boolean;
    badge?: string;
    badgeEn?: string;
    heading?: string;
    headingEn?: string;
    text?: string;
    textEn?: string;
  };
  seo?: {
    metaTitle?: string;
    metaTitleEn?: string;
    metaDescription?: string;
    metaDescriptionEn?: string;
  };
}
