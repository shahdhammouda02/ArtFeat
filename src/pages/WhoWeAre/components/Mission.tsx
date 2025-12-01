import React from "react";

const Mission: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 text-center px-6">
      <h2
        className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Our Mission
      </h2>

      <div className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
        <p>
          We believe art has the power to transform perspectives, inspire
          dialogue, and connect communities. Our mission is to create accessible
          spaces where contemporary art thrives and artists flourish.
        </p>
      </div>
    </section>
  );
};

export default Mission;
