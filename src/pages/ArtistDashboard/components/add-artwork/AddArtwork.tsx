import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import PhysicalForm from "./PhysicalForm";
import DigitalForm from "./DigitalForm";
import type { ArtworkType } from "./types";

const AddArtwork = () => {
  const [artworkType, setArtworkType] = useState<ArtworkType>("none");
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

      {artworkType === "physical" && (
        <PhysicalForm
          files={files}
          previews={previews}
          onFileChange={handleFileChange}
          onBack={() => setArtworkType("none")}
        />
      )}
      {artworkType === "digital" && (
        <DigitalForm onBack={() => setArtworkType("none")} />
      )}
    </div>
  );
};

export default AddArtwork;