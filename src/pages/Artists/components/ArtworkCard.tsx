import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Artwork } from "@/types/artists";

interface ArtworkCardProps {
  item: Artwork;
}

export function ArtworkCard({ item }: ArtworkCardProps) {
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
        {/* Heart Icon */}
        <div className="absolute top-2 right-2 text-white/80 group-hover:text-red-500 cursor-pointer transition-colors duration-300 bg-black/40 rounded-full p-1 group-hover:bg-black/60">
          <Heart className="h-3.5 w-3.5" />
        </div>
      </div>

      <CardHeader className="p-3 pb-1 group-hover:bg-sky-50/30 transition-colors duration-200">
        <CardTitle className="text-sm font-medium group-hover:text-sky-900 transition-colors duration-200 line-clamp-1">
          {item.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3 pt-1 flex items-center justify-between group-hover:bg-sky-50/30 transition-colors duration-200">
        <div className="flex flex-col gap-1.5">
          <Badge 
            variant="secondary"
            className={`text-xs h-5 px-2 ${
              item.type === "Painting" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" :
              item.type === "Oil Painting" ? "bg-amber-100 text-amber-700 hover:bg-amber-200" :
              item.type === "Digital" ? "bg-purple-100 text-purple-700 hover:bg-purple-200" :
              item.type === "Watercolor" ? "bg-cyan-100 text-cyan-700 hover:bg-cyan-200" :
              "bg-green-100 text-green-700 hover:bg-green-200"
            } transition-colors duration-200`}
          >
            {item.type}
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