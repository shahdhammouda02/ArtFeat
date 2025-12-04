import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// الصور
import hero1 from "@/assets/images/hero-home.png";
import hero2 from "@/assets/images/hero-home-2.jpg"; 

const slides = [
  {
    image: hero1,
    title: (
      <>
        Craft Art That <br />
        <span className="text-yellow-400">Speaks Volumes</span>
      </>
    ),
    subtitle:
      "Every brushstroke tells a story. Create in a space designed to inspire your best work and bring your imagination to life.",
  },
  {
    image: hero2,
    title: (
      <>
        Discover Art That <br />
        <span className="text-yellow-400">Moves Hearts</span>
      </>
    ),
    subtitle:
      "Step into a world of creativity where every artwork connects people, culture, and emotions together.",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const autoplay = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full h-[90vh] overflow-hidden"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center text-white"
          >
            {/* الخلفية */}
            <img
              src={slide.image}
              alt="Hero Slide"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* المحتوى */}
            <div className="relative z-10 max-w-3xl px-4">
              <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm mb-4 backdrop-blur-md">
                Your Creative Studio
              </span>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                {slide.title}
              </h1>

              <p className="text-lg text-gray-200 mb-8">{slide.subtitle}</p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate("/all-artworks")}
                  className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-yellow-300 transition"
                >
                  Explore Artworks
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
