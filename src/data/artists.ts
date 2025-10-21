// data.ts
import type { Artist } from '@/types/artists';
import art from "@/assets/images/artists/hero-bg.png";
import artistPhoto from "@/assets/images/artistPhoto.jpg";

export const ARTISTS_DATA: Artist[] = [
  {
    id: 1,
    name: "Ahmed Jack",
    photo: artistPhoto,
    artworks: Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      title: [
        "Think Different (Yellow)",
        "The Great Beyond",
        "Fly Over Wide Fields",
        "Art in Motion",
        "Urban Dreams",
        "Silent Echoes"
      ][i % 6],
      price: 635 + (i * 50),
      type: ["Painting", "Oil Painting", "Acrylic", "Digital", "Watercolor"][i % 5],
      img: art,
    }))
  },
  {
    id: 2,
    name: "Rawan Ahmad",
    photo: artistPhoto,
    artworks: Array.from({ length: 5 }).map((_, i) => ({
      id: i + 7,
      title: [
        "Desert Mirage",
        "Ocean Whispers",
        "Mountain Majesty",
        "City Lights",
        "Forest Symphony"
      ][i % 5],
      price: 520 + (i * 75),
      type: ["Oil Painting", "Acrylic", "Mixed Media", "Sculpture"][i % 4],
      img: art,
    }))
  },
  {
    id: 3,
    name: "Sarah Johnson",
    photo: artistPhoto,
    artworks: Array.from({ length: 4 }).map((_, i) => ({
      id: i + 12,
      title: [
        "Golden Hour",
        "Abstract Thoughts",
        "Color Fusion",
        "Minimalist Dreams"
      ][i % 4],
      price: 480 + (i * 60),
      type: ["Watercolor", "Digital", "Acrylic", "Print"][i % 4],
      img: art,
    }))
  }
];

export const TYPES = ["All Types", "Painting", "Oil Painting", "Acrylic", "Digital", "Watercolor", "Mixed Media", "Sculpture", "Print"];