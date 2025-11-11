// components/CollectionCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface CollectionCardProps {
  title: string;
  artworksCount: string;
  description: string;
  imageUrl: string;
}

export function CollectionCard({ 
  title, 
  artworksCount, 
  description, 
  imageUrl, 
}: CollectionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer h-full overflow-hidden">
      {/* Collection Image with Title and Count overlay */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Title and Artworks Count overlay at bottom left */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <p className="text-sm text-white/80 mt-1">{artworksCount}</p>
        </div>
      </div>
      
      {/* Description only in CardContent */}
      <CardContent className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}