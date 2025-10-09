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
import { Heart, Share2, Send } from "lucide-react";
import type { Auction } from "@/types/auctions";

type AuctionExtra = Auction & {
  startingPrice?: number | string;
  minIncrement?: number;
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

  const now = Date.now();
  const diffMs = Math.max(0, validTarget.getTime() - now);
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
      setTimeLeft(calcRemaining(found.endTime));
    };

    // Initial update
    updateTimer();

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [found]);

  if (!found)
    return <div className="max-w-6xl mx-auto px-4 py-16">Not Found</div>;

  const item: AuctionExtra = found;

  // Create images array (for future support of multiple images)
  const images = [item.image]; // Currently only one image per auction
  const hasMultipleImages = images.length > 1; // Hide navigation arrows when only one image

  const startingPriceNum = parseMoney(item.startingPrice ?? item.bid);
  const currentBidNum = parseMoney(item.bid) || startingPriceNum;
  const minInc = item.minIncrement ?? 100;
  const minAllowed = currentBidNum + minInc;

  const { d, h, m, s } = timeLeft;

  // Handle input validation for numeric field
  const handleBidInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);

    // Prevent negative values
    if (numValue < 0) {
      e.target.value = "0";
    }

    // Clear any custom validity when user types
    e.target.setCustomValidity("");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const bidValue = fd.get("bid") as string;
    const n = Number(bidValue);

    // Check if the field is empty or invalid
    if (!bidValue || bidValue.trim() === "" || Number.isNaN(n) || n <= 0) {
      // Show error message in the form instead of notification
      const bidInput = e.currentTarget.querySelector('input[name="bid"]') as HTMLInputElement;
      if (bidInput) {
        bidInput.setCustomValidity("Please enter a valid bid amount");
        bidInput.reportValidity();
      }
      return;
    }

    // Clear any previous validation errors
    const bidInput = e.currentTarget.querySelector('input[name="bid"]') as HTMLInputElement;
    if (bidInput) {
      bidInput.setCustomValidity("");
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
                  {images.map((imageUrl, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div
                        className="relative h-full screenshot-protection hover:shadow-2xl transition-all duration-300 group"
                        onContextMenu={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          return false;
                        }}
                      >
                      <img
                        src={imageUrl}
                        alt={`${item.title} - Image ${index + 1}`}
                        className="w-full h-full min-h-[600px] lg:min-h-[700px] object-cover rounded-xl transition-all duration-500 group-hover:scale-[1.02] select-none no-select"
                      loading="lazy"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }}
                      onDragStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }}
                      onMouseDown={(e) => {
                        if (e.button === 2) { // Right click
                          e.preventDefault();
                          e.stopPropagation();
                          return false;
                        }
                      }}
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none'
                      } as React.CSSProperties}
                    />

                    {/* Additional watermark in corner */}
                    <div className="absolute top-4 left-4 text-white text-lg font-bold select-none pointer-events-none watermark-corner"
                         style={{
                           opacity: '0.25',
                           textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                           fontSize: '1.25rem',
                           fontWeight: '800'
                         }}>
                      © ArtFeat
                    </div>

                    {/* ArtFeat Copyright Watermark - Center */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className="text-white font-bold text-3xl lg:text-5xl transform rotate-[-25deg] select-none watermark-center"
                        style={{
                          opacity: '0.3',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                          fontSize: '3.5rem',
                          letterSpacing: '5px',
                          fontFamily: 'Arial, sans-serif',
                          fontWeight: '900'
                        }}
                      >
                        © ArtFeat
                      </div>
                    </div>

                    </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {hasMultipleImages && (
                  <>
                    <CarouselPrevious className="left-3 bg-white/90 hover:bg-white border-gray-200 shadow-md" />
                    <CarouselNext className="right-3 bg-white/90 hover:bg-white border-gray-200 shadow-md" />
                  </>
                )}
              </Carousel>
              {/* Heart Button */}
              <button className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md transition-all duration-200 hover:shadow-lg z-10">
                <Heart
                  size={18}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                />
              </button>
            </div>
            {hasMultipleImages && (
              <div className="flex justify-center items-center gap-2 mt-3 py-2">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className="w-2.5 h-2.5 rounded-full bg-sky-500"
                  />
                ))}
              </div>
            )}
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
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium text-lg">
                  Starting Price:
                </span>
                <span className="text-gray-900 font-bold text-2xl">
                  ${startingPriceNum.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium text-lg">Current Bid:</span>
                <span className="text-sky-600 font-bold text-2xl">
                  ${currentBidNum.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium text-lg">
                  Auction Ends in:
                </span>
                <span className="text-sky-600 font-bold text-xl">
                  {d > 0 ? `${d} Days` : "Today"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium text-lg">Ending Date:</span>
                <span className="text-gray-900 font-semibold text-base">
                  {item.endTime.toLocaleString("en-US", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                  })}
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

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Input
                    name="bid"
                    type="number"
                    required
                    min={minAllowed}
                    step="0.01"
                    placeholder={`Enter your bid (minimum $${minAllowed.toLocaleString()})`}
                    className="h-10 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                    onChange={handleBidInputChange}
                    onKeyDown={(e) => {
                      // Prevent minus key
                      if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum bid:{" "}
                    <span className="font-bold text-sky-600 text-base">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
