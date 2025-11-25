export type ArtworkType = "none" | "physical" | "digital";

export interface PhysicalArtworkData {
  title: string;
  price: string;
  tags: string;
  quantity: number;
  description: string;
  materials: string;
  dimensions: {
    length: string;
    width: string;
    depth: string;
  };
  weight: string;
  images: string[];
}

export interface DigitalArtworkData {
  title: string;
  price: string;
  tags: string;
  description: string;
  additionalNotes: string;
  images: string[];
  fileType: string;
  dimensions: string;
}