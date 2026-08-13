export interface Goal {
  id: string;
  number: number;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  status: "in_progress" | "completed";
  details?: string;
}
