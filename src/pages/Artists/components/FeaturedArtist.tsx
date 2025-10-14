import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import avatar from "@/assets/images/artists/hero-bg.png";
import f1 from "@/assets/images/artists/hero-bg.png";
import f2 from "@/assets/images/artists/cat-traditional.png";
import f3 from "@/assets/images/artists/cat-contemporary.png";
import f4 from "@/assets/images/artists/cat-ceramics.png";

export default function FeaturedArtist() {
  return (
    <section id="learn-more" className="bg-accent/40 py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Featured Artist of the Month</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* النص */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={avatar} alt="artist" className="h-12 w-12 rounded-full object-cover" />
              <div className="text-lg font-semibold">Anya Petrova</div>
            </div>
            <p className="text-muted-foreground leading-7">
              Anya Petrova is a contemporary artist known for her vibrant abstract paintings.
              Her work often explores the interplay of color and light, inspired by natural landscapes
              and urban environments. With a background in graphic design, Anya brings a unique precision
              and energy to her canvases, creating pieces that resonate with collectors worldwide.
            </p>
            <Button asChild>
              <a href="/gallery?artist=Anya%20Petrova">View Artist Profile</a>
            </Button>
          </div>

          {/* شبكة صور */}
          <div className="grid grid-cols-2 gap-4">
            {[f1, f2, f3, f4].map((src, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square">
                    <img
                      src={src}
                      alt={`featured-${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
