export type ScarfCategory = "new" | "secondhand";

export interface Scarf {
  id: string;
  category: ScarfCategory;
  club: string;
  country: string;
  type: string;
  description: string;
  stadium: string;
  founded: string;
  trophies: string;
  funFact: string;
  purchaseDate?: string;
  photo: string;
  dateAdded: string;
}
