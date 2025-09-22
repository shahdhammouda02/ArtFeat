import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import artist from "@/assets/images/download (1).jpg";
import artist3 from "@/assets/images/download.jpg";
import artist2 from "@/assets/images/download (3).jpg";
import { Award, Heart } from "lucide-react";

const artists = [
  {
    image: artist,
    name: "Sarah Ahmed",
    story:
      "Sarah started with no exposure but now showcases her art internationally. Through dedication and perseverance, she gained recognition in multiple exhibitions and inspired many budding artists to follow their dreams.",
    inspiration:
      "Creativity is the key to unlocking dreams. Keep pushing boundaries every day.",
  },
  {
    image: artist2,
    name: "Omar Khaled",
    story:
      "Omar turned his passion for murals into a thriving career in urban art. His works now beautify city spaces and connect communities with culture, motivating young artists to express themselves.",
    inspiration:
      "Every brushstroke brings a new opportunity. Believe in your vision and journey.",
  },
  {
    image: artist3,
    name: "Amal Ali",
    story:
      "Amal's traditional crafts gained recognition and support through our platform. Her handmade creations now reach global audiences, preserving heritage and empowering future generations of artisans.",
    inspiration:
      "Culture preserved is culture empowered. Let your craft inspire everyone.",
  },
];

const capitalizeWords = (text: string) =>
  text.replace(/\b\w/g, (c) => c.toUpperCase());

const SuccessStories = () => {
  return (
    <section className="py-16">
      <div className="px-4 md:px-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-sky-700">
          Discover Inspiring Success Stories
        </h2>

        <p className="text-center text-gray-800 mb-16 max-w-3xl mx-auto leading-relaxed">
          {capitalizeWords(
            "Discover how our platform transformed Artist's lives and helped them achieve their dreams"
          )}
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist, index) => (
            <Card
              key={index}
              className="flex flex-col shadow-lg rounded-lg overflow-hidden h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-56 sm:h-64 object-cover object-[center_35%] transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <CardContent className="px-6 py-4 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {artist.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {artist.story}
                </p>
              </CardContent>

              <CardFooter className="bg-gray-100 border-l-4 border-sky-700 px-4 py-3 mb-3 mt-3">
                <p className="text-gray-700 italic text-sm">
                  {artist.inspiration}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button
            className="bg-sky-700 hover:bg-sky-700/90 text-white
                         px-3 sm:px-7 md:px-12 lg:px-10 
                         py-7 sm:py-4 md:py-5 lg:py-6 
                         text-sm sm:text-base md:text-lg lg:text-lg 
                         rounded-lg flex items-center gap-2 whitespace-normal"
          >
            {" "}
            Donate Now and Be Part of the Change
          </Button>
        </div>
      </div>

      <div className="mt-20 w-full bg-gradient-to-r from-sky-700 to-sky-600 text-white py-16 px-6 text-center">
        <Award className="w-14 h-14 mx-auto mb-6 text-white" />

        <h3 className="text-4xl md:text-5xl font-bold mb-4">
          Be Part Of The Next Success Stories
        </h3>

        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 text-gray-100 leading-relaxed">
          Your donation today helps create new success stories and supports
          talented artists on their journey to success.
        </p>

        <div className="flex justify-center">
          <Button
            className="bg-white hover:bg-gray-50 text-sky-700 
                         px-4 sm:px-10 md:px-12 lg:px-10 
                         py-7 sm:py-4 md:py-5 lg:py-6 
                         text-sm sm:text-base md:text-lg lg:text-lg 
                         rounded-full flex items-center gap-2 whitespace-normal"
          >
            {" "}
            Donate Now and Make it Difference
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
