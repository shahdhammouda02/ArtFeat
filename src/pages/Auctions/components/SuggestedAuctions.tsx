// src/pages/Auctions/components/SuggestedAuctions.tsx
import { Link } from "react-router-dom";
import { auctions } from "@/data/auctionsData";
import type { Auction } from "@/types/auctions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Props = {
  currentId: number;
};

export default function SuggestedAuctions({ currentId }: Props) {
  // استثناء المزاد الحالي
  const base: Auction[] = auctions.filter((a) => a.id !== currentId);

  const desired = 6;
  const suggested: Auction[] = [];

  // إذا عدد المزادات أقل من المطلوب، كررها عشان يكمل 6
  for (let i = 0; i < Math.max(desired, base.length); i++) {
    suggested.push(base[i % base.length]);
    if (suggested.length === desired) break;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Suggested Similar Auctions</h2>
        <p className="mt-2 text-md sm:text-md text-gray-600">
          Discover more amazing artworks that might interest you.
        </p>
      </div>

      <div className={`
        ${suggested.length === 1 ?
          'flex justify-center' :
          'grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }
        ${suggested.length === 2 ? 'lg:justify-items-center lg:grid-cols-2' : ''}
      `}>
        {suggested.length === 0 ? (
          <p className="text-center col-span-full text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 drop-shadow-sm">
            No similar auctions found.
          </p>
        ) : (
          suggested.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              to={`/auctions/${item.id}`}
              className="block"
            >
              <Card className={`overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-sky-100 group ${
                suggested.length === 1 ? 'w-full max-w-sm' : ''
              }`}>
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-[16/8] sm:aspect-[4/2.5] object-cover transition-all duration-500 group-hover:scale-105 select-none pointer-events-none"
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}
                  />

                  {/* ArtFeat Copyright Watermark - Top Left Corner */}
                  <div className="absolute top-2 left-2 text-white text-xs font-bold select-none pointer-events-none"
                       style={{
                         opacity: '0.7',
                         textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                         fontSize: '0.75rem',
                         fontWeight: '800'
                       }}>
                    © Art-Feat
                  </div>

                  {/* ArtFeat Copyright Watermark - Center */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="text-white font-bold transform rotate-[-25deg] select-none"
                      style={{
                        opacity: '0.25',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                        fontSize: '1.5rem',
                        letterSpacing: '2px',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: '900'
                      }}
                    >
                      © Art-Feat
                    </div>
                  </div>

                  {/* Type Tag */}
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${
                    item.type === "Digital"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}>
                    {item.type}
                  </span>

                </div>

                <CardHeader className="transition-colors duration-300 group-hover:bg-sky-50/50">
                  <CardTitle className="group-hover:text-sky-600 transition-colors duration-200 text-base">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    by <span className="text-gray-700 font-medium">{item.author}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm font-medium">Current Bid:</span>
                    <span className="font-bold text-sky-600 text-lg">
                      {item.bid}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
