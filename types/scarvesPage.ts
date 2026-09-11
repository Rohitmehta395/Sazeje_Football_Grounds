export interface ScarvesPageContent {
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
  categories?: {
    newTitle?: string;
    newTitleEn?: string;
    newDesc?: string;
    newDescEn?: string;
    secondhandTitle?: string;
    secondhandTitleEn?: string;
    secondhandDesc?: string;
    secondhandDescEn?: string;
  };
  stats?: {
    showStats?: boolean;
  };
  seo?: {
    metaTitle?: string;
    metaTitleEn?: string;
    metaDescription?: string;
    metaDescriptionEn?: string;
  };
}
