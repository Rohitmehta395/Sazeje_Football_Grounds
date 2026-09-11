export type ScarfCategory = "new" | "secondhand";

export interface Scarf {
  id: string;
  category: ScarfCategory;
  club: string;
  country: string;
  type: string;
  description: string;
  descriptionEn?: string;
  stadium: string;
  founded: string;
  trophies: string;
  trophiesEn?: string;
  funFact: string;
  funFactEn?: string;
  purchaseDate?: string;
  photo: string;
  dateAdded: string;
}
