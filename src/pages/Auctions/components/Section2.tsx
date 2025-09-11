import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auctions } from "@/data/auctionsData";
import type { Auction } from "@/types/auctions";
import { Check, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import BidHistoryTable from "./BidHistoryTable";

const Section2 = () => {
  return (
    <section id="live-auctions" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
          Explore Live Auctions
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {auctions.map((item: Auction) => (
            <Card
              key={item.id}
              id={`auction-${item.id}`}
              className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-sky-100 bg-gray-50"
            >
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
                <Dialog>
                  <DialogTrigger asChild>
                    <p className="text-xs text-sky-600 cursor-pointer">
                      {item.bidsCount} Bids Placed View History
                    </p>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Bid History for {item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <BidHistoryTable />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 transition-colors duration-300 group-hover:bg-sky-50/30">
                 {item.type === "Physical" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-sm font-medium"
                      >
                        Check shipping availability
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader className="border-b border-gray-200 pb-3 -mx-6 px-6">
                        <DialogTitle className="font-bold text-lg">Check Shipping Availability</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-3">
                        <p className="text-sm text-gray-600 pb-3">
                          Shipping is available to the following regions and countries:
                        </p>
                        <ul className="text-sm space-y-2 px-3">
                          <li className="flex items-center text-sky-600 cursor-pointer">
                            <Check size={16} className="mr-2 text-sky-600" />
                            United States (All 50 states)
                          </li>
                          <li className="flex items-center text-sky-600 cursor-pointer">
                            <Check size={16} className="mr-2 text-sky-600" />
                            Canada (All provinces and territories)
                          </li>
                          <li className="flex items-center text-sky-600 cursor-pointer">
                            <Check size={20} className="mr-2 text-sky-600" />
                            United Kingdom (England, Scotland, Wales, Northern Ireland)
                          </li>
                          <li className="flex items-center text-sky-600 cursor-pointer">
                            <Check size={16} className="mr-2 text-sky-600" />
                            Australia (All states and territories)
                          </li>
                          <li className="flex items-center text-blue-600 cursor-pointer">
                            <Check size={16} className="mr-2 text-sky-600" />
                            Germany
                          </li>
                          <li className="flex items-center text-gray-600">
                            <MapPin size={16} className="mr-2 text-gray-500" />
                            France
                          </li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full text-sm font-medium opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Shipping not available
                  </Button>
                )}


                {/* <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-sm hover:shadow-md">
                  Place Bid
                </Button> */}
<Link
  to={`/auctions/${item.id}`}
  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-sm hover:shadow-md text-center py-2 rounded-md"
>
  Place Bid
</Link>


              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;