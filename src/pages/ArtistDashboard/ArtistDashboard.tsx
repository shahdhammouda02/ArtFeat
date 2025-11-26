import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
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
  Album
} from "lucide-react";
import { countries } from "@/data/countries";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import image from "@/assets/images/art-gallery.jpeg";

const navItems = [
  "Artworks",
  "Collections",
  "Favorites",
  "About",
  "Sales Withdrawal",
];
const artworkSubItems = ["All Artworks", "Physical", "Digital"];
const collectionSubItems = ["All Collections", "Recent", "Popular"];

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
    description: "A collection of abstract digital artworks exploring color and form."
  },
  {
    id: 2,
    title: "Urban Landscapes",
    artworkCount: 12,
    image: image,
    description: "Cityscapes and urban environments from around the world."
  },
  {
    id: 3,
    title: "Nature Collection",
    artworkCount: 15,
    image: image,
    description: "Inspired by the beauty of natural landscapes and wildlife."
  },
  {
    id: 4,
    title: "Digital Dreams",
    artworkCount: 6,
    image: image,
    description: "Futuristic and surreal digital art pieces."
  },
  {
    id: 5,
    title: "Minimalist Works",
    artworkCount: 10,
    image: image,
    description: "Simple, clean, and minimalist art focusing on essential elements."
  }
];

const ArtistDashboard = () => {
  const { user, isAuthenticated } = Auth();
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("Artworks");
  const [activeSubNav, setActiveSubNav] = useState("All Artworks");
  const [activeCollectionSubNav, setActiveCollectionSubNav] = useState("All Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionSearchQuery, setCollectionSearchQuery] = useState("");
  const [artworks, setArtworks] = useState(mockArtworks);
  const [collections, setCollections] = useState(mockCollections);

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

  useEffect(() => {
    let filtered = mockArtworks;

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

    setArtworks(filtered);
  }, [activeSubNav, searchQuery]);

 useEffect(() => {
    let filtered = mockCollections;

    // Filter by type
    if (activeCollectionSubNav !== "All Collections") {
      // Demo filtering:
      // - "Recent" sorts collections by most recent (higher id first)
      // - "Popular" returns collections with a higher artworkCount
      if (activeCollectionSubNav === "Recent") {
        filtered = [...filtered].sort((a, b) => b.id - a.id);
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

    setCollections(filtered);
  }, [activeCollectionSubNav, collectionSearchQuery]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  const handleCollectionSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
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
              <span className="text-sm sm:text-base">{user.city ? user.city : "Unknown City"}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-3 mt-4 md:mt-0">
          <Button className="bg-sky-500 text-white hover:bg-sky-600 w-full sm:flex-1 text-sm sm:text-base py-2 h-auto" onClick={handleAddArtwork}>
            <Plus className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> Add Artwork
          </Button>
          <Button variant="outline" className="w-full sm:flex-1 text-sm sm:text-base py-2 h-auto" onClick={handleAddCollection}>
            <Album className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Collection
          </Button>
          <Button variant="outline" className="w-full sm:flex-1 text-sm sm:text-base py-2 h-auto">
            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-4 sm:mt-6 max-w-6xl w-full">
        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">Total Funds</p>
            <BarChart2 size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">$12,450</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">Total Sales</p>
            <ShoppingCart size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">87</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">Followers</p>
            <Users size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">2.5K</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">Following</p>
            <UserCheck size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">210</p>
        </div>

        <div className="bg-white shadow-md p-3 sm:p-4 rounded-lg col-span-2 sm:col-span-1 md:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-md text-sky-500 font-medium">Avg. Sale Price</p>
            <DollarSign size={20} className="sm:w-6 sm:h-6 text-gray-700" />
          </div>
          <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">$143</p>
        </div>
      </div>

      {/* Navigation Buttons Section */}
      <div className="w-full max-w-6xl flex flex-col items-center mt-4 sm:mt-6 mb-4 sm:mb-6">
        {/* Main Nav Buttons */}
        <div className="flex flex-col sm:flex-row w-full gap-1 sm:gap-2">
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
            <div className="flex flex-col sm:flex-row w-full gap-1 sm:gap-2 mt-3 sm:mt-4">
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
            <div
              className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 mt-6 sm:mt-8 border shadow-lg border-none p-4 sm:p-5 rounded-2xl sm:rounded-full items-center"
            >
              {/* Artwork Type Dropdown */}
              <div
                className="relative w-full sm:flex-initial sm:w-64 rounded-xl border border-gray-300"
              >
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
          <div className="flex flex-col sm:flex-row w-full gap-1 sm:gap-2 mt-3 sm:mt-4">
            <Button
              variant="outline"
              className={`
                w-full rounded-none border-gray-200 py-2 sm:py-3 text-xs sm:text-sm
                bg-white
                text-sky-500
                hover:bg-white hover:text-sky-600
              `}
            >
              All Collections ({mockCollections.length})
            </Button>
          </div>
        )}
      </div>

      {/* Collection Search Section */}
      {activeNav === "Collections" && (
        <div
          className="flex flex-col sm:flex-row w-full max-w-6xl gap-3 sm:gap-4 mt-6 sm:mt-8 border shadow-lg border-none p-4 sm:p-5 rounded-2xl sm:rounded-full items-center"
        >
          {/* Collection Type Dropdown */}
          <div
            className="relative w-full sm:flex-initial sm:w-64 rounded-xl border border-gray-300"
          >
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
                placeholder="Search collections.."
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
          {artworks.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No artworks found matching your criteria.
              </p>
            </div>
          ) : artworks.length <= 4 ? (
            // Grid layout for 4 or fewer items
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {artworks.map((artwork) => (
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
                      <h3 className="font-bold text-lg sm:text-xl">{artwork.title}</h3>
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
                    <Button variant="outline" className="w-full text-sm sm:text-base py-2">
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
                  {artworks.map((artwork) => (
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
                          <Button variant="outline" className="w-full text-sm sm:text-base py-2">
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
        <div className="w-full max-w-6xl mt-6 sm:mt-8 border p-4 sm:p-7 rounded-lg bg-white shadow-md border-none">
          {collections.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No collections found matching your criteria.
              </p>
            </div>
          ) : collections.length <= 3 ? (
            // Grid layout for 3 or fewer items
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {collections.map((collection) => (
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
                  {collections.map((collection) => (
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
    </div>
  );
};

export default ArtistDashboard;