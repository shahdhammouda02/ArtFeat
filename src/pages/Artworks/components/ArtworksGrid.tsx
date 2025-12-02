import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { ARTWORKS } from "@/data/artworks";
import type { Artwork } from "@/types/artworks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ArtworksGridProps {
  compact?: boolean; // للصفحة الرئيسية (Home)
  filters?: {
    artists: string[];
    categories: string[];
  };
}

/* 🎨 بطاقة العمل الفني */
function Card({
  item,
  view,
}: {
  item: Artwork;
  view: "grid" | "list";
}) {
  const navigate = useNavigate();
  const tagColor =
    item.tag === "Sculpture"
      ? "bg-amber-500"
      : item.tag === "Photography"
      ? "bg-sky-500"
      : item.tag === "Painting"
      ? "bg-purple-600"
      : "bg-indigo-600";

  const openDetails = () => navigate(`/artworks/${item.id}`);

  return (
    <div
      onClick={openDetails}
      className={`cursor-pointer bg-white border border-slate-200 shadow-sm hover:shadow-md transition rounded-2xl overflow-hidden
      ${view === "grid" ? "max-w-[330px]" : "w-full flex items-center gap-4 p-3"}`}
    >
      {/* الصورة */}
      <div
        className={`${
          view === "grid"
            ? "relative aspect-[4/3]"
            : "relative w-40 h-28 rounded-lg overflow-hidden shrink-0"
        }`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute left-3 top-3 px-3 py-1 text-xs font-medium text-white rounded-full ${tagColor}`}
        >
          {item.tag}
        </span>
      </div>

      {/* النصوص */}
      <div className={`${view === "grid" ? "p-4" : "flex-1"}`}>
        <p className="text-sky-600 text-sm font-medium hover:underline">
          {item.title}
        </p>
        <p className="text-slate-600 text-sm mt-1">
          by <span className="font-medium">{item.author}</span>
        </p>

        <div
          className={`${
            view === "grid" ? "mt-3" : "mt-2"
          } flex items-center justify-between`}
        >
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

/* 🖼️ شبكة أو قائمة عرض الأعمال */
export default function ArtworksGrid({
  compact = false,
  filters = { artists: [], categories: [] },
}: ArtworksGridProps) {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");

  // ✅ تصفية الأعمال حسب الفلاتر المختارة
  const filteredArtworks = ARTWORKS.filter((art) => {
    const artistMatch =
      filters.artists.length === 0 || filters.artists.includes(art.author);
    const categoryMatch =
      filters.categories.length === 0 || filters.categories.includes(art.tag);
    return artistMatch && categoryMatch;
  });

  // ✅ منطق التصفح (Pagination)
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArtworks = filteredArtworks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const artworksToShow = compact
    ? filteredArtworks.slice(0, 3)
    : paginatedArtworks;

  return (
    <section className="bg-white py-16 px-8">
      {/* ✅ العنوان + عدد اللوحات + أزرار العرض */}
      {!compact && (
        <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Artworks</h2>
            <p className="text-gray-500 text-sm mt-1">
              {filteredArtworks.length} Artworks
            </p>
          </div>

          {/* أزرار التبديل بين Grid و List */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md border transition ${
                view === "grid"
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-slate-300 text-slate-500 hover:bg-slate-100"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md border transition ${
                view === "list"
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-slate-300 text-slate-500 hover:bg-slate-100"
              }`}
              title="List View"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* ✅ عرض الأعمال (شبكة أو قائمة) */}
      <div
        className={
          view === "grid"
            ? "grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
            : "flex flex-col gap-4"
        }
      >
        {artworksToShow.map((art) => (
          <Card key={art.id} item={art} view={view} />
        ))}
      </div>

      {/* ✅ الزر الخاص بقسم الهوم */}
      {compact && (
        <div className="py-10 text-center">
          <Button
            onClick={() => navigate("/all-artworks")}
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-md font-medium transition"
          >
            View All Artworks
          </Button>
        </div>
      )}

      {/* ✅ التصفح (Pagination) لصفحة All Artworks */}
      {!compact && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-sky-600 font-medium">
            Showing {startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredArtworks.length)} of{" "}
            {filteredArtworks.length} results
          </p>

          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-md hover:bg-slate-100 disabled:opacity-40"
              title="Prev"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-8 w-8 rounded-md text-sm transition ${
                  currentPage === i + 1
                    ? "bg-sky-500 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="p-2 rounded-md hover:bg-slate-100 disabled:opacity-40"
              title="Next"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
