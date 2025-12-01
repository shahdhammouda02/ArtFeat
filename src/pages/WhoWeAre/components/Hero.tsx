import React from "react";
import heroBg from "@/assets/images/who-bg.jpg";

const Hero: React.FC = () => {
  return (
    <section
      className="relative flex flex-col justify-center items-center text-center text-white h-[90vh]"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* طبقة التعتيم */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* المحتوى */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1
          className="text-6xl md:text-7xl font-[Playfair_Display] font-semibold mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Who We Are
        </h1>
        <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-8">
          A collective of passionate artists and curators dedicated to
          celebrating contemporary art and fostering creative expression.
        </p>
      </div>
    </section>
  );
};

export default Hero;
