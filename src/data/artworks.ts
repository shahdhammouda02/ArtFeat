// src/data/artworks.ts
import type { Artwork } from "@/types/artworks";

export const ARTWORKS: Artwork[] = [
  {
    id: 1,
    type: "Digital",
    tag: "Painting",
    title: "Celestial Dance",
    author: "Alison Jackson",
    price: "€22,960.00",
    image:
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop",
    description:
      "A vibrant abstract painting that captures the motion and rhythm of celestial bodies in deep space.",
    highlights: [
      "High-resolution digital file",
      "Great for large canvas prints",
      "Perfect for modern living rooms",
    ],
    fileType: "JPG",
    size: "6000 × 4000 px",
    dpi: 300,
  },
  {
    id: 2,
    type: "Physical",
    tag: "Sculpture",
    title: "Marble Echoes",
    author: "Bernard Venet",
    price: "€18,400.00",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    description:
      "A hand-carved marble sculpture that explores balance, tension, and negative space.",
    highlights: [
      "Hand-carved white marble",
      "Signed by the artist",
      "Includes certificate of authenticity",
    ],
    size: "45 × 20 × 18 cm",
  },
  {
    id: 3,
    type: "Digital",
    tag: "Photography",
    title: "Silent Streets",
    author: "Bryan Adams",
    price: "€9,250.00",
    image:
      "https://images.unsplash.com/photo-1523419409543-1fb2b8741f2d?q=80&w=1200&auto=format&fit=crop",
    description:
      "A high-contrast black and white photograph capturing a quiet city street at dawn.",
    highlights: [
      "Black & white fine-art photograph",
      "Suitable for gallery-quality prints",
      "Perfect for minimalist interiors",
    ],
    fileType: "TIFF",
    size: "5000 × 3333 px",
    dpi: 300,
  },
  {
    id: 4,
    type: "Physical",
    tag: "Painting",
    title: "Garden of Light",
    author: "Alex Katz",
    price: "€12,600.00",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
    description:
      "Colorful floral composition inspired by Mediterranean gardens and soft afternoon light.",
    highlights: [
      "Original acrylic on canvas",
      "Vibrant, long-lasting pigments",
      "Ready to hang (stretched on frame)",
    ],
    size: "80 × 60 cm",
  },
  {
    id: 5,
    type: "Digital",
    tag: "Painting",
    title: "Nebula Bloom",
    author: "A.R. Penick",
    price: "€7,990.00",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    description:
      "Digital artwork mixing cosmic textures with floral shapes to create an ethereal scene.",
    highlights: [
      "Perfect for sci-fi or fantasy lovers",
      "Rich colors with deep contrast",
      "Instant download after purchase",
    ],
    fileType: "PNG",
    size: "5500 × 3500 px",
    dpi: 300,
  },
  {
    id: 6,
    type: "Physical",
    tag: "Sculpture",
    title: "Bronze Silence",
    author: "Alison Jackson",
    price: "€15,300.00",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
    description:
      "A minimalist bronze sculpture with clean lines and a strong sense of presence.",
    highlights: [
      "Cast bronze with patina finish",
      "Signed and numbered edition",
      "Includes solid marble base",
    ],
    size: "35 × 15 × 15 cm",
  },
  {
  id: 7,
  type: "Digital",
  tag: "Painting",
  title: "Autumn Whisper",
  author: "Marcus Thorne",
  price: "5000$",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
  description: "Warm autumn scenery for modern wall art.",
  highlights: ["Digital file type: 1 PDF", "High resolution", "Instant download"],
  size: "31x45cm"
},
{
  id: 8,
  type: "Digital",
  tag: "Painting",
  title: "Golden Dreams",
  author: "Marcus Thorne",
  price: "5000$",
  image: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200",
  description: "Perfect for cozy interiors.",
  highlights: ["High quality digital print", "Instant download"],
  size: "31x45cm"
},
{
  id: 9,
  type: "Digital",
  tag: "Painting",
  title: "Blue Horizon",
  author: "Marcus Thorne",
  price: "5000$",
  image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
  description: "Soothing minimal art.",
  highlights: ["Digital download", "300dpi", "PDF file included"],
  size: "31x45cm"
},
];



// import type { Item } from "@/types/artworks";

// export const ITEMS: Item[] = [
//   {
//     id: 1,
//     tag: "Painting",
//     title: "Celestial Dance",
//     artist: "Alison Jackson",
//     price: "€22,960.00",
//     img: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     tag: "Sculpture",
//     title: "Celestial Dance",
//     artist: "Alison Jackson",
//     price: "€22,960.00",
//     img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     tag: "Photography",
//     title: "Celestial Dance",
//     artist: "Alison Jackson",
//     price: "€22,960.00",
//     img: "https://images.unsplash.com/photo-1523419409543-1fb2b8741f2d?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     tag: "Painting",
//     title: "Celestial Dance",
//     artist: "Alison Jackson",
//     price: "€22,960.00",
//     img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     tag: "Painting",
//     title: "Celestial Dance",
//     artist: "Alison Jackson",
//     price: "€22,960.00",
//     img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: 6,
//     tag: "Sculpture",
//     title: "Celestial Dance",
//     artist: "Alison Jackson",
//     price: "€22,960.00",
//     img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
//   },
// ];