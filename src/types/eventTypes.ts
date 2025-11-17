export interface EventItem {
  id: number;
  type: "Digital" | "Physical";
  title: string;
  date: string;
  status: "Upcoming" | "Ended";
  tags: string[];
  excerpt: string;
  image: string;
}
