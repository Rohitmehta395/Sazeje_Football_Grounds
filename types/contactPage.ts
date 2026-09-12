export interface ContactReasonItem {
  id?: string;
  tag: string;
  tagEn?: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  icon?: 'ground' | 'scarf' | 'camera' | 'collab' | 'general';
  defaultTopic?: 'ground_tip' | 'scarf_swap' | 'collaboration' | 'general';
}

export interface ContactFaqItem {
  id?: string;
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
}

export interface ContactPageContent {
  hero: {
    eyebrow?: string;
    eyebrowEn?: string;
    title: string;
    titleEn?: string;
    subtitle: string;
    subtitleEn?: string;
    heroImage?: string;
  };
  directInfo: {
    badge?: string;
    badgeEn?: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    email?: string;
    responseTime?: string;
    responseTimeEn?: string;
    location?: string;
    locationEn?: string;
  };
  socials: {
    showSocials?: boolean;
    title?: string;
    titleEn?: string;
    subtitle?: string;
    subtitleEn?: string;
  };
  reasons: {
    showReasons?: boolean;
    sectionTitle?: string;
    sectionTitleEn?: string;
    sectionSubtitle?: string;
    sectionSubtitleEn?: string;
    items: ContactReasonItem[];
  };
  faq: {
    showFaq?: boolean;
    sectionTitle?: string;
    sectionTitleEn?: string;
    sectionSubtitle?: string;
    sectionSubtitleEn?: string;
    items: ContactFaqItem[];
  };
  seo?: {
    metaTitle?: string;
    metaTitleEn?: string;
    metaDescription?: string;
    metaDescriptionEn?: string;
  };
}
