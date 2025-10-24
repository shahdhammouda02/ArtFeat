import { Button } from "@/components/ui/button";
import heroBg from "@/assets/images/artists/hero-bg.png";
import catTraditional from "@/assets/images/artists/cat-traditional.png";
import catCalligraphy from "@/assets/images/artists/cat-calligraphy.jpg";
import catContemporary from "@/assets/images/artists/cat-contemporary.png";
import catCeramics from "@/assets/images/artists/cat-ceramics.png";

const categories = [
  {
    title: "Traditional Art",
    subtitle: "Ancient Palestinian crafts",
    img: catTraditional,
  },
  {
    title: "Calligraphy",
    subtitle: "Arabic calligraphic art",
    img: catCalligraphy,
  },
  {
    title: "Contemporary",
    subtitle: "Modern explorations",
    img: catContemporary,
  },
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
        {/* Gradient overlay with transparent colors and blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400/50 via-green-400/40 to-yellow-400/40 backdrop-blur-sm" />
      </div>

      {/* Animated Circles*/}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {/* Left Side Circles */}
        <div className="absolute top-[15%] left-[8%] w-32 h-32 rounded-full bg-sky-50/10 backdrop-blur-xl animate-float-slow" />
        <div className="absolute top-[40%] left-[20%] w-28 h-28 rounded-full bg-sky-50/10 backdrop-blur-lg animate-float-medium" />
        <div className="absolute bottom-[15%] left-[5%] w-36 h-36 rounded-full bg-sky-50/10 backdrop-blur-xl animate-float-slow" />

        {/* Right Side Circles */}
        <div className="absolute top-[25%] right-[8%] w-30 h-30 rounded-full bg-sky-50/10 backdrop-blur-lg animate-float-medium" />
        <div className="absolute bottom-[15%] right-[10%] w-40 h-40 rounded-full bg-sky-50/10 backdrop-blur-xl animate-float-slow" />
        <div className="absolute bottom-[45%] right-[6%] w-24 h-24 rounded-full bg-sky-50/10 backdrop-blur-md animate-float-fast" />

        {/* Center Circles (Few) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-34 h-34 rounded-full bg-sky-50/10 backdrop-blur-lg animate-float-medium" />
        <div className="absolute top-[35%] left-[45%] w-28 h-28 rounded-full bg-sky-50/10 backdrop-blur-md animate-float-fast" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-7 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        {/* Text Content */}
        <div className="text-white space-y-6 pt-24">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
            <span className="block">Discover</span>
            <span className="block text-yellow-300">Palestinian</span>
            <span className="block">Artists</span>
          </h1>
          <p className="text-xl text-white/90 max-w-xl">
            Explore the rich cultural heritage and contemporary expressions of
            Palestinian art through our curated collection of talented artists.
          </p>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                const section = document.getElementById("artists-explore");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="border border-white bg-white hover:bg-gray-100 text-sky-600 px-7 py-6 text-lg font-medium rounded-lg"
            >
              Explore Artists
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
                <h3 className="text-white font-bold text-lg mb-1">
                  {categories[0].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {categories[0].subtitle}
                </p>
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
                <h3 className="text-white font-bold text-lg mb-1">
                  {categories[2].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {categories[2].subtitle}
                </p>
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
                <h3 className="text-white font-bold text-lg mb-1">
                  {categories[1].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {categories[1].subtitle}
                </p>
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
                <h3 className="text-white font-bold text-lg mb-1">
                  {categories[3].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {categories[3].subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*CSS styles */}
      <style>{`
 @keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-25px) translateX(20px) rotate(90deg) scale(1.1); }
  50% { transform: translateY(20px) translateX(-20px) rotate(180deg) scale(0.9); }
  75% { transform: translateY(-15px) translateX(15px) rotate(270deg) scale(1.05); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
  33% { transform: translateY(-20px) translateX(-15px) rotate(120deg) scale(1.15); }
  66% { transform: translateY(15px) translateX(15px) rotate(240deg) scale(0.9); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
  20% { transform: translateY(-15px) translateX(10px) rotate(72deg) scale(1.2); }
  40% { transform: translateY(10px) translateX(-15px) rotate(144deg) scale(0.85); }
  60% { transform: translateY(-10px) translateX(15px) rotate(216deg) scale(1.1); }
  80% { transform: translateY(10px) translateX(-10px) rotate(288deg) scale(0.95); }
}

.animate-float-slow {
  animation: float-slow 9s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

`}</style>
    </section>
  );
}