export interface Ground {
  id: string;
  name: string;
  club: string;
  clubLogo?: string;
  country: string;
  competition: string;
  lat: number;
  lng: number;
  description: string;
  descriptionEn?: string;
  story: string;
  storyEn?: string;
  matchInfo: string;
  matchInfoEn?: string;
  visitDate: string;
  extra?: string;
  extraEn?: string;
  images: string[];
  photo: string;
  dateAdded: string;
}
