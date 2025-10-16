import { Button } from "@/components/ui/button";
import heroBg from "@/assets/images/artists/hero-bg.png";
import catTraditional from "@/assets/images/artists/cat-traditional.png";
import catCalligraphy from "@/assets/images/artists/cat-calligraphy.jpg";
import catContemporary from "@/assets/images/artists/cat-contemporary.png";
import catCeramics from "@/assets/images/artists/cat-ceramics.png";

const categories = [
  { title: "Traditional Art", subtitle: "Ancient Palestinian crafts", img: catTraditional },
  { title: "Calligraphy", subtitle: "Arabic calligraphic art", img: catCalligraphy },
  { title: "Contemporary", subtitle: "Modern explorations", img: catContemporary },
  { title: "Ceramics", subtitle: "Hand-crafted pottery", img: catCeramics },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Discover Palestinian Artists"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-7 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Text Content */}
        <div className="text-white space-y-6 pt-24">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
            <span className="block">Discover</span>
            <span className="block text-yellow-300">Palestinian</span>
            <span className="block">Artists</span>
          </h1>
          <p className="text-xl text-white/90 max-w-xl">
            Explore the rich cultural heritage and contemporary expressions of Palestinian art through our curated collection of talented artists.
          </p>
          <div className="flex items-center gap-3">
            <Button className="border border-white bg-white hover:bg-gray-100 text-sky-600 px-7 py-6 text-lg font-medium rounded-lg">
              Explore Artists
            </Button>
            <Button className="border border-white text-white bg-white/10 hover:text-white hover:bg-amber-800/20 px-7 py-6 text-lg font-medium rounded-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2">
                <img
                  src={categories[0].img}
                  alt={categories[0].title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{categories[0].title}</h3>
                <p className="text-white/80 text-sm">{categories[0].subtitle}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 mt-4">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2">
                <img
                  src={categories[2].img}
                  alt={categories[2].title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{categories[2].title}</h3>
                <p className="text-white/80 text-sm">{categories[2].subtitle}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2">
                <img
                  src={categories[1].img}
                  alt={categories[1].title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{categories[1].title}</h3>
                <p className="text-white/80 text-sm">{categories[1].subtitle}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 mt-4">
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2">
                <img
                  src={categories[3].img}
                  alt={categories[3].title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{categories[3].title}</h3>
                <p className="text-white/80 text-sm">{categories[3].subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}