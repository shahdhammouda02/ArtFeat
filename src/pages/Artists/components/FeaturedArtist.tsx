import { Button } from "@/components/ui/button";

import avatar from "@/assets/images/artists/hero-bg.png";
import f1 from "@/assets/images/artists/hero-bg.png";
import f2 from "@/assets/images/artists/cat-traditional.png";
import f3 from "@/assets/images/artists/cat-contemporary.png";
import f4 from "@/assets/images/artists/cat-ceramics.png";

export default function FeaturedArtist() {
  return (
    <section id="learn-more" className="bg-[#EAF5FF] py-14">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* العنوان */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-3">
  Featured Artist of the
  <br />
  Month
</h2>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* النص على اليسار */}
          <div className="space-y-5 text-[1.05rem]">
            {/* الاسم مع الصورة */}
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="artist"
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/80"
              />
              <div className="text-2xl font-semibold text-foreground">
                Anya Petrova
              </div>
            </div>

            {/* الوصف */}
            <p className="text-muted-foreground leading-8 max-w-xl text-[1.05rem]">
              Anya Petrova is a contemporary artist known for her vibrant abstract paintings.
              Her work often explores the interplay of color and light, inspired by natural landscapes
              and urban environments. With a background in graphic design, Anya brings a unique precision
              and energy to her canvases, creating pieces that resonate with collectors worldwide.
            </p>

            {/* الزر */}
            <Button
              asChild
              className="w-fit bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 text-sm rounded-md shadow-sm"
            >
              <a href="/gallery?artist=Anya%20Petrova">View Artist Profile</a>
            </Button>
          </div>

          {/* الصور على اليمين */}
          <div className="grid grid-cols-2 gap-5">
            {[f1, f2, f3, f4].map((src, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={src}
                  alt={`featured-${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
