// src/pages/Artworks/ArtworkDetails.tsx
import { useParams } from "react-router-dom";
import { ARTWORKS } from "@/data/artworks";
import DigitalDetails from "./components/DigitalDetails";
import PhysicalDetails from "./components/PhysicalDetails"; // ← خليها فقط مرة واحدة


export default function ArtworkDetails() {
  const { id } = useParams();
  const artwork = ARTWORKS.find((item) => item.id === Number(id));

  if (!artwork) return <p>Not Found</p>;

  return artwork.type === "Digital" ? (
    <DigitalDetails artwork={artwork} />
  ) : (
    <PhysicalDetails artwork={artwork} />
  );
}
