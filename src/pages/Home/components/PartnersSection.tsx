import React from "react";
import {
  SiShopify,
  SiSpotify,
  SiSlack,
  SiNotion,
  SiStripe,
  SiGoogle,
} from "react-icons/si";

const PartnersSection: React.FC = () => {
  const partners = [
    { icon: <SiShopify />, name: "Shopify" },
    { icon: <SiSpotify />, name: "Spotify" },
    { icon: <SiSlack />, name: "Slack" },
    { icon: <SiNotion />, name: "Notion" },
    { icon: <SiStripe />, name: "Stripe" },
    { icon: <SiGoogle />, name: "Google" },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* العنوان */}
        <h3 className="text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
          Our Partners
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Collaborating with leading creative brands
        </h2>
        <p className="text-gray-500 mb-12 text-base">
          Proudly partnering with visionary companies to bring art to the world.
        </p>

        {/* الأيقونات */}
        <div className="flex flex-wrap justify-center items-center gap-14 md:gap-20">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-[#111111] hover:text-[#555555] transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              {React.cloneElement(partner.icon, { size: 55 })}
              <span className="sr-only">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
