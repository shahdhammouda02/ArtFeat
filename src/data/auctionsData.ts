import type { Auction } from './../types/auctions';
import image1 from "../assets/images/2017 sergi.jpg";
import image2 from "../assets/images/CeramicWonders.jpeg"
import image3 from "../assets/images/Outdoor Paint Party Ideas.jpg";
import image4 from "../assets/images/download (8).jpg";

// Helper function to create end times relative to current time
const createEndTime = (hours: number, minutes: number, seconds: number): Date => {
  const now = new Date();
  return new Date(now.getTime() + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000));
};

export const auctions: Auction[] = [
  {
    id: 1,
    type: "Digital",
    title: "Aurora Borealis Flow",
    author: "Elana Kenule",
    endTime: createEndTime(0, 4, 59), // Ends in 4 minutes 59 seconds
    bid: "$6,000",
    bidsCount: 15,
    image: image1,
  },
  {
    id: 2,
    type: "Digital",
    title: "Urban Geometry",
    author: "Marcus Thorne",
    endTime: createEndTime(0, 29, 59), // Ends in 29 minutes 59 seconds
    bid: "$3,200",
    bidsCount: 15,
    image: image2,
  },
  {
    id: 3,
    type: "Physical",
    title: "Crimson Desert",
    author: "Lehna Petrov",
    endTime: createEndTime(12, 9, 59), // Ends in 12 hours 9 minutes 59 seconds
    bid: "$1,800",
    bidsCount: 15,
    image: image3,
  },
  {
    id: 4,
    type: "Physical",
    title: "Spring Bloom",
    author: "Sophia Cher",
    endTime: createEndTime(0, 44, 59), // Ends in 44 minutes 59 seconds
    bid: "$4,500",
    bidsCount: 15,
    image: image4,
  },
];