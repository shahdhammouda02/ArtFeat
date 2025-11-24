export type Unit = "cm" | "in" | "mm" | "px";

export interface Size {
  width?: { value: number; unit: Unit };
  height?: { value: number; unit: Unit };
  depth?: { value: number; unit: Unit };
  length?: { value: number; unit: Unit };
}

export interface Artwork {
  id: number;
  type: "Digital" | "Physical";
  tag: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  fileType?: string;
  size: Size;
  dpi?: number;
}
