import type { Auction } from './../types/auctions';
import image1 from "../assets/images/2017 sergi.jpg";
import image2 from "../assets/images/CeramicWonders.jpeg"
import image3 from "../assets/images/Outdoor Paint Party Ideas.jpg";
import image4 from "../assets/images/download (8).jpg";

// Function to get or create persistent end times
const getAuctionEndTimes = () => {
  const storageKey = 'auctionEndTimes';
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        1: new Date(parsed[1]),
        2: new Date(parsed[2]),
        3: new Date(parsed[3]),
        4: new Date(parsed[4]),
      };
    } catch (e) {
      // If parsing fails, create new times
      console.log(e)
    }
  }

  // Create new end times if none exist or parsing failed
  const now = new Date();
  const endTimes = {
    1: new Date(now.getTime() + (15 * 60 * 1000)), // Aurora Borealis Flow - 15 minutes from now
    2: new Date(now.getTime() + (65 * 60 * 1000)), // Urban Geometry - 1 hour 5 minutes from now
    3: new Date(now.getTime() + (150 * 60 * 1000)), // Crimson Desert - 2.5 hours from now
    4: new Date(now.getTime() + (43 * 60 * 1000)), // Spring Bloom - 43 minutes from now
  };

  // Store the times
  localStorage.setItem(storageKey, JSON.stringify({
    1: endTimes[1].toISOString(),
    2: endTimes[2].toISOString(),
    3: endTimes[3].toISOString(),
    4: endTimes[4].toISOString(),
  }));

  return endTimes;
};

const auctionEndTimes = getAuctionEndTimes();

// Function to reset auction times if they have expired
export const resetExpiredAuctions = () => {
  const now = new Date();
  let needsReset = false;

  Object.values(auctionEndTimes).forEach(endTime => {
    if (endTime.getTime() <= now.getTime()) {
      needsReset = true;
    }
  });

  if (needsReset) {
    localStorage.removeItem('auctionEndTimes');
    // Reload the page to get new times
    window.location.reload();
  }
};

export const auctions: Auction[] = [
  {
    id: 1,
    type: "Digital",
    title: "Aurora Borealis Flow",
    author: "Elana Kenule",
    endTime: auctionEndTimes[1],
    bid: "$6,000",
    bidsCount: 15,
    image: image1,
  },
  {
    id: 2,
    type: "Digital",
    title: "Urban Geometry",
    author: "Marcus Thorne",
    endTime: auctionEndTimes[2],
    bid: "$3,200",
    bidsCount: 15,
    image: image2,
  },
  {
    id: 3,
    type: "Physical",
    title: "Crimson Desert",
    author: "Lehna Petrov",
    endTime: auctionEndTimes[3],
    bid: "$1,800",
    bidsCount: 15,
    image: image3,
  },
  {
    id: 4,
    type: "Physical",
    title: "Spring Bloom",
    author: "Sophia Cher",
    endTime: auctionEndTimes[4],
    bid: "$4,500",
    bidsCount: 15,
    image: image4,
  },
];