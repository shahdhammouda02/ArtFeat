export interface Artwork {
  id: number;
  title: string;
  price: number;
  type: string;
  image: string;
  sales?: number;
}

export interface Artist {
  id: number;
  name: string;
  photo: string;
  artworks: Artwork[];
}