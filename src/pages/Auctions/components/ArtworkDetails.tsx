import React, { useState, useEffect } from "react";
import { auctions } from "@/data/auctionsData";
import type { Auction } from "@/types/auctions";
import { User, Palette, Tag, Calendar, Ruler, X, ZoomIn } from "lucide-react";
import "@/utils/screenshotProtection";

type AuctionExtra = Auction & {
  medium?: string;
  category?: string;
  year?: number | string;
  dimensions?: string;
};

export default function ArtworkDetails({ id }: { id: number }) {
  // State for image zoom modal
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle escape key to close zoom modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  const found = auctions.find((a) => a.id === id) as AuctionExtra | undefined;
  if (!found) return null;

  //قيم افتراضية
  const artist = found.author ?? "Elias Vance";
  const medium = found.medium ?? "Oil on Canvas";
  const category = found.category ?? found.type ?? "Abstract Expressionism";
  const year = found.year ?? 2023;
  const dimensions = found.dimensions ?? "48 x 36 inches (122 x 91 cm)";

  // Function to handle image zoom
  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };



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
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-8 relative screenshot-protection group cursor-pointer"
             onContextMenu={(e) => {
               e.preventDefault();
               e.stopPropagation();
               return false;
             }}
             onClick={handleImageClick}>
          <img
            src={found.image}
            alt={found.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover select-none no-select transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            onDragStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            onMouseDown={(e) => {
              if (e.button === 2) { // Right click
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none'
            } as React.CSSProperties}
          />

          {/* ArtFeat Copyright Watermark - Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="text-white/80 font-bold text-3xl lg:text-5xl transform rotate-[-25deg] select-none watermark-center"
              style={{
                textShadow: '3px 3px 6px rgba(0,0,0,0.9), -2px -2px 4px rgba(255,255,255,0.4)',
                fontSize: '3.5rem',
                letterSpacing: '5px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: '900'
              }}
            >
              © ArtFeat
            </div>
          </div>

          {/* Additional watermark in corner */}
          <div className="absolute top-4 left-4 text-white/70 text-lg font-bold select-none pointer-events-none watermark-corner"
               style={{
                 textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
                 fontSize: '1.25rem',
                 fontWeight: '800'
               }}>
            © ArtFeat
          </div>

          {/* Zoom Icon */}
          <div
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-auto"
            title="Click to zoom image"
          >
            <ZoomIn size={20} />
          </div>


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

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-7xl max-h-full animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={handleCloseZoom}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 z-10"
              title="Close (ESC)"
            >
              <X size={24} />
            </button>

            {/* Zoomed Image */}
            <img
              src={found.image}
              alt={found.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg">{found.title}</h3>
              <p className="text-sm text-gray-300">Click outside or press ESC to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
