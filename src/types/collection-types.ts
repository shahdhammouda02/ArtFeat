export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  visibility: "public" | "private";
  artworkCount: number;
  artworks: string[]; // Array of artwork IDs
  createdAt: Date;
}

export interface CollectionContextType {
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id' | 'createdAt'>) => void;
}