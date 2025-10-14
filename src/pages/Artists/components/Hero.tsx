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
      {/* خلفية */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Discover Palestinian Artists"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* النص */}
        <div className="text-white space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            <span className="block">Discover</span>
            <span className="block text-yellow-300">Palestinian</span>
            <span className="block">Artists</span>
          </h1>
          <p className="text-white/90 max-w-xl">
            Explore the rich cultural heritage and contemporary expressions of Palestinian art through our curated collection of talented artists.
          </p>
          <div className="flex items-center gap-3">
            <Button asChild>
              <a href="#artists-explore">Explore Artists</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#learn-more">Learn More</a>
            </Button>
          </div>
        </div>

        {/* بطاقات الفئات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((c, i) => (
            <div key={i} className="rounded-xl bg-white/20 backdrop-blur-md p-3 shadow-lg hover:bg-white/25 transition">
              <div className="aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pt-3">
                <h3 className="text-white font-semibold">{c.title}</h3>
                <p className="text-white/85 text-sm">{c.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
