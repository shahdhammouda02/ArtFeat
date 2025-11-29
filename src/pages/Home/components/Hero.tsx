import React from "react";
import heroBg from "@/assets/images/hero-home.png";

const Hero: React.FC = () => {
  return (
    <section
      className="relative h-screen flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* طبقة تظليل شفافة */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* المحتوى */}
      <div className="relative z-10 max-w-3xl px-4">
        {/* 🔹 النص اللي عليه خلفية */}
        <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm mb-4 backdrop-blur-md">
          Your Creative Studio
        </span>

        {/* 🔹 العنوان الرئيسي */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          Craft Art That <br />
          <span className="text-yellow-400">Speaks Volumes</span>
        </h1>

        {/* 🔹 الوصف */}
        <p className="text-lg text-gray-200 mb-8">
          Every brushstroke tells a story. Create in a space designed to <br/> inspire
          your best work and bring your imagination to life.
        </p>

        {/* 🔹 الأزرار */}
        <div className="flex justify-center gap-4">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-yellow-300 transition">
            Explore Artwork
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
