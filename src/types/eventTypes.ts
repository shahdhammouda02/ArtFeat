export interface EventItem {
  id: number;
  title: string;
  date: string;
  status: "Upcoming" | "Ended";
  tags: string[];
  excerpt: string;
}
