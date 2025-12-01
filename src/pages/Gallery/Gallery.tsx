import React from "react";
import Hero from "./components/Hero";
import GalleryContent from "./components/GalleryContent";

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <GalleryContent />
    </div>
  );
};

export default Gallery;
