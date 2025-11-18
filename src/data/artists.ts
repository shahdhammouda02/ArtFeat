// src/data/data.ts
import type { Artist } from "@/types/artists";
import art from "@/assets/images/artists/hero-bg.png";
import artistPhoto from "@/assets/images/artistPhoto.jpg";

export const ARTISTS_DATA: Artist[] = [
  {
    id: 1,
    name: "Ahmed Jack",
    photo: artistPhoto,
    artworks: Array.from({ length: 6 }).map((_, i) => ({
      id: i + 101, // ✅ IDs فريدة تبدأ من 101
      title: [
        "Think Different (Yellow)",
        "The Great Beyond",
        "Fly Over Wide Fields",
        "Art in Motion",
        "Urban Dreams",
        "Silent Echoes",
      ][i % 6],
      price: 635 + i * 50,
      type: ["Painting", "Oil Painting", "Acrylic", "Digital", "Watercolor"][i % 5],
      image: art,
      sales: [125, 89, 203, 67, 142, 98][i % 6],
    })),
  },
  {
    id: 2,
    name: "Rawan Ahmad",
    photo: artistPhoto,
    artworks: Array.from({ length: 5 }).map((_, i) => ({
      id: i + 201, // ✅ IDs فريدة تبدأ من 201
      title: [
        "Desert Mirage",
        "Ocean Whispers",
        "Mountain Majesty",
        "City Lights",
        "Forest Symphony",
      ][i % 5],
      price: 520 + i * 75,
      type: ["Oil Painting", "Acrylic", "Mixed Media", "Sculpture"][i % 4],
      image: art,
      sales: [78, 156, 45, 189, 112][i % 5],
    })),
  },
  {
    id: 3,
    name: "Sarah Johnson",
    photo: artistPhoto,
    artworks: Array.from({ length: 4 }).map((_, i) => ({
      id: i + 301, // ✅ IDs فريدة تبدأ من 301
      title: [
        "Golden Hour",
        "Abstract Thoughts",
        "Color Fusion",
        "Minimalist Dreams",
      ][i % 4],
      price: 480 + i * 60,
      type: ["Watercolor", "Digital", "Acrylic", "Print"][i % 4],
      image: art,
      sales: [234, 76, 165, 91][i % 4],
    })),
  },
  {
    id: 4,
    name: "Layla Nasser",
    photo: artistPhoto,
    artworks: Array.from({ length: 5 }).map((_, i) => ({
      id: i + 401,
      title: [
        "Crimson Dreams",
        "The Blue Silence",
        "Beyond Reflections",
        "Shades of Dawn",
        "Infinite Motion",
      ][i % 5],
      price: 700 + i * 80,
      type: ["Acrylic", "Digital", "Watercolor", "Oil Painting"][i % 4],
      image: art,
      sales: [88, 210, 135, 64, 157][i % 5],
    })),
  },
  {
    id: 5,
    name: "Hani Omar",
    photo: artistPhoto,
    artworks: Array.from({ length: 4 }).map((_, i) => ({
      id: i + 501,
      title: [
        "Golden Silence",
        "Oceanic Dreams",
        "Roots of Light",
        "City Reflections",
      ][i % 4],
      price: 640 + i * 70,
      type: ["Digital", "Painting", "Mixed Media", "Sculpture"][i % 4],
      image: art,
      sales: [199, 155, 88, 132][i % 4],
    })),
  },
];

export const TYPES = [
  "All Types",
  "Painting",
  "Oil Painting",
  "Acrylic",
  "Digital",
  "Watercolor",
  "Mixed Media",
  "Sculpture",
  "Print",
];
