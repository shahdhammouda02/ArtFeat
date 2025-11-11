// data/collections.ts
export interface Collection {
  id: string;
  title: string;
  artworksCount: string;
  description: string;
  imageUrl: string;
}

export const COLLECTIONS_DATA: Collection[] = [
  {
    id: "1",
    title: "Video + Course",
    artworksCount: "12 artworks",
    description: "A unified executive training from the body of virtual touchups.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Urban Dreams",
    artworksCount: "8 artworks",
    description: "Contemporary physical skills in skin cognition.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Abstract Videos",
    artworksCount: "15 artworks",
    description: "Experience menu paintings based on a film and color.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Matrix Forces",
    artworksCount: "6 artworks",
    description: "A unified executive training from the body of virtual touchups.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Urban Dreams",
    artworksCount: "9 artworks",
    description: "Contemporary physical skills in skin cognition.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Abstract Videos",
    artworksCount: "11 artworks",
    description: "Experience menu painting based on a film and color.",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
  }
];