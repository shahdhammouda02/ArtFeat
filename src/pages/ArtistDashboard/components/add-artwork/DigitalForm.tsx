import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useArtwork } from "@/hooks/useArtwork";
import type { ArtworkType } from "./types";

interface DigitalFormProps {
  onBack: () => void;
}

const DigitalForm = ({ onBack }: DigitalFormProps) => {
  const { addArtwork } = useArtwork();
  const navigate = useNavigate();
  const [digitalFiles, setDigitalFiles] = useState<(File | null)[]>(
    Array(5).fill(null)
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [fileType, setFileType] = useState("");
  const [dimensions, setDimensions] = useState("");

  useEffect(() => {
    const file = digitalFiles[0];
    if (!file) return;

    // Detect file extension
    const ext = file.name.split(".").pop()?.toUpperCase() || "";
    setFileType(ext);

    // Detect width/height (resolution)
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setDimensions(`${img.width}x${img.height} pixels, 72 DPI`);
    };
  }, [digitalFiles]);

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setDigitalFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = file;
      return newFiles;
    });
  };

  const digitalPreviews = useMemo(
    () =>
      digitalFiles.map((file) => (file ? URL.createObjectURL(file) : null)),
    [digitalFiles]
  );

  const handleViewArtwork = () => {
    setShowPreview(true);
  };

   const handlePublish = () => {
    if (!digitalFiles[0]) {
      alert('Please upload at least the original artwork');
      return;
    }

    if (!title || !price) {
      alert('Please fill in required fields: Title and Price');
      return;
    }

    // Get the main image URL (first uploaded file)
    const mainImageUrl = digitalPreviews[0];

    const artworkData = {
      type: 'digital' as ArtworkType,
      title,
      price: parseFloat(price) || 0,
      image: mainImageUrl || '', // Use the first image as main thumbnail
      data: {
        title,
        price,
        tags,
        description,
        additionalNotes,
        images: validDigitalPreviews,
        fileType,
        dimensions,
      },
    };

    addArtwork(artworkData);
    navigate('/artist-dashboard'); // This will refresh the dashboard
  };


  // Filter out null values and ensure we only have strings
  const validDigitalPreviews = digitalPreviews.filter(
    (preview): preview is string => preview !== null
  );

  const digitalArtworkData = {
    title,
    price,
    tags,
    description,
    additionalNotes,
    images: validDigitalPreviews,
  };

  // If showPreview is true, show the preview page instead of the form
  if (showPreview) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen gap-6 p-4 sm:p-8 w-full max-w-6xl">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">Artwork Images</h1>
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            Back to Edit
          </Button>
        </div>

        <div className="w-full space-y-6 sm:space-y-8">
          {/* Artwork Images */}
          <div className="space-y-2 sm:space-y-4">
            {/* Original Artwork */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                Original Artwork
              </h4>
              {digitalFiles[0] && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <img
                    src={digitalPreviews[0]!}
                    alt="Original artwork preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="text-sm text-gray-600">
                    {digitalFiles[0]?.name}
                  </span>
                </div>
              )}
            </div>

            {/* Additional Images */}
            {digitalArtworkData.images.length > 2 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  View Artwork
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {digitalArtworkData.images.slice(2).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Artwork preview ${index + 3}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Artwork Information */}
          <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <h3 className="text-lg font-semibold">Artwork Information</h3>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <Label className="font-medium text-sm">Artwork Title</Label>
                <p className="text-gray-700 mt-1">
                  {title || "Not provided"}
                </p>
              </div>
              <div>
                <Label className="font-medium text-sm">Description</Label>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                  {description || "Not provided"}
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
            </div>
          </div>

          {/* Files & Availability */}
          <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <h3 className="text-lg font-semibold">Files & Availability</h3>

            <div className="space-y-3">
              {/* Row 1 — File Type + Dimensions */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-gray-700">
                {/* File Type */}
                <div className="flex flex-col">
                  <span className="font-medium text-sm">File Type</span>
                  <span className="inline-flex items-center gap-1">
                    {fileType || "Unknown"}
                  </span>
                </div>

                {/* Dimensions */}
                <div className="flex flex-col">
                  <Label className="font-medium text-sm">
                    Dimensions/Resolution
                  </Label>
                  <p className="text-gray-700 mt-1">
                    {dimensions || "Unknown"}
                  </p>
                </div>
              </div>

              {/* Row 2 — Instant Download */}
              <div className="flex flex-col">
                <span className="font-medium text-sm">Instant Download</span>

                <span className="inline-flex items-center gap-1 mt-1 text-gray-700">
                  <Check className="text-sky-500" size={20} />
                  Enabled
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & Policy */}
          <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <h3 className="text-lg font-semibold">Pricing & Policy</h3>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <Label className="font-medium text-sm">Price</Label>
                <p className="text-gray-700 mt-1">${price || "0"}</p>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <h3 className="text-lg font-semibold">Additional Notes</h3>
            <div className="space-y-2 sm:space-y-3">
              <div>
                <Label className="font-medium text-sm">
                  Notes for buyers (Optional)
                </Label>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                  {additionalNotes || "Not provided"}
                </p>
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
              >
                Submit Artwork
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start min-h-[400px] gap-6 p-4 sm:p-8 w-full max-w-6xl">
      <h1 className="text-xl sm:text-2xl font-bold text-left w-full">
        Digital Artwork Details
      </h1>

      {/* Upload Original Artwork Section */}
      <div className="w-full border rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Upload Original Artwork</h2>
          <p className="text-sm text-gray-600">
            Add the primary image for your digital artwork. Max file size:
            33MB.
          </p>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        <Label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 gap-3 cursor-pointer hover:border-sky-500 transition">
          {digitalPreviews[0] ? (
            <div className="flex flex-col items-center gap-3 w-full h-full">
              <img
                src={digitalPreviews[0]}
                alt="Original artwork preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-xs text-gray-600">{digitalFiles[0]?.name}</p>
            </div>
          ) : (
            <>
              <ImagePlus className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
              <div className="text-center">
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  Drag and drop your artwork here, or click to browse
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Supported formats: al, psd, fda, _processe_, _clip_,
                  _allosign_ Max file size: 200MB.
                </p>
              </div>
            </>
          )}
          <Input
            type="file"
            accept=".al,.psd,.fda,._processe_,._clip_,._allosign_,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => handleFileChange(0, e)}
          />
        </Label>
      </div>

      {/* Upload View Artwork Section */}
      <div className="w-full border rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        <h2 className="text-lg font-semibold text-left">
          Upload View Artwork
        </h2>

        <Label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 gap-3 cursor-pointer hover:border-sky-500 transition">
          {digitalPreviews[1] ? (
            <div className="flex flex-col items-center gap-3 w-full h-full">
              <img
                src={digitalPreviews[1]}
                alt="View artwork preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-xs text-gray-600">{digitalFiles[1]?.name}</p>
            </div>
          ) : (
            <>
              <ImagePlus className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
              <div className="text-center">
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  Drag and drop your artwork here, or click to browse
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Supported formats: al, psd, fda, _processe_, _clip_,
                  _allosign_ Max file size: 200MB.
                </p>
              </div>
            </>
          )}
          <Input
            type="file"
            accept=".al,.psd,.fda,._processe_,._clip_,._allosign_,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => handleFileChange(1, e)}
          />
        </Label>
      </div>

      {/* Additional Image Uploads */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[2, 3, 4].map((index) => (
          <div
            key={index}
            className="border rounded-xl p-4 flex flex-col gap-3"
          >
            <Label className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 gap-2 cursor-pointer hover:border-sky-500 transition">
              {digitalPreviews[index] ? (
                <>
                  <img
                    src={digitalPreviews[index]!}
                    alt={`Artwork ${index - 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                  <span className="text-xs text-gray-600 text-center">
                    {digitalFiles[index]?.name}
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-gray-500" />
                  <span className="text-xs text-gray-600 text-center">
                    Upload Image (up to 10MB)
                  </span>
                  <span className="text-[10px] text-red-400">PNG , SVG</span>
                </>
              )}
              <Input
                type="file"
                accept=".png,.svg,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange(index, e)}
              />
            </Label>
          </div>
        ))}
      </div>

      {/* Updated Section: Artwork Information, Pricing & Policy, Additional Notes */}
      <div className="w-full border rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        {/* Artwork Information */}
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Artwork Information</h2>
          <p className="text-sm text-gray-600">
            Provide essential details about your digital masterpieces.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Artwork Title</Label>
            <Input
              type="text"
              placeholder="My Digital Masterpiece"
              className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Description</Label>
            <textarea
              className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              rows={4}
              placeholder="Describe your artwork, inspiration, and unique aspects..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Tags</Label>
            <Input
              type="text"
              placeholder="e.g., Arkansas, alegrahan, #aurreal (nomina separante)"
              className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        {/* Pricing & Policy */}
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Pricing & Policy</h2>
          <p className="text-sm text-gray-600">
            Set the price and defines the return policy for your artwork.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Price</Label>
          <Input
            type="text"
            placeholder="$ 20.99"
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        {/* Additional Notes */}
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Additional Notes</h2>
          <p className="text-sm text-gray-600">
            Any private notes for yourself or specific instructions for
            buyers.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Arms Notes (Optional)</Label>
          <textarea
            className="border border-gray-300 rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            rows={3}
            placeholder="Add any specific details, licensing info, or private notes for your reference..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
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

export default DigitalForm;