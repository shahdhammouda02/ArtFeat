export interface Auction {
  id: number;
  type: "Digital" | "Physical";
  title: string;
  author: string;
  time: string;
  bid: string;
  bidsCount: number;
  image: string;
}
