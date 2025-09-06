import { Button } from "@/components/ui/button";
import { auctions } from "@/data/auctionsData";
import type { Auction } from "@/types/auctions";
import { Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Section2 = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
          Explore Live Auctions
        </h2>

        {/* Auction Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {auctions.map((item: Auction) => (
            <Card
              key={item.id}
              id={`auction-${item.id}`}
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-sky-100 bg-gray-50"
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  {item.type}
                </span>
              </div>

              {/* Content */}
              <CardHeader className="transition-colors duration-300 group-hover:bg-sky-50/40">
                <CardTitle className="font-semibold text-gray-800 group-hover:text-sky-600 transition-colors duration-200">
                  {item.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                    By {item.author}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="flex items-center gap-1 text-xs text-sky-600 font-medium">
                  <Clock
                    size={14}
                    className="text-gray-500 group-hover:text-sky-500 transition-colors duration-200"
                  />
                  Auction ends in: <span>{item.time}</span>
                </p>

                <p className="font-bold text-lg">{item.bid}</p>
                <p className="text-xs text-sky-600 cursor-pointer">
                  {item.bidsCount} Bids Placed • View History
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 transition-colors duration-300 group-hover:bg-sky-50/30">
                <Button
                  variant="outline"
                  className="w-full text-sm font-medium"
                >
                  Check shipping availability
                </Button>
                <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-sm hover:shadow-md">
                  Place Bid
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
