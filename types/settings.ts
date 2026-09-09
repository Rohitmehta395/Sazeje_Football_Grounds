export interface SocialLinks {
  instagram?: string | null;
  x?: string | null;
  facebook?: string | null;
  youtube?: string | null;
}

export interface SiteSettings {
  id?: number | string;
  contactEmail?: string | null;
  siteTagline?: string | null;
  socialLinks?: SocialLinks;
  createdAt?: string;
  updatedAt?: string;
}
