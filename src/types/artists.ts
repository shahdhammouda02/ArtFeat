export interface Artwork {
  id: number;
  title: string;
  price: number;
  type: string;
  img: string;
  sales?: number;
}

export interface Artist {
  id: number;
  name: string;
  photo: string;
  artworks: Artwork[];
}