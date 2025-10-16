import Hero from "./components/Hero";
import Section2 from "./components/Section2";
import FeaturedArtist from "./components/FeaturedArtist";
import JoinAsArtist from "./components/JoinAsArtist";

export default function ArtistsPage() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Section2 />
      <FeaturedArtist />
      <JoinAsArtist />
    </div>
  );
}
