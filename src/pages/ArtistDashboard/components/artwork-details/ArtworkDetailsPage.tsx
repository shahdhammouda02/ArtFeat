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
} from "lucide-react";
import { useArtwork } from "@/hooks/useArtwork";
import { useAuction } from "@/hooks/useAuctions";
import type { Artwork, DigitalArtworkData, PhysicalArtworkData } from "@/types/artwork-types";

const ArtworkDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artworks, updateArtwork, deleteArtwork } = useArtwork();
  const { auctions: userAuctions } = useAuction();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Artwork>>({});
  const [isLoading, setIsLoading] = useState(true);

  const isArtworkInAuction = (artworkId: string): boolean => {
    return userAuctions.some((auction) => auction.artworkId === artworkId);
  };

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
      } else {
        navigate("/artist-dashboard");
      }
      setIsLoading(false);
    }
  }, [id, artworks, navigate]);

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

    if (window.confirm("Are you sure you want to delete this artwork? This action cannot be undone.")) {
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

  const handleDimensionChange = (dimension: 'length' | 'width' | 'depth', value: string) => {
    if (artwork?.type === "physical") {
      const data = artwork.data as PhysicalArtworkData;
      setEditedData((prev) => {
        const currentData = prev.data || data;
        return {
          ...prev,
          data: {
            ...currentData,
            dimensions: {
              ...((currentData as PhysicalArtworkData).dimensions || { length: "", width: "", depth: "" }),
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
        <p className="text-gray-600 mb-6">The artwork you're looking for doesn't exist or has been removed.</p>
        <Button onClick={handleBack} className="bg-sky-500 hover:bg-sky-600 text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const isDigital = artwork.type === "digital";
  const data = artwork.data || {};
  const auctionStatus = isArtworkInAuction(artwork.id);

  // Helper functions to safely access data with proper typing
  const getDescription = () => {
    if (isEditing && editedData.data && 'description' in editedData.data) {
      return editedData.data.description;
    }
    return 'description' in data ? data.description : "";
  };

  const getTags = () => {
    if (isEditing && editedData.data && 'tags' in editedData.data) {
      return editedData.data.tags;
    }
    return 'tags' in data ? data.tags : "";
  };

  const getDigitalField = (field: keyof DigitalArtworkData): string | string[] => {
    if (isEditing && editedData.data && field in editedData.data) {
      return (editedData.data as DigitalArtworkData)[field] as string;
    }
    return (data as DigitalArtworkData)?.[field] || "";
  };

  const getPhysicalField = (field: keyof PhysicalArtworkData): string | number | { length: string; width: string; depth: string; } | string[] => {
    if (isEditing && editedData.data && field in editedData.data) {
      return (editedData.data as PhysicalArtworkData)[field] as string;
    }
    return (data as PhysicalArtworkData)?.[field] || "";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 sm:py-10 px-3 sm:px-4">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto mb-6">
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
      <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header with Actions */}
        <div className="border-b border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant={isDigital ? "default" : "secondary"}
                  className={`
                    ${isDigital ? "bg-blue-500 text-white" : "bg-green-500 text-white"}
                    text-sm font-medium
                  `}
                >
                  {isDigital ? "Digital" : "Physical"}
                </Badge>
                {auctionStatus && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    <Eye className="h-3 w-3 mr-1" />
                    In Auction
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {isEditing ? (
                  <Input
                    value={editedData.title || artwork.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-2xl font-bold border-gray-300"
                    placeholder="Artwork Title"
                  />
                ) : (
                  artwork.title
                )}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-lg font-bold text-gray-900">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedData.price || artwork.price}
                        onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                        className="w-32 inline-block border-gray-300"
                      />
                    ) : (
                      `$${artwork.price.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Created: {formatDate(artwork.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
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
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Images */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    {artwork.image ? (
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-600">Main Artwork Image</p>
                </CardFooter>
              </Card>

              {/* Additional Images */}
              {data.images && data.images.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.images.slice(1).map((img: string, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`${artwork.title} - ${index + 2}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          #{index + 2}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Details */}
            <div className="space-y-6">
              {/* Artwork Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-sky-500" />
                    Artwork Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Description</Label>
                      {isEditing ? (
                        <Textarea
                          value={getDescription()}
                          onChange={(e) => handleDataChange("description", e.target.value)}
                          className="mt-2 min-h-[100px] border-gray-300"
                          placeholder="Describe your artwork..."
                        />
                      ) : (
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                          {getDescription() || "No description provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Tags</Label>
                      {isEditing ? (
                        <Input
                          value={getTags()}
                          onChange={(e) => handleDataChange("tags", e.target.value)}
                          className="mt-2 border-gray-300"
                          placeholder="Separate tags with commas"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {getTags() ? (
                            getTags().split(",").map((tag: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-gray-300 bg-gray-100 text-gray-600 rounded-full"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag.trim()}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500">No tags</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Type Specific Details */}
              {isDigital ? (
                /* Digital Artwork Details */
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-500" />
                      Digital Files & Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">File Type</Label>
                          {isEditing ? (
                            <Input
                              value={getDigitalField("fileType")}
                              onChange={(e) => handleDataChange("fileType", e.target.value)}
                              className="mt-2 border-gray-300"
                            />
                          ) : (
                            <p className="mt-2 text-gray-700">{getDigitalField("fileType") || "Unknown"}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Resolution</Label>
                          {isEditing ? (
                            <Input
                              value={getDigitalField("dimensions")}
                              onChange={(e) => handleDataChange("dimensions", e.target.value)}
                              className="mt-2 border-gray-300"
                            />
                          ) : (
                            <p className="mt-2 text-gray-700">{getDigitalField("dimensions") || "Unknown"}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Instant Download</Label>
                        <div className="flex items-center gap-2 mt-2 text-green-600">
                          <Check className="h-5 w-5" />
                          <span className="font-medium">Enabled</span>
                        </div>
                      </div>

                      {getDigitalField("additionalNotes") && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Additional Notes</Label>
                          {isEditing ? (
                            <Textarea
                              value={getDigitalField("additionalNotes")}
                              onChange={(e) => handleDataChange("additionalNotes", e.target.value)}
                              className="mt-2 min-h-[80px] border-gray-300"
                            />
                          ) : (
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">
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
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Scale className="h-5 w-5 text-green-500" />
                      Physical Attributes
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Materials</Label>
                        {isEditing ? (
                          <Textarea
                            value={getPhysicalField("materials") as string}
                            onChange={(e) => handleDataChange("materials", e.target.value)}
                            className="mt-2 min-h-[80px] border-gray-300"
                          />
                        ) : (
                          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                            {getPhysicalField("materials") as string || "Not specified"}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Dimensions</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                          {(["length", "width", "depth"] as const).map((dim) => (
                            <div key={dim}>
                              <Label className="text-xs text-gray-500 capitalize">{dim}</Label>
                              {isEditing ? (
                                <div className="relative mt-1">
                                  <Input
                                    value={
                                      (editedData.data && 
                                      (editedData.data as PhysicalArtworkData)?.dimensions?.[dim]) || 
                                      ((data as PhysicalArtworkData)?.dimensions?.[dim] || "")
                                    }
                                    onChange={(e) => handleDimensionChange(dim, e.target.value)}
                                    className="border-gray-300 pr-8"
                                  />
                                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                    cm
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 mt-1 text-gray-700">
                                  <Ruler className="h-4 w-4 text-gray-400" />
                                  <span className="font-medium">
                                    {(data as PhysicalArtworkData)?.dimensions?.[dim] || "0"} cm
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Weight</Label>
                        {isEditing ? (
                          <div className="relative mt-2">
                            <Input
                              value={getPhysicalField("weight") as string || ""}
                              onChange={(e) => handleDataChange("weight", e.target.value)}
                              className="border-gray-300 pr-12"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                              kg
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mt-2 text-gray-700">
                            <Scale className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{getPhysicalField("weight") as string || "0"} kg</span>
                          </div>
                        )}
                      </div>

                      {getPhysicalField("quantity") !== undefined && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Quantity Available</Label>
                          {isEditing ? (
                            <Input
                              type="number"
                              value={getPhysicalField("quantity") as number || 0}
                              onChange={(e) => handleDataChange("quantity", parseInt(e.target.value) || 0)}
                              className="mt-2 w-32 border-gray-300"
                              min="0"
                            />
                          ) : (
                            <p className="mt-2 text-gray-700 font-medium">
                              {getPhysicalField("quantity") as number || 0} units available
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
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/artist-dashboard")}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View All Artworks
                    </Button>
                    
                    {!auctionStatus && (
                      <Button
                        variant="default"
                        className="w-full justify-start bg-sky-500 hover:bg-sky-600 text-white"
                        onClick={() => navigate(`/add-to-auction?artworkId=${artwork.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Add to Auction
                      </Button>
                    )}
                    
                    {auctionStatus && (
                      <Button
                        variant="secondary"
                        className="w-full justify-start"
                        onClick={() => navigate("/artist-dashboard?tab=auctions")}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Auction Status
                      </Button>
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