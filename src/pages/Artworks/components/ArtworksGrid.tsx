import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { ARTWORKS } from "@/data/artworks";
import type { Artwork } from "@/types/artworks";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ArtworksGridProps {
  compact?: boolean; // لو true معناها للـ Home
}

function Card({ item }: { item: Artwork }) {
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
      className="text-left rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden max-w-[330px] mx-auto cursor-pointer"
    >
      <div className="relative aspect-[4/3]">
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

      <div className="p-4">
        <p className="text-sky-600 text-sm font-medium hover:underline">
          {item.title}
        </p>
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

export default function ArtworksGrid({ compact = false }: ArtworksGridProps) {
  const navigate = useNavigate();

  // ✅ منطق عرض الصفحات للـ Artwork page فقط
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ARTWORKS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArtworks = ARTWORKS.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // ✅ الأعمال اللي راح تظهر (لو compact نعرض 3 فقط)
  const artworksToShow = compact ? ARTWORKS.slice(0, 3) : paginatedArtworks;

  return (
    <section className="bg-white py-24">
      {/* ✅ العنوان */}
      {!compact && (
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900">All Artworks</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Explore our curated collection of art pieces from talented artists.
          </p>
        </div>
      )}

      {/* ✅ الشبكة نفسها */}
      <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {artworksToShow.map((art) => (
          <Card key={art.id} item={art} />
        ))}
      </div>

      {/* ✅ القسم الخاص بالـ Home فقط */}
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

      {/* ✅ القسم الخاص بصفحة All Artworks فقط */}
      {!compact && (
        <>
          <div className="mt-12 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-sky-600 font-medium">
              Showing {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, ARTWORKS.length)} of{" "}
              {ARTWORKS.length} results
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
                  className={`h-8 w-8 rounded-md text-sm ${
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
        </>
      )}
    </section>
  );
}
