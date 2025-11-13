import { Heart, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Artwork } from "@/types/artists";
import type { Item } from "@/types/artworks";
import { useState } from "react";

interface ArtworkCardProps {
  item: Artwork | (Item & { type?: string; sales?: number; format?: string });
  showFormatBadge?: boolean;
}

export function ArtworkCard({ item, showFormatBadge = false }: ArtworkCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const artworkType =
    item.type ||
    ("tag" in item && typeof (item as Item).tag === "string" ? (item as Item).tag : undefined) ||
    "Artwork";
  const sales = item.sales || 0;
  const format = "format" in item && typeof item.format === "string" ? item.format : "Physical";

  return (
    <Card className="overflow-hidden hover:shadow-lg hover:border-sky-300 transition-all duration-300 cursor-pointer group border min-h-[280px]">
      <div className="relative h-40 overflow-hidden mb-2">
        <img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Art Feat Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-md font-bold">Art Feat</span>
        </div>

        {/* 💜 Show both Format Badge and Heart Icon */}
        <div className="absolute top-2 right-2 flex items-center gap-2">
          {/* Format Badge */}
          {showFormatBadge && (
            <Badge
              variant="secondary"
              className={`text-xs h-5 px-2 ${
                format === "Digital"
                  ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              } transition-colors duration-200`}
            >
              {format}
            </Badge>
          )}

          {/* Heart Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite((prev) => !prev);
            }}
            className="p-1 rounded-full bg-black/40 hover:bg-black/60 transition-colors duration-300"
            aria-label="Add to favorites"
          >
            <Heart
              className={`h-3.5 w-3.5 transition ${
                isFavorite ? "text-red-500 fill-red-500" : "text-white/80"
              }`}
            />
          </button>
        </div>
      </div>

      <CardHeader className="p-3 pb-1 group-hover:bg-sky-50/30 transition-colors duration-200">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-sm font-medium group-hover:text-sky-900 transition-colors duration-200 line-clamp-1 flex-1">
            {item.title}
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium ml-2">
            <TrendingUp className="h-3 w-3" />
            <span>{sales} sold</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-1 flex items-center justify-between group-hover:bg-sky-50/30 transition-colors duration-200">
        <div className="flex flex-col gap-1.5">
          <Badge
            variant="secondary"
            className={`text-xs h-5 px-2 ${
              artworkType === "Painting"
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : artworkType === "Oil Painting"
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                : artworkType === "Digital"
                ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                : artworkType === "Watercolor"
                ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            } transition-colors duration-200`}
          >
            {artworkType}
          </Badge>
          <span className="text-sky-600 font-semibold text-sm group-hover:text-sky-700 transition-colors duration-200">
            ${item.price}
          </span>
        </div>
        <div className="text-muted-foreground group-hover:text-sky-600 cursor-pointer transition-colors duration-200 p-1 rounded-md group-hover:bg-sky-100">
          <ShoppingCart className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
