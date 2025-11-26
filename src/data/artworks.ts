import type { Artwork } from "@/types/artworks";

export const ARTWORKS: Artwork[] = [
  {
    id: 100,
    type: "Physical",
    tag: "Painting",
    title: "Think Different (Yellow)",
    author: "Ahmed Jack",
    price: 635,
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526481280690-7b63b39d3814?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526483838836-44caa643b7b7?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A striking yellow painting exploring individuality and modern expression.",
    highlights: [
      "Original oil on canvas",
      "Vibrant yellow tones with subtle textures",
      "Perfect for modern art collections",
    ],
    size: {
      width: { value: 60, unit: "cm" },
      height: { value: 40, unit: "cm" },
      depth: { value: 2, unit: "cm" },
      length: { value: 50, unit: "cm" },
    },
  },
  {
    id: 101,
    type: "Physical",
    tag: "Oil Painting",
    title: "The Great Beyond",
    author: "Ahmed Jack",
    price: 685,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "An imaginative oil painting that evokes the endless depth of human creativity.",
    highlights: [
      "Oil on stretched canvas",
      "Soft brushwork and deep contrast",
      "Signed and dated by the artist",
    ],
    size: {
      width: { value: 75, unit: "cm" },
      height: { value: 50, unit: "cm" },
      depth: { value: 3, unit: "cm" },
      length: { value: 60, unit: "cm" },
    },
  },
  {
    id: 102,
    type: "Physical",
    tag: "Acrylic",
    title: "Fly Over Wide Fields",
    author: "Ahmed Jack",
    price: 735,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504203700686-0f91b7e61f68?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488529948854-84df3ff08b18?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A lively acrylic painting inspired by the sense of freedom found in open landscapes.",
    highlights: [
      "Textured acrylic strokes",
      "Inspired by nature and motion",
      "Ideal for living room or office walls",
    ],
    size: {
      width: { value: 70, unit: "cm" },
      height: { value: 45, unit: "cm" },
      depth: { value: 2.5, unit: "cm" },
      length: { value: 55, unit: "cm" },
    },
  },

  // ✨ باقي الأعمال الأصلية مع 3 صور لكل عمل
  {
    id: 1,
    type: "Digital",
    tag: "Painting",
    title: "Celestial Dance",
    author: "Alison Jackson",
    price: 22960,
    image:
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A vibrant abstract painting that captures the motion and rhythm of celestial bodies in deep space.",
    highlights: [
      "High-resolution digital file",
      "Great for large canvas prints",
      "Perfect for modern living rooms",
    ],
    fileType: "JPG",
    size: {
      width: { value: 6000, unit: "px" },
      height: { value: 4000, unit: "px" },
    },
    dpi: 300,
  },
  {
    id: 2,
    type: "Physical",
    tag: "Sculpture",
    title: "Marble Echoes",
    author: "Bernard Venet",
    price: 18400,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616628188591-9f27d6e7b8c2?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A hand-carved marble sculpture that explores balance, tension, and negative space.",
    highlights: [
      "Hand-carved white marble",
      "Signed by the artist",
      "Includes certificate of authenticity",
    ],
    size: {
      width: { value: 45, unit: "cm" },
      height: { value: 20, unit: "cm" },
      depth: { value: 18, unit: "cm" },
      length: { value: 15, unit: "cm" },
    },
  },
  {
    id: 3,
    type: "Digital",
    tag: "Photography",
    title: "Silent Streets",
    author: "Bryan Adams",
    price: 9250,
    image:
      "https://images.unsplash.com/photo-1523419409543-1fb2b8741f2d?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523419409543-1fb2b8741f2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A high-contrast black and white photograph capturing a quiet city street at dawn.",
    highlights: [
      "Black & white fine-art photograph",
      "Suitable for gallery-quality prints",
      "Perfect for minimalist interiors",
    ],
    fileType: "TIFF",
    size: {
      width: { value: 5000, unit: "px" },
      height: { value: 3333, unit: "px" },
    },
    dpi: 300,
  },
  {
    id: 4,
    type: "Physical",
    tag: "Painting",
    title: "Garden of Light",
    author: "Alex Katz",
    price: 12600,
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Colorful floral composition inspired by Mediterranean gardens and soft afternoon light.",
    highlights: [
      "Original acrylic on canvas",
      "Vibrant, long-lasting pigments",
      "Ready to hang (stretched on frame)",
    ],
    size: {
      width: { value: 80, unit: "cm" },
      height: { value: 60, unit: "cm" },
      depth: { value: 2.5, unit: "cm" },
      length: { value: 65, unit: "cm" },
    },
  },
  {
    id: 5,
    type: "Digital",
    tag: "Painting",
    title: "Nebula Bloom",
    author: "A.R. Penick",
    price: 7990,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Digital artwork mixing cosmic textures with floral shapes to create an ethereal scene.",
    highlights: [
      "Perfect for sci-fi or fantasy lovers",
      "Rich colors with deep contrast",
      "Instant download after purchase",
    ],
    fileType: "PNG",
    size: {
      width: { value: 5500, unit: "px" },
      height: { value: 3500, unit: "px" },
    },
    dpi: 300,
  },
  {
    id: 6,
    type: "Physical",
    tag: "Sculpture",
    title: "Bronze Silence",
    author: "Alison Jackson",
    price: 15300,
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616628198591-4e5cb918416b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602526216037-8081cbfb5bfb?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A minimalist bronze sculpture with clean lines and a strong sense of presence.",
    highlights: [
      "Cast bronze with patina finish",
      "Signed and numbered edition",
      "Includes solid marble base",
    ],
    size: {
      width: { value: 35, unit: "cm" },
      height: { value: 15, unit: "cm" },
      depth: { value: 15, unit: "cm" },
      length: { value: 10, unit: "cm" },
    },
  },
  {
    id: 7,
    type: "Digital",
    tag: "Painting",
    title: "Autumn Whisper",
    author: "Marcus Thorne",
    price: 5000,
    image:
"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
      "https://images.unsplash.com/photo-1526481280690-7b63b39d3814?q=80&w=1200",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
    ],
    description: "Warm autumn scenery for modern wall art.",
    highlights: [
      "Digital file type: 1 PDF",
      "High resolution",
      "Instant download",
    ],
    size: {
      width: { value: 31, unit: "cm" },
      height: { value: 45, unit: "cm" },
    },
    dpi: 300,
  },
  {
    id: 8,
    type: "Digital",
    tag: "Painting",
    title: "Golden Dreams",
    author: "Marcus Thorne",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200",
      "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?q=80&w=1200",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
    ],
    description: "Perfect for cozy interiors.",
    highlights: ["High quality digital print", "Instant download"],
    size: {
      width: { value: 31, unit: "cm" },
      height: { value: 45, unit: "cm" },
    },
    dpi: 300,
  },
  {
    id: 9,
    type: "Digital",
    tag: "Painting",
    title: "Blue Horizon",
    author: "Marcus Thorne",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1200",
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=1200",
    ],
    description: "Soothing minimal art.",
    highlights: ["Digital download", "300dpi", "PDF file included"],
    size: {
      width: { value: 31, unit: "cm" },
      height: { value: 45, unit: "cm" },
    },
    dpi: 300,
  },
];
