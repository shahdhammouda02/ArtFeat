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
import { Check } from "lucide-react";
import CountdownTimer from "@/components/ui/countdown-timer";
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

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="text-white font-bold transform rotate-12 select-none"
                    style={{
                      opacity: '0.2',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      fontSize: '1.5rem',
                      letterSpacing: '2px'
                    }}
                  >
                    © Art-Feat
                  </div>
                </div>

                <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${
                  item.type === "Digital"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}>
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
                <CountdownTimer endTime={item.endTime} />

                <div className="space-y-1">
                  <p className="text-xs text-gray-600 font-medium">Current Bid</p>
                  <p className="font-bold text-lg">{item.bid}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <p className="text-sm font-semibold cursor-pointer">
                      <span className="text-gray-900">{item.bidsCount} Bids Placed</span>{" "}
                      <span className="text-sky-600">View History</span>
                    </p>
                  </DialogTrigger>
                  <DialogContent className="p-0 gap-0 w-auto max-w-none">
                    <div className="w-[580px] max-h-[80vh] overflow-hidden bg-white rounded-lg shadow-lg border-2 border-red-400">
                      <DialogHeader className="px-6 py-4 border-b border-gray-100 space-y-0">
                        <DialogTitle className="text-lg font-semibold">Bid History for {item.title}</DialogTitle>
                      </DialogHeader>
                      <div className="overflow-y-auto max-h-[calc(80vh-80px)] py-4 flex justify-center items-start">
                        <div className="w-full max-w-[520px]">
                          <BidHistoryTable />
                        </div>
                      </div>
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
                        <DialogTitle className="font-bold text-lg">
                          Check Shipping Availability
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-3">
                        <p className="text-sm text-gray-600 pb-3">
                          Shipping is available to the following regions and
                          countries:
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
                            United Kingdom (England, Scotland, Wales, Northern
                            Ireland)
                          </li>
                          <li className="flex items-center text-sky-600 cursor-pointer">
                            <Check size={16} className="mr-2 text-sky-600" />
                            Australia (All states and territories)
                          </li>
                          <li className="flex items-center text-sky-600 cursor-pointer">
                            <Check size={16} className="mr-2 text-sky-600" />
                            Germany
                          </li>
                          <li className="flex items-center text-sky-600 cursor-pointer">
                            <Check size={16} className="mr-2 text-sky-600" />
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
