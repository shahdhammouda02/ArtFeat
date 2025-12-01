import React from "react";
import { useNavigate } from "react-router-dom";

const Join: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-sky-500 to-sky-600 text-center text-white py-24 px-6">
      <h2
        className="text-4xl md:text-5xl font-semibold mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Join Our Journey
      </h2>

      <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
        Whether you're an artist, collector, or art enthusiast, we invite you to
        be part of our vibrant community.
      </p>

      <button
        onClick={() => navigate("/signup")}
        className="px-8 py-3 rounded-md font-medium transition"
        style={{
          backgroundColor: "#3dbdfd",
          color: "white",
        }}
      >
        Join as Artist
      </button>
    </section>
  );
};

export default Join;
