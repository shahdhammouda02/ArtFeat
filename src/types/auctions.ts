export interface Auction {
  id: number;
  type: "Digital" | "Physical";
  title: string;
  author: string;
  endTime: Date; // Changed from time: string to endTime: Date for dynamic countdown
  bid: string;
  bidsCount: number;
  image: string;
}
