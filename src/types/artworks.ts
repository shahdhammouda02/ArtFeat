export interface Artwork {
  id: number;
  type: "Digital" | "Physical";
  tag: string; 
  title: string;
  author: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
  fileType?: string;
  size: string;
  dpi?: number;
}

