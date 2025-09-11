import { auctions } from "@/data/auctionsData";
import type { Auction } from "@/types/auctions";
import { User, Palette, Tag, Calendar, Ruler } from "lucide-react";

type AuctionExtra = Auction & {
  medium?: string;
  category?: string;
  year?: number | string;
  dimensions?: string;
};

export default function ArtworkDetails({ id }: { id: number }) {
  const found = auctions.find((a) => a.id === id) as AuctionExtra | undefined;
  if (!found) return null;

  //قيم افتراضية
  const artist = found.author ?? "Elias Vance";
  const medium = found.medium ?? "Oil on Canvas";
  const category = found.category ?? found.type ?? "Abstract Expressionism";
  const year = found.year ?? 2023;
  const dimensions = found.dimensions ?? "48 x 36 inches (122 x 91 cm)";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Artwork Details</h2>
        <p className="mt-2 text-md sm:text-md text-gray-600">
          Discover the story and details behind this unique piece of art.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Artwork Image */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-8">
          <img
            src={found.image}
            alt={found.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            loading="lazy"
          />
        </div>

        {/* Production Details */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Production Details</h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-sky-100 rounded-full">
                  <User size={16} className="text-sky-600" />
                </div>
                <div>
                  <span className="text-gray-600 text-sm font-medium">Artist:</span>
                  <p className="text-gray-900 font-semibold">{artist}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-sky-100 rounded-full">
                  <Palette size={16} className="text-sky-600" />
                </div>
                <div>
                  <span className="text-gray-600 text-sm font-medium">Medium:</span>
                  <p className="text-gray-900 font-semibold">{medium}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-sky-100 rounded-full">
                  <Tag size={16} className="text-sky-600" />
                </div>
                <div>
                  <span className="text-gray-600 text-sm font-medium">Category:</span>
                  <p className="text-gray-900 font-semibold">{category}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-sky-100 rounded-full">
                  <Calendar size={16} className="text-sky-600" />
                </div>
                <div>
                  <span className="text-gray-600 text-sm font-medium">Year:</span>
                  <p className="text-gray-900 font-semibold">{year}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-sky-100 rounded-full">
                  <Ruler size={16} className="text-sky-600" />
                </div>
                <div>
                  <span className="text-gray-600 text-sm font-medium">Dimensions:</span>
                  <p className="text-gray-900 font-semibold">{dimensions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Artist Profile */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/64?img=13"
                alt={artist}
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{artist}</h4>
                <p className="text-gray-600 text-sm">Featured Artist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
