import Hero from "./components/Hero";
import EventsCards from "@/pages/Events/components/EventsCards";
import ArtworksGrid from "@/pages/Artworks/components/ArtworksGrid";
import FeaturedArtist from "@/pages/Artists/components/FeaturedArtist";
import WhyArtFeat from "./components/WhyArtFeat";
import TeamSection from "./components/TeamSection";
import PartnersSection from "./components/PartnersSection";

export default function Home() {
  return (
    <div>
    <Hero/>
    <EventsCards/>
    <ArtworksGrid />
    <FeaturedArtist/>
    <TeamSection/>
  <PartnersSection/>
          <WhyArtFeat/>
    </div>
  )
}
