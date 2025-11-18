import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
interface ArtworkCardProps {
  item: {
    id: number;
    title: string;
    price: string;
    type: string;
    image: string;
    sales?: number;
  };
  showFormatBadge?: boolean;
}

export function ArtworkCard({ item }: ArtworkCardProps) {
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/artworks/${item.id}`);
  };

  const tagColor =
    item.type === "Sculpture"
      ? "bg-amber-500"
      : item.type === "Photography"
      ? "bg-sky-500"
      : "bg-indigo-600";

  return (
    <Card
      className="overflow-hidden hover:shadow-lg hover:border-sky-300 transition-all duration-300 cursor-pointer group border min-h-[280px]"
      onClick={openDetails}
    >
      {/* الصورة */}
      <div className="relative h-40 overflow-hidden mb-2">
        <img
          src={item.image || "/placeholder.png"}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-md font-bold">Art Feat</span>
        </div>
      </div>

      {/* العنوان */}
      <CardHeader className="p-3 pb-1 group-hover:bg-sky-50/30 transition-colors duration-200">
        <CardTitle className="text-sm font-medium group-hover:text-sky-900 transition-colors duration-200 line-clamp-1">
          {item.title}
        </CardTitle>
      </CardHeader>

      {/* السعر والزر */}
      <CardContent className="p-3 pt-1 flex items-center justify-between group-hover:bg-sky-50/30 transition-colors duration-200">
        <div className="flex flex-col gap-1.5">
          <span
            className={`text-xs font-semibold text-white rounded px-2 py-0.5 ${tagColor}`}
          >
            {item.type}
          </span>
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
