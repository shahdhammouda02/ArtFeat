import Hero from "./components/Hero"
import SupportSection from "./components/SupportSection"
import SuccessStories from "./components/SuccessStories"
import DonationForm from "./components/DonationForm"

const SupportArtist = () => {
  return (
     <div className="flex flex-col">
      <div className="mb-16 md:mb-24">
        <Hero />
      </div>

      <div className="mb-16 md:mb-24">
        <SupportSection />
      </div>

      <div className="mb-16 md:mb-24">
        <SuccessStories />
      </div>

        <DonationForm />
    </div>
  )
}

export default SupportArtist
