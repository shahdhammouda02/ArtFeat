import { useMemo, useState } from "react";
import { Heart, Search, ShoppingCart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import art from "@/assets/images/artists/cat-contemporary.png";
import artistPhoto from "@/assets/images/artistPhoto.jpg";

const DATA = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  artist: "Rawan Ahmad",
  title: [
    "Think Different (Yellow)",
    "The Great Beyond",
    "Fly Over Wide Fields",
    "Art in Motion",
  ][i % 4],
  price: 635,
  type: ["Painting", "Oil Painting", "Acrylic"][i % 3],
  img: art,
}));

const TYPES = ["All Types", "Painting", "Oil Painting", "Acrylic"];

const PAGE_SIZE = 8;

export default function Section2() {
  const [artist] = useState<string>("All Artists"); // محجوز للتوسعة
  const [type, setType] = useState<string>("All Types");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DATA.filter((item) => {
      const byType = type === "All Types" || item.type === type;
      const byQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);
      return byType && byQuery;
    });
  }, [q, type]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const view = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const reset = () => {
    setType("All Types");
    setQ("");
    setPage(1);
  };

  return (
    <section
      id="artists-explore"
      className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12 space-y-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={artist}
            onChange={() => {}}
            className="h-10 rounded-md border-2 border-sky-500 bg-background px-4 text-sm shadow-sm"
          >
            <option>All Artists</option>
          </select>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-md border-2 border-sky-500 bg-background px-4 text-sm shadow-sm"
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <div className="relative w-full md:w-80">
            <Input
              placeholder="What are you searching for?"
              className="pr-10 pl-4 border-2 border-sky-500 h-10"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="bg-sky-500 hover:bg-sky-600"
            onClick={() => setPage(1)}
          >
            Apply Filters
          </Button>
          <Button variant="outline" onClick={reset}>
            Reset Filters
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={artistPhoto}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
            <div className="font-semibold">Ahmed Jack</div>
            <Button
              variant="secondary"
              className="h-8 px-5 rounded-full border border-black bg-white "
            >
              + Follow
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">All artworks</div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-2xl font-semibold text-gray-500 mb-2">
              No artworks found
            </div>
            <div className="text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {view.map((item) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden hover:shadow-lg hover:border-sky-200 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                      <span className="text-white text-3xl font-bold">
                        Art Feat
                      </span>
                    </div>
                    {/* Heart Icon */}
                    <div className="absolute top-2 right-2 text-white/80 group-hover:text-red-500 cursor-pointer transition-colors duration-300">
                      <Heart className="h-6 w-6" />
                    </div>
                  </div>
                  <CardHeader className="pb-2 group-hover:bg-gray-50 transition-colors duration-300">
                    <CardTitle className="text-base group-hover:text-sky-700 transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                    <CardDescription>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          item.type === "Painting" ? "bg-blue-100 text-blue-800 border-blue-200" :
                          item.type === "Oil Painting" ? "bg-amber-100 text-amber-800 border-amber-200" :
                          "bg-green-100 text-green-800 border-green-200"
                        } group-hover:border-sky-300 group-hover:text-sky-600 transition-colors duration-300`}
                      >
                        {item.type}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex items-center justify-between group-hover:bg-gray-50 transition-colors duration-300">
                    <a className="text-sky-600 font-semibold group-hover:text-sky-700 transition-colors duration-300" href="#!">
                      ${item.price}
                    </a>
                    <div className="text-muted-foreground text-xl group-hover:text-sky-500 cursor-pointer transition-colors duration-300 p-1 rounded-md group-hover:bg-sky-50">
                      <ShoppingCart />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.max(1, p - 1));
                      }}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages })
                    .map((_, i) => i + 1)
                    .filter(
                      (p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages
                    )
                    .reduce<number[]>((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push(-1);
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, idx) =>
                      p === -1 ? (
                        <PaginationItem key={`e-${idx}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={p === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(p);
                            }}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.min(totalPages, p + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  );
}