export interface AboutParagraph {
  id?: string;
  paragraph: string;
  paragraphEn?: string;
}

export interface AboutGalleryItem {
  id?: string;
  image: string;
  caption?: string;
  captionEn?: string;
}

export interface AboutContent {
  hero: {
    eyebrow?: string;
    eyebrowEn?: string;
    title: string;
    titleEn?: string;
    subtitle: string;
    subtitleEn?: string;
    heroImage?: string;
  };
  story: {
    badge?: string;
    badgeEn?: string;
    title: string;
    titleEn?: string;
    lead?: string;
    leadEn?: string;
    paragraphs: AboutParagraph[];
    quote?: string;
    quoteAuthor?: string;
  };
  media: {
    portraitImage?: string;
    secondaryImage?: string;
    tertiaryImage?: string;
    gallery?: AboutGalleryItem[];
  };
}
