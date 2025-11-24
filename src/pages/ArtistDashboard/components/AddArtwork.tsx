import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AddArtwork = () => {
  const [artworkType, setArtworkType] = useState<
    "none" | "physical" | "digital"
  >("none");
  const [files, setFiles] = useState<(File | null)[]>(Array(6).fill(null));

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = file;
      return newFiles;
    });
  };

  const previews = useMemo(
    () => files.map((file) => (file ? URL.createObjectURL(file) : null)),
    [files]
  );

  const PhysicalForm = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");
    const [quantity, setQuantity] = useState(10);
    const [description, setDescription] = useState("");

    const decreaseQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));
    const increaseQuantity = () => setQuantity((prev) => prev + 1);

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
                <span className="text-xs sm:text-sm text-gray-600 truncate text-center">
                  {file ? file.name : "Upload Image (up to 10MB)"}
                </span>
                <span className="text-[10px] sm:text-xs text-red-400">
                  PNG, SVG
                </span>
                <Input
                  type="file"
                  accept=".png,.svg,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => handleFileChange(index, e)}
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

        <Button
          variant="outline"
          className="mt-4 sm:mt-6"
          onClick={() => setArtworkType("none")}
        >
          Back
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 sm:gap-6 p-4 sm:p-8 w-full">
      {artworkType === "none" && (
        <>
          <h1 className="text-lg sm:text-xl font-semibold text-center">
            To Add New Artwork, choose artwork type first:
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <Button
              className="p-4 sm:p-7 text-base sm:text-lg bg-sky-500 text-white hover:bg-sky-600"
              variant="default"
              onClick={() => setArtworkType("physical")}
            >
              Physical Artwork
            </Button>
            <Button
              className="p-4 sm:p-7 text-base sm:text-lg"
              variant="outline"
              onClick={() => setArtworkType("digital")}
            >
              Digital Artwork
            </Button>
          </div>
        </>
      )}

      {artworkType === "physical" && <PhysicalForm />}
      {artworkType === "digital" && (
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-6xl">
          <h1 className="text-xl sm:text-2xl font-bold">
            Digital Artwork Details
          </h1>
          <Button
            variant="outline"
            className="mt-4 sm:mt-6"
            onClick={() => setArtworkType("none")}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddArtwork;
