import Hero from "./components/Hero"
import SuccessStories from "./components/SuccessStories"

const SupportArtist = () => {
  return (
     <div className="flex flex-col">
      <div className="mb-16 md:mb-24">
        <Hero />
      </div>

        <SuccessStories />
    </div>
  )
}

export default SupportArtist
