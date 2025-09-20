import React, { useState, useEffect } from "react";
import { auctions } from "@/data/auctionsData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Share2, Bookmark, Send } from "lucide-react";
import type { Auction } from "@/types/auctions";

type AuctionExtra = Auction & {
  startingPrice?: number | string;
  minIncrement?: number;
  endsAt?: string | Date;
  category?: string;
};

const parseMoney = (v: number | string | undefined): number =>
  typeof v === "number" ? v : v ? Number(String(v).replace(/[^0-9.]/g, "")) : 0;

function calcRemaining(endsAt?: string | Date) {
  const target = !endsAt
    ? new Date(Date.now() + 3 * 24 * 3600 * 1000)
    : typeof endsAt === "string"
    ? new Date(endsAt)
    : endsAt;

  const validTarget = isNaN(target.getTime())
    ? new Date(Date.now() + 3 * 24 * 3600 * 1000)
    : target;

  const diffMs = Math.max(0, validTarget.getTime() - Date.now());
  const total = Math.floor(diffMs / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return { d, h, m, s, target: validTarget };
}

export default function AuctionBidView({ id }: { id: number }) {
  const found = auctions.find((a) => a.id === id) as AuctionExtra | undefined;

  // State for countdown timer - initialize with default values
  const [timeLeft, setTimeLeft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    target: new Date(),
  });

  // Update countdown every second
  useEffect(() => {
    if (!found) return;

    const updateTimer = () => {
      setTimeLeft(calcRemaining(found.endsAt));
    };

    // Initial update
    updateTimer();

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [found]);

  if (!found)
    return <div className="max-w-6xl mx-auto px-4 py-16">Not Found</div>;

  const item: AuctionExtra = found;
  const startingPriceNum = parseMoney(item.startingPrice ?? item.bid);
  const currentBidNum = parseMoney(item.bid) || startingPriceNum;
  const minInc = item.minIncrement ?? 100;
  const minAllowed = currentBidNum + minInc;

  const { d, h, m, s, target } = timeLeft;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const n = Number(fd.get("bid"));

    if (Number.isNaN(n)) {
      // خطأ في الرقم
      const errorNotification = {
        id: Date.now(),
        message: `Invalid bid entered for "${item.title}".`,
        type: "error",
        timestamp: new Date(),
      };
      const existingNotifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );
      localStorage.setItem(
        "notifications",
        JSON.stringify([errorNotification, ...existingNotifications])
      );
      const currentCount = parseInt(
        localStorage.getItem("notificationCount") || "0"
      );
      localStorage.setItem("notificationCount", (currentCount + 1).toString());
      window.dispatchEvent(new Event("notificationUpdate"));
      return;
    }

    if (n < minAllowed) {
      const errorNotification = {
        id: Date.now(),
        message: `⚠️ Minimum bid for "${
          item.title
        }" is $${minAllowed.toLocaleString()}.`,
        type: "error",
        timestamp: new Date(),
      };
      const existingNotifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );
      localStorage.setItem(
        "notifications",
        JSON.stringify([errorNotification, ...existingNotifications])
      );
      const currentCount = parseInt(
        localStorage.getItem("notificationCount") || "0"
      );
      localStorage.setItem("notificationCount", (currentCount + 1).toString());
      window.dispatchEvent(new Event("notificationUpdate"));
      return;
    }

    const successNotification = {
      id: Date.now(),
      message: `✅ Your bid of $${n.toLocaleString()} for "${
        item.title
      }" has been placed successfully!`,
      type: "bid_success",
      timestamp: new Date(),
    };
    const existingNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    localStorage.setItem(
      "notifications",
      JSON.stringify([successNotification, ...existingNotifications])
    );
    const currentCount = parseInt(
      localStorage.getItem("notificationCount") || "0"
    );
    localStorage.setItem("notificationCount", (currentCount + 1).toString());

    window.dispatchEvent(new Event("notificationUpdate"));

    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="relative h-full">
          <div className="rounded-2xl border border-gray-200 p-3 bg-white shadow-sm h-full flex flex-col">
            <div className="relative group flex-1">
              <Carousel className="h-full">
                <CarouselContent className="h-full">
                  <CarouselItem className="h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full min-h-[600px] lg:min-h-[700px] object-cover rounded-xl transition-all duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-white/90 hover:bg-white border-gray-200 shadow-md" />
                <CarouselNext className="right-3 bg-white/90 hover:bg-white border-gray-200 shadow-md" />
              </Carousel>
              <button className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md transition-all duration-200 hover:shadow-lg">
                <Heart
                  size={18}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                />
              </button>
            </div>
            <div className="flex justify-center items-center gap-2 mt-3 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            </div>
          </div>
        </div>

        {/* Auction Details Section */}
        <div className="h-full flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {item.title}
            </h1>
            <p className="text-lg text-gray-600 mt-2">by {item.author}</p>
            <div className="mt-3">
              <span className="inline-block text-sm rounded-full bg-sky-100 text-sky-700 px-4 py-1.5 font-medium">
                {item.category ?? item.type ?? "Abstract Expressionism"}
              </span>
            </div>
          </div>

          {/* Middle Content - Price Information */}
          <div className="flex-grow space-y-4">
            <div className="bg-gray-50 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">
                  Starting Price:
                </span>
                <span className="text-gray-900 font-semibold text-lg">
                  ${startingPriceNum.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Current Bid:</span>
                <span className="text-sky-600 font-bold text-xl">
                  ${currentBidNum.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">
                  Auction Ends in:
                </span>
                <span className="text-sky-600 font-semibold">
                  {d > 0 ? `${d} Days` : "Today"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Ending Date:</span>
                <span className="text-gray-900 font-medium text-sm">
                  {target.toLocaleString("en-GB", {
                    timeZone: "UTC",
                    hour12: false,
                  })}{" "}
                  GMT
                </span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white border-2 border-sky-100 rounded-xl p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3 text-center">
                Time Remaining
              </h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-sky-50 rounded-lg p-2">
                  <div className="text-xl lg:text-2xl font-bold text-sky-600">
                    {String(d).padStart(2, "0")}
                  </div>
                  <div className="text-xs font-medium text-gray-600 tracking-wide">
                    DAYS
                  </div>
                </div>
                <div className="bg-sky-50 rounded-lg p-2">
                  <div className="text-xl lg:text-2xl font-bold text-sky-600">
                    {String(h).padStart(2, "0")}
                  </div>
                  <div className="text-xs font-medium text-gray-600 tracking-wide">
                    HOURS
                  </div>
                </div>
                <div className="bg-sky-50 rounded-lg p-2">
                  <div className="text-xl lg:text-2xl font-bold text-sky-600">
                    {String(m).padStart(2, "0")}
                  </div>
                  <div className="text-xs font-medium text-gray-600 tracking-wide">
                    MINUTES
                  </div>
                </div>
                <div className="bg-sky-50 rounded-lg p-2">
                  <div className="text-xl lg:text-2xl font-bold text-sky-600">
                    {String(s).padStart(2, "0")}
                  </div>
                  <div className="text-xs font-medium text-gray-600 tracking-wide">
                    SECONDS
                  </div>
                </div>
              </div>
            </div>

            {/* Bidding Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Place Your Bid
              </h3>

              {/* AI Suggestions */}
              <div className="mb-3 p-3 bg-sky-50 border border-sky-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AI</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    AI Suggestions
                  </span>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[name="bid"]'
                      ) as HTMLInputElement;
                      if (input) input.value = (currentBidNum + 500).toString();
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-colors"
                  >
                    ${(currentBidNum + 500).toLocaleString()}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[name="bid"]'
                      ) as HTMLInputElement;
                      if (input)
                        input.value = (currentBidNum + 1000).toString();
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-colors"
                  >
                    ${(currentBidNum + 1000).toLocaleString()}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[name="bid"]'
                      ) as HTMLInputElement;
                      if (input)
                        input.value = (currentBidNum + 1500).toString();
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-colors"
                  >
                    ${(currentBidNum + 1500).toLocaleString()}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector(
                      'input[name="bid"]'
                    ) as HTMLInputElement;
                    if (input) input.value = "";
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear Suggestions
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Input
                    name="bid"
                    type="number"
                    placeholder={`Enter your bid (minimum $${minAllowed.toLocaleString()})`}
                    className="h-10 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum bid:{" "}
                    <span className="font-semibold text-sky-600">
                      ${minAllowed.toLocaleString()}
                    </span>
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  Place Bid
                  <Send size={16} className="ml-2" />
                </Button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors duration-200">
                <Share2 size={16} />
                <span className="text-xs font-medium">Share</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors duration-200">
                <Bookmark size={16} />
                <span className="text-xs font-medium">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
