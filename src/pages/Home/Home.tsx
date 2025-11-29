import Hero from "./components/Hero";
import Section2 from "@/pages/Events/components/Section2";
import Section3 from "@/pages/Artworks/components/Section2";
import FeaturedArtist from "@/pages/Artists/components/FeaturedArtist";
import WhyArtFeat from "./components/WhyArtFeat";
import TeamSection from "./components/TeamSection";
import PartnersSection from "./components/PartnersSection";

export default function Home() {
  return (
    <div>
    <Hero/>
    <Section2 /> 
    <Section3 />
    <FeaturedArtist/>
    <TeamSection/>
  <PartnersSection/>
          <WhyArtFeat/>
    </div>
  )
}
