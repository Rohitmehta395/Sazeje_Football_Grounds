export interface HeroSlide {
  image: string;
  caption?: string;
  captionEn?: string;
  alt?: string;
}

export interface HomePageContent {
  hero: {
    eyebrow?: string;
    eyebrowEn?: string;
    title?: string;
    titleEn?: string;
    subtitle?: string;
    subtitleEn?: string;
    topbarLabel?: string;
    topbarLabelEn?: string;
    slides: HeroSlide[];
    interval?: number;
    enableAutoplay?: boolean;
    showControls?: boolean;
    showIndicators?: boolean;
  };
  seo?: {
    metaTitle?: string;
    metaTitleEn?: string;
    metaDescription?: string;
    metaDescriptionEn?: string;
  };
}
