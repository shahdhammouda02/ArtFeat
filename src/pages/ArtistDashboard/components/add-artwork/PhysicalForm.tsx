import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Ruler, Scale, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useArtwork } from "@/hooks/useArtwork";
import type { ArtworkType } from "@/types/artwork-types";
import { useNavigate } from "react-router-dom";

interface PhysicalFormProps {
  files: (File | null)[];
  previews: (string | null)[];
  onFileChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
}

const PhysicalForm = ({ files, previews, onFileChange, onBack }: PhysicalFormProps) => {
  const { addArtwork } = useArtwork();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [weight, setWeight] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const decreaseQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const handleViewArtwork = () => {
    setShowPreview(true);
  };

   const handlePublish = () => {
    if (!files[0]) {
      alert('Please upload at least one image');
      return;
    }

    if (!title || !price) {
      alert('Please fill in required fields: Title and Price');
      return;
    }

    // Get the main image URL (first uploaded file)
    const mainImageUrl = previews[0];

    const artworkData = {
      type: 'physical' as ArtworkType,
      title,
      price: parseFloat(price) || 0,
      image: mainImageUrl || '', // Use the first image as main thumbnail
      data: {
        title,
        price,
        tags,
        quantity,
        description,
        materials,
        dimensions: { length, width, depth },
        weight,
        images: validPreviews,
      },
    };

    addArtwork(artworkData);
    navigate('/artist-dashboard');
  };

  // Filter out null values and ensure we only have strings
  const validPreviews = previews.filter(
    (preview): preview is string => preview !== null
  );

  const artworkData = {
    title,
    price,
    tags,
    quantity,
    description,
    materials,
    dimensions: { length, width, depth },
    weight,
    images: validPreviews,
  };

  // If showPreview is true, show the preview page instead of the form
  if (showPreview) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen gap-6 p-4 sm:p-8 w-full max-w-6xl">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">
            Review Your Artwork Submission
          </h1>
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            Back to Edit
          </Button>
        </div>

        <div className="w-full space-y-6 sm:space-y-8">
          {/* Images Preview */}
          {artworkData.images.length > 0 && (
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-lg font-semibold">Artwork Images</h3>
              <p className="text-gray-600">
                Ensure all images clearly represent your artwork
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {artworkData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Artwork preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Artwork Details */}
          <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <h3 className="text-lg font-semibold">Artwork Details</h3>
            <p className="text-gray-600">
              Verify general information about your artwork
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <Label className="font-medium text-sm">Artwork Title</Label>
                <p className="text-gray-700 mt-1">
                  {title || "Not provided"}
                </p>
              </div>
              <div>
                <Label className="font-medium text-sm">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags
                    ? tags.split(",").map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-gray-300 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag.trim()}
                        </Badge>
                      ))
                    : "Not provided"}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-gray-700">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Price</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    ${price || "0"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Quantity</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    {quantity}
                  </span>
                </div>
              </div>
              <div>
                <Label className="font-medium text-sm">Description</Label>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                  {description || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <h3 className="text-lg font-semibold">Physical Attributes</h3>
            <p className="text-gray-600">
              Confirm the physical characteristics of your artwork
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <Label className="font-medium text-sm">Materials</Label>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                  {materials || "Not provided"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-gray-700">
                <div className="flex flex-col">
                  <span>Length (cm)</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Ruler className="h-4 w-4" />
                    {length || "0"} cm
                  </span>
                </div>
                <div className="flex flex-col">
                  <span>Width (cm)</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Ruler className="h-4 w-4" />
                    {width || "0"} cm
                  </span>
                </div>
                <div className="flex flex-col">
                  <span>Depth (cm)</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Ruler className="h-4 w-4" />
                    {depth || "0"} cm
                  </span>
                </div>
              </div>
              <div>
                <Label className="font-medium text-sm">Weight Kg</Label>
                <div className="flex items-center gap-2 text-gray-700 mt-1">
                  <Scale className="h-4 w-4" />
                  <span>{weight || "0"} kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Page Buttons */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3 sm:gap-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Back to Edit
            </Button>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="default"
                className="bg-sky-500 text-white hover:bg-sky-600 w-full sm:w-auto"
                onClick={handlePublish}
              >
                Publish Artwork
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original form when showPreview is false
  return (
    <div className="flex flex-col items-center justify-start min-h-[400px] gap-6 p-4 sm:p-8 w-full max-w-6xl">
      <h1 className="text-xl sm:text-2xl font-bold text-center">
        Physical Artwork Details
      </h1>

      <div className="w-full border rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        <h2 className="text-lg font-semibold border-b pb-2">
          Artwork Images
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {files.map((file, index) => (
            <Label
              key={index}
              className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-3 sm:p-4 gap-1 sm:gap-2 cursor-pointer hover:border-sky-500 transition"
            >
              {previews[index] ? (
                <img
                  src={previews[index]!}
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-24 sm:h-32 object-cover rounded"
                />
              ) : (
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
              )}
              <span
                className="
                    text-xs sm:text-sm text-gray-600 
                    text-center 
                    whitespace-normal 
                    break-words 
                    sm:truncate
                  "
              >
                {file ? file.name : "Upload Image (up to 10MB)"}
              </span>

              <span className="text-[10px] sm:text-xs text-red-400">
                PNG, SVG
              </span>
              <Input
                type="file"
                accept=".png,.svg,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => onFileChange(index, e)}
              />
            </Label>
          ))}
        </div>
      </div>

      <div className="w-full border rounded-xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
        <h2 className="text-lg font-semibold mb-2 sm:mb-4">
          Artwork Details
        </h2>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Title</Label>
          <Input
            type="text"
            placeholder="Enter artwork title"
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Artwork Type</Label>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 rounded-full bg-sky-50 text-sky-500 border border-sky-500 text-sm font-medium">
              Physical
            </span>
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-300 text-sm font-medium cursor-not-allowed">
              Digital
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Price</Label>
          <Input
            type="text"
            placeholder="$ 0.0"
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Tags</Label>
          <Input
            type="text"
            placeholder="e.g. #abstract ..."
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Quantity</Label>
          <div className="flex border p-1 rounded-md border-gray-300 overflow-hidden w-max">
            <Button
              variant="outline"
              className="rounded-lg px-2 sm:px-3 py-1"
              onClick={decreaseQuantity}
            >
              <Minus />
            </Button>
            <span className="px-2 py-1 text-base sm:text-lg font-medium text-center">
              {quantity}
            </span>
            <Button
              variant="default"
              className="rounded-lg px-2 sm:px-3 py-1 bg-sky-500 text-white hover:bg-sky-600"
              onClick={increaseQuantity}
            >
              <Plus />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Description</Label>
          <textarea
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Physical Attributes Section */}
      <div className="w-full border rounded-xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
        <h2 className="text-lg font-semibold mb-2 sm:mb-4">
          Physical Attributes
        </h2>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Materials</Label>
          <textarea
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            rows={3}
            placeholder="List the materials used in this artwork"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Dimensions</Label>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Length (cm)"
                className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Width (cm)"
                className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Depth (cm)"
                className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Weight (kg)</Label>
          <Input
            type="text"
            placeholder="0.0"
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        {/* Left: Back Button */}
        <Button
          variant="outline"
          className="sm:mt-0"
          onClick={onBack}
        >
          Back
        </Button>

        {/* Right: View + Publish Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="default"
            className="bg-sky-500 text-white hover:bg-sky-600 w-full sm:w-auto"
            onClick={handleViewArtwork}
          >
            View Artwork
          </Button>

          <Button
            variant="default"
            className="bg-sky-500 text-white hover:bg-sky-600 w-full sm:w-auto"
            onClick={handlePublish}
          >
            Publish Artwork
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhysicalForm;