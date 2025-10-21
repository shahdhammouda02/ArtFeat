export interface Artwork {
  id: number;
  title: string;
  price: number;
  type: string;
  img: string;
}

export interface Artist {
  id: number;
  name: string;
  photo: string;
  artworks: Artwork[];
}