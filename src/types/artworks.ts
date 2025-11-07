
export interface Item {
  id: number;
  tag: "Painting" | "Sculpture" | "Photography";
  title: string;
  artist: string;
  price: string;
  img: string;
};