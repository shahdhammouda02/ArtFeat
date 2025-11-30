import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { ARTWORKS } from "@/data/artworks";
import type { Artwork } from "@/types/artworks";
import { useNavigate } from "react-router-dom";

/** بطاقة عرض العمل */
function Card({ item }: { item: Artwork }) {
  const navigate = useNavigate();
  const tagColor =
    item.tag === "Sculpture"
      ? "bg-amber-500"
      : item.tag === "Photography"
      ? "bg-sky-500"
      : "bg-indigo-600";

  const openDetails = () => navigate(`/artworks/${item.id}`);

  return (
    <div
      onClick={openDetails}
      className="text-left rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden max-w-[330px] mx-auto cursor-pointer"
    >
      <div className="relative aspect-[4/3]">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        <span
          className={`absolute left-3 top-3 px-3 py-1 text-xs font-medium text-white rounded-full ${tagColor}`}
        >
          {item.tag}
        </span>
      </div>

      <div className="p-4">
        <p className="text-sky-600 text-sm font-medium hover:underline">{item.title}</p>
        <p className="text-slate-600 text-sm mt-1">
          by <span className="font-medium">{item.author}</span>
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-slate-900 font-semibold">${item.price}</div>
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
    </div>
  );
}

/** شبكة عرض الأعمال */
export default function ArtworksGrid() {
  return (
    <div className="flex-1 pr-6">
      <div className="mb-8 text-left">
        <h3 className="text-slate-700 text-lg font-medium mb-1">
          {ARTWORKS.length} Artworks
        </h3>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {ARTWORKS.slice(0, 6).map((art) => (
          <Card key={art.id} item={art} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-sky-600 font-medium">
          Show 1 to {ARTWORKS.length} of {ARTWORKS.length} results
        </p>

        <div className="flex items-center gap-1">
          <button className="p-2 rounded-md hover:bg-slate-100" title="Prev">
            <ChevronLeft className="h-5 w-5" />
          </button>

          {[1, 2, 3, 4, 0, 10, 11].map((n, i) =>
            n === 0 ? (
              <span key={`dots-${i}`} className="px-2 text-slate-400 select-none">
                …
              </span>
            ) : (
              <button
                key={`page-${n}`}
                className={`h-8 w-8 rounded-md text-sm ${
                  n === 2
                    ? "bg-sky-500 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {n}
              </button>
            )
          )}

          <button className="p-2 rounded-md hover:bg-slate-100" title="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
