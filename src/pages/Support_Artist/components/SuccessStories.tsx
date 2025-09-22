import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import artist from "@/assets/images/download (1).jpg";
import artist3 from "@/assets/images/download.jpg";
import artist2 from "@/assets/images/download (3).jpg";

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
    <section className="py-16 px-4 md:px-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-sky-700">
        Discover Inspiring Success Stories
      </h2>

      <p className="text-center text-gray-800 mb-16 max-w-3xl mx-auto leading-relaxed">
        {capitalizeWords(
          "Discover how our platform transformed Artist's lives and helped them achieve their dreams"
        )}
      </p>

      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {artists.map((artist, index) => (
          <Card
            key={index}
            className="flex flex-col shadow-lg rounded-lg overflow-hidden h-[500px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="overflow-hidden">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-64 md:h-60 object-cover object-[center_35%] transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>

            <CardContent className="px-6 py-3 flex-1">
              <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {artist.story}
              </p>
            </CardContent>

            <CardFooter className="bg-gray-100 border-l-4 border-sky-700 px-4 py-2 mb-5">
              <p className="text-gray-700 italic text-sm">
                {artist.inspiration}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          className="bg-sky-700 hover:bg-sky-800 text-white rounded-lg whitespace-normal text-center 
                     px-4 py-7 sm:px-6 sm:py-5 md:px-8 md:py-5"
        >
          Donate Now and Be Part of the Change
        </Button>
      </div>
    </section>
  );
};

export default SuccessStories;
