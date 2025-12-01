import React from "react";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Values from "./components/Values";
import Join from "./components/Join";

const WhoWeAre: React.FC = () => {
  return (
    <main>
      <Hero />
      <Mission />
      <Values />
      <Join />
    </main>
  );
};

export default WhoWeAre;
