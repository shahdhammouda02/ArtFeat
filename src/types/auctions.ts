export interface Auction {
  id: number;
  type: "Digital" | "Physical";
  title: string;
  author: string;
  endTime: Date; 
  bid: string;
  bidsCount: number;
  image: string;
}
