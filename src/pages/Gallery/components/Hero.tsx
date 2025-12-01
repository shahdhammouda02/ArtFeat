import React from "react";
import galleryHero from "@/assets/images/gallery.jpg"; 

const Hero: React.FC = () => {
  return (
    <section
      className="relative h-[90vh] flex flex-col justify-center items-center text-center text-white"
     style={{
        backgroundImage: `url(${galleryHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh", // نفس النسبة تقريبًا من الصورة
      }}
    >
      {/* 🔹 طبقة شفافة غامقة فوق الصورة */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🔹 النصوص */}
      <div className="relative z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide mb-4">
          GALLERY
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-yellow-400 mb-6">
          Where Art Comes Alive
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 leading-relaxed">
          Discover a curated collection of masterpieces from around the world.
          Each piece tells a story, waiting to inspire your imagination.
        </p>
      </div>
    </section>
  );
};

export default Hero;
