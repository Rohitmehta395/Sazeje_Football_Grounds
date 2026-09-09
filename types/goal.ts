export interface Goal {
  id: string;
  number: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  targetCount: number;
  currentCount: number;
  status: "in_progress" | "completed";
  details?: string;
  detailsEn?: string;
}

