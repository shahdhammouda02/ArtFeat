import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Mail,
  Store,
  MapPin,
  Globe,
  Plus,
  BarChart2,
  DollarSign,
  ShoppingCart,
  Users,
  UserCheck,
  Search,
  ChevronDown,
  Mic,
  Edit,
  Album,
  Calendar,
  CheckCircle,
  Coins,
  CreditCard,
  Check,
  ArrowRight,
} from "lucide-react";
import { countries } from "@/data/countries";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/images/art-gallery.jpeg";
import artistFollower from "@/assets/images/artistPhoto.jpg";
import savedArtwork from "@/assets/images/saved.jpg";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useArtwork } from "@/hooks/useArtwork";
import { useCollection } from "@/hooks/useCollection";

const navItems = [
  "Artworks",
  "Collections",
  "Favorites",
  "About",
  "Sales Withdrawal",
];
const artworkSubItems = ["All Artworks", "Physical", "Digital"];
const collectionSubItems = ["All Collections", "Recent", "Popular"];

// Mock data for when there are no artworks
const mockArtworks = [
  {
    id: 1,
    title: "Digital Horizon",
    type: "Digital",
    price: 99,
    image: image,
  },
  {
    id: 2,
    title: "Urban Echoes",
    type: "Physical",
    price: 450,
    image: image,
  },
  {
    id: 3,
    title: "Abstract Flow",
    type: "Digital",
    price: 75,
    image: image,
  },
  {
    id: 4,
    title: "Forest Whisper",
    type: "Physical",
    price: 280,
    image: image,
  },
  {
    id: 5,
    title: "Digital Networks",
    type: "Digital",
    price: 120,
    image: image,
  },
  {
    id: 6,
    title: "Mountain Dreams",
    type: "Physical",
    price: 350,
    image: image,
  },
];

// Mock collections data
const mockCollections = [
  {
    id: 1,
    title: "Abstract Series",
    artworkCount: 8,
    image: image,
    description:
      "A collection of abstract digital artworks exploring color and form.",
  },
  {
    id: 2,
    title: "Urban Landscapes",
    artworkCount: 12,
    image: image,
    description: "Cityscapes and urban environments from around the world.",
  },
  {
    id: 3,
    title: "Nature Collection",
    artworkCount: 15,
    image: image,
    description: "Inspired by the beauty of natural landscapes and wildlife.",
  },
  {
    id: 4,
    title: "Digital Dreams",
    artworkCount: 6,
    image: image,
    description: "Futuristic and surreal digital art pieces.",
  },
  {
    id: 5,
    title: "Minimalist Works",
    artworkCount: 10,
    image: image,
    description:
      "Simple, clean, and minimalist art focusing on essential elements.",
  },
];
const savedArtworksData = [
  { artist: "Maria Artista", price: "$1,200", image: savedArtwork },
  { artist: "John Painter", price: "$950", image: savedArtwork },
  { artist: "Lena Sketch", price: "$1,500", image: savedArtwork },
  { artist: "Alex Form", price: "$800", image: savedArtwork },
  { artist: "Sarah Urban", price: "$1,100", image: savedArtwork },
  { artist: "Mystic Visions", price: "$2,000", image: savedArtwork },
];

const followedArtistsData = [
  { name: "Sophia Chen", followers: "15.2K Followers", image: artistFollower },
  { name: "David Lee", followers: "8.7K Followers", image: artistFollower },
  { name: "Elena Varga", followers: "22.1K Followers", image: artistFollower },
  {
    name: "Hiroshi Tanaka",
    followers: "5.9K Followers",
    image: artistFollower,
  },
];

const savedCollectionsData = [
  { name: "Modern Abstract Expressionism", count: "12 Artworks" },
  { name: "Classic Renaissance Portraits", count: "8 Artworks" },
  { name: "Contemporary Digital Art", count: "15 Artworks" },
];
interface DisplayArtwork {
  id: string;
  title: string;
  type: string;
  price: number;
  image: string;
}
interface DisplayCollection {
  id: string;
  title: string;
  artworkCount: number;
  image: string;
  description: string;
}

