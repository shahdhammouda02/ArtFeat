// Section2.tsx
import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ARTISTS_DATA, TYPES } from "@/data/artists";
import type { Artist, Artwork } from "@/types/artists";
import { ArtworkCard } from "./ArtworkCard";

// Props interface for ArtistCarousel
interface ArtistCarouselProps {
  artist: Artist;
  visibleCount?: number;
}

function ArtistCarousel({ artist, visibleCount = 3 }: ArtistCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalSlides = artist.artworks.length;
  const maxIndex = Math.max(0, totalSlides - visibleCount);

  const nextSlide = () => {
    setCurrentIndex(current => Math.min(current + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(current => Math.max(current - 1, 0));
  };

  const visibleArtworks = artist.artworks.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="space-y-4 border-b pb-6">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={artist.photo}
            alt="avatar"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <div className="font-semibold text-sm">{artist.name}</div>
            <div className="text-xs text-muted-foreground">
              {artist.artworks.length} artworks
            </div>
          </div>
          <Button
            variant="secondary"
            className="h-7 px-3 rounded-full border border-gray-300 bg-white text-xs"
          >
            + Follow
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">All artworks</span>
        </div>
      </div>

      <div className="relative mt-3">
        {totalSlides > visibleCount && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-sm h-7 w-7"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-sm h-7 w-7"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </>
        )}

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleArtworks.map((item: Artwork) => (
            <ArtworkCard key={item.id} item={item} />
          ))}
        </div>

        {/* Carousel Indicators */}
        {totalSlides > visibleCount && (
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-sky-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Section2() {
  const [type, setType] = useState<string>("All Types");
  const [q, setQ] = useState<string>("");
  const [visibleArtistsCount, setVisibleArtistsCount] = useState<number>(1);

  const filteredArtists = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ARTISTS_DATA.filter((artist: Artist) => {
      const hasMatchingArtworks = artist.artworks.some((item: Artwork) => {
        const byType = type === "All Types" || item.type === type;
        const byQuery =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          artist.name.toLowerCase().includes(query);
        return byType && byQuery;
      });
      return hasMatchingArtworks;
    });
  }, [q, type]);

  const visibleArtists = filteredArtists.slice(0, visibleArtistsCount);
  const hasMoreArtists = visibleArtistsCount < filteredArtists.length;
  const hasLessArtists = visibleArtistsCount > 1;

  const reset = () => {
    setType("All Types");
    setQ("");
    setVisibleArtistsCount(1);
  };

  const loadMoreArtists = () => {
    setVisibleArtistsCount(prev => prev + 1);
  };

  const loadLessArtists = () => {
    setVisibleArtistsCount(1);
  };

  return (
    <section
      id="artists-explore"
      className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-6 space-y-4"
    >
      {/* Filters Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-8 rounded-md border border-gray-300 bg-background px-3 text-xs flex items-center justify-center shadow-sm">
            All Artists
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-8 rounded-md border border-gray-300 bg-background px-2 text-xs shadow-sm"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <div className="relative w-full md:w-64">
            <Input
              placeholder="What are you searching for?"
              className="pr-8 pl-2 border border-gray-300 h-8 text-xs"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="bg-sky-500 hover:bg-sky-600 h-8 px-3 text-xs">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={reset} className="h-8 px-3 text-xs">
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Artists List with Carousels */}
      <div className="space-y-4">
        {filteredArtists.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-lg font-semibold text-gray-500 mb-1">
              No artworks found
            </div>
            <div className="text-gray-400 text-xs">
              Try adjusting your search or filters to find what you're looking for.
            </div>
          </div>
        ) : (
          <>
            {visibleArtists.map((artist: Artist) => (
              <ArtistCarousel 
                key={artist.id} 
                artist={artist} 
                visibleCount={3}
              />
            ))}
            
            <div className="flex justify-center gap-3 pt-4">
              {hasLessArtists && (
                <Button 
                  onClick={loadLessArtists}
                  variant="outline" 
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-600 hover:text-gray-700 px-6 py-2"
                >
                  View Less
                </Button>
              )}
              
              {hasMoreArtists && (
                <Button 
                  onClick={loadMoreArtists}
                  variant="outline" 
                  className="bg-white hover:bg-gray-50 border border-sky-300 text-sky-600 hover:text-sky-700 px-6 py-2"
                >
                  View More Artists
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}