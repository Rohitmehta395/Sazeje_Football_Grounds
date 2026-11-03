export interface Ground {
  id: string;
  name: string;
  club: string;
  clubLogo?: string;
  country: string;
  countryFlag?: string;
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
  spectators?: string;
  ticketPrice?: string;
  weather?: string;
  weatherEn?: string;
  weatherEnStatus?: "auto" | "edited";
  extra?: string;
  extraEn?: string;
  images: string[];
  photo: string;
  dateAdded: string;
}
