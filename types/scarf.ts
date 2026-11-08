export type ScarfCategory = "new" | "secondhand" | "special-editions" | "matchdays";

export interface Scarf {
  id: string;
  category: ScarfCategory;
  clubCategory?: string;
  club: string;
  clubLogo?: string;
  country: string;
  countryFlag?: string;
  league?: string;
  type: string;
  typeEn?: string;
  description: string;
  descriptionEn?: string;
  stadium: string;
  town?: string;
  founded: string;
  trophies: string;
  trophiesEn?: string;
  seasonsInTopDivision?: string;
  funFact: string;
  funFactEn?: string;
  photo: string;
  dateAdded: string;
}