const ArtistDashboard = () => {
  const { user, isAuthenticated } = Auth();
  const navigate = useNavigate();
  const { artworks } = useArtwork(); // Get artworks from context
  const { collections } = useCollection(); // Get collections from context

  const [activeNav, setActiveNav] = useState("Artworks");
  const [activeSubNav, setActiveSubNav] = useState("All Artworks");
  const [activeCollectionSubNav, setActiveCollectionSubNav] =
    useState("All Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionSearchQuery, setCollectionSearchQuery] = useState("");

  const [activeFilters, setActiveFilters] = useState({
    all: true,
    artists: false,
    artworks: false,
    collections: false,
  });

  // Convert context artworks to display format
  const displayArtworks = useMemo((): DisplayArtwork[] => {
    if (artworks.length > 0) {
      return artworks.map((artwork) => ({
        id: artwork.id,
        title: artwork.title,
        type: artwork.type === "physical" ? "Physical" : "Digital",
        price: artwork.price,
        image: artwork.image || image, // Use uploaded image or fallback
      }));
    }
    return mockArtworks.map((artwork) => ({
      ...artwork,
      id: artwork.id.toString(),
    })); // Fallback to mock data if no artworks
  }, [artworks]);

  const [filteredArtworks, setFilteredArtworks] =
    useState<DisplayArtwork[]>(displayArtworks);

  // Convert context collections to display format
  const displayCollections = useMemo((): DisplayCollection[] => {
    if (collections.length > 0) {
      return collections.map((collection) => ({
        id: collection.id,
        title: collection.title,
        artworkCount: collection.artworkCount,
        image: collection.coverImage || image, // Use uploaded image or fallback
        description: collection.description,
      }));
    }
    return mockCollections.map((collection) => ({
      ...collection,
      id: collection.id.toString(), // Convert number to string
    }));
  }, [collections]);

  const [filteredCollections, setFilteredCollections] =
    useState<DisplayCollection[]>(displayCollections);

  const [aboutData, setAboutData] = useState({
    about:
      "A professional copy of the brand, which is typically a product or type where it is not used to create a variety of products. Artists' Art and artistry, such as the traditional arts and a second of independent creative artists' art are the most challenging art experience.",
    year: "2019",
    totalArtworks: displayArtworks.length, // Dynamic count from artworks
    styles: "Expressionism, classical, Digital, Saturation",
    yearsOfExperience: "10",
  });

  // local state to prevent redirect on initial load
  const [checkingAuth, setCheckingAuth] = useState(true);

  const handleAddArtwork = () => {
    navigate("add-artwork");
  };

  const handleAddCollection = () => {
    navigate("create-collection");
  };

  useEffect(() => {
    if (user && isAuthenticated !== undefined) {
      // only navigate after user data is loaded
      if (!isAuthenticated || user.type !== "artist") {
        navigate("/"); // redirect non-artists or unauthenticated users
      } else {
        setCheckingAuth(false); // user is valid, stop loading
      }
    }
  }, [user, isAuthenticated, navigate]);

  // Update artworks when displayArtworks changes
  useEffect(() => {
    setFilteredArtworks(displayArtworks);
  }, [displayArtworks]);

  // Update collections when displayCollections changes
  useEffect(() => {
    setFilteredCollections(displayCollections);
  }, [displayCollections]);

  // Update total artworks count when displayArtworks changes
  useEffect(() => {
    setAboutData((prev) => ({
      ...prev,
      totalArtworks: displayArtworks.length,
    }));
  }, [displayArtworks.length]);

  useEffect(() => {
    let filtered = displayArtworks;

    // Filter by type
    if (activeSubNav !== "All Artworks") {
      filtered = filtered.filter((artwork) => artwork.type === activeSubNav);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query) ||
          artwork.type.toLowerCase().includes(query) ||
          artwork.price.toString().includes(query)
      );
    }

    setFilteredArtworks(filtered);
  }, [activeSubNav, searchQuery, displayArtworks]);

  // Update the collections useEffect to use displayCollections
  useEffect(() => {
    let filtered = displayCollections;

    // Filter by type
    if (activeCollectionSubNav !== "All Collections") {
      if (activeCollectionSubNav === "Recent") {
        filtered = [...filtered].sort(
          (a, b) => parseInt(b.id) - parseInt(a.id)
        );
      } else if (activeCollectionSubNav === "Popular") {
        filtered = filtered.filter((c) => c.artworkCount >= 10);
      }
    }

    // Filter by search query
    if (collectionSearchQuery.trim() !== "") {
      const query = collectionSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (collection) =>
          collection.title.toLowerCase().includes(query) ||
          collection.description.toLowerCase().includes(query)
      );
    }

    setFilteredCollections(filtered);
  }, [activeCollectionSubNav, collectionSearchQuery, displayCollections]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  const handleCollectionSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  // Calculate counts from actual data
  const filterCounts = {
    all:
      savedArtworksData.length +
      followedArtistsData.length +
      savedCollectionsData.length,
    artists: followedArtistsData.length,
    artworks: savedArtworksData.length,
    collections: savedCollectionsData.length,
  };

  // Handle filter changes
  const handleFilterChange = (filterId: keyof typeof activeFilters) => {
    if (filterId === "all") {
      setActiveFilters({
        all: true,
        artists: false,
        artworks: false,
        collections: false,
      });
    } else {
      setActiveFilters((prev) => ({
        ...prev,
        all: false,
        [filterId]: !prev[filterId],
      }));
    }
  };

  // Filter data based on active filters and search
  const filteredFavoritesArtworks = useMemo(() => {
    if (!activeFilters.artworks && !activeFilters.all) return [];

    return savedArtworksData.filter(
      (artwork) =>
        artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.price.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeFilters]);

  const filteredArtists = useMemo(() => {
    if (!activeFilters.artists && !activeFilters.all) return [];

    return followedArtistsData.filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.followers.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeFilters]);

  // Determine what to show
  const showArtworks = activeFilters.artworks || activeFilters.all;
  const showArtists = activeFilters.artists || activeFilters.all;
  const showCollections = activeFilters.collections || activeFilters.all;

  // Add this handler function
  const handleSaveAbout = () => {
    // In a real app, you would save to backend here
    console.log("Saving about data:", aboutData);
    alert("About information saved successfully!");
  };

  if (checkingAuth || !user) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-xl font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-6 sm:py-10 px-3 sm:px-4">
      {/* Main Profile Card */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
        {/* Profile Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 flex items-center justify-center text-lg sm:text-xl font-bold text-white border flex-shrink-0 mx-auto md:mx-0">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>

          <div className="flex flex-col items-center md:items-start gap-1 sm:gap-2 text-gray-600 mt-2">
            <div className="flex items-center gap-2">
              <Mail size={16} className="sm:w-[18px]" />
              <span className="text-sm sm:text-base">{user.email}</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-1 sm:gap-2 text-gray-600 mt-1">
            <div className="flex items-center gap-2">
              <Store size={16} className="sm:w-[18px]" />
              <span className="text-sm sm:text-base">{user.storename}</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-1 sm:gap-2 text-gray-600 mt-1">
            <div className="flex items-center gap-2">
              <Globe size={16} className="sm:w-[18px]" />
              <span className="text-sm sm:text-base">
                {user.country
                  ? countries[user.country as keyof typeof countries]?.name
                  : "Unknown Country"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-1 sm:gap-2 text-gray-600 mt-1">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="sm:w-[18px]" />
              <span className="text-sm sm:text-base">
                {user.city ? user.city : "Unknown City"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-3 mt-4 md:mt-0">
          <Button
            className="bg-sky-500 text-white hover:bg-sky-600 w-full sm:flex-1 text-sm sm:text-base py-2 h-auto"
            onClick={handleAddArtwork}
          >
            <Plus className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> Add Artwork
          </Button>
          <Button
            variant="outline"
            className="w-full sm:flex-1 text-sm sm:text-base py-2 h-auto"
            onClick={handleAddCollection}
          >
            <Album className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Collection
          </Button>
          <Button
            variant="outline"
            className="w-full sm:flex-1 text-sm sm:text-base py-2 h-auto"
          >
            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-4 sm:mt-6 max-w-6xl w-full">
        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">
              Total Funds
            </p>
            <BarChart2 size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">$12,450</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">
              Total Sales
            </p>
            <ShoppingCart size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">87</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">
              Followers
            </p>
            <Users size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">2.5K</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">
              Following
            </p>
            <UserCheck size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">210</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg col-span-2 sm:col-span-1 md:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">
              Avg. Sale Price
            </p>
            <DollarSign size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">$143</p>
        </div>
      </div>
      {/* Navigation Buttons Section */}
      <div className="w-full max-w-6xl flex flex-col items-center mt-4 sm:mt-6 mb-4 sm:mb-6">
        {/* Main Nav Buttons */}
        <div className="flex flex-col sm:flex-row w-full gap-0">
          {navItems.map((item) => (
            <Button
              key={item}
              variant="outline"
              className={`
          flex-1 rounded-none border-gray-200 py-2 sm:py-3 text-xs sm:text-sm
          ${
            activeNav === item
              ? "bg-white text-black hover:bg-white"
              : "bg-gray-200 text-gray-700 hover:bg-white"
          }
        `}
              onMouseDown={() => setActiveNav(item)}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Artwork Sub Buttons */}
        {activeNav === "Artworks" && (
          <>
            <div className="flex flex-col sm:flex-row w-full gap-0 mt-3 sm:mt-4">
              {artworkSubItems.map((subItem) => (
                <Button
                  key={subItem}
                  variant="outline"
                  className={`
              flex-1 rounded-none border-gray-200 py-2 sm:py-3 text-xs sm:text-sm
              ${activeSubNav === subItem ? "bg-white" : "bg-gray-200"}
              text-sky-500
              hover:bg-white hover:text-sky-600
            `}
                  onMouseDown={() => setActiveSubNav(subItem)}
                  onClick={() => setActiveSubNav(subItem)}
                >
                  {subItem}
                </Button>
              ))}
            </div>

            {/* Dropdown and Search Section */}
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 mt-6 sm:mt-8 border shadow-lg border-none p-4 sm:p-5 rounded-2xl sm:rounded-full items-center">
              {/* Artwork Type Dropdown */}
              <div className="relative w-full sm:flex-initial sm:w-64 rounded-xl border border-gray-300">
                <select
                  value={activeSubNav}
                  onChange={(e) => setActiveSubNav(e.target.value)}
                  className="w-full p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none cursor-pointer rounded-xl text-sm sm:text-base"
                >
                  {artworkSubItems.map((subItem) => (
                    <option key={subItem} value={subItem}>
                      {subItem}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="sm:w-5 sm:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>

              {/* Search Input */}
              <div className="relative flex flex-col sm:flex-row w-full gap-3 sm:gap-2 items-stretch sm:items-center">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-sky-500 rounded-full sm:rounded-l-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-10 sm:pr-12 text-sm sm:text-base"
                  />
                  <Mic
                    size={16}
                    className="sm:w-5 sm:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>

                <Button
                  variant="default"
                  className="bg-sky-500 hover:bg-sky-600 text-white py-2 sm:py-5 px-3 sm:px-3 rounded-full w-full sm:w-fit text-sm sm:text-base"
                  onClick={handleSearch}
                >
                  <Search size={20} className="sm:w-7 sm:h-7" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Collection Sub Button - Single long button */}
        {activeNav === "Collections" && (
          <div className="flex flex-col sm:flex-row w-full gap-0 mt-3 sm:mt-4">
            <Button
              variant="outline"
              className={`
                w-full rounded-none border-gray-200 py-2 sm:py-3 text-xs sm:text-sm
                bg-white
                text-sky-500
                hover:bg-white hover:text-sky-600
              `}
            >
              All Collections ({displayCollections.length})
            </Button>
          </div>
        )}
      </div>

      {/* Collection Search Section */}
      {activeNav === "Collections" && (
        <div className="flex flex-col sm:flex-row w-full max-w-6xl gap-3 mt-1 sm:mt-3 sm:gap-4 border shadow-lg border-none p-4 sm:p-5 rounded-2xl sm:rounded-full items-center">
          {/* Collection Type Dropdown */}
          <div className="relative w-full sm:flex-initial sm:w-64 rounded-xl border border-gray-300">
            <select
              value={activeCollectionSubNav}
              onChange={(e) => setActiveCollectionSubNav(e.target.value)}
              className="w-full p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none cursor-pointer rounded-xl text-sm sm:text-base"
            >
              {collectionSubItems.map((subItem) => (
                <option key={subItem} value={subItem}>
                  {subItem}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="sm:w-5 sm:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>

          {/* Search Input */}
          <div className="relative flex flex-col sm:flex-row w-full gap-3 sm:gap-2 items-stretch sm:items-center">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search collection"
                value={collectionSearchQuery}
                onChange={(e) => setCollectionSearchQuery(e.target.value)}
                className="w-full p-2 border border-sky-500 rounded-full sm:rounded-l-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-10 sm:pr-12 text-sm sm:text-base"
              />
              <Mic
                size={16}
                className="sm:w-5 sm:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <Button
              variant="default"
              className="bg-sky-500 hover:bg-sky-600 text-white py-2 sm:py-5 px-3 sm:px-3 rounded-full w-full sm:w-fit text-sm sm:text-base"
              onClick={handleCollectionSearch}
            >
              <Search size={20} className="sm:w-7 sm:h-7" />
            </Button>
          </div>
        </div>
      )}

      {/* Artwork Cards - Carousel when more than 4, Grid when 4 or less */}
      {activeNav === "Artworks" && (
        <div className="w-full max-w-6xl mt-6 sm:mt-8 border p-4 sm:p-7 rounded-lg bg-white shadow-md border-none">
          {filteredArtworks.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No artworks found matching your criteria.
              </p>
              <Button
                className="mt-4 bg-sky-500 hover:bg-sky-600 text-white"
                onClick={handleAddArtwork}
              >
                <Plus className="mr-2" /> Add Your First Artwork
              </Button>
            </div>
          ) : filteredArtworks.length <= 4 ? (
            // Grid layout for 4 or fewer items
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredArtworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="mb-2">
                      <h3 className="font-bold text-lg sm:text-xl">
                        {artwork.title}
                      </h3>
                      <Badge
                        variant={
                          artwork.type === "Digital" ? "default" : "secondary"
                        }
                        className={`
                          text-xs sm:text-sm
                          ${
                            artwork.type === "Digital"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }
                        `}
                      >
                        {artwork.type}
                      </Badge>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      ${artwork.price}
                    </p>
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full text-sm sm:text-base py-2"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            // Carousel layout for more than 4 items using shadcn Carousel
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {filteredArtworks.map((artwork) => (
                    <CarouselItem
                      key={artwork.id}
                      className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <CardContent className="p-3 sm:p-4">
                          <div className="mb-2">
                            <h3 className="font-bold text-lg sm:text-xl">
                              {artwork.title}
                            </h3>
                            <Badge
                              variant={
                                artwork.type === "Digital"
                                  ? "default"
                                  : "secondary"
                              }
                              className={`
                                text-xs sm:text-sm
                                ${
                                  artwork.type === "Digital"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }
                              `}
                            >
                              {artwork.type}
                            </Badge>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-gray-900">
                            ${artwork.price}
                          </p>
                        </CardContent>
                        <CardFooter className="p-3 sm:p-4 pt-0">
                          <Button
                            variant="outline"
                            className="w-full text-sm sm:text-base py-2"
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4" />
              </Carousel>
            </div>
          )}
        </div>
      )}

      {/* Collection Cards - Carousel when more than 3, Grid when 3 or less */}
      {activeNav === "Collections" && (
        <div className="w-full max-w-6xl mt-10 sm:mt-12 border p-4 sm:p-7 rounded-lg bg-white shadow-md border-none">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No collections found matching your criteria.
              </p>
              <Button
                className="mt-4 bg-sky-500 hover:bg-sky-600 text-white"
                onClick={handleAddCollection}
              >
                <Plus className="mr-2" /> Create Your First Collection
              </Button>
            </div>
          ) : filteredCollections.length <= 3 ? (
            // Grid layout for 3 or fewer items
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center relative">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Title and Artwork Count inside image at left bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-bold text-lg sm:text-xl text-white">
                            {collection.title}
                          </h3>
                          <Badge
                            variant="default"
                            className="bg-sky-500 text-white mt-1 text-xs sm:text-sm"
                          >
                            {collection.artworkCount} Artworks
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <p className="text-gray-600 text-sm sm:text-base">
                      {collection.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Carousel layout for more than 3 items using shadcn Carousel
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {filteredCollections.map((collection) => (
                    <CarouselItem
                      key={collection.id}
                      className="basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center relative">
                          <img
                            src={collection.image}
                            alt={collection.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {/* Title and Artwork Count inside image at left bottom */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                            <div className="flex justify-between items-end">
                              <div>
                                <h3 className="font-bold text-lg sm:text-xl text-white">
                                  {collection.title}
                                </h3>
                                <Badge
                                  variant="default"
                                  className="bg-sky-500 text-white mt-1 text-xs sm:text-sm"
                                >
                                  {collection.artworkCount} Artworks
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-3 sm:p-4">
                          <p className="text-gray-600 text-sm sm:text-base">
                            {collection.description}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4" />
              </Carousel>
            </div>
          )}
        </div>
      )}

      {/* Favorites Section */}
      {activeNav === "Favorites" && (
        <div className="w-full max-w-6xl mt-6 sm:mt-8 border p-4 sm:p-6 rounded-lg bg-white shadow-md">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              My Favorites
            </h2>

            {/* Filter Row */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-start lg:items-center justify-between mb-6 p-3 lg:p-4 bg-white rounded-lg border border-gray-200">
              {/* Search Input */}
              <div className="w-full lg:flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Search favorites"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm lg:text-base"
                  />
                </div>
              </div>

              {/* Filter Checkboxes */}
              <div className="flex flex-wrap gap-3 lg:gap-4 items-center w-full lg:w-auto justify-start lg:justify-end">
                {[
                  { id: "all", label: `All Items (${filterCounts.all})` },
                  { id: "artists", label: `Artists (${filterCounts.artists})` },
                  {
                    id: "artworks",
                    label: `Artworks (${filterCounts.artworks})`,
                  },
                  {
                    id: "collections",
                    label: `Collections (${filterCounts.collections})`,
                  },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Checkbox
                      id={item.id}
                      checked={
                        activeFilters[item.id as keyof typeof activeFilters]
                      }
                      onCheckedChange={() =>
                        handleFilterChange(
                          item.id as keyof typeof activeFilters
                        )
                      }
                      className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500 w-4 h-4"
                    />
                    <Label
                      htmlFor={item.id}
                      className="text-xs lg:text-sm text-gray-700 cursor-pointer whitespace-nowrap"
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Saved Artworks Section */}
          {showArtworks && filteredFavoritesArtworks.length > 0 && (
            <Card className="mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4">
                  Saved Artworks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredFavoritesArtworks.map((artwork, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-[4/2] bg-gray-200">
                        <img
                          src={artwork.image}
                          alt={artwork.artist}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3 sm:p-4">
                        <h4 className="font-bold text-base sm:text-lg">
                          {artwork.artist}
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base mt-1">
                          {artwork.price}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Followed Artists Section */}
          {showArtists && filteredArtists.length > 0 && (
            <Card className="mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4">
                  Followed Artists
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredArtists.map((artist, index) => (
                    <Card
                      key={index}
                      className="p-3 sm:p-4 hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0 flex flex-row items-center gap-3 sm:gap-4">
                        {/* Artist Image */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Name + Followers */}
                        <div className="flex flex-col min-w-0 flex-1">
                          <h4 className="font-bold text-base sm:text-lg text-left truncate">
                            {artist.name}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm text-left">
                            {artist.followers}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Saved Collections Section */}
          {showCollections && filteredCollections.length > 0 && (
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4">
                  Saved Collections
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCollections.map((collection, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-3 sm:p-4">
                        <h4 className="font-bold text-base sm:text-lg">
                          {collection.title}
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base mt-1">
                          {collection.artworkCount}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No results message */}
          {searchQuery &&
            filteredFavoritesArtworks.length === 0 &&
            filteredArtists.length === 0 &&
            filteredCollections.length === 0 && (
              <div className="text-center py-6 sm:py-8">
                <p className="text-gray-500 text-sm sm:text-base">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}
        </div>
      )}

      {activeNav === "About" && (
        <div className="w-full max-w-6xl mt-6 sm:mt-8 border p-4 sm:p-7 rounded-lg bg-white shadow-md border-none">
          <div className="space-y-6">
            {/* About Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
                Artist Profile
              </h2>
              <div className="space-y-2">
                <Label
                  htmlFor="about-description"
                  className="text-sm font-medium text-gray-700"
                >
                  About
                </Label>
                <Textarea
                  id="about-description"
                  value={aboutData.about}
                  onChange={(e) =>
                    setAboutData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  className="min-h-[100px] resize-none border-gray-300 focus:border-sky-500 text-sm sm:text-base"
                  placeholder="Enter your about description..."
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {/* Website Direct Print Section */}
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-4">
                  {" "}
                  {/* changed here */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="member-year"
                      className="text-sm font-medium text-gray-700"
                    >
                      Member Since (Year)
                    </Label>
                    <Input
                      id="member-year"
                      value={aboutData.year}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-sky-500 text-sm sm:text-base"
                      placeholder="Enter year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="total-artworks"
                      className="text-sm font-medium text-gray-700"
                    >
                      Total Artworks
                    </Label>
                    <Input
                      id="total-artworks"
                      value={aboutData.totalArtworks}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          totalArtworks: parseInt(e.target.value) || 0,
                        }))
                      }
                      type="number"
                      className="border-gray-300 focus:border-sky-500 text-sm sm:text-base"
                      placeholder="Enter total artworks"
                    />
                  </div>
                </div>
              </div>

              {/* Style Section */}
              <div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="art-styles"
                      className="text-sm font-medium text-gray-700"
                    >
                      Style (comma separated)
                    </Label>
                    <Input
                      id="art-styles"
                      value={aboutData.styles}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          styles: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-sky-500 text-sm sm:text-base"
                      placeholder="Enter art styles (comma separated)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="years-experience"
                      className="text-sm font-medium text-gray-700"
                    >
                      Years Of Experience
                    </Label>
                    <Input
                      id="years-experience"
                      value={aboutData.yearsOfExperience}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          yearsOfExperience: e.target.value,
                        }))
                      }
                      className="border-gray-300 focus:border-sky-500 text-sm sm:text-base"
                      placeholder="Enter years of experience"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSaveAbout}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeNav === "Sales Withdrawal" && (
        <div className="w-full max-w-6xl mt-6 sm:mt-8 bg-white">
          {/* Earnings Summary */}
          <div className="mb-5 border p-6 sm:p-8 rounded-lg shadow-md bg-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 text-center sm:text-left">
              Earnings Summary
            </h2>

            <div className="space-y-4">
              {/* Earnings Items - Stack on mobile, row on desktop */}
              <div className="flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-0">
                <div className="flex flex-col items-center w-full sm:w-auto text-center">
                  <span className="text-sky-500 font-medium text-sm sm:text-base">
                    Total Earnings
                  </span>
                  <span className="text-lg font-bold text-gray-900 mt-1">
                    $15,850.00
                  </span>
                </div>

                <div className="flex flex-col items-center w-full sm:w-auto text-center">
                  <span className="text-sky-500 font-medium text-sm sm:text-base text-center">
                    Available for Withdrawal
                  </span>
                  <span className="text-lg font-bold text-gray-900 mt-1">
                    $5,350.00
                  </span>
                </div>

                <div className="flex flex-col items-center w-full sm:w-auto text-center">
                  <span className="text-sky-500 font-medium text-sm sm:text-base">
                    Last Withdrawal
                  </span>
                  <span className="text-lg font-bold text-gray-900 mt-1">
                    $1,500.00
                  </span>
                </div>
              </div>

              {/* Date Row - Right Aligned */}
              <div className="flex justify-center sm:justify-end">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  2023 11:15
                </div>
              </div>
            </div>
          </div>

          {/* New Withdrawal Request */}
          <div className="border p-6 sm:p-8 rounded-lg shadow-md bg-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 text-center sm:text-left">
              New Withdrawal Request
            </h2>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2 text-center sm:text-left">
                  Amount to withdraw
                </Label>
                <Input
                  placeholder="Enter amount"
                  className="w-full border-gray-300 focus:border-sky-500 text-center sm:text-left"
                />
              </div>

              {/* Withdrawal Methods */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3 text-center sm:text-left">
                  Withdrawal Methods
                </Label>
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 w-full">
                  {["Visa", "PayPal", "Crypto"].map((method, index) => (
                    <Button
                      key={method}
                      variant="outline"
                      className={`
              py-3 text-base font-medium w-full sm:flex-1
              ${
                index === 0
                  ? "bg-sky-500 text-white hover:bg-sky-600 hover:text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
                    >
                      {method}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="text-sm text-red-500 bg-gray-50 p-4 rounded-lg text-center sm:text-left">
                Note: Processing totally takes 24.48 business hours to review
                the withdrawal Request
              </div>

              {/* Request Button */}
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 text-base font-medium whitespace-normal break-words min-h-[50px] h-auto">
                Request Withdrawal Item
              </Button>
            </div>
          </div>

          {/* Withdrawal History + Chart Section */}
          <div className="mt-10 border p-6 sm:p-8 rounded-lg shadow-md bg-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 text-center sm:text-left">
              Withdrawal History
            </h2>

            {/* Tabs: Completed | Pending */}
            <Tabs defaultValue="completed" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-sky-500 data-[state=active]:text-white bg-white text-black"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-sky-500 data-[state=active]:text-white bg-white text-black"
                >
                  Pending
                </TabsTrigger>
              </TabsList>

              {/* Completed Tab Content */}
              <TabsContent value="completed">
                {/* Table scroll wrapper for small screens */}
                <div className="overflow-x-auto">
                  <Table className="min-w-[600px] sm:min-w-full">
                    <TableHeader>
                      <TableRow className="flex justify-around pt-3">
                        <TableHead className="flex-1 text-center">
                          Date
                        </TableHead>
                        <TableHead className="flex-1 text-center">
                          Amount
                        </TableHead>
                        <TableHead className="flex-1 text-center">
                          Method
                        </TableHead>
                        <TableHead className="flex-1 text-center">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {[
                        {
                          date: "2023-11-15",
                          amount: "$1,500.00",
                          method: "Visa/Mastercard",
                          status: "Completed",
                        },
                        {
                          date: "2023-10-20",
                          amount: "$800.00",
                          method: "PayPal",
                          status: "Completed",
                        },
                        {
                          date: "2023-09-01",
                          amount: "$2,000.00",
                          method: "Crypto",
                          status: "Completed",
                        },
                        {
                          date: "2023-08-10",
                          amount: "$900.00",
                          method: "Visa/Mastercard",
                          status: "Completed",
                        },
                        {
                          date: "2023-07-25",
                          amount: "$1,000.00",
                          method: "PayPal",
                          status: "Completed",
                        },
                      ].map((row, i) => (
                        <TableRow key={i} className="flex justify-around">
                          <TableCell className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              {row.date}
                            </div>
                          </TableCell>
                          <TableCell className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <DollarSign className="w-4 h-4 text-gray-500" />
                              {row.amount}
                            </div>
                          </TableCell>
                          <TableCell className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {row.method === "PayPal" && (
                                <Check className="w-4 h-4 text-green-500" />
                              )}
                              {row.method === "Visa/Mastercard" && (
                                <CreditCard className="w-4 h-4 text-blue-500" />
                              )}
                              {row.method === "Crypto" && (
                                <Coins className="w-4 h-4 text-yellow-500" />
                              )}
                              {row.method}
                            </div>
                          </TableCell>
                          <TableCell className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                              <CheckCircle className="w-4 h-4" />
                              {row.status}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="w-full flex justify-start mt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>

              {/* Pending Tab Content */}
              <TabsContent value="pending">
                <div className="text-center text-gray-500 py-10">
                  No pending withdrawals
                </div>
              </TabsContent>
            </Tabs>

            {/* CHART SECTION*/}
            <div className="mt-10 overflow-x-auto">
              <Card className="p-6 min-w-[600px] sm:min-w-full">
                <div className="flex justify-between items-center mb-6">
                  <CardTitle className="text-lg font-semibold">
                    Sales and Withdrawals Chart
                  </CardTitle>

                  {/* Year Filter */}
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter with year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="lastmonth">Last month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto lg:overflow-x-visible">
                  <div className="flex flex-row items-end space-x-4 h-48">
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between h-full">
                      {[0, 3000, 6000, 9000, 12000, 15000]
                        .reverse()
                        .map((value) => (
                          <div key={value} className="text-sm text-gray-600">
                            {"$ " + value.toLocaleString()}
                          </div>
                        ))}
                    </div>

                    {/* Chart Bars */}
                    <div className="flex-1 flex items-end space-x-4 h-full">
                      {[
                        { month: "Jan", sales: 12000, withdrawals: 8000 },
                        { month: "Feb", sales: 9000, withdrawals: 6000 },
                        { month: "Mar", sales: 15000, withdrawals: 11000 },
                        { month: "Apr", sales: 8000, withdrawals: 4000 },
                        { month: "May", sales: 13000, withdrawals: 9000 },
                        { month: "Jun", sales: 11000, withdrawals: 7000 },
                        { month: "Jul", sales: 14000, withdrawals: 10000 },
                      ].map((data) => {
                        const maxValue = 15000;
                        return (
                          <div
                            key={data.month}
                            className="flex flex-col items-center flex-1 h-full"
                          >
                            <div className="flex items-end justify-center space-x-1 h-full w-full">
                              {/* Sales Bar */}
                              <div
                                className="w-6 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 relative group"
                                style={{
                                  height: `${(data.sales / maxValue) * 100}%`,
                                }}
                              >
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                  Sales: ${data.sales.toLocaleString()}
                                </div>
                              </div>

                              {/* Withdrawals Bar */}
                              <div
                                className="w-6 bg-orange-500 rounded-t transition-all duration-300 hover:bg-orange-600 relative group"
                                style={{
                                  height: `${
                                    (data.withdrawals / maxValue) * 100
                                  }%`,
                                }}
                              >
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                  Withdrawals: $
                                  {data.withdrawals.toLocaleString()}
                                </div>
                              </div>
                            </div>

                            {/* Month Label */}
                            <div className="mt-2 text-sm text-gray-600 font-medium">
                              {data.month}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chart Header */}
                  <div className="flex justify-center items-center mb-4 mt-4">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Sales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Withdrawals
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;
