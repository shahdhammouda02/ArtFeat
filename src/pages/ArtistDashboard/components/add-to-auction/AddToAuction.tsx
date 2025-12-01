import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Rocket } from "lucide-react";
import { useArtwork } from "@/hooks/useArtwork";
import { format, addDays, parse, differenceInDays } from "date-fns";
import type { Artwork } from "@/types/artwork-types";
import placeholderImage from "@/assets/images/art-gallery.jpeg";
import { useAuction } from "@/hooks/useAuctions";

const AddToAuction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { artworks } = useArtwork();
  const { addAuction, auctions: existingAuctions } = useAuction();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Default auction settings - using the exact format from your image
  const defaultStartDate = format(addDays(new Date(), 1), "MMMM d, yyyy");
  const defaultEndDate = format(addDays(new Date(), 8), "MMMM d, yyyy");

  // Form state
  const [auctionSettings, setAuctionSettings] = useState({
    startDate: defaultStartDate,
    startTime: "08:21",
    endDate: defaultEndDate,
    endTime: "08:21",
    startingPrice: "50.00",
    startDateChecked: true,
    startTimeChecked: true,
    endDateChecked: true,
    endTimeChecked: true,
  });

  // Format dates for display (exactly like your image)
  const startDateTime = `${auctionSettings.startDate} ${auctionSettings.startTime}`;
  const endDateTime = `${auctionSettings.endDate} ${auctionSettings.endTime}`;

  // Calculate duration - FIXED VERSION
  const calculateDuration = () => {
    try {
      // Remove any potential ordinal suffixes just in case
      const cleanDateString = (dateStr: string) => {
        return dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
      };

      const cleanStartDate = cleanDateString(auctionSettings.startDate);
      const cleanEndDate = cleanDateString(auctionSettings.endDate);

      // Parse dates using date-fns for better reliability
      const start = parse(
        `${cleanStartDate} ${auctionSettings.startTime}`,
        "MMMM d, yyyy HH:mm",
        new Date()
      );

      const end = parse(
        `${cleanEndDate} ${auctionSettings.endTime}`,
        "MMMM d, yyyy HH:mm",
        new Date()
      );

      // Check if dates are valid
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 0;
      }

      // Calculate difference in days
      const durationDays = differenceInDays(end, start);
      return Math.max(0, durationDays);
    } catch (error) {
      console.error("Error calculating duration:", error);
      return 0;
    }
  };

  // Parse artwork ID from URL or state
  useEffect(() => {
    const artworkId =
      location.state?.artworkId ||
      new URLSearchParams(location.search).get("artworkId");

    if (artworkId && artworks) {
      const artwork = artworks.find((a) => a.id === artworkId);
      if (artwork) {
        setSelectedArtwork(artwork);
        // Set starting price to artwork price if available - FIXED VERSION
        const price = (artwork as Artwork).price; // Use type assertion to avoid TypeScript error
        if (price !== undefined && price !== null) {
          let priceNumber: number;

          // Handle different price types
          if (typeof price === "number") {
            priceNumber = price;
          } else if (typeof price === "string") {
            const parsed = parseFloat(price);
            priceNumber = isNaN(parsed) ? 50.0 : parsed;
          } else {
            priceNumber = 50.0; // Default fallback
          }

          setAuctionSettings((prev) => ({
            ...prev,
            startingPrice: priceNumber.toFixed(2),
          }));
        }
      } else {
        console.error("Artwork not found:", artworkId);
        alert("Artwork not found. Please select a valid artwork.");
        navigate("/artist-dashboard");
      }
    } else {
      console.error("No artwork ID provided");
      alert("Please select an artwork first.");
      navigate("/artist-dashboard");
    }

     const isAlreadyInAuction = existingAuctions.some(
    (auction) => auction.artworkId === artworkId
  );
  
  if (isAlreadyInAuction) {
    alert("This artwork is already in an auction!");
    navigate("/artist-dashboard");
    return;
  }

    setIsLoading(false);
  }, [location, artworks, navigate, existingAuctions]);

  const handleSaveSettings = () => {
    if (!selectedArtwork) {
      alert("No artwork selected!");
      return;
    }

    // Validate starting price
    const startingPrice = parseFloat(auctionSettings.startingPrice);
    if (isNaN(startingPrice) || startingPrice <= 0) {
      alert("Please enter a valid starting price.");
      return;
    }

    // Validate dates
    const duration = calculateDuration();
    if (duration <= 0) {
      alert("Auction must have a positive duration. Please check your dates.");
      return;
    }

    // Create auction object
    const newAuction = {
      artworkId: selectedArtwork.id,
      artworkTitle: selectedArtwork.title,
      artworkImage: selectedArtwork.image || placeholderImage,
      artworkType: selectedArtwork.type,
      startDate: auctionSettings.startDate,
      startTime: auctionSettings.startTime,
      endDate: auctionSettings.endDate,
      endTime: auctionSettings.endTime,
      startingPrice: startingPrice,
      currentPrice: startingPrice,
      status: "active" as const,
      duration: duration,
    };

    // Add auction using the hook
    addAuction(newAuction);

    console.log("Auction created:", newAuction);

    alert("Auction created successfully!");
    navigate("/artist-dashboard");
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setAuctionSettings((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    // For price input, ensure it's a valid number
    if (field === "startingPrice") {
      // Allow empty string or valid numbers with up to 2 decimal places
      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setAuctionSettings((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    } else {
      setAuctionSettings((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleBack = () => {
    navigate("/artist-dashboard");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!selectedArtwork) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">No Artwork Selected</h2>
        <p className="text-gray-600 mb-6">
          Please select an artwork to add to auction.
        </p>
        <Button onClick={handleBack} className="bg-sky-500 hover:bg-sky-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Get price for display - using type assertion
  const displayPrice = () => {
    const price = (selectedArtwork as Artwork).price;
    if (price === undefined || price === null) return "N/A";

    if (typeof price === "number") {
      return price.toFixed(2);
    } else if (typeof price === "string") {
      const num = parseFloat(price);
      return isNaN(num) ? "N/A" : num.toFixed(2);
    }
    return "N/A";
  };

  return (
    <div className="w-full flex flex-col items-center py-6 sm:py-10 px-3 sm:px-4 min-h-screen bg-white">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Rocket className="h-7 w-7" />
            Add to Auction
          </h1>
          <p className="text-gray-600 mt-2">
            Add your artwork to the live auctions section.
          </p>
        </div>

        {/* Selected Artwork Preview */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Selected Artwork</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={selectedArtwork.image || placeholderImage}
                alt={selectedArtwork.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold">{selectedArtwork.title}</h4>
              <p className="text-gray-600 mt-2">
                Type:{" "}
                <span className="font-medium">{selectedArtwork.type}</span>
              </p>
              <p className="text-gray-600">
                Current Price:{" "}
                <span className="font-medium">${displayPrice()}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Settings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Dashboard Settings
          </h2>

          {/* Start Date & Time */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Start Date & Time
            </h3>

            <div className="space-y-4 pl-4">
              {/* Start Date */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="startDateCheck"
                  checked={auctionSettings.startDateChecked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("startDateChecked", checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      type="text"
                      value={auctionSettings.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      className="pl-4 text-gray-700"
                      disabled={!auctionSettings.startDateChecked}
                      placeholder="December 1, 2025"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {auctionSettings.startDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Start Time */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="startTimeCheck"
                  checked={auctionSettings.startTimeChecked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("startTimeChecked", checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Time
                  </Label>
                  <div className="relative">
                    <Input
                      id="startTime"
                      type="text"
                      value={auctionSettings.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                      className="pl-4 text-gray-700"
                      disabled={!auctionSettings.startTimeChecked}
                      placeholder="08:21"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {auctionSettings.startTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* End Date & Time */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              End Date & Time
            </h3>

            <div className="space-y-4 pl-4">
              {/* End Date */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="endDateCheck"
                  checked={auctionSettings.endDateChecked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("endDateChecked", checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      type="text"
                      value={auctionSettings.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className="pl-4 text-gray-700"
                      disabled={!auctionSettings.endDateChecked}
                      placeholder="December 8, 2025"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {auctionSettings.endDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* End Time */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="endTimeCheck"
                  checked={auctionSettings.endTimeChecked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("endTimeChecked", checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Time
                  </Label>
                  <div className="relative">
                    <Input
                      id="endTime"
                      type="text"
                      value={auctionSettings.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                      className="pl-4 text-gray-700"
                      disabled={!auctionSettings.endTimeChecked}
                      placeholder="08:21"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {auctionSettings.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Starting Price - Fixed to match your image exactly */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Starting Price
            </h3>
            <div className="pl-4">
              <div className="relative max-w-xs">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                  $
                </span>
                <Input
                  type="text"
                  value={auctionSettings.startingPrice}
                  onChange={(e) =>
                    handleInputChange("startingPrice", e.target.value)
                  }
                  className="pl-10 text-lg h-12"
                  placeholder="0.00"
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Enter the starting bid price for your auction
              </p>
            </div>
          </div>

          {/* Auction Summary - Fixed date format to match your image */}
          <div className="border-t border-gray-200 pt-8">
            <div className="space-y-3 text-gray-700">
              <p className="text-lg">
                <span className="font-medium">Auction will start on:</span>{" "}
                {startDateTime}
              </p>
              <p className="text-lg">
                <span className="font-medium">Auction will end on:</span>{" "}
                {endDateTime}
              </p>
              <p className="text-lg">
                <span className="font-medium">Duration:</span>{" "}
                {calculateDuration()} days
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToAuction;
