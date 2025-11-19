// src/components/SharedArtworkCard.tsx
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Artwork } from "@/types/artworks";

interface ArtworkCardProps {
  item: Artwork;
}

export default function SharedArtworkCard({ item }: ArtworkCardProps) {
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/artworks/${item.id}`);
  };

  const tagColor =
    item.tag === "Sculpture"
      ? "bg-amber-500"
      : item.tag === "Photography"
      ? "bg-sky-500"
      : "bg-indigo-600";

  return (
    <button
      type="button"
      onClick={openDetails}
      className="text-left rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden max-w-[330px] mx-auto focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      {/* الصورة */}
      <div className="relative aspect-[4/3]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />

        {/* شارة النوع */}
        <span
          className={`absolute left-3 top-3 px-3 py-1 text-xs font-medium text-white rounded-full ${tagColor}`}
        >
          {item.tag}
        </span>

        {/* شعار شفاف */}
        <span className="absolute inset-0 flex items-center justify-center text-white/70 text-4xl font-semibold select-none">
          Art Feat
        </span>
      </div>

      {/* التفاصيل */}
      <div className="p-4">
        <p className="text-sky-600 text-sm font-medium hover:underline">
          {item.title}
        </p>
        <p className="text-slate-600 text-sm mt-1">
          by <span className="font-medium">{item.author}</span>
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-slate-900 font-semibold">{item.price}</div>
          <button
            type="button"
            title="Add to cart"
            className="rounded-full p-2 hover:bg-sky-100 text-sky-500 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </button>
  );
}
