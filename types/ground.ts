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
  story: string;
  matchInfo: string;
  visitDate: string;
  extra?: string;
  images: string[];
  photo: string;
  dateAdded: string;
}
