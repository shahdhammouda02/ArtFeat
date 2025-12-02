import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowLeft,
  Edit,
  Save,
  Trash2,
  Check,
  Ruler,
  Scale,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Package,
  FileText,
  Calendar,
  Eye,
  Gavel,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useArtwork } from "@/hooks/useArtwork";
import { useAuction, type Auction } from "@/hooks/useAuctions";
import type {
  Artwork,
  DigitalArtworkData,
  PhysicalArtworkData,
} from "@/types/artwork-types";

const ArtworkDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artworks, updateArtwork, deleteArtwork } = useArtwork();
  const { auctions: userAuctions } = useAuction();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Artwork>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [auctionForArtwork, setAuctionForArtwork] = useState<Auction | null>(
    null
  );

  useEffect(() => {
    if (id && artworks) {
      const foundArtwork = artworks.find((a) => a.id === id);
      if (foundArtwork) {
        setArtwork(foundArtwork);
        setEditedData({
          title: foundArtwork.title,
          price: foundArtwork.price,
          data: foundArtwork.data,
        });

        const auction = userAuctions.find(
          (auction) => auction.artworkId === id
        );
        setAuctionForArtwork(auction || null);
      } else {
        navigate("/artist-dashboard");
      }
      setIsLoading(false);
    }
  }, [id, artworks, navigate, userAuctions]);

  const handleSave = () => {
    if (!artwork || !editedData) return;

    const updatedArtwork = {
      ...artwork,
      ...editedData,
      data: editedData.data || artwork.data,
    };

    updateArtwork(artwork.id, updatedArtwork);
    setArtwork(updatedArtwork);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!artwork) return;

    if (
      window.confirm(
        "Are you sure you want to delete this artwork? This action cannot be undone."
      )
    ) {
      deleteArtwork(artwork.id);
      navigate("/artist-dashboard");
    }
  };

  const handleInputChange = (field: keyof Artwork, value: string | number) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDataChange = (field: string, value: string | number) => {
    setEditedData((prev) => {
      const currentData = prev.data || artwork?.data;
      return {
        ...prev,
        data: {
          ...currentData,
          [field]: value,
        } as DigitalArtworkData | PhysicalArtworkData,
      };
    });
  };

  const handleDimensionChange = (
    dimension: "length" | "width" | "depth",
    value: string
  ) => {
    if (artwork?.type === "physical") {
      const data = artwork.data as PhysicalArtworkData;
      setEditedData((prev) => {
        const currentData = prev.data || data;
        return {
          ...prev,
          data: {
            ...currentData,
            dimensions: {
              ...((currentData as PhysicalArtworkData).dimensions || {
                length: "",
                width: "",
                depth: "",
              }),
              [dimension]: value,
            },
          } as PhysicalArtworkData,
        };
      });
    }
  };

  const handleBack = () => {
    navigate("/artist-dashboard");
  };

  const formatDate = (date: Date | string) => {
    if (!date) return "Unknown";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-xl font-semibold">
        Loading artwork details...
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Artwork Not Found</h2>
        <p className="text-gray-600 mb-6">
          The artwork you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={handleBack}
          className="bg-sky-500 hover:bg-sky-600 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const isDigital = artwork.type === "digital";
  const data = artwork.data || {};

  const getDescription = () => {
    if (isEditing && editedData.data && "description" in editedData.data) {
      return editedData.data.description;
    }
    return "description" in data ? data.description : "";
  };

  const getTags = () => {
    if (isEditing && editedData.data && "tags" in editedData.data) {
      return editedData.data.tags;
    }
    return "tags" in data ? data.tags : "";
  };

  const getDigitalField = (
    field: keyof DigitalArtworkData
  ): string | string[] => {
    if (isEditing && editedData.data && field in editedData.data) {
      return (editedData.data as DigitalArtworkData)[field] as string;
    }
    return (data as DigitalArtworkData)?.[field] || "";
  };

  const getPhysicalField = (
    field: keyof PhysicalArtworkData
  ):
    | string
    | number
    | { length: string; width: string; depth: string }
    | string[] => {
    if (isEditing && editedData.data && field in editedData.data) {
      return (editedData.data as PhysicalArtworkData)[field] as string;
    }
    return (data as PhysicalArtworkData)?.[field] || "";
  };

  return (
    <div className="w-full min-h-screen bg-white py-4 sm:py-6 md:py-10 px-3 sm:px-4">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto mb-4 sm:mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto bg-white shadow-md sm:shadow-lg rounded-lg sm:rounded-xl overflow-hidden">
        {/* Header with Actions */}
        <div className="border-b border-gray-200 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  variant={isDigital ? "default" : "secondary"}
                  className={`${
                    isDigital
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  } text-xs sm:text-sm font-medium`}
                >
                  {isDigital ? "Digital" : "Physical"}
                </Badge>
                {auctionForArtwork && (
                  <Badge
                    variant="outline"
                    className={`text-xs sm:text-sm ${
                      auctionForArtwork.status === "active"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : auctionForArtwork.status === "ended"
                        ? "bg-red-100 text-red-800 border-red-300"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    <Gavel className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                    {auctionForArtwork.status === "active"
                      ? "Live Auction"
                      : auctionForArtwork.status === "ended"
                      ? "Auction Ended"
                      : "Auction"}
                  </Badge>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {isEditing ? (
                  <Input
                    value={editedData.title || artwork.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-xl sm:text-2xl md:text-3xl font-bold border-gray-300"
                    placeholder="Artwork Title"
                  />
                ) : (
                  artwork.title
                )}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedData.price || artwork.price}
                        onChange={(e) =>
                          handleInputChange(
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-24 sm:w-32 inline-block border-gray-300 text-sm sm:text-base"
                      />
                    ) : (
                      `${artwork.price.toFixed(2)}`
                    )}
                  </span>
                </div>
                {auctionForArtwork && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">
                      Current Bid:{" "}
                      <strong>
                        $
                        {auctionForArtwork.currentPrice?.toFixed(2) ||
                          auctionForArtwork.startingPrice?.toFixed(2)}
                      </strong>
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">
                    Created: {formatDate(artwork.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-3 sm:mt-0">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                    size="sm"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                    size="sm"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedData({
                        title: artwork.title,
                        price: artwork.price,
                        data: artwork.data,
                      });
                    }}
                    className="text-xs sm:text-sm"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2 text-xs sm:text-sm"
                    size="sm"
                  >
                    <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column: Images */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Auction Status Banner */}
              {auctionForArtwork && (
                <Card
                  className={`border-2 ${
                    auctionForArtwork.status === "active"
                      ? "border-green-500 bg-green-50"
                      : auctionForArtwork.status === "ended"
                      ? "border-red-500 bg-red-50"
                      : "border-yellow-500 bg-yellow-50"
                  }`}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <Gavel
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                              auctionForArtwork.status === "active"
                                ? "text-green-600"
                                : auctionForArtwork.status === "ended"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          />
                          <h3 className="font-bold text-base sm:text-lg">
                            {auctionForArtwork.status === "active"
                              ? "Live Auction in Progress"
                              : auctionForArtwork.status === "ended"
                              ? "Auction Has Ended"
                              : "Auction Scheduled"}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div>
                            <Label className="text-xs sm:text-sm text-gray-600">
                              Current Bid
                            </Label>
                            <p className="text-base sm:text-xl font-bold text-gray-900">
                              $
                              {auctionForArtwork.currentPrice?.toFixed(2) ||
                                auctionForArtwork.startingPrice?.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs sm:text-sm text-gray-600">
                              Bids
                            </Label>
                            <p className="text-base sm:text-xl font-bold text-gray-900 flex items-center gap-1">
                              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                              {auctionForArtwork.bids?.length || 0}
                            </p>
                          </div>
                          <div className="xs:col-span-2 sm:col-span-1">
                            <Label className="text-xs sm:text-sm text-gray-600">
                              Duration
                            </Label>
                            <p className="text-base sm:text-xl font-bold text-gray-900 flex items-center gap-1">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                              {auctionForArtwork.duration || 7} days
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Main Image */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    {artwork.image ? (
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-3 sm:p-4 bg-gray-50">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Main Artwork Image
                  </p>
                </CardFooter>
              </Card>

              {/* Additional Images */}
              {data.images && data.images.length > 1 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                    Additional Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {data.images.slice(1).map((img: string, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`${artwork.title} - ${index + 2}`}
                          className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/60 text-white text-[10px] xs:text-xs sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                          #{index + 2}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Artwork Information */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                    Artwork Information
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label className="text-xs sm:text-sm font-medium text-gray-700">
                        Description
                      </Label>
                      {isEditing ? (
                        <Textarea
                          value={getDescription()}
                          onChange={(e) =>
                            handleDataChange("description", e.target.value)
                          }
                          className="mt-1 sm:mt-2 min-h-[80px] sm:min-h-[100px] border-gray-300 text-sm sm:text-base"
                          placeholder="Describe your artwork..."
                        />
                      ) : (
                        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                          {getDescription() || "No description provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-xs sm:text-sm font-medium text-gray-700">
                        Tags
                      </Label>
                      {isEditing ? (
                        <Input
                          value={getTags()}
                          onChange={(e) =>
                            handleDataChange("tags", e.target.value)
                          }
                          className="mt-1 sm:mt-2 border-gray-300 text-sm sm:text-base"
                          placeholder="Separate tags with commas"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                          {getTags() ? (
                            getTags()
                              .split(",")
                              .map((tag: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="border-gray-300 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm"
                                >
                                  <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                  {tag.trim()}
                                </Badge>
                              ))
                          ) : (
                            <span className="text-xs sm:text-sm text-gray-500">
                              No tags
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Auction Details */}
              {auctionForArtwork && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Gavel className="h-5 w-5 text-yellow-500" />
                      Auction Details
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-0">
                            Status
                          </Label>
                          <Badge
                            className={`mt-0 sm:mt-2 ${
                              auctionForArtwork.status === "active"
                                ? "bg-green-500 text-white"
                                : auctionForArtwork.status === "ended"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-500 text-white"
                            }`}
                          >
                            {auctionForArtwork.status === "active"
                              ? "Live"
                              : auctionForArtwork.status === "ended"
                              ? "Ended"
                              : auctionForArtwork.status}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-0">
                            Starting Price
                          </Label>
                          <p className="mt-0 sm:mt-2 text-gray-700 font-medium">
                            ${auctionForArtwork.startingPrice?.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-0">
                          Current Bid
                        </Label>
                        <p className="mt-0 sm:mt-2 text-2xl font-bold text-green-600">
                          $
                          {auctionForArtwork.currentPrice?.toFixed(2) ||
                            auctionForArtwork.startingPrice?.toFixed(2)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-0">
                            Bids
                          </Label>
                          <p className="mt-0 sm:mt-2 text-gray-700 flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {auctionForArtwork.bids?.length || 0} bids
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-0">
                            Duration
                          </Label>
                          <p className="mt-0 sm:mt-2 text-gray-700">
                            {auctionForArtwork.duration || 7} days
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 block mb-1 sm:mb-0">
                          Timeframe
                        </Label>
                        <div className="mt-0 sm:mt-2 text-sm text-gray-600 space-y-1">
                          <p>
                            Start: {auctionForArtwork.startDate}{" "}
                            {auctionForArtwork.startTime}
                          </p>
                          <p>
                            End: {auctionForArtwork.endDate}{" "}
                            {auctionForArtwork.endTime}
                          </p>
                        </div>
                      </div>

                      {auctionForArtwork.status === "ended" &&
                        auctionForArtwork.bids &&
                        auctionForArtwork.bids.length > 0 && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 text-green-700">
                              <AlertCircle className="h-4 w-4" />
                              <span className="font-medium">
                                Sold for $
                                {auctionForArtwork.currentPrice?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Type Specific Details */}
              {isDigital ? (
                /* Digital Artwork Details */
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                      Digital Files & Details
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <Label className="text-xs sm:text-sm font-medium text-gray-700">
                            File Type
                          </Label>
                          {isEditing ? (
                            <Input
                              value={getDigitalField("fileType")}
                              onChange={(e) =>
                                handleDataChange("fileType", e.target.value)
                              }
                              className="mt-1 sm:mt-2 border-gray-300 text-sm sm:text-base"
                            />
                          ) : (
                            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700">
                              {getDigitalField("fileType") || "Unknown"}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="text-xs sm:text-sm font-medium text-gray-700">
                            Resolution
                          </Label>
                          {isEditing ? (
                            <Input
                              value={getDigitalField("dimensions")}
                              onChange={(e) =>
                                handleDataChange("dimensions", e.target.value)
                              }
                              className="mt-1 sm:mt-2 border-gray-300 text-sm sm:text-base"
                            />
                          ) : (
                            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700">
                              {getDigitalField("dimensions") || "Unknown"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs sm:text-sm font-medium text-gray-700">
                          Instant Download
                        </Label>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2 text-green-600 text-sm sm:text-base">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-medium">Enabled</span>
                        </div>
                      </div>

                      {getDigitalField("additionalNotes") && (
                        <div>
                          <Label className="text-xs sm:text-sm font-medium text-gray-700">
                            Additional Notes
                          </Label>
                          {isEditing ? (
                            <Textarea
                              value={getDigitalField("additionalNotes")}
                              onChange={(e) =>
                                handleDataChange(
                                  "additionalNotes",
                                  e.target.value
                                )
                              }
                              className="mt-1 sm:mt-2 min-h-[60px] sm:min-h-[80px] border-gray-300 text-sm sm:text-base"
                            />
                          ) : (
                            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                              {getDigitalField("additionalNotes")}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Physical Artwork Details */
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                      <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                      Physical Attributes
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <Label className="text-xs sm:text-sm font-medium text-gray-700">
                          Materials
                        </Label>
                        {isEditing ? (
                          <Textarea
                            value={getPhysicalField("materials") as string}
                            onChange={(e) =>
                              handleDataChange("materials", e.target.value)
                            }
                            className="mt-1 sm:mt-2 min-h-[60px] sm:min-h-[80px] border-gray-300 text-sm sm:text-base"
                          />
                        ) : (
                          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                            {(getPhysicalField("materials") as string) ||
                              "Not specified"}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs sm:text-sm font-medium text-gray-700">
                          Dimensions
                        </Label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-1 sm:mt-2">
                          {(["length", "width", "depth"] as const).map(
                            (dim) => (
                              <div key={dim}>
                                <Label className="text-[10px] xs:text-xs sm:text-xs text-gray-500 capitalize">
                                  {dim}
                                </Label>
                                {isEditing ? (
                                  <div className="relative mt-1">
                                    <Input
                                      value={
                                        (editedData.data &&
                                          (
                                            editedData.data as PhysicalArtworkData
                                          )?.dimensions?.[dim]) ||
                                        (data as PhysicalArtworkData)
                                          ?.dimensions?.[dim] ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleDimensionChange(
                                          dim,
                                          e.target.value
                                        )
                                      }
                                      className="border-gray-300 pr-6 sm:pr-8 text-sm sm:text-base"
                                    />
                                    <span className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm">
                                      cm
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 mt-1 text-gray-700">
                                    <Ruler className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                                    <span className="font-medium text-sm sm:text-base">
                                      {(data as PhysicalArtworkData)
                                        ?.dimensions?.[dim] || "0"}{" "}
                                      cm
                                    </span>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs sm:text-sm font-medium text-gray-700">
                          Weight
                        </Label>
                        {isEditing ? (
                          <div className="relative mt-1 sm:mt-2">
                            <Input
                              value={
                                (getPhysicalField("weight") as string) || ""
                              }
                              onChange={(e) =>
                                handleDataChange("weight", e.target.value)
                              }
                              className="border-gray-300 pr-10 sm:pr-12 text-sm sm:text-base"
                            />
                            <span className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm">
                              kg
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2 text-gray-700">
                            <Scale className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                            <span className="font-medium text-sm sm:text-base">
                              {(getPhysicalField("weight") as string) || "0"} kg
                            </span>
                          </div>
                        )}
                      </div>

                      {getPhysicalField("quantity") !== undefined && (
                        <div>
                          <Label className="text-xs sm:text-sm font-medium text-gray-700">
                            Quantity Available
                          </Label>
                          {isEditing ? (
                            <Input
                              type="number"
                              value={
                                (getPhysicalField("quantity") as number) || 0
                              }
                              onChange={(e) =>
                                handleDataChange(
                                  "quantity",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="mt-1 sm:mt-2 w-28 sm:w-32 border-gray-300 text-sm sm:text-base"
                              min="0"
                            />
                          ) : (
                            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700 font-medium">
                              {(getPhysicalField("quantity") as number) || 0}{" "}
                              units available
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions Card */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                    Actions
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-xs sm:text-sm"
                      size="sm"
                      onClick={() => navigate("/artist-dashboard")}
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      View All Artworks
                    </Button>

                    {!auctionForArtwork && (
                      <Button
                        variant="default"
                        className="w-full justify-start bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/artist-dashboard/add-to-auction?artworkId=${artwork.id}`
                          )
                        }
                      >
                        <Gavel className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Add to Auction
                      </Button>
                    )}

                    {auctionForArtwork && (
                      <>
                        <Button
                          variant="secondary"
                          className="w-full justify-start text-xs sm:text-sm"
                          size="sm"
                          onClick={() =>
                            navigate("/artist-dashboard?tab=auctions")
                          }
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          View Auction Details
                        </Button>
                        {auctionForArtwork.status === "active" && (
                          <Button
                            variant="default"
                            className="w-full justify-start bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                            size="sm"
                            onClick={() =>
                              navigate("/artist-dashboard?tab=auctions")
                            }
                          >
                            <Gavel className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            Go to Live Auction
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailsPage;
