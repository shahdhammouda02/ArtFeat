import { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Edit, Trash2 } from "lucide-react";
import { Auth } from "@/contexts/AuthContext";
import { useCollection } from "@/hooks/useCollection";
import { useArtwork } from "@/hooks/useArtwork";
import { useNavigate } from "react-router-dom";

const CreateCollection = () => {
  const { user } = Auth();
  const { addCollection } = useCollection();
  const { artworks } = useArtwork(); // Get real artworks from context
  const navigate = useNavigate();
  
  const [collectionTitle, setCollectionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]); // Changed to string IDs
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use real artworks from context instead of mock data
  const availableArtworks = useMemo(() => {
    return artworks.map((artwork) => ({
      id: artwork.id, // This is already a string
      image: artwork.image || "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&h=150&fit=crop", // Fallback image
      title: artwork.title,
      artist: user?.name || "Unknown Artist",
      dateAdded: artwork.createdAt 
        ? new Date(artwork.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
    }));
  }, [artworks, user?.name]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArtworks(availableArtworks.map((artwork) => artwork.id));
    } else {
      setSelectedArtworks([]);
    }
  };

  const toggleArtworkSelection = (artworkId: string) => { // Updated to string
    setSelectedArtworks((prev) =>
      prev.includes(artworkId)
        ? prev.filter((id) => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  const isAllSelected = selectedArtworks.length === availableArtworks.length && availableArtworks.length > 0;

  // Add publish handler for collection
  const handleCreateCollection = () => {
    if (!collectionTitle.trim()) {
      alert("Please enter a collection title");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a collection description");
      return;
    }

    const collectionData = {
      title: collectionTitle,
      description,
      coverImage:
        coverImage ||
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop", // Fallback image
      visibility,
      artworkCount: selectedArtworks.length,
      artworks: selectedArtworks, // Already string IDs
    };

    addCollection(collectionData);
    navigate("/artist-dashboard"); // Navigate back to dashboard
  };

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Create New Collection
          </h1>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Collection Details Section */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Collection Title */}
            <div>
              <Label className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 block">
                Collection Title
              </Label>
              <Input
                type="text"
                placeholder="Enter collection title"
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
                className="w-full border-gray-300 text-base sm:text-lg py-2 sm:py-3"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 block">
                Description
              </Label>
              <Textarea
                placeholder="Briefly describe your collection..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[80px] sm:min-h-[120px] resize-none border-gray-300 text-base sm:text-lg py-2 sm:py-3"
              />
            </div>

            {/* Cover Image */}
            <div>
              <Label className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 block">
                Cover image
              </Label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-2 sm:p-4">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <span className="text-xs sm:text-sm">No image</span>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={triggerFileInput}
                    className="flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                    Upload image
                  </Button>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div>
              <Label className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 block">
                Visibility
              </Label>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => setVisibility("public")}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                      visibility === "public" ? "bg-sky-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`text-sm sm:text-base ${
                      visibility === "public"
                        ? "font-medium text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    Public
                  </span>
                </button>
                <span className="text-gray-500">:</span>
                <button
                  type="button"
                  onClick={() => setVisibility("private")}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                      visibility === "private" ? "bg-sky-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`text-sm sm:text-base ${
                      visibility === "private"
                        ? "font-medium text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    Private
                  </span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4 sm:my-6"></div>

            {/* Create Collection Button */}
            <div>
              <Button
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 sm:py-4 text-base sm:text-lg font-medium"
                onClick={handleCreateCollection}
              >
                Create Collection
              </Button>
            </div>
          </div>

          {/* Add Artworks Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Section Header */}
            <div className="p-4 sm:p-6 lg:p-8 border-b">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Add Artworks to {collectionTitle || "New Collection"}
              </h2>
              {availableArtworks.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  No artworks available. Create some artworks first to add them to collections.
                </p>
              )}
            </div>

            {/* Table Controls - Only show if there are artworks */}
            {availableArtworks.length > 0 && (
              <div className="p-3 sm:p-4 lg:p-6 border-b bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={isAllSelected}
                      onCheckedChange={toggleSelectAll}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <Label
                      htmlFor="select-all"
                      className="text-sm sm:text-base font-medium"
                    >
                      Select all
                    </Label>
                  </div>
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 w-full sm:w-auto">
                    Add Selected ({selectedArtworks.length})
                  </Button>
                </div>
              </div>
            )}

            {/* Artworks Table */}
            <div className="overflow-x-auto">
              {availableArtworks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-base mb-4">
                    You haven't created any artworks yet.
                  </p>
                  <Button 
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => navigate("/artist-dashboard/add-artwork")}
                  >
                    Create Your First Artwork
                  </Button>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-xs sm:text-base text-gray-900 w-12 sm:w-16">
                        Select
                      </th>
                      <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-xs sm:text-base text-gray-900 w-16 sm:w-24">
                        Image
                      </th>
                      <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-xs sm:text-base text-gray-900">
                        Title
                      </th>
                      <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-xs sm:text-base text-gray-900 hidden sm:table-cell">
                        Artist
                      </th>
                      <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-xs sm:text-base text-gray-900 hidden sm:table-cell">
                        Date Added
                      </th>
                      <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-xs sm:text-base text-gray-900 w-16 sm:w-24">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableArtworks.map((artwork) => (
                      <tr key={artwork.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-3 sm:py-4 sm:px-6">
                          <Checkbox
                            checked={selectedArtworks.includes(artwork.id)}
                            onCheckedChange={() =>
                              toggleArtworkSelection(artwork.id)
                            }
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          />
                        </td>
                        <td className="py-3 px-3 sm:py-4 sm:px-6">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-3 sm:py-4 sm:px-6 font-medium text-gray-900 text-sm sm:text-lg">
                          {artwork.title}
                        </td>
                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-gray-600 text-sm sm:text-lg hidden sm:table-cell">
                          {artwork.artist}
                        </td>
                        <td className="py-3 px-3 sm:py-4 sm:px-6 text-gray-600 text-sm sm:text-lg hidden sm:table-cell">
                          {artwork.dateAdded}
                        </td>
                        <td className="py-3 px-3 sm:py-4 sm:px-6">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-gray-100"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-red-600 bg-red-500"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;