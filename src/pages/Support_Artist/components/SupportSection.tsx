import { Button } from "@/components/ui/button";
import { Users, DollarSign, Heart } from "lucide-react";
import artistImage from "@/assets/images/Artist Feature Blog - Eleisha Pirouet - Fremantle Artist — Open Hands Creative.jpg";

const SupportSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-sky-700 mb-6">
            Support the Artists, Shape the Future
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
            ArtFeat Support Platform was founded out of a deep belief in the importance of art and artists in shaping 
            our society and strengthening our communities. We serve as a bridge connecting talented artists with 
            supporters, ensuring the continuity of their creativity and growth.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-sky-50/30 py-8 px-6 rounded-2xl">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-sky-700" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-sky-700 mb-2">120+</div>
            <div className="text-gray-600 font-medium">Supported Artists</div>
          </div>

          <div className="text-center bg-sky-50/30 py-8 px-6 rounded-2xl">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-sky-700" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-sky-700 mb-2">500K+</div>
            <div className="text-gray-600 font-medium">Total Donations</div>
          </div>

          <div className="text-center bg-sky-50/30 py-8 px-6 rounded-2xl">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-sky-700" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-sky-700 mb-2">85</div>
            <div className="text-gray-600 font-medium">Art works</div>
          </div>
        </div>

        {/* Our Goal Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6">
              Our Goal: Empower Creativity
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe that every artist has a unique voice and vision that deserves to be heard and seen. 
              Every donation directly contributes to purchasing materials, supporting exhibitions, and providing 
              opportunities for artists to showcase their work and reach new audiences.
            </p>
            <Button className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-3 rounded-lg font-medium">
              Donate Now
            </Button>
          </div>
          <div className="order-first lg:order-last">
            <img
              src={artistImage}
              alt="Artist working on painting"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* See Your Support Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src={artistImage}
              alt="Artist creating artwork"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6">
              See Your Support in Action
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your donations are more than just money; they are fuel for creativity. 
              Watch as artists transform raw materials into masterpieces, see exhibitions 
              come to life, and witness the growth of artistic communities. Every 
              contribution opens doors for artists, enabling them to thrive and share 
              their gifts with the world.
            </p>
            <Button className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-3 rounded-lg font-medium">
              Donate Now
            </Button>
          </div>
        </div>

        {/* Every Donation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-sky-700 mb-6">
              Every Donation Shapes the Future
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We don't support artists for just one day, we aim to build a sustainable 
              creative ecosystem. Your contribution helps establish long-term programs, 
              provides ongoing mentorship, and creates lasting opportunities that will 
              benefit artists and communities for generations to come.
            </p>
            <Button className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-3 rounded-lg font-medium">
              Donate Now
            </Button>
          </div>
          <div className="order-first lg:order-last">
            <img
              src={artistImage}
              alt="Artist working with materials"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
