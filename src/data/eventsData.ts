import type { EventItem } from "../types/eventTypes";
import ceramic from '@/assets/images/CeramicWonders.jpeg'
import pic1 from '@/assets/images/2017 sergi.jpg'
import pic2 from '@/assets/images/Outdoor Paint Party Ideas.jpg'
import pic3 from '@/assets/images/download (8).jpg'
import pic4 from '@/assets/images/download (9).jpg'
import pic5 from '@/assets/images/Artist Feature Blog - Eleisha Pirouet - Fremantle Artist — Open Hands Creative.jpg'
import pic6 from '@/assets/images/ESCAPE TO ARIZONA.jpg'

export const ALL_EVENTS: EventItem[] = [
  {
    id: 1,
     type: "Digital",   
    title: "Abstract Expressions",
    date: "October 24, 2024",
    status: "Ended",
    tags: ["Paintings", "Abstract Art"],
    excerpt:
      "A mesmerizing exhibition featuring dynamic and vibrant abstract artworks from emerging talents.",
    image: ceramic
  },
  {
    id: 2,
      type: "Physical",   
    title: "Ceramic Wonders",
    date: "October 15, 2025",
    status: "Upcoming",
    tags: ["Sculpture", "Crafts"],
    excerpt:
      "Discover the beauty of handcrafted ceramics, from traditional to contemporary.",
    image: pic1
  },
  {
    id: 3,
     type: "Digital",
    title: "Botanical Illustration",
    date: "September 30, 2025",
    status: "Upcoming",
    tags: ["Illustration", "Nature Art"],
    excerpt:
      "An immersive journey into the intricate world of botanical art, celebrating nature’s forms.",
    image: pic2
  },
  {
    id: 4,
     type: "Digital",
    title: "Urban Canvas Festival",
    date: "December 10, 2025",
    status: "Upcoming",
    tags: ["Paintings", "Abstract Art"],
    excerpt:
      "Experience a vibrant urban art festival with live painting and interactive installations.",
    image: pic3
  },
  {
    id: 5,
     type: "Digital",
    title: "Sculpture in Motion",
    date: "January 20, 2025",
    status: "Ended",
    tags: ["Sculpture", "Crafts"],
    excerpt:
      "A captivating exhibition showcasing kinetic sculptures that blend art and engineering.",
    image: pic4
  },
  {
    id: 6,
     type: "Digital",
    title: "Nature’s Lens",
    date: "August 25, 2025",
    status: "Upcoming",
    tags: ["Illustration", "Nature Art"],
    excerpt:
      "A breathtaking photography exhibition celebrating the raw beauty of natural landscapes.",
    image: pic5
  },
  {
    id: 7,
     type: "Digital",
    title: "Glass Artistry",
    date: "November 10, 2025",
    status: "Upcoming",
    tags: ["Crafts", "Sculpture"],
    excerpt:
      "Explore the dazzling world of glass sculptures, from delicate ornaments to massive installations.",
    image: pic2
  },
  {
    id: 8,
    type: "Physical", 
    title: "Ink & Paper",
    date: "April 15, 2025",
    status: "Ended",
    tags: ["Illustration", "Abstract Art"],
    excerpt:
      "An exhibition celebrating the timeless elegance of black ink on paper.",
    image: ceramic
  },
  {
    id: 9,
    type: "Physical", 
    title: "Desert Colors",
    date: "September 05, 2025",
    status: "Upcoming",
    tags: ["Paintings", "Nature Art"],
    excerpt:
      "Experience a vibrant palette of desert-inspired landscapes and scenes.",
    image: pic4
  },
  {
    id: 10,
    type: "Physical", 
    title: "Street Vision",
    date: "November 22, 2025",
    status: "Upcoming",
    tags: ["Photography", "Abstract Art"],
    excerpt:
      "Capturing the pulse of city life through candid and artistic photography.",
    image: pic6
  },
  {
    id: 11,
    type: "Physical", 
    title: "Ocean Whispers",
    date: "July 30, 2025",
    status: "Ended",
    tags: ["Nature Art", "Illustration"],
    excerpt:
      "Dive into a marine-inspired collection that captures the serenity of the sea.",
    image: pic3
  },
  {
    id: 12,
    type: "Physical", 
    title: "Metropolis Dreams",
    date: "August 20, 2025",
    status: "Upcoming",
    tags: ["Abstract Art", "Paintings"],
    excerpt:
      "An urban-inspired series blending architecture, geometry, and bold colors.",
    image: pic1
  },
  {
    id: 13,
    type: "Physical", 
    title: "Wild Clay",
    date: "September 03, 2025",
    status: "Upcoming",
    tags: ["Crafts", "Sculpture"],
    excerpt:
      "Organic and raw clay creations shaped by the hands of local artisans.",
    image: pic5
  },
  {
    id: 14,
    type: "Digital",
    title: "Mountain Echoes",
    date: "October 14, 2025",
    status: "Upcoming",
    tags: ["Nature Art", "Photography"],
    excerpt:
      "Photography and art that capture the grandeur of mountain landscapes.",
    image: ceramic
  },
  {
    id: 15,
    type: "Digital",
    title: "Paper Stories",
    date: "November 25, 2025",
    status: "Upcoming",
    tags: ["Illustration", "Crafts"],
    excerpt:
      "Intricate paper art creations that tell visual stories in three dimensions.",
    image: pic2
  },
  {
    id: 16,
    type: "Digital",
    title: "Cosmic Vision",
    date: "December 09, 2025",
    status: "Upcoming",
    tags: ["Abstract Art", "Paintings"],
    excerpt:
      "A celestial-themed art show that merges science and imagination.",
    image: pic5
  },
  {
    id: 17,
    type: "Digital",
    title: "Golden Frames",
    date: "January 15, 2026",
    status: "Upcoming",
    tags: ["Photography", "Crafts"],
    excerpt:
      "Classic photographs framed in ornate golden designs for timeless elegance.",
    image: pic4
  },
  {
    id: 18,
    type: "Digital",
    title: "City Lights Festival",
    date: "February 20, 2026",
    status: "Upcoming",
    tags: ["Abstract Art", "Paintings"],
    excerpt:
      "An outdoor night art festival filled with light-based installations and performances.",
    image: pic6
  }
];

export const TYPES = [
  "All Types",
  "Paintings",
  "Abstract Art",
  "Sculpture",
  "Crafts",
  "Illustration",
  "Nature Art",
  "Photography"
];
