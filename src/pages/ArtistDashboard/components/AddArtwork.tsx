import { Button } from "@/components/ui/button";

const AddArtwork = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-6">
      <h1 className="text-xl font-semibold">
        To Add New Artwork, choose artwork type first:
      </h1>
      <div className="flex gap-8">
        <Button
          className="p-7 text-lg bg-sky-500 text-white hover:bg-sky-600"
          variant="default"
        >
          Physical Artwork
        </Button>
        <Button className="p-7 text-lg" variant="outline">
          Digital Artwork
        </Button>
      </div>
    </div>
  );
};

export default AddArtwork;
