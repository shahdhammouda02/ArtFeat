import type { Artist } from "@/types/artists";
import artistPhoto from "@/assets/images/artistPhoto.jpg";
import { ARTWORKS } from "@/data/artworks";

const getArtworksByAuthor = (author: string) =>
  ARTWORKS.filter((art) => art.author.toLowerCase() === author.toLowerCase());

export const ARTISTS_DATA: Artist[] = [
  {
    id: 1,
    name: "Ahmed Jack",
    photo: artistPhoto,
    artworks: getArtworksByAuthor("Ahmed Jack"),
  },
  {
    id: 2,
    name: "Bernard Venet",
    photo: artistPhoto,
    artworks: getArtworksByAuthor("Bernard Venet"),
  },
  {
    id: 3,
    name: "Marcus Thorne",
    photo: artistPhoto,
    artworks: getArtworksByAuthor("Marcus Thorne"),
  },
  {
    id: 4,
    name: "Alison Jackson",
    photo: artistPhoto,
    artworks: getArtworksByAuthor("Alison Jackson"),
  },
  {
    id: 5,
    name: "Alex Katz",
    photo: artistPhoto,
    artworks: getArtworksByAuthor("Alex Katz"),
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
