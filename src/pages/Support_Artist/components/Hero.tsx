import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import image1 from "@/assets/images/WhatsApp Image 2025-09-20 at 12.40.28 AM.jpeg";
import image2 from "@/assets/images/WhatsApp Image 2025-09-20 at 12.40.25 AM.jpeg";
import image3 from "@/assets/images/WhatsApp Image 2025-09-20 at 12.40.59 AM.jpeg";
import image4 from "@/assets/images/WhatsApp Image 2025-09-21 at 12.13.34 PM.jpeg";

const slides = [
  {
    image: image1,
    text: "ArtFeat support Artists",
    position: "object-[center_60%]",
  },
  {
    image: image2,
    text: "Empowering Communities through Art",
    position: "object-[center_35%]",
  },
  {
    image: image3,
    text: "Preserving Culture for Future Generations",
    position: "object-[center_30%]",
  },
  {
    image: image4,
    text: "Creativity Inspires Change",
    position: "object-[center_45%]",
  },
];

const Hero = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <Carousel plugins={[autoplay.current]} className="w-full h-[600px]">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative w-full h-[600px]">
            <img
              src={slide.image}
              alt={slide.text}
              className={`absolute inset-0 w-full h-full object-cover ${slide.position}`}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-10">
                {slide.text}
              </h1>
              <Button
                onClick={() => {
                  document
                    .getElementById("donation-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-sky-500/80 hover:bg-sky-600/80 text-white 
                px-6 sm:px-12 md:px-16 lg:px-20 
                py-3 sm:py-4 md:py-5 lg:py-6 
                text-sm sm:text-base md:text-lg lg:text-lg 
                rounded-full flex items-center gap-2"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" /> Donate
                Now
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
