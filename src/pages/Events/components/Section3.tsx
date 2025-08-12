import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ARTISTS } from "@/data/artistsData";

const ITEMS_PER_PAGE = 8;

export default function FeaturedArtists() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ARTISTS.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentArtists = ARTISTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">Featured Artists</h2>
          <p className="mt-2 text-md sm:text-md text-gray-600">
            Discover and support emerging and established artists shaping the
            art world.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {currentArtists.map((artist, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-sky-100 group flex flex-col items-center text-center p-6"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
                loading="lazy"
              />

              <CardHeader className="p-0 mb-2">
                <CardTitle className="group-hover:text-sky-600 transition-colors duration-200">
                  {artist.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 mb-4">
                <p className="text-sm text-gray-600 leading-relaxed transition-colors duration-200 group-hover:text-gray-700">
                  {artist.description}
                </p>
              </CardContent>

              <Button
                variant="default"
                className="w-full bg-sky-500 hover:bg-sky-600 transition-colors duration-200 shadow-sm group-hover:shadow-md group-hover:bg-sky-600 mt-auto"
              >
                View Artworks
              </Button>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          aria-label="Pagination Navigation"
          className="mt-8 flex justify-center"
        >
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  changePage(page - 1);
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                href="#"
              />
            </PaginationItem>

            {pages.map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  href="#"
                  isActive={num === page}
                  onClick={(e) => {
                    e.preventDefault();
                    changePage(num);
                  }}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  changePage(page + 1);
                }}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
