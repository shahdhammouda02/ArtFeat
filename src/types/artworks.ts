// src/types/artworks.ts

export type ArtworkType = "Digital" | "Physical";
export type ArtworkTag = "Painting" | "Sculpture" | "Photography";

export interface Artwork {
  id: number;
  type: ArtworkType;      // Digital / Physical
  tag: ArtworkTag;        // Painting / Sculpture / Photography
  title: string;
  author: string;         // اسم الفنان
  price: string;          // "€22,960.00" → خليه string عشان رمز العملة والفاصلة
  image: string;          // رابط الصورة الرئيسية

  // بيانات صفحة التفاصيل:
  description: string;
  highlights?: string[];  // نقاط مميزة للعمل (اختياري)
  fileType?: string;      // لو Digital (PNG, JPG, MP4 ...)
  size?: string;          // المقاس (مثلاً 40×60 cm أو 4K)
  dpi?: number;           // لو محتاجة للـ print
}


// export interface Item {
//   id: number;
//   tag: "Painting" | "Sculpture" | "Photography";
//   title: string;
//   artist: string;
//   price: string;
//   img: string;
// };